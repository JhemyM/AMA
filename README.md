<div align="center">
  <img src="https://img.icons8.com/color/144/000000/tractor.png" alt="AGRA Logo" width="100"/>
  <h1>AGRA</h1>
  <p><b>Aplicativo de Gestão Rural e Agrícola</b></p>
  <p>
    <a href="https://github.com/JhemyM/AMA/releases/latest"><img src="https://img.shields.io/github/v/release/JhemyM/AMA?color=5d9a69&label=Versão%20Estável" alt="Release"/></a>
    <a href="https://jhemym.github.io/AMA"><img src="https://img.shields.io/badge/PWA-Acessar%20Web-5a9aaa?logo=pwa" alt="PWA"/></a>
    <a href="https://github.com/JhemyM/AMA/actions/workflows/android.yml"><img src="https://img.shields.io/github/actions/workflow/status/JhemyM/AMA/android.yml?label=Build%20Android&logo=android" alt="Build Status"/></a>
    <img src="https://img.shields.io/badge/Status-Beta%20Público-d27b5d" alt="Status"/>
  </p>
</div>

---

O **AGRA** é uma plataforma de gestão e inteligência para propriedades rurais. Ele transforma dados de produção, solo, água, clima, geografia e conhecimento técnico em decisões práticas para produzir melhor, gastar menos e preservar os recursos naturais.

> **Do dado no campo à decisão de manejo.**

## 🌟 Principais Recursos

- 📊 **Gestão Operacional:** Propriedades, talhões, culturas, tarefas e estimativas de produção integradas em um dashboard intuitivo.
- 📱 **100% Offline-First:** Feito para a realidade do campo. O app funciona perfeitamente sem internet e sincroniza automaticamente assim que houver conectividade.
- 📚 **Catálogo Embrapa Integrado:** Guias e manuais oficiais de manejo de culturas como Soja, Milho, Algodão, Feijão, Cana, Pastagens e Hortaliças, disponíveis de forma preditiva baseada nas plantações ativas da propriedade.
- 🗺️ **Mapeamento:** Organização espacial com base em talhões e estimativas climáticas precisas.
- 🚀 **Multiplataforma:** Acesse via **Navegador (PWA)** no Desktop/iOS ou instale o aplicativo nativo **`.apk`** no seu Android.

---

## 📲 Como Instalar e Usar

Existem três formas de utilizar o AGRA:

### 1. Aplicativo Android (Recomendado para uso no campo)
O jeito mais rápido de testar o AGRA no seu celular:
1. Acesse a [Página de Releases](https://github.com/JhemyM/AMA/releases/latest).
2. Baixe o arquivo **`app-debug.apk`** e instale no seu celular Android.
3. *Vantagem:* Acesso completamente nativo, sem problemas de cache de navegador de terceiros e integração profunda com a bateria e sistema offline do Android.

### 2. Acesso PWA (Web, Desktop ou iOS)
Basta acessar o link oficial e adicionar à tela inicial do seu dispositivo:
👉 **[Acessar a versão Web](https://jhemym.github.io/AMA)**

### 3. Rodando Localmente (Para Desenvolvedores)
Clone o repositório e inicie o servidor:

```bash
git clone https://github.com/JhemyM/AMA.git
cd AMA
npm install
npm run build:web
npx http-server dist/web -p 8080 -c-1
```
Acesse `http://localhost:8080` no seu navegador.

---

## 🎯 Por que o AGRA?

Na agricultura familiar e em operações rurais menores, as decisões muitas vezes ficam espalhadas em cadernos e planilhas, dificultando o acompanhamento técnico da safra. O **AGRA** foi desenhado para eliminar a barreira da complexidade através de:

- **Simplicidade Visual:** Um painel que diz o *que precisa de atenção agora*, sem entulhar o produtor de números abstratos.
- **Trilhas Baseadas em Evidências:** A integração oficial e recomendada dos manuais da Embrapa orienta o produtor de forma técnica, não por "achismo".
- **Dados Pertencem ao Produtor:** Tudo funciona localmente; você não perde acesso à sua fazenda porque ficou sem conexão no meio do pasto.

## 🤝 Como Contribuir

Se você deseja adicionar mais inteligência ao projeto, verifique os guias internos:

- [Arquitetura de Software](ARCHITECTURE.md)
- [Sistema de Sincronização e Protocolos](SYNC_PROTOCOL.md)
- [Workflow e Estrutura de Pastas](WORKFLOW.md)
- [Diretrizes de Monetização](MONETIZATION.md)

Leia o nosso [CONTRIBUTING.md](CONTRIBUTING.md) e abra issues ou pull requests à vontade!

---

<div align="center">
  <sub>Construído com tecnologias Web abertas e foco em produtividade real.</sub><br>
  <sub>Distribuído sob os termos de uso. Vide documentação completa no repositório.</sub>
</div>
