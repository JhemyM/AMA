# Arquitetura multiplataforma do AGRA

## Direção recomendada

O AGRA deve ser **offline-first**, sincronizado por uma API única e com uma experiência visual comum. A interface pode ser adaptada a cada plataforma sem duplicar regras de negócio.

## Motor de inteligência sustentável

As recomendações devem ser produzidas por regras rastreáveis e, depois, por modelos estatísticos ou de aprendizado de máquina quando houver histórico suficiente. O sistema não deve apresentar uma previsão como verdade nem substituir um agrônomo.

### Entradas

- Geografia: coordenadas, altitude, declividade, tipo de terreno e zonas de manejo.
- Clima: temperatura, chuva observada e prevista, vento, umidade e evapotranspiração.
- Solo: pH, textura, matéria orgânica, umidade, nutrientes e data da coleta.
- Água: fonte, vazão, qualidade, disponibilidade, outorga e eficiência da irrigação.
- Produção: cultura, cultivar, estágio, histórico de produtividade e objetivo da safra.
- Operação: máquinas, estoque de insumos, custos, mão de obra e restrições ambientais.

### Saídas

- Janela recomendada para plantio, irrigação e aplicação, com justificativa.
- Necessidade estimada de água e alerta de desperdício.
- Diagnóstico de desequilíbrio do solo e sugestão de análise complementar.
- Plano de adubação por talhão, sempre como recomendação técnica configurável.
- Alertas de erosão, compactação, geada, seca, chuva intensa e risco fitossanitário.
- Indicadores de produtividade por recurso: toneladas por hectare, água e insumo.

### Regras de sustentabilidade e segurança

- Priorizar correção de manejo, cobertura do solo, rotação e uso eficiente da água antes de sugerir mais insumo.
- Nunca recomendar dose ou aplicação sem informar fonte, unidade, intervalo e dados que sustentam a decisão.
- Bloquear recomendações quando os dados estiverem vencidos, conflitantes ou abaixo do nível mínimo de confiança.
- Registrar versão da regra, entradas, resultado aceito pelo produtor e resultado observado.
- Permitir revisão, comentário e aprovação por agrônomo ou responsável técnico.
- Mostrar impacto financeiro e ambiental estimado, sem esconder incerteza.

## Assistente de conhecimento

O motor de recomendações deve recuperar primeiro fontes técnicas autorizadas da Embrapa e de instituições complementares, filtrando por cultura, região, solo, clima e estágio da produção. O resultado não é uma cópia do manual: é uma trilha de manejo curta, com passos, materiais, cuidados, acompanhamento e citações.

O pipeline deve separar quatro etapas:

1. `retrieve`: encontra publicações e trechos compatíveis.
2. `verify`: confere licença, data, região, cultura e validade técnica.
3. `adapt`: transforma o conteúdo em linguagem simples, unidades locais e passos executáveis.
4. `guide`: acompanha a execução offline e registra evidências sem esconder incerteza.

Cada resposta deve preservar fonte, edição, página quando permitida, versão da regra e dados da propriedade usados. A camada de IA pode resumir e localizar conteúdo, mas não pode inventar dose, substituir receituário ou fazer diagnóstico definitivo a partir de foto.

## Mapas acurados e satélite

O mapa precisa separar três camadas, com fontes e níveis de confiança visíveis:

1. **Base cartográfica:** estradas, rios, relevo e limites, preferencialmente OpenStreetMap ou uma fonte institucional.
2. **Limites da propriedade:** polígonos GeoJSON/KML obtidos do cadastro, levantamento GNSS/GPS, drone ou desenho revisado pelo produtor.
3. **Observação por satélite:** imagens Sentinel-2 via Copernicus/Sentinel Hub ou outro provedor configurado, com data, resolução, cobertura de nuvens e licença registrados.

O cliente deve usar um adaptador de provedor, e não chamadas espalhadas pela interface. A configuração deve permitir trocar entre OSM, um provedor de satélite e uma fonte institucional sem alterar os módulos de produção ou solo. Sem conexão, o aplicativo mostra o último tile e os últimos polígonos baixados, identificando a data da imagem.

### Requisitos de precisão

