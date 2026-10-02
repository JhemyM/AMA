# Preparação Alpha e Beta do AGRA

## Pacote mínimo da Alpha

### Produto

- PWA instalável em Android, Linux e Windows.
- Piloto definido para Delmiro Gouveia, no Sertão de Alagoas.
- Dashboard com propriedade, talhões, produção, solo, água e clima.
- Cadastro e importação de limites reais.
- Registro offline de atividade, foto, GPS e medição.
- Fila de sincronização com indicação de pendências.
- Biblioteca com pelo menos 10 trilhas revisadas para uma região.
- Fonte, data e limitações visíveis em cada trilha.

### Operação

- Backup diário.
- Ambiente de desenvolvimento, homologação e produção separados.
- Logs de erro e sincronização.
- Exportação de dados por propriedade.
- Canal de suporte e formulário de feedback.
- Termos de uso, privacidade e consentimento.

### Qualidade

- Testes de unidade para regras de recomendação.
- Testes de integração para ingestão e sincronização.
- Teste de instalação PWA.
- Teste offline com fechamento e reabertura.
- Teste de acessibilidade com teclado, foco, contraste e leitor de tela.
- Teste em Android de entrada, médio e antigo.

## Critérios de entrada da Alpha

- Modelo de dados versionado.
- Nenhuma credencial real no repositório.
- Conteúdo da Embrapa com licença ou autorização registrada.
- Pelo menos uma pessoa técnica revisando cada trilha.
- Plano de restauração testado.
- Dados de teste separados de propriedades reais.

## Critérios de saída da Alpha

- 80% dos participantes concluem o cadastro inicial.
- 80% conseguem registrar uma atividade offline.
- Nenhuma duplicação de evento após sincronização repetida.
- Toda recomendação usada no teste tem fonte e justificativa.
- Falhas críticas de segurança, perda de dados ou recomendação insegura: zero abertas.
- Feedback qualitativo coletado de produtor e técnico.

## Pacote mínimo da Beta

- Android empacotado ou cliente Capacitor.
- Login, recuperação de conta e controle de organização.
- Equipe e permissões.
- Importação de GeoJSON/KML e mapa real.
- Pelo menos um provedor cartográfico e um provedor de satélite configuráveis.
- Biblioteca ampliada com filtros por cultura e região.
- Entitlements do `monetization.json` aplicados no backend.
- Assinatura em modo teste, sem cobrança irreversível.
- Métricas de uso, custo por provedor e falhas de sincronização.

## Critérios de saída da Beta

- Quatro semanas sem perda de dados em produção controlada.
- 95% das operações sincronizadas sem intervenção.
- Tempo de abertura aceitável em conexão lenta.
- Exportação e exclusão de dados verificadas.
- Custos de mapas, satélite, armazenamento e mensagens conhecidos.
- Licenças, créditos e contratos de fornecedores revisados.
- Processo de suporte e resposta a incidente testado.

## Métricas do produto

- Tempo até o primeiro talhão cadastrado.
- Percentual de atividades registradas offline.
- Percentual de sincronizações bem-sucedidas.
- Trilhas iniciadas e concluídas.
- Recomendações aceitas, editadas ou recusadas.
- Economia estimada de água e insumos, sempre marcada como estimativa.
- Retenção de propriedades ativas.
- Custo de infraestrutura por propriedade.
- Incidentes de privacidade ou licença.

## Go/no-go

A liberação deve ser interrompida se houver perda de dados, fonte sem licença, recomendação agronômica sem evidência, exposição de coordenadas, custo externo não informado ou impossibilidade de exportar os dados do produtor.
