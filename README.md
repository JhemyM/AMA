# AGRA

### Aplicativo de Gestão Rural e Agrícola

O **AGRA** é uma plataforma de gestão e inteligência para propriedades rurais. Ele transforma dados de produção, solo, água, clima, geografia e conhecimento técnico em decisões práticas para produzir melhor, gastar menos e preservar os recursos naturais.

> **Do dado no campo à decisão de manejo.**

## Visão de produto

O produtor não precisa de mais um painel cheio de números. Precisa saber:

- o que está acontecendo em cada talhão;
- qual ação merece atenção agora;
- por que essa ação foi sugerida;
- quanto ela pode custar ou economizar;
- como executar e registrar o resultado;
- quando é necessário chamar um técnico.

O AGRA organiza esse ciclo em uma experiência simples, acessível e funcional mesmo com conectividade limitada.

## O problema econômico

Na agricultura familiar e em operações rurais menores, decisões importantes ainda ficam espalhadas em cadernos, mensagens, planilhas, memória da equipe e orientação difícil de consultar. Isso aumenta o risco de:

- desperdício de água e insumos;
- aplicação fora da janela adequada;
- perda de produtividade por falta de acompanhamento;
- decisões sem histórico ou evidência;
- dependência de conectividade e ferramentas pouco adaptadas ao campo.

O custo não é apenas financeiro: manejo inadequado reduz a resiliência do solo, pressiona a água e dificulta a continuidade da propriedade.

## Proposta de valor

O AGRA combina cinco capacidades em um produto único:

1. **Gestão operacional:** propriedades, talhões, culturas, safras, tarefas e produção.
2. **Inteligência agronômica assistida:** recomendações explicáveis, com fonte, confiança e limites.
3. **Conhecimento aplicado:** manuais autorizados e trilhas passo a passo para o agricultor familiar.
4. **Leitura territorial:** mapas reais, clima, solo, água e imagens de satélite quando configuradas.
5. **Continuidade no campo:** PWA instalável, Android, operação offline e sincronização segura.

## Clientes iniciais

### Agricultor familiar

Precisa de orientação clara, baixo custo, funcionamento offline e registro simples de atividades, fotos e medições.

### Técnico e extensão rural

Precisa acompanhar propriedades, revisar recomendações, orientar equipes e transformar conhecimento em trilhas reutilizáveis.

### Cooperativas e associações

Precisam de visão agregada sem retirar a autonomia do produtor, com indicadores de produção, sustentabilidade e assistência.

### Pequenas e médias operações

Precisam reduzir desperdícios, organizar equipes e tomar decisões com histórico sem adotar um ERP complexo.

## Diferenciais defensáveis

- Recomendações conectadas a evidências e fontes técnicas, não apenas a texto gerado.
- Conhecimento convertido em ações de campo, com acompanhamento do resultado.
- Arquitetura offline-first para regiões com conectividade irregular.
- Dados de propriedade preservados, exportáveis e controlados pelo produtor.
- Camada de provedores substituíveis para mapas, satélite, clima e sensores.
- Sustentabilidade medida por recursos usados, produtividade e evolução do solo.
- Produto modular: começa simples e cresce conforme o produtor comprova valor.

## Modelo de negócio

O núcleo operacional é gratuito ou acessível. A receita vem das capacidades que geram valor adicional:

| Oferta | Valor entregue | Modelo sugerido |
| --- | --- | --- |
| AGRA Base | Cadastro, operação offline, dashboard e exportação | Gratuito |
| AGRA Inteligência | Recomendações, cenários, alertas e análises | Assinatura |
| AGRA Operação | Equipe, aprovação técnica, auditoria e múltiplas propriedades | Assinatura por organização |
| AGRA API | Integrações com cooperativas, ERPs, laboratórios e sensores | Uso/contrato |
| Serviços profissionais | Implantação, configuração, treinamento e revisão técnica | Projeto ou pacote |

O produtor nunca perde acesso aos próprios dados por cancelar uma assinatura. Custos de serviços externos ficam explícitos, opcionais e desacoplados do valor criado pelo AGRA. Detalhes em [MONETIZATION.md](MONETIZATION.md).

## Produto e tecnologia

- **PWA:** acesso imediato em Linux, Windows e navegadores móveis.
- **Android:** cliente instalável quando recursos nativos forem necessários.
- **Backend:** TypeScript, API versionada e sincronização idempotente.
- **Dados:** PostgreSQL, armazenamento de objetos e histórico de operações.
- **Mapas:** GeoJSON/KML/GPS, base cartográfica configurável e satélite com metadados.
- **Conhecimento:** catálogo Embrapa autorizado, trilhas, citações e busca.
- **Offline:** cache do app, fila local, retry e resolução explícita de conflitos.

O mapa da tela atual ainda é demonstrativo. Limites e imagens reais só serão exibidos após importação ou configuração de fontes oficiais. Veja [ARCHITECTURE.md](ARCHITECTURE.md).

## Estado atual

Já existe uma fundação visual responsiva com dashboard de produção, clima, talhões, água e atividades, além de PWA, cache offline, fila local, catálogo de monetização, esquema de banco e API Alpha em memória.

O próximo corte conecta a PWA à API, troca o armazenamento em memória por PostgreSQL e inicia o primeiro conjunto de trilhas de manejo autorizadas.

## Roadmap comercial

1. **Fundação:** contratos, persistência, sincronização, segurança e dados de teste.
2. **MVP operacional:** propriedade, talhões, atividades, solo, água e exportação.
3. **Biblioteca guiada:** catálogo Embrapa, trilhas revisadas e uso offline.
4. **Inteligência:** recomendações explicáveis e indicadores de sustentabilidade.
5. **Alpha fechada:** 5 a 15 propriedades de uma região e poucas culturas.
6. **Beta controlada:** 30 a 100 propriedades, Android, mapas reais e planos em teste.

Critérios completos em [ROADMAP.md](ROADMAP.md), [WORKFLOW.md](WORKFLOW.md) e [ALPHA_BETA.md](ALPHA_BETA.md).

## Métricas de negócio e impacto

- tempo até o primeiro talhão cadastrado;
- atividades registradas offline e sincronizadas sem duplicação;
- trilhas iniciadas e concluídas;
- recomendações aceitas, editadas ou recusadas;
- economia estimada de água e insumos;
- retenção de propriedades ativas;
- custo de infraestrutura por propriedade;
- receita recorrente por organização;
- incidentes de privacidade, licença ou segurança.

As métricas de economia e produtividade serão apresentadas como estimativas até serem confirmadas por dados de campo.

## Executar localmente

### Dashboard PWA

Abra `index.html` diretamente para uma visualização rápida. Para ativar PWA e cache offline:

```powershell
python -m http.server 8080
```

Acesse `http://localhost:8080`.

### API Alpha

Requer Node.js 20 ou superior:

```powershell
npm install
npm run check
npm run dev
```

Detalhes dos endpoints em [API_ALPHA.md](API_ALPHA.md). A API atual usa memória e não deve ser exposta publicamente.

## Documentação

- [Arquitetura](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Workflow](WORKFLOW.md)
- [Preparação Alpha/Beta](ALPHA_BETA.md)
- [Conhecimento e trilhas de manejo](KNOWLEDGE_GUIDANCE.md)
- [Plano de dados Embrapa](EMBRAPA_DATA_PLAN.md)
- [Monetização](MONETIZATION.md)
- [Estado de implementação](IMPLEMENTATION_STATUS.md)
