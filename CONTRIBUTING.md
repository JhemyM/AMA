# Guia de Contribuição - AGRA

Obrigado pelo seu interesse em contribuir com o **AGRA** (Aplicativo de Gestão Rural e Agrícola). Acreditamos que a tecnologia para a agricultura familiar deve ser construída de forma aberta e acessível.

## 🛠 Como Contribuir

1. **Relate Problemas (Issues):** Se você encontrou algum bug ou tem sugestões de melhorias de UI/UX, crie uma *Issue*. Forneça detalhes sobre seu dispositivo e versão do navegador, pois o AGRA foca fortemente em PWA e mobile.
2. **Pull Requests:** Sinta-se livre para corrigir problemas reportados ou criar novas funcionalidades.
3. **Manuais Técnicos:** Uma das nossas grandes forças é o catálogo integrado da Embrapa. Você pode ajudar sugerindo novos manuais ou métodos agronômicos atualizados.

## 📦 Estrutura do Código

- `index.html`: Shell principal da PWA. Toda a renderização do Dashboard fica aqui e em `app.js`.
- `modules/`: Contém arquivos JS e HTML fragmentados para cada tela (Ex: `tasks.js`, `embrapa.js`, `fields.js`).
- `sw.js`: Service Worker que controla toda a interceptação de cache offline e gerenciamento de PWA. Ao atualizar a lógica, lembre-se de incrementar a versão do `CACHE_NAME`.
- `styles-base.css` / `styles.css`: Classes visuais do projeto. Preferimos manter vanilla CSS pela flexibilidade do projeto e portabilidade.
- `.github/workflows`: Actions que cuidam da integração contínua (ex: compilação automática do APK via Gradle e empacotamento da Web).

## ✅ Regras do Repositório

1. **Offline-first é Lei:** Nenhuma feature deve quebrar caso o usuário perca acesso à internet repentinamente. Use `localStorage`, IndexedDB ou Cache API.
2. **Compatibilidade Móvel:** Sempre verifique seu design no DevTools (Visualização mobile) ou instale o APK compilado no seu aparelho Android antes de solicitar um PR.
3. **Padrão de Código:** Utilize Javascript nativo (`vanilla JS`) em módulos com baixo acoplamento para o front-end, mantendo a performance crua e alta estabilidade de compatibilidade no Service Worker.

Siga sempre as [Diretrizes de Arquitetura](ARCHITECTURE.md) existentes.