- Armazenar geometrias em WGS84 (`EPSG:4326`) e calcular áreas em uma projeção métrica adequada à região.
- Validar polígonos inválidos, sobreposições, talhões fora da propriedade e alterações de limite.
- Exibir data de aquisição, resolução, nuvens e fonte em toda análise derivada de imagem.
- Nunca inferir limite de talhão apenas pela cor de uma imagem; exigir confirmação ou dado cadastral.
- Usar índices como NDVI/NDWI como evidência de tendência, não como diagnóstico agronômico isolado.
- Proteger coordenadas da propriedade e aplicar controle de acesso por organização.

## Serviços abertos sem perder o produto comercial

É possível usar dados e bibliotecas abertas em um aplicativo comercial. A licença do AGRA deve permanecer separada das licenças dos componentes externos, com um inventário mantido no repositório.

### Política recomendada

- Preferir bibliotecas `MIT`, `BSD-2-Clause`, `BSD-3-Clause` ou `Apache-2.0` para o código do cliente e do servidor.
- Usar OpenStreetMap como dado com atribuição obrigatória e respeitar a licença ODbL. Não depender dos tiles públicos de `tile.openstreetmap.org` em produção; escolher um provedor compatível ou hospedar tiles próprios.
- Usar dados Sentinel/Copernicus ou Landsat quando a fonte e o produto permitirem uso comercial, sempre mantendo atribuição, data, resolução e termos da fonte.
- Separar imagens, tiles e índices derivados dos dados proprietários do produtor; cada ativo deve carregar sua origem e licença.
- Evitar dependências GPL/AGPL sem uma revisão jurídica específica. AGPL pode criar obrigações adicionais quando um serviço modificado é oferecido pela rede.
- Nunca colocar tokens de provedores no frontend. O backend deve intermediar chamadas, aplicar limites, registrar consumo e permitir trocar de fornecedor.
- Manter uma camada `MapProvider` e uma camada `SatelliteProvider`, com implementações substituíveis e fallback para o último dado armazenado.
- Incluir uma página de créditos e atribuições dentro do app e uma lista `THIRD-PARTY-NOTICES` na distribuição.

### Opções com menor risco de lock-in

| Necessidade | Opção inicial | Observação comercial |
| --- | --- | --- |
| Renderização de mapa | MapLibre GL JS ou Leaflet | Bibliotecas permissivas; o provedor de tiles tem termos separados |
| Dados cartográficos | OpenStreetMap | ODbL e atribuição; evitar uso pesado dos servidores públicos |
| Imagens de satélite | Copernicus/Sentinel-2 ou Landsat | Dados abertos não significam API ilimitada; armazenar metadados e respeitar quotas |
| Banco geográfico | PostgreSQL + PostGIS | PostgreSQL é permissivo; revisar a licença do componente geográfico usado |
| Processamento espacial | Turf.js e proj4js | Licenças permissivas; validar versão e avisos na atualização |

O retorno monetário vem do valor agregado do AGRA: organização operacional, histórico, recomendações explicáveis, alertas, relatórios, suporte e integrações. O uso de dados abertos não impede cobrança pelo produto, desde que as condições das fontes sejam cumpridas e o AGRA não revenda um serviço de terceiros como se fosse próprio.

```text
                 API AGRA / TypeScript
                 PostgreSQL + armazenamento de mídia
                              |
          +-------------------+-------------------+
          |                   |                   |
      Android             Linux/Web
      Compose             PWA responsiva
      API HTTPS           IndexedDB
```

## Núcleo compartilhado

Criar um pacote TypeScript compartilhado com:

- `Farm`, `Field`, `Crop`, `Harvest`, `SoilAnalysis`, `WeatherSnapshot` e `Activity`.
- Validações, regras de status, cálculo de indicadores e sincronização.
- Codificação `Codable` para os contratos da API.
- Testes unitários independentes de interface.

Esse pacote será usado pela PWA, pelo backend e, quando necessário, pelo cliente Android via API. O compartilhamento fica em modelos, validações, regras de negócio e contratos, sem acoplar a interface a uma plataforma.

## Backend Linux

