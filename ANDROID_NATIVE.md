# Cliente nativo Android do AGRA

Foi criado o esqueleto nativo em `android-native/` usando Kotlin e Jetpack Compose.

## Requisitos

- Android Studio recente.
- Android SDK 37 (já detectado neste computador).
- JDK 17 ou superior compatível com Android Gradle Plugin.
- Um aparelho Android ou emulador.

## Abrir e executar

1. Abra a pasta `android-native/` no Android Studio.
2. Aguarde a sincronização do Gradle.
3. Conecte um aparelho com depuração USB ou abra um emulador.
4. Execute o módulo `app`.

O cliente inicial demonstra:

- propriedade do piloto em Delmiro Gouveia;
- estado local e operações pendentes;
- registro de atividade offline;
- resumo de orientação;
- saúde dos talhões.

## Próximas integrações nativas

1. Persistência local real com Room/DataStore.
2. Outbox compartilhado com o protocolo do AGRA.
3. Câmera e localização com permissões em tempo de execução.
4. Pareamento local com o dispositivo do proprietário.
5. Consumo da API somente quando disponível.
6. Assinatura do APK/AAB e distribuição pelo Play Internal Testing.

O APK debug foi compilado com sucesso usando SDK 35 e OpenJDK 21. O artefato fica em `app/build/outputs/apk/debug/app-debug.apk`.
