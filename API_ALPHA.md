# API Alpha do AGRA

A primeira API local implementa o menor corte vertical do workflow. Ela usa dados em memória de propósito: serve para validar contratos e sincronização antes da conexão com PostgreSQL.

## Executar

```powershell
npm install
npm run dev
```

## Endpoints

- `GET /health`
- `GET /api/v1/properties`
- `GET /api/v1/properties/property-santa-clara/fields`
- `GET /api/v1/guidance/trails`
- `POST /api/v1/sync/operations`

A operação de sincronização é idempotente por `operationId`: repetir o mesmo evento retorna `already-applied` e não duplica o efeito.

## Limites Alpha

- Os dados desaparecem ao reiniciar o processo.
- Ainda não há autenticação, PostgreSQL, ingestão Embrapa ou provedor de mapas.
- O servidor não deve ser exposto publicamente.
- Antes da Beta, trocar o repositório em memória por PostgreSQL e adicionar autenticação, autorização, validação de payload e auditoria.
