# Roadmap do AGRA

## Objetivo da primeira versão

Entregar um aplicativo offline-first para agricultura familiar que ajude o produtor a registrar sua propriedade, entender condições de solo, água e clima, seguir trilhas de manejo sustentável e registrar resultados. A primeira versão deve ser útil mesmo sem satélite, sensores ou conexão permanente.

## Fases

### Fase 0 — Fundação e decisões

**Saída:** repositório pronto para desenvolvimento contínuo.

- Fixar o modelo de dados e os contratos da API.
- Separar frontend PWA, backend, pacote de domínio e ingestão de conhecimento.
- Escolher PostgreSQL, armazenamento de objetos e autenticação.
- Criar política de licenças, privacidade, retenção e atribuição.
- Definir o primeiro grupo de culturas e regiões.
- Definir métricas de sucesso e grupo de produtores consultados.

**Critério de aceite:** uma instalação limpa reproduz o ambiente de desenvolvimento e todos os contratos têm exemplos versionados.

### Fase 1 — Núcleo operacional

**Saída:** aplicativo útil sem inteligência avançada.

- Cadastro de propriedade, talhões, culturas, água e atividades.
- Importação de GeoJSON/KML ou desenho revisado do talhão.
- Registro offline com fila local e sincronização posterior.
- Fotos, localização, notas e medições de campo.
- Dashboard de produção, tarefas, água e solo.
- Exportação completa dos dados do produtor.

**Critério de aceite:** produtor consegue cadastrar um talhão, registrar uma atividade sem internet, fechar o aplicativo, reabrir e sincronizar sem duplicar o evento.

### Fase 2 — Conhecimento técnico

**Saída:** primeira biblioteca guiada.

- Catálogo Embrapa com metadados, fontes e licença.
- Primeiro conjunto autorizado de manuais por cultura/região.
- Busca textual por cultura, problema, prática e região.
- Trilhas de manejo com etapas, materiais e cuidados.
- Citações e links originais em toda orientação.
- Download seletivo para uso offline.
- Áudio e imagens simples para passos de campo.

**Critério de aceite:** cada tutorial exibido tem fonte rastreável e o produtor consegue concluir uma trilha sem precisar ler um PDF inteiro.

### Fase 3 — Recomendações explicáveis

**Saída:** assistente de decisão com limites claros.

- Regras para irrigação, janela de plantio, cobertura, rotação e análise de solo.
- Combinação de clima, geografia, solo, água e histórico.
- Confiança, justificativa, validade e alternativa conservadora.
- Bloqueio de recomendação quando os dados estão vencidos ou conflitantes.
- Aprovação e comentário de técnico.
- Registro do que foi recomendado, aceito e observado.

**Critério de aceite:** três técnicos conseguem auditar por que uma recomendação foi exibida e quais dados a geraram.

### Fase 4 — Mapas e observação remota

**Saída:** mapa real, não apenas demonstrativo.

- Adaptador de base cartográfica.
- Limites reais com GeoJSON/KML/GPS.
- Provedor de imagem Sentinel/Copernicus, Landsat ou contratado.
- Data, resolução, nuvens, fonte e licença visíveis.
- Cache da última imagem e dos polígonos para offline.
- NDVI/NDWI apenas como tendência, nunca como diagnóstico isolado.

**Critério de aceite:** o produtor reconhece sua propriedade no mapa e consegue identificar a data e a fonte de cada imagem.

### Fase 5 — Alpha fechada

**Público:** 5 a 15 produtores, técnicos e pessoas de suporte.

- Uma região e poucas culturas bem atendidas.
- Convite e suporte direto.
- Sem cobrança real; planos simulados.
- Logs de erros, sincronização e recomendações.
- Entrevista após cada trilha concluída.
- Correção rápida de falhas críticas.

**Saída:** relatório de uso, confusão, confiança e riscos antes da Beta.

### Fase 6 — Beta controlada

**Público:** 30 a 100 propriedades, com diversidade de conexão e dispositivos.

- Android e PWA instalável.
- Onboarding guiado e recuperação de conta.
- Termos, privacidade, consentimento e atribuições revisados.
- Assinaturas em modo teste e controle de capacidades.
- Suporte, exportação e exclusão de dados funcionando.
- Monitoramento de disponibilidade e custos de provedores.

**Critério de saída:** nenhum bloqueio de dados, sincronização confiável, suporte documentado e métricas estáveis por quatro semanas.

## Priorização

### Obrigatório para Alpha

- Offline, sincronização, dados do produtor, talhões, atividades, biblioteca pequena e trilhas citadas.

### Pode esperar a Beta

- Pagamento real, múltiplos provedores de satélite, sensores automáticos, modelos de ML, marketplace e múltiplas organizações.

### Não fazer na primeira versão

- Diagnóstico automático definitivo por imagem.
- Prescrição automática de defensivos.
- Dependência de um único fornecedor externo.
- Download indiscriminado do acervo Embrapa.
- Dashboard com métricas sem fonte ou data.
