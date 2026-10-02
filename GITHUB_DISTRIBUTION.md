# Distribuição do AGRA pelo GitHub

## GitHub Pages

A workflow em `.github/workflows/pages.yml` publica automaticamente a PWA a cada push em `master`.

Configuração necessária no repositório:

1. Abrir **Settings → Pages**.
2. Em **Build and deployment**, escolher **GitHub Actions**.
3. Fazer push para `master`.
4. Acessar a URL exibida pela execução do workflow.

O endereço do GitHub Pages será o primeiro canal público do AGRA. A PWA deve ser usada por HTTPS para habilitar instalação, cache, câmera e localização.

Para configurar o feedback por e-mail sem gravar o endereço no Git, criar em **Settings → Secrets and variables → Actions** o segredo `AGRA_FEEDBACK_EMAIL`. O workflow gera a configuração durante o build.

## APK

A workflow `.github/workflows/android.yml` gera um APK debug sob demanda ou quando há alterações em `android-native/`.

O APK aparece em **Actions → Build AGRA Android → Artifacts**. Para distribuição aos participantes, baixar o artefato e compartilhar apenas com o grupo Alpha.

## Releases

Ao criar uma tag `v0.1.0-alpha.1`, a workflow `release.yml` gera:

- arquivo compactado da PWA;
- APK Android;
- notas automáticas da versão.

```powershell
git tag v0.1.0-alpha.1
git push origin v0.1.0-alpha.1
```

## Atualizações

- PWA: novo push publica novo build no Pages; o service worker troca o cache por versão.
- Android: Alpha recebe APK por artefato ou Release; Beta pode migrar para Play Internal Testing.
- Desktop: publicar instalador assinado em Releases quando o alvo Tauri for criado.

Nunca colocar segredos, tokens de satélite, credenciais de e-mail ou `feedback-config.local.js` no repositório.

## Executável Windows

O GitHub Pages distribui a PWA, não um `.exe`. Para um executável Windows real, o próximo alvo é Tauri ou Electron. Esse cliente deve apontar para a mesma API e sincronização; empacotar a PWA sozinha não cria sincronização automática.
