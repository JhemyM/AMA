# Sincronização local e rede de proximidade

## É possível sem servidor?

Sim, desde que o aplicativo tenha um dispositivo coordenador. O modelo recomendado é **store-and-forward**:

- cada aparelho guarda suas operações localmente;
- aparelhos próximos trocam pacotes assinados;
- o dispositivo do proprietário mantém uma cópia consolidada;
- quando houver internet, somente o dispositivo autorizado envia manutenção, suporte e backup;
- se não houver internet, a operação continua no campo.

Uma PWA aberta como arquivo não consegue criar uma rede mesh arbitrária de forma confiável. Para Wi-Fi Direct, Bluetooth, descoberta local e execução em segundo plano, será necessário um cliente Android/desktop nativo. A PWA pode participar por rede local usando HTTPS local, WebRTC ou exportação/importação.

## Topologia do piloto

```text
Tablet do produtor A  <---- Wi-Fi local / QR ---->  App do proprietário
          |                                            |
          +---- aparelho do produtor B ---------------+
                                                       |
                                          internet opcional para manutenção
```

O proprietário não deve receber senhas ou dados em texto aberto. Ele recebe operações criptografadas e autorizadas para consolidar, fazer backup e encaminhar pacotes de manutenção.

## Modos de transporte

### Modo 1 — Backup manual

Disponível agora na PWA:

- exportação JSON;
- transferência por cabo, cartão, mensageria ou armazenamento local;
- importação com validação de formato.

### Modo 2 — Rede local

Primeiro alvo nativo:

- proprietário cria uma sessão local;
- outros dispositivos escaneiam QR ou informam código curto;
- dispositivos trocam operações pendentes pela rede Wi-Fi;
- cada pacote é confirmado por `operationId`;
- o proprietário encerra a sessão e gera backup.

### Modo 3 — Mesh/store-and-forward

Para áreas maiores:

- cada dispositivo pode retransmitir pacotes assinados;
- TTL e limite de tamanho impedem propagação infinita;
- o destinatário aceita somente operações ainda não aplicadas;
- a rede pode operar sem internet durante dias;
- o app mostra data e origem de cada dado.

## Segurança

- Identidade por dispositivo com chave pública/privada.
- Pareamento por QR, código de seis dígitos ou aprovação manual.
- Criptografia ponta a ponta dos dados de campo.
- Assinatura de cada operação e do pacote de sincronização.
- Permissões por propriedade e função.
- Revogação de aparelho perdido.
- Não transmitir coordenadas fora da propriedade sem consentimento.
- Registro de auditoria sem guardar conteúdo sensível desnecessário.

## Mensagens

Pacotes devem conter:

- `bundleId`;
- `senderDeviceId`;
- `propertyId`;
- operações do [SYNC_PROTOCOL.md](SYNC_PROTOCOL.md);
- `createdAt`, `expiresAt` e `ttl`;
- hash do conteúdo;
- assinatura do remetente.

O app deve aceitar repetição segura, rejeitar pacote expirado e pedir revisão quando houver conflito.

## Manutenção pelo proprietário

O proprietário pode receber:

- operações pendentes;
- logs técnicos anonimizados;
- pedido de atualização;
- pacote de diagnóstico consentido;
- backup criptografado.

A manutenção não deve conceder acesso permanente aos dados do produtor. O produtor precisa aprovar o compartilhamento e pode revogar o pareamento.