Usar Node.js com TypeScript no servidor Linux para manter o mesmo vocabulário do domínio:

- REST ou GraphQL com versionamento `/api/v1`.
- Autenticação por usuário e propriedade.
- PostgreSQL para dados transacionais.
- Armazenamento de fotos e documentos fora do banco.
- Jobs para previsão do tempo, alertas e consolidação de produção.

## Experiência seamless

Seamless não significa que todos os dispositivos devem executar a mesma UI. Significa que o usuário encontra os mesmos dados, estados e ações em qualquer dispositivo.

### Requisitos técnicos

- Identificador global estável para cada entidade, preferencialmente UUID.
- `updatedAt`, `deletedAt`, `version` e `lastSyncedAt` em registros sincronizáveis.
- Fila local de operações para funcionamento sem conexão.
- Sincronização incremental por cursor ou timestamp.
- Política explícita de conflito: edição de campo vence por versão; lançamentos de produção são eventos imutáveis.
- Cache local no Android; IndexedDB para a PWA em Linux e Windows.
- Datas em UTC no backend e exibição no fuso da propriedade.
- Telemetria de falhas de sincronização sem armazenar dados sensíveis desnecessários.

## Captura em campo

O dispositivo do produtor deve ser tratado como uma fonte de dados, não como a única fonte:

- Câmera do celular para fotos de folhas, pragas, erosão, equipamentos e comprovantes.
- GPS do celular para registrar posição, trilhas, pontos de coleta e novos talhões.
- Sensores externos de umidade, clima, água e qualidade do solo por Bluetooth, Wi-Fi, USB ou gateway local.
- Importação de CSV, planilhas e leituras de estações existentes quando não houver integração direta.
- Cada leitura deve guardar dispositivo, precisão, unidade, horário, localização e qualidade do sinal.

No modo sem rede, fotos e leituras entram na fila local. A sincronização posterior deve preservar o arquivo original, evitar duplicação por um identificador idempotente e sinalizar leituras fora da faixa esperada para revisão.

## Identidade visual acessível

- Contraste suficiente entre texto, fundo e estados de risco; cor nunca é o único indicador.
- Tipografia legível, áreas de toque amplas e fluxo possível por teclado.
- Rótulos claros, foco visível, suporte a leitor de tela e alternativa textual para gráficos.
- Interface reduzida para o campo: uma ação principal por tela, linguagem direta e feedback persistente.
- Respeito a `prefers-reduced-motion` e funcionamento em telas pequenas, sob sol e com conectividade limitada.

## Decisão de clientes

| Plataforma | Tecnologia | Papel |
| --- | --- | --- |
| Android | Kotlin + Jetpack Compose ou Capacitor | Cliente móvel com integração de sensores e notificações |
| Linux | PWA atual ou futura aplicação Tauri | Cliente operacional leve, instalável e atualizável |
| Servidor | Node.js + TypeScript | API, autenticação, sincronização e tarefas agendadas |

A prioridade é uma única base web progressiva, com um cliente Android opcional quando houver necessidade de recursos nativos. Isso reduz instalações, mantém a experiência consistente e funciona no Windows, Linux e Android.

## Ordem de implementação

1. Fixar os contratos de domínio e da API.
2. Criar o pacote TypeScript com modelos, validações e testes.
3. Criar a API Node.js com autenticação, propriedades, talhões e atividades.
4. Adicionar persistência local, instalação PWA e sincronização offline.
5. Conectar a PWA existente ao endpoint real.
6. Criar o cliente Android quando os contratos estiverem estáveis.
7. Adicionar sensores, clima, alertas e relatórios depois do fluxo operacional básico.

## Escopo inicial de dados

- Propriedade: nome, localização, área total e fuso horário.
- Talhão: geometria, área, cultura, safra e status.
- Produção: cultura, quantidade, unidade, data e talhão.
- Solo: pH, umidade, matéria orgânica, nutrientes, coleta e laboratório.
- Clima: temperatura, chuva, vento, umidade e fonte da leitura.
- Atividade: tipo, responsável, talhão, prazo, status e evidências.
- Recomendação: tipo, talhão, entradas, regra, confiança, impacto, validade, decisão do produtor e resultado.

