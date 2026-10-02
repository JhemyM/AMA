# Monetização do AGRA

## Princípio

O AGRA cobra pelo valor criado pelo próprio produto: organização, automação, recomendações, análises e colaboração. Não cobra pelo simples acesso aos dados do produtor, pela exportação de seus dados ou por uma camada cartográfica aberta.

O modelo deve ser transparente, modular e compatível com uso comercial sem obrigar o AGRA a repassar uma licença externa como se fosse parte do produto.

## Planos

### AGRA Base — gratuito

Inclui o núcleo operacional:

- Cadastro de propriedades, talhões, culturas e atividades.
- Registro offline e sincronização quando houver backend disponível.
- Importação e exportação de GeoJSON/KML.
- Dashboard básico de produção, clima, água e solo.
- Acesso aos próprios dados sem bloqueio artificial.
- Mapa aberto com atribuições necessárias.

### AGRA Inteligência — assinatura

Cobra pelas inovações desenvolvidas pelo AGRA:

- Recomendações explicáveis de irrigação, plantio e manejo.
- Comparação de cenários de produção e custo.
- Alertas derivados de clima, solo, água e histórico.
- Detecção de tendências em imagens fornecidas pelo usuário ou por uma fonte configurada.
- Indicadores de produtividade por hectare, água e insumo.

### AGRA Operação — assinatura por equipe

Cobra pelo ganho operacional:

- Usuários, funções e aprovação por responsável técnico.
- Fluxos de tarefas e evidências de campo.
- Relatórios, auditoria e histórico de decisões.
- Integrações com sensores e equipamentos.
- Painéis de várias propriedades.

### AGRA API — consumo controlado

Cobra por capacidade criada pelo AGRA:

- Integração com ERP, cooperativa ou laboratório.
- Webhooks de eventos.
- Consultas automatizadas e exportações agendadas.
- Limites de uso claros e observáveis.

## Serviços externos

- O AGRA não inclui uma licença paga de mapas ou satélite no preço sem informar claramente.
- O provedor deve ser selecionável por configuração: dados abertos, provedor contratado pelo AGRA ou chave do próprio cliente.
- Quotas, custos de processamento e termos de cada provedor ficam em uma camada separada de infraestrutura.
- Quando um provedor cobrar por uso, o cliente escolhe entre habilitar o serviço, usar sua própria credencial ou permanecer no modo aberto/offline.
- O AGRA nunca deve esconder custo de tile, imagem, API meteorológica, SMS ou armazenamento dentro de uma promessa de plano ilimitado.

## Entitlements

O backend deve controlar recursos por capacidades, não por cópias diferentes do aplicativo:

```text
core.dashboard
core.fields
core.offline
core.data-export
innovation.recommendations
innovation.scenarios
innovation.satellite-analysis
operation.team
operation.audit
integration.api
```

Cada conta recebe um conjunto de capacidades com limite, validade e origem. O cliente funciona com o último estado de capacidades conhecido quando estiver offline e nunca deve apagar dados ao expirar uma assinatura.

## Regras de confiança

- Exportação e exclusão dos dados permanecem disponíveis em qualquer plano.
- O produtor é dono dos registros, fotos, coordenadas e análises inseridos por ele.
- Cancelamento remove recursos pagos, não o acesso aos dados básicos.
- Recomendações pagas mostram origem, versão da regra e nível de confiança.
- Não vender promessa de aumento de produtividade; vender ferramentas e decisões melhor informadas.
- Oferecer período de teste com limites reais e sem cobrança escondida.

## Implementação de cobrança

Criar uma interface `BillingProvider` para manter o núcleo independente do gateway escolhido:

- `createCheckoutSession`
- `getAccountEntitlements`
- `cancelSubscription`
- `recordUsage`
- `handleWebhook`

O gateway de pagamento é uma dependência de infraestrutura, não parte do domínio agrícola. A decisão entre Stripe, Mercado Pago ou outro provedor deve ser feita por país, impostos, taxas, privacidade e disponibilidade, após revisão contratual.
