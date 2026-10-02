# Sistema de feedback do AGRA

## Objetivo

Dar ao produtor um canal simples para relatar problemas, sugerir ideias e dizer quando uma orientação não ficou clara. O retorno deve funcionar offline e chegar ao proprietário somente quando houver consentimento e transporte disponível.

## No aplicativo

O botão **Enviar feedback** coleta:

- categoria: ideia, problema, orientação ou elogio;
- avaliação de 1 a 5;
- mensagem livre;
- consentimento opcional para contato;
- versão do aplicativo;
- data e `operationId` da fila local.

O formulário não exige conta nem conexão. O produtor pode continuar trabalhando depois de salvar.

## Entrega por e-mail

Em modo totalmente local, o botão **Preparar e-mail** abre o cliente de e-mail padrão com destinatário, assunto e mensagem preenchidos. Configure o endereço em `feedback-config.js`:

```js
window.AGRA_CONFIG = {
	feedbackEmail: "seu-email@exemplo.com"
};
```

Esse modo depende de o dispositivo ter um cliente de e-mail configurado. Para envio automático sem interação, será necessário um backend com SMTP ou uma API de e-mail; credenciais nunca devem ficar no aplicativo.

## Triagem do proprietário

Cada feedback deve receber:

- status: novo, em análise, respondido ou arquivado;
- prioridade: baixa, média, alta ou crítica;
- módulo afetado;
- região e versão, sem coordenada exata por padrão;
- responsável e prazo;
- resposta enviada ao produtor;
- vínculo com incidente, tarefa ou melhoria.

## Ciclo de melhoria

1. Feedback entra no outbox local.
2. O proprietário recebe por rede local ou API quando autorizado.
3. O sistema agrupa relatos semelhantes.
4. Falha crítica de dados, segurança ou recomendação bloqueia a liberação.
5. Problema confirmado vira tarefa com critério de aceite.
6. A correção é testada com dados fictícios.
7. A versão é publicada no canal Alpha/Beta.
8. O produtor é informado no próximo acesso.

## Métricas

- feedbacks por propriedade ativa;
- tempo até a triagem;
- problemas recorrentes por módulo;
- taxa de retorno após uma correção;
- satisfação média;
- trilhas com maior confusão;
- percentual de feedbacks enviados offline;
- incidentes críticos abertos.

## Privacidade

- Não coletar coordenadas exatas no feedback por padrão.
- Não incluir conteúdo de fotos sem ação explícita do produtor.
- Pedir consentimento separado para contato.
- Permitir exportar e apagar feedback associado à propriedade.
- Redigir logs antes de enviá-los ao proprietário.
