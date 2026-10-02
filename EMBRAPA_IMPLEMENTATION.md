# Implementação do acervo Embrapa

## Primeiro comando

O importador não faz scraping indiscriminado. Ele recebe um catálogo obtido de uma fonte oficial ou exportação autorizada, normaliza os metadados e registra a licença antes de qualquer arquivo ser baixado.

```powershell
npm run embrapa:normalize
npm run embrapa:download
```

O exemplo em `data/embrapa/catalog.example.json` é apenas um contrato de entrada e não contém um manual real.

## Formato do catálogo

Cada registro deve conter, no mínimo:

- `repository`
- `externalId`
- `title`
- `officialUrl`
- `rightsStatus`

Para baixar um documento, o registro também precisa conter `fileUrl` e `rightsStatus: "download-permitted"`. Qualquer outro status é ignorado pelo comando de download.

## Organização dos arquivos

```text
data/embrapa/
  catalog.example.json       contrato de entrada
  catalog.normalized.json    saída normalizada, ignorada pelo Git
  documents/                  PDFs autorizados, ignorados pelo Git
```

## Próxima etapa

1. Criar um adaptador específico para Infoteca-e/Alice/BDPA conforme os endpoints e termos permitirem.
2. Exportar apenas metadados e licenças verificadas.
3. Rodar normalização e deduplicação.
4. Revisar uma amostra por técnico.
5. Baixar somente documentos autorizados.
6. Extrair texto, páginas e tags para as trilhas de manejo.
7. Publicar citações e links originais no AGRA.
