# Sistema de atualização do AGRA

## Princípio

O aplicativo pode descobrir atualizações sem depender de uma API online permanente, mas qualquer pacote baixado precisa ser autenticado e verificável. O app nunca deve instalar um arquivo apenas porque veio de uma URL.

## Manifesto de distribuição

O site de distribuição publica um manifesto assinado, por plataforma e arquitetura:

```json
{
  "channel": "alpha",
  "version": "0.1.0-alpha.2",
  "minimumSupportedVersion": "0.1.0-alpha.1",
  "publishedAt": "2026-10-02T12:00:00Z",
  "artifacts": {
    "web": {
      "url": "https://distribuicao.example/agra/web/0.1.0-alpha.2/",
      "sha256": "..."
    },
    "android-arm64": {
      "url": "https://distribuicao.example/agra/android/0.1.0-alpha.2/app.aab",
      "sha256": "..."
    },
    "windows-x64": {
      "url": "https://distribuicao.example/agra/windows/0.1.0-alpha.2/AGRA.msi",
      "sha256": "..."
    }
  },
  "signature": "..."
}
```

O manifesto real deve ser assinado por uma chave de lançamento mantida fora do aplicativo de desenvolvimento. A chave pública pode ser embutida nos clientes.

## Fluxo comum

1. O cliente lê a versão local.
2. Consulta o manifesto quando houver rede ou recebe o manifesto por relay local.
3. Verifica canal, versão mínima, plataforma e assinatura.
4. Baixa o artefato para área temporária.
5. Confere SHA-256 e tamanho.
6. Instala em modo seguro ou agenda reinício.
7. Mantém a versão anterior para rollback.
8. Registra sucesso ou falha sem enviar dados do produtor por padrão.

## PWA

- O service worker verifica a versão do shell.
- Faz download do novo cache em segundo plano.
- Não troca durante uma operação de campo.
- Ativa a versão nova na próxima abertura ou após confirmação.
- Mantém o cache anterior se a instalação falhar.

## Android

- Distribuição oficial por Google Play quando possível.
- Alpha por Play Internal Testing ou APK assinado entregue diretamente.
- A atualização deve respeitar assinatura Android e permitir retorno à versão anterior.
- Atualização fora da loja só deve ser habilitada com consentimento explícito e pacote assinado.

## Desktop

- Tauri updater ou instalador assinado por plataforma.
- Windows: pacote assinado e canal Alpha/Beta separado.
- Linux: AppImage, `.deb` ou repositório assinado.
- Não executar scripts baixados como parte do update.
- Testar atualização com operações offline pendentes antes de trocar a versão.

## Atualização por rede local

O dispositivo do proprietário pode atuar como relay:

- baixa o manifesto e o pacote quando tiver internet;
- verifica assinatura antes de compartilhar;
- entrega o pacote aos aparelhos pareados;
- cada aparelho verifica novamente assinatura e hash;
- nenhum relay pode modificar o pacote sem invalidar a assinatura.

Sem internet, o proprietário pode distribuir a última versão previamente baixada. O app deve mostrar a data e a origem do pacote.

## Rollback e segurança

- Nunca apagar dados locais durante atualização.
- Fazer migração de dados antes de trocar o esquema.
- Manter backup antes de migração irreversível.
- Bloquear downgrade que possa corromper dados.
- Revogar versões comprometidas pelo manifesto.
- Registrar versão do app junto de cada operação sincronizada.
