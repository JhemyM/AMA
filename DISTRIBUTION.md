# Distribuição do AGRA

## Mapa de distribuição

| Componente | Primeiro canal | Artefato |
| --- | --- | --- |
| Dashboard | PWA em HTTPS | `dist/web/` |
| API | Servidor Linux ou container | `dist/api/` |
| Android | Google Play Internal Testing | APK/AAB via Capacitor ou Compose |
| Windows desktop | Electron portable | `.exe` |
| Linux desktop | PWA; Electron/Tauri depois | pacote futuro |
| Dados | PostgreSQL + armazenamento de objetos | backup e migrações |

## 1. Gerar os artefatos

No ambiente com Node.js 20+:

```powershell
npm ci
npm run check
npm run build:all
```

Saídas:

- `dist/web/`: arquivos da PWA.
- `dist/server.js` e `dist/domain/`: API compilada pelo TypeScript.

## 2. Publicar a PWA

A PWA deve ser servida por HTTPS ou `localhost` para permitir service worker, localização e câmera.

Opções de hospedagem:

- servidor próprio com Nginx;
- Cloudflare Pages;
- Netlify;
- Vercel;
- GitHub Pages para demonstração estática.

Para produção, configurar:

- domínio próprio;
- HTTPS;
- headers de cache;
- política de conteúdo;
- página de privacidade;
- monitoramento de erros;
- backup dos dados da API separado dos arquivos estáticos.

O servidor deve publicar `dist/web/` como raiz. Não publicar `node_modules`, `.env`, dados de teste ou documentos Embrapa não autorizados.

## 3. Publicar a API

A API Alpha ainda usa memória e não deve ser publicada na internet. Antes disso:

1. Migrar para PostgreSQL.
2. Adicionar autenticação e autorização por propriedade.
3. Configurar armazenamento de objetos.
4. Adicionar limites, logs e monitoramento.
5. Configurar variáveis secretas no ambiente do servidor.
6. Executar migrações do banco.
7. Fazer backup e teste de restauração.

Depois:

```powershell
npm ci --omit=dev
npm start
```

A API deve ficar atrás de HTTPS e de um proxy reverso. O cliente nunca deve receber tokens de satélite ou banco.

## 4. Android

### Primeira opção: Capacitor

Reutilizar a PWA e adicionar apenas os recursos nativos necessários:

- câmera;
- GPS;
- notificações;
- armazenamento local;
- compartilhamento de relatórios.

Fluxo previsto após configurar o projeto Android:

```powershell
npm run build:web
npx cap sync android
npx cap open android
```

Gerar um APK de teste ou AAB para o Google Play Internal Testing. O projeto Android ainda precisa ser criado antes desses comandos funcionarem.

### Segunda opção: Compose

Usar Kotlin/Compose quando o AGRA precisar de uma interface nativa mais profunda, sensores contínuos ou desempenho que a PWA não entregue.

## 5. Executável Windows Electron

```powershell
npm run desktop:win
```

O arquivo será criado em `dist/desktop/AGRA 0.1.0-alpha.1.exe`. Ele abre a PWA local e inicia a API Alpha no processo Electron. A API ainda usa memória nesta fase; os dados do produtor continuam locais.

## 6. Canais do piloto

Para Delmiro Gouveia, começar com distribuição controlada:

1. Link HTTPS da PWA enviado individualmente.
2. Instalação no celular pela opção “Adicionar à tela inicial”.
3. Treinamento de 30 minutos.
4. Grupo de suporte e canal para incidentes.
5. APK interno somente para participantes Android quando disponível.
6. Convites revogáveis e dados de teste separados.

Não iniciar com publicação pública nem cobrança real.

## 7. Atualizações

- PWA: versionar o service worker e manter rollback do build anterior.
- API: usar migrações versionadas e compatibilidade de contratos.
- Android: testar atualização sobre dados offline existentes.
- Conteúdo: versionar trilhas e manter a fonte original.
- Mapas: registrar provedor, data e licença de cada camada.

## Checklist de publicação

- [ ] Build reproduzível.
- [ ] `npm ci` funciona em máquina limpa.
- [ ] `npm run check` aprovado.
- [ ] PWA abre em conexão lenta.
- [ ] Offline e sincronização testados.
- [ ] HTTPS ativo.
- [ ] Backups verificados.
- [ ] Termos, privacidade e consentimento publicados.
- [ ] Licenças e créditos revisados.
- [ ] Dados do piloto anonimizados quando necessário.
- [ ] Rollback preparado.
