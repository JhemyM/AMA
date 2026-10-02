# Workflow de desenvolvimento do AGRA

## Fluxo do dado ao produtor

```text
Fonte oficial / sensor / produtor
              |
        ingestão e licença
              |
       normalização e validação
              |
    catálogo + histórico + geodados
              |
      regras e recuperação de fontes
              |
   recomendação explicável / trilha
              |
       ação offline no campo
              |
 evidência, sincronização e resultado
```

## Ciclo de uma recomendação

1. O produtor registra cultura, local, solo, água ou problema observado.
2. O sistema verifica se há dados suficientes e recentes.
3. O motor recupera fontes compatíveis e regras aprovadas.
4. A recomendação é montada com justificativa, confiança, validade e limitações.
5. O produtor pode aceitar, editar, adiar ou recusar.
6. A trilha guia a execução em passos curtos, mesmo offline.
7. Fotos, medições e observações são guardadas como evidência.
8. A sincronização envia operações idempotentes quando houver conexão.
9. O resultado real alimenta o histórico, sem alterar a fonte original.

## Fluxo de cada entrega

### Antes de codificar

- Escrever o problema do produtor e o resultado observável.
- Identificar dados de entrada, fonte, licença e risco.
- Definir comportamento online, offline e em caso de conflito.
- Criar critério de aceite e teste de acessibilidade.

### Durante a implementação

- Alterar o menor módulo possível.
- Manter regras de negócio fora da interface.
- Versionar migrações de banco e contratos da API.
- Registrar fonte e licença de conteúdo externo.
- Não colocar segredo, token ou credencial no cliente.

### Antes de integrar

- Teste unitário da regra.
- Teste de sincronização com repetição e falha de rede.
- Teste de dados inválidos e permissões.
- Teste em tela pequena, teclado e leitor de tela.
- Validação com dados fictícios que não exponham propriedade real.

### Antes de liberar

- Backup e restauração testados.
- Migração reversível ou plano de recuperação.
- Logs sem coordenadas ou dados sensíveis desnecessários.
- Créditos e licenças revisados.
- Métricas e alertas configurados.
- Changelog e instruções de suporte atualizados.

## Fluxo de conhecimento Embrapa

1. Coletar apenas catálogo ou publicação permitida.
2. Registrar identificador, URL, licença, data, hash e repositório.
3. Extrair texto e dividir em trechos com página de origem.
4. Classificar cultura, região, solo, água, clima e prática.
5. Revisar uma amostra por técnico ou editor de conteúdo.
6. Publicar como fonte ou transformar em trilha AGRA original.
7. Monitorar mudança de edição ou retirada da fonte.

## Fluxo de mapas e satélite

1. Importar ou capturar limite da propriedade.
2. Validar geometria e pedir confirmação do produtor.
3. Buscar tiles e imagens por provedor configurado.
4. Guardar fonte, data, resolução, nuvens e licença.
5. Calcular índices somente com dados compatíveis.
6. Exibir a imagem e o grau de incerteza.
7. Guardar o último estado para operação offline.

## Fluxo de sincronização

Cada operação deve conter:

- `operationId` único.
- `entityId` e tipo da entidade.
- versão local e data UTC.
- ação: criar, atualizar ou remover.
- payload mínimo necessário.
- tentativas, erro e próximo retry.

O servidor deve aceitar o mesmo `operationId` mais de uma vez sem duplicar o efeito. Conflitos devem ser explícitos para o usuário; nunca sobrescrever silenciosamente uma medição ou decisão de campo.

## Fluxo de suporte Alpha/Beta

- Classificar falha em dados, sincronização, recomendação, mapa, acessibilidade ou cobrança.
- Bloquear recomendações potencialmente perigosas até revisão.
- Preservar logs e contexto sem expor dados do produtor.
- Responder com workaround documentado quando estiver sem rede.
- Fazer revisão semanal de feedback e priorizar por impacto no campo.
