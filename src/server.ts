import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import type { Field, GuidanceTrail, Property, SyncOperation, SyncResult } from './domain/models.js';

const port = Number(process.env.PORT ?? 8787);
const property: Property = {
  id: 'property-santa-clara',
  name: 'Fazenda Santa Clara',
  municipality: 'Delmiro Gouveia',
  region: 'Sertao de Alagoas',
  timezone: 'America/Maceio',
  areaHectares: 220
};
const fields: Field[] = [
  { id: 'field-north', propertyId: property.id, name: 'Talhao Norte', crop: 'milho', areaHectares: 32.8, soilMoisturePercent: 44, healthScore: 88, geometryGeoJson: null },
  { id: 'field-river', propertyId: property.id, name: 'Talhao Ribeirao', crop: 'soja', areaHectares: 48.2, soilMoisturePercent: 41, healthScore: 74, geometryGeoJson: null },
  { id: 'field-east', propertyId: property.id, name: 'Talhao Leste', crop: 'cafe', areaHectares: 21.6, soilMoisturePercent: 36, healthScore: 59, geometryGeoJson: null },
  { id: 'field-low', propertyId: property.id, name: 'Talhao Baixada', crop: 'trigo', areaHectares: 18.4, soilMoisturePercent: 28, healthScore: 42, geometryGeoJson: null }
];
const trails: GuidanceTrail[] = [
  { id: 'trail-soil-cover', title: 'Cobertura do solo com baixo custo', cropTags: ['milho', 'soja', 'cafe', 'trigo'], regionTags: ['Sertao de Alagoas'], difficulty: 'basic', sourcePublicationIds: [], offlineAvailable: true },
  { id: 'trail-irrigation-check', title: 'Verificar necessidade de irrigacao', cropTags: ['milho', 'soja', 'cafe', 'trigo'], regionTags: ['Sertao de Alagoas'], difficulty: 'basic', sourcePublicationIds: [], offlineAvailable: true }
];
const appliedOperations = new Set<string>();

function sendJson(response: ServerResponse, status: number, data: unknown): void {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(data));
}

async function readBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

async function handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  if (request.method === 'GET' && url.pathname === '/health') return sendJson(response, 200, { status: 'ok', service: 'agra-api', version: '0.1.0-alpha.1' });
  if (request.method === 'GET' && url.pathname === '/api/v1/properties') return sendJson(response, 200, { data: [property] });
  if (request.method === 'GET' && url.pathname === `/api/v1/properties/${property.id}/fields`) return sendJson(response, 200, { data: fields });
  if (request.method === 'GET' && url.pathname === '/api/v1/guidance/trails') return sendJson(response, 200, { data: trails });
  if (request.method === 'POST' && url.pathname === '/api/v1/sync/operations') {
    try {
      const operation = JSON.parse(await readBody(request)) as SyncOperation;
      if (!operation.operationId || !operation.entityId || !operation.entityType || !operation.type) return sendJson(response, 400, { error: 'invalid_operation' });
      const alreadyApplied = appliedOperations.has(operation.operationId);
      appliedOperations.add(operation.operationId);
      const result: SyncResult = { operationId: operation.operationId, status: alreadyApplied ? 'already-applied' : 'accepted', serverTime: new Date().toISOString() };
      return sendJson(response, 202, result);
    } catch {
      return sendJson(response, 400, { error: 'invalid_json' });
    }
  }
  return sendJson(response, 404, { error: 'not_found', requestId: randomUUID() });
}

createServer((request, response) => {
  void handle(request, response).catch(() => sendJson(response, 500, { error: 'internal_error' }));
}).listen(port, () => console.log(`AGRA API listening on http://localhost:${port}`));
