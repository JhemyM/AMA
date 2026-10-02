import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const inputPath = resolve(root, process.argv[2] ?? 'data/embrapa/catalog.example.json');
const command = process.argv[3] ?? 'normalize';
const outputPath = resolve(root, 'data/embrapa/catalog.normalized.json');
const documentDir = resolve(root, 'data/embrapa/documents');
const allowedDownloadStatuses = new Set(['download-permitted']);

const input = JSON.parse(await readFile(inputPath, 'utf8'));
if (!Array.isArray(input.records)) throw new Error('catalog.records must be an array');

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : null;
}

function normalizeRecord(record) {
  const title = cleanText(record.title);
  const officialUrl = cleanText(record.officialUrl);
  if (!title || !officialUrl) throw new Error('Every record needs title and officialUrl');
  return {
    repository: cleanText(record.repository) ?? 'unknown',
    externalId: cleanText(record.externalId) ?? officialUrl,
    title,
    abstract: cleanText(record.abstract),
    publicationType: cleanText(record.publicationType) ?? 'other',
    language: cleanText(record.language) ?? 'pt-BR',
    publicationYear: Number.isInteger(record.publicationYear) ? record.publicationYear : null,
    authors: Array.isArray(record.authors) ? record.authors.map(cleanText).filter(Boolean) : [],
    keywords: Array.isArray(record.keywords) ? record.keywords.map(cleanText).filter(Boolean) : [],
    officialUrl,
    fileUrl: cleanText(record.fileUrl),
    rightsStatus: cleanText(record.rightsStatus) ?? 'unknown',
    licenseName: cleanText(record.licenseName),
    licenseUrl: cleanText(record.licenseUrl),
    sourceCollectedAt: input.collectedAt ?? new Date().toISOString()
  };
}

const records = [...new Map(input.records.map(normalizeRecord).map((record) => [`${record.repository}:${record.externalId}`, record])).values()];
await mkdir(resolve(root, 'data/embrapa'), { recursive: true });
await writeFile(outputPath, JSON.stringify({ source: input.source ?? 'unknown', normalizedAt: new Date().toISOString(), records }, null, 2) + '\n', 'utf8');
console.log(`Normalized ${records.length} records into ${outputPath}`);

if (command !== 'download') process.exit(0);
await mkdir(documentDir, { recursive: true });
for (const record of records) {
  if (!allowedDownloadStatuses.has(record.rightsStatus) || !record.fileUrl) {
    console.log(`Skipped ${record.title}: rights status does not permit download`);
    continue;
  }
  const response = await fetch(record.fileUrl);
  if (!response.ok || !response.body) throw new Error(`Download failed (${response.status}): ${record.fileUrl}`);
  const safeId = record.externalId.replace(/[^a-z0-9_-]/gi, '_');
  const filePath = resolve(documentDir, `${safeId}.pdf`);
  await pipeline(Readable.fromWeb(response.body), createWriteStream(filePath));
  const bytes = await readFile(filePath);
  console.log(`Downloaded ${record.title}: ${bytes.byteLength} bytes, sha256=${createHash('sha256').update(bytes).digest('hex')}`);
}
