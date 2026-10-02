-- Catalogo de publicacoes tecnicas da Embrapa para o AGRA.
-- O banco guarda metadados por padrao; o arquivo integral depende da licenca.

CREATE TABLE source_repositories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    base_url TEXT NOT NULL,
    terms_url TEXT,
    attribution TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE publications (
    id UUID PRIMARY KEY,
    repository_id BIGINT NOT NULL REFERENCES source_repositories(id),
    external_id TEXT,
    title TEXT NOT NULL,
    abstract TEXT,
    publication_type TEXT,
    language_code TEXT,
    publication_year SMALLINT,
    authors JSONB NOT NULL DEFAULT '[]'::jsonb,
    keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
    unit_name TEXT,
    official_url TEXT NOT NULL,
    persistent_url TEXT,
    license_name TEXT,
    license_url TEXT,
    rights_status TEXT NOT NULL DEFAULT 'unknown'
        CHECK (rights_status IN ('unknown', 'metadata-only', 'download-permitted', 'permission-required', 'restricted')),
    collected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (repository_id, external_id)
);

CREATE TABLE publication_files (
    id UUID PRIMARY KEY,
    publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    format TEXT NOT NULL CHECK (format IN ('pdf', 'epub', 'html', 'other')),
    source_url TEXT NOT NULL,
    storage_key TEXT,
    byte_size BIGINT,
    sha256 TEXT,
    page_count INTEGER,
    download_status TEXT NOT NULL DEFAULT 'not-requested'
        CHECK (download_status IN ('not-requested', 'queued', 'downloaded', 'blocked', 'failed')),
    rights_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_chunks (
    id UUID PRIMARY KEY,
    publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    file_id UUID REFERENCES publication_files(id) ON DELETE SET NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    page_start INTEGER,
    page_end INTEGER,
    crop_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    region_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    topic_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    -- JSON mantem o esquema portatil; migrar para pgvector em producao se necessario.
    embedding JSONB,
    UNIQUE (publication_id, chunk_index)
);

CREATE INDEX publications_type_year_idx ON publications (publication_type, publication_year);
CREATE INDEX publications_rights_idx ON publications (rights_status);
CREATE INDEX publications_keywords_idx ON publications USING GIN (keywords);
CREATE INDEX knowledge_chunks_tags_idx ON knowledge_chunks USING GIN (topic_tags);
-- Em producao com pgvector, migrar embedding para VECTOR(1536) e ativar:
-- CREATE EXTENSION IF NOT EXISTS vector;
-- CREATE INDEX knowledge_chunks_embedding_idx ON knowledge_chunks USING hnsw (embedding vector_cosine_ops);

CREATE TABLE guidance_trails (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    audience TEXT NOT NULL DEFAULT 'family-farmer',
    crop_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    region_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    difficulty TEXT NOT NULL DEFAULT 'basic'
        CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
    sustainability_focus JSONB NOT NULL DEFAULT '[]'::jsonb,
    license_status TEXT NOT NULL DEFAULT 'internal-review'
        CHECK (license_status IN ('internal-review', 'source-permitted', 'original-agra')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE guidance_steps (
    id UUID PRIMARY KEY,
    trail_id UUID NOT NULL REFERENCES guidance_trails(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    phase TEXT NOT NULL CHECK (phase IN ('understand', 'prepare', 'do', 'care', 'monitor', 'record')),
    title TEXT NOT NULL,
    instructions TEXT NOT NULL,
    materials JSONB NOT NULL DEFAULT '[]'::jsonb,
    safety_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
    media_url TEXT,
    UNIQUE (trail_id, step_order)
);

CREATE TABLE guidance_sources (
    trail_id UUID NOT NULL REFERENCES guidance_trails(id) ON DELETE CASCADE,
    publication_id UUID NOT NULL REFERENCES publications(id),
    source_excerpt TEXT,
    page_start INTEGER,
    page_end INTEGER,
    citation TEXT NOT NULL,
    PRIMARY KEY (trail_id, publication_id)
);
