# Build e distribuição multiplataforma

## Princípio

O AGRA não precisa de um único executável idêntico em todas as plataformas. Ele precisa de contratos, dados e operações compatíveis em todos os clientes.

| Alvo | Artefato | Ferramenta | Estado |
| --- | --- | --- | --- |
| Linux/Windows/navegador | PWA estática | `npm run build:web` | preparado |
| Linux/Windows servidor | API Node compilada | `npm run build:api` | Alpha |
| Android | APK/AAB | Capacitor ou cliente Compose | preparar depois da API |
| Linux desktop | pacote Tauri opcional | Tauri | depois da PWA validada |
| Sincronização | API HTTPS + outbox | TypeScript | contrato preparado |

## Build atual

Requisitos: Node.js 20+ e npm.

```powershell
npm install
npm run check
npm run build:all
```

Saídas:

- `dist/api/`: JavaScript e declarações da API.
- `dist/web/`: shell instalável da PWA.

Para iniciar a API compilada:

```powershell
npm start
```

Para testar a PWA compilada:

```powershell
python -m http.server 8080 --directory dist/web
```

## Comunicação universal

Todos os clientes usam os mesmos conceitos:

- entidades com UUID;
- datas em UTC;
- operações com `operationId` idempotente;
- versões e `lastSyncedAt`;
- fila local de saída;
- retry com backoff;
- conflitos explícitos;
- nenhuma perda ou exclusão local ao ficar offline.

O protocolo está em [SYNC_PROTOCOL.md](SYNC_PROTOCOL.md).

## Android e desktop

O build Android não deve ser iniciado antes de a API, autenticação e sincronização estarem estáveis. A primeira distribuição móvel pode usar Capacitor para reaproveitar a PWA; um cliente Compose só vale o custo quando câmera, GPS, sensores, notificações ou desempenho exigirem uma camada nativa.
