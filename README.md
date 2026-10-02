# AGRA

**AGRA** significa **Aplicativo de Gestão Rural e Agrícola**: um assistente inteligente para administrar propriedades rurais com produtividade e sustentabilidade.

## O que já existe

- Dashboard responsivo em português.
- Indicadores de produção, área cultivada, umidade do solo e atividades pendentes.
- Resumo de produção por cultura.
- Condições climáticas atuais e previsão curta.
- Saúde dos talhões com índice visual.
- Lista de atividades próximas.
- Navegação preparada para os módulos de produção, talhões, solo, clima, atividades, estoque e equipe.
- Interações locais para navegação, seletor de propriedade e registro de atividade.

## Propósito do produto

O AGRA ajuda produtores a decidir **o que fazer, quando fazer e por quê**, cruzando geografia da propriedade, previsão do tempo, qualidade do solo, disponibilidade de água, cultura plantada e histórico de produção. A proposta é reduzir desperdícios e melhorar o resultado sem tratar fertilizantes, irrigação ou defensivos como respostas automáticas.

O produto também transforma conhecimento técnico autorizado em **trilhas de manejo** para a agricultura familiar: entender o problema, preparar materiais, executar em passos simples, acompanhar o resultado e registrar o que foi feito. A especificação está em [KNOWLEDGE_GUIDANCE.md](KNOWLEDGE_GUIDANCE.md).

As recomendações devem sempre mostrar os dados usados, o nível de confiança, o impacto esperado e a alternativa de não agir. Doses e aplicações precisam respeitar legislação, receituário agronômico e validação de um responsável técnico.

O AGRA pode usar bibliotecas e dados abertos comercialmente, desde que mantenha atribuições, respeite quotas e não dependa de endpoints públicos para operação crítica. A política de licenças e fornecedores está em [ARCHITECTURE.md](ARCHITECTURE.md).

## Monetização

O modelo será gratuito no núcleo operacional e pago apenas nas inovações do AGRA: recomendações explicáveis, cenários, análises de satélite, automações, colaboração, auditoria e API. O produtor mantém acesso e exportação dos próprios dados em qualquer plano.

Os serviços externos ficam desacoplados e opcionais. O cliente poderá usar dados abertos, informar sua própria credencial ou contratar uma integração específica. Detalhes de planos, capacidades e cobrança estão em [MONETIZATION.md](MONETIZATION.md).

## Direção multiplataforma

O objetivo é manter os mesmos dados e fluxos no Android e Linux, com uma interface adequada a cada dispositivo. A arquitetura recomendada é:

- TypeScript para o núcleo de domínio e contratos compartilhados.
- Backend multiplataforma em TypeScript, com API e sincronização.
- Kotlin + Jetpack Compose ou Capacitor para o cliente Android.
- PWA responsiva, a partir desta base, para Linux e acesso rápido em qualquer navegador.
- Funcionamento offline com fila de operações e sincronização incremental.
- Motor de recomendações explicáveis para irrigação, adubação, janela de plantio e alertas de risco.
- Mapas operacionais baseados em coordenadas reais, com imagens de satélite quando houver fonte configurada.

O mapa atualmente exibido no dashboard é uma visualização demonstrativa. Ele não representa limites reais de propriedade até que sejam importados um GeoJSON/KML ou coordenadas levantadas no campo.

O projeto detalhado está em [ARCHITECTURE.md](ARCHITECTURE.md). A prioridade passa a ser uma base web instalável e um cliente Android com os mesmos contratos e dados.

O plano de catálogo e tamanho do acervo técnico da Embrapa está em [EMBRAPA_DATA_PLAN.md](EMBRAPA_DATA_PLAN.md), com o esquema inicial em [database/embrapa_schema.sql](database/embrapa_schema.sql). A ingestão começa por metadados e só baixa documentos quando a licença permitir.

O plano de execução está em [ROADMAP.md](ROADMAP.md), o fluxo operacional em [WORKFLOW.md](WORKFLOW.md) e os critérios de liberação em [ALPHA_BETA.md](ALPHA_BETA.md).

O primeiro corte vertical da API está em [API_ALPHA.md](API_ALPHA.md), com contratos TypeScript em `src/domain` e execução via `npm run dev`.

## Executar

Para uma visualização rápida, abra `index.html` diretamente no navegador.

Para ativar a instalação como PWA e o cache offline, execute na pasta `AMA`:

```powershell
python -m http.server 8080
```

Depois acesse `http://localhost:8080`. O service worker só pode ser registrado em `localhost` ou HTTPS, como medida de segurança do navegador.

## Resiliência atual

- O estado local e as atividades pendentes são preservados no navegador.
- O indicador informa quando a aplicação está offline.
- O service worker mantém o shell do app disponível sem rede após o primeiro acesso.
- Operações registradas offline entram em uma fila local para futura sincronização com a API.
- O próximo passo é implementar o consumidor dessa fila, com retry, idempotência e resolução de conflitos no backend.

## Próximos passos sugeridos

1. Definir os contratos de domínio e API descritos em [ARCHITECTURE.md](ARCHITECTURE.md).
2. Criar o pacote TypeScript compartilhado com modelos, validações e testes.
3. Criar a API Node.js com autenticação por propriedade e usuário.
4. Substituir os dados demonstrativos por consultas reais na PWA.
5. Transformar a PWA em aplicativo instalável com cache, IndexedDB e sincronização.
6. Adicionar o cliente Android depois que os contratos estiverem estáveis.
