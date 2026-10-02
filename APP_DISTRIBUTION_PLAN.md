# Aplicativo distribuível do AGRA

## Decisão

O AGRA não será distribuído como um arquivo HTML dependente do computador do desenvolvedor. A entrega será composta por clientes instaláveis que usam a mesma API, contratos e sincronização.

```text
                    AGRA API + PostgreSQL
                         HTTPS / Sync
                    /         |          \
                   /          |           \
     PWA instalável     Android APK    Desktop Electron
       Linux/Windows      celular campo  Windows/Linux
```

## Canal 1 — PWA hospedada

É a primeira entrega distribuível e mais simples:

- hospedada em domínio HTTPS;
- instalável pelo navegador;
- funciona em Linux, Windows, Android e outros sistemas;
- recebe atualizações sem reinstalar;
- mantém cache e fila offline;
- não depende do computador de desenvolvimento.

A PWA deve ser o cliente de referência durante a Alpha.

## Canal 2 — Android

Criar um pacote Android a partir da PWA com Capacitor quando o fluxo offline estiver validado:

- APK para testes diretos;
- AAB para Google Play Internal Testing;
- câmera, GPS, notificações e armazenamento nativo;
- atualização pelo canal da loja;
- mesma API e mesmo protocolo de sincronização.

Requer Android Studio, Android SDK, Java e um dispositivo/emulador para testes.

## Canal 3 — Desktop Windows

O primeiro executável dedicado usa Electron:

- mesma interface web empacotada;
- API Alpha iniciada pelo processo Electron;
- armazenamento local e sincronização;
- executável portable `.exe` para o piloto Windows.

Um alvo Tauri ou Electron Linux poderá ser adicionado depois.

Cada sistema operacional precisa ser compilado ou empacotado em ambiente compatível. Um Windows não gera automaticamente um executável Linux confiável sem pipeline específica.

## Sistema universal de comunicação

O usuário pode iniciar uma operação em qualquer cliente:

1. cliente grava localmente;
2. operação recebe `operationId`;
3. outbox mantém a operação pendente;
4. API aceita uma vez;
5. demais clientes recebem a mudança pelo cursor de sincronização;
6. conflitos são apresentados para revisão.

O contrato está em [SYNC_PROTOCOL.md](SYNC_PROTOCOL.md).

## Distribuição do piloto

Para Delmiro Gouveia:

1. publicar a PWA em HTTPS;
2. convidar produtores por link;
3. instalar na tela inicial do Android;
4. oferecer APK interno quando Capacitor estiver configurado;
5. manter suporte direto durante a Alpha;
6. não distribuir a API dentro do aplicativo móvel;
7. hospedar API e banco em infraestrutura separada.

## O que está pronto

- build da PWA em `dist/web`;
- API compilável em `dist/`;
- contratos TypeScript;
- fila local e sincronização idempotente desenhadas;
- matriz de distribuição em [BUILD_MATRIX.md](BUILD_MATRIX.md).

## O que falta para o primeiro instalador

- domínio HTTPS e hospedagem da PWA;
- PostgreSQL e autenticação na API;
- projeto Capacitor Android;
- Android Studio e SDK;
- testes em aparelhos reais;
- política de privacidade e termos;
- processo de atualização e rollback.

## Regra de segurança

O aplicativo instalado nunca deve conter credenciais do banco, tokens permanentes de satélite ou segredos de pagamento. O cliente conversa apenas com a API HTTPS e usa credenciais de curta duração.
