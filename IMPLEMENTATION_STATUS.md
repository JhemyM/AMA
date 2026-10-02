- Backup local JSON com exportação e importação entre dispositivos.
- Canal de feedback offline com categoria, nota, mensagem e consentimento.
- Cliente nativo Android em Kotlin/Compose preparado em `android-native/`.
# Estado de implementação do AGRA

## Concluído neste corte

- PWA visual responsiva e instalável.
- Cache offline e fila local de operações.
- Modelo inicial de publicações e trilhas Embrapa.
- Roadmap, workflow e critérios Alpha/Beta.
- Catálogo de monetização por capacidades.
- Núcleo TypeScript em `src/domain/models.ts`.
- API Alpha em `src/server.ts`.
- Sincronização idempotente por `operationId`.
- Endpoints de propriedades, talhões e trilhas de manejo.

## Bloqueios conhecidos

- Node.js 20 ou superior não está instalado neste computador.
- A API Alpha usa memória e perde dados ao reiniciar.
- Ainda não existe PostgreSQL, autenticação ou autorização.
- A PWA ainda não consome os endpoints da API.
- A troca entre dispositivos ainda depende de backup manual quando não há servidor.
- APK debug compilado com SDK 35 e OpenJDK 21.
- Executável Windows portable compilado com Electron em `dist/desktop/`.
- O mapa real e a ingestão Embrapa ainda dependem de fontes e licenças configuradas.

## Próxima sessão de implementação

1. Instalar Node.js 20+ e npm.
2. Executar `npm install` e `npm run check`.
3. Executar `npm run dev` e testar `GET /health`.
4. Adicionar PostgreSQL e migrações do esquema.
5. Mover a fila local para sincronização real com retry.
6. Conectar o dashboard aos endpoints sem perder o fallback offline.
7. Criar o primeiro fluxo de cadastro de propriedade e talhão.
8. Testar com dados fictícios antes de importar qualquer propriedade real.
