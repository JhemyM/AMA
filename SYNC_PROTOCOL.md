# Protocolo de sincronização do AGRA

## Objetivo

Uma operação feita no campo deve aparecer nos demais dispositivos sem duplicação, mesmo que o produtor fique offline, repita a tentativa ou troque de dispositivo.

## Envelope de operação

```json
{
  "operationId": "uuid-v4",
  "entityId": "field-low",
  "entityType": "measurement",
  "type": "create",
  "clientId": "device-uuid",
  "clientVersion": 4,
  "occurredAt": "2026-10-02T12:00:00Z",
  "payload": {
    "soilMoisturePercent": 28,
    "source": "manual"
  }
}
```

## Regras

1. O cliente grava a operação no outbox local antes de atualizar a interface.
2. O servidor identifica a operação por `operationId`.
3. Repetições retornam `already-applied` e não criam outro evento.
4. O cliente mantém a operação até receber confirmação.
5. Falhas de rede entram em retry com backoff.
6. Conflitos de medição e decisão são mostrados ao usuário, nunca sobrescritos silenciosamente.
7. Eventos de produção e atividades concluídas são imutáveis; correções geram novo evento.
8. O servidor devolve um cursor de sincronização incremental.
9. Dados locais permanecem disponíveis durante indisponibilidade do servidor.
10. Logs guardam o resultado técnico sem expor coordenadas ou conteúdo sensível desnecessariamente.

## Ciclo de estados

```text
local -> pending -> sending -> applied
                         \-> retrying -> sending
                         \-> conflict -> review -> applied
```

## Compatibilidade

O contrato deve ser consumido pela PWA, Android, desktop e integrações externas. Mudanças incompatíveis exigem nova versão `/api/v2`; campos novos devem ser opcionais antes de se tornarem obrigatórios.
