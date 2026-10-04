<div align="center">
  <img src="https://img.icons8.com/color/144/000000/tractor.png" alt="AGRA Logo" width="100"/>
  <h1>AGRA</h1>
  <p><b>Aplicativo de Gestão Rural e Agrícola</b></p>
  <p>
    <a href="https://github.com/JhemyM/AMA/releases/latest"><img src="https://img.shields.io/github/v/release/JhemyM/AMA?color=5d9a69&label=Versão%20Estável" alt="Release"/></a>
    <a href="https://agra-app.vercel.app"><img src="https://img.shields.io/badge/Status-Online%20(Vercel)-000000?logo=vercel" alt="Vercel"/></a>
    <img src="https://img.shields.io/badge/Licen%C3%A7a-Comercial-blue" alt="License"/>
    <img src="https://img.shields.io/badge/Seguran%C3%A7a-Ofuscado-red" alt="Security"/>
  </p>
</div>

---

O **AGRA** é uma plataforma de gestão e inteligência premium para propriedades rurais. Ele transforma dados de produção, solo, água, clima e conhecimento técnico em decisões práticas para produzir melhor, gastar menos e preservar os recursos naturais.

> **Do dado no campo à decisão de manejo, gerando receita e sustentabilidade.**

## 🌟 Principais Recursos

- 📊 **Gestão Operacional:** Dashboard intuitivo para propriedades, talhões, culturas e tarefas com métricas em tempo real.
- 🔒 **Autenticação Segura (Supabase):** Login, registro e recuperação de senhas por e-mail, protegidos com criptografia robusta.
- 🌿 **Módulo de Carbono Premium:** Calculadora de sequestro de carbono baseada nas metodologias oficiais, projeção de receita e relatórios de sustentabilidade.
- 💳 **Pagamentos e Assinaturas:** Sistema de paywall seguro integrado ao SDK do Mercado Pago via Serverless Functions.
- 📚 **Catálogo Embrapa:** Integração profunda com manuais de manejo de baixo carbono (ILPF, Plantio Direto, etc).
- 📱 **Multiplataforma (PWA & Desktop):** Utilize pelo navegador com suporte offline ou baixe o executável para Windows.

---

## 📲 Como Instalar e Acessar

Existem diversas formas de usar o AGRA, dependendo da sua necessidade:

### 1. Acesso Nuvem (Web / Celular)
A versão mais atualizada e rápida, hospedada profissionalmente na Vercel:
👉 **[Acessar a Plataforma AGRA](https://github.com/JhemyM/AMA)** *(Verifique o link oficial da implantação Vercel no topo do repositório)*

### 2. Aplicativo Desktop (Windows Portable)
Ideal para escritórios de fazendas e computadores sem permissão de instalação:
1. Acesse a [Página de Releases do AGRA no GitHub](https://github.com/JhemyM/AMA/releases/latest).
2. Baixe o arquivo **`AGRA.0.7.0.exe`** (ou a versão mais recente).
3. Execute o arquivo e use o sistema normalmente (não requer instalação!).

### 3. Rodando Localmente (Desenvolvedores)
O projeto utiliza um script de compilação customizado para injetar módulos dinâmicos e ofuscar o código por segurança.

```bash
git clone https://github.com/JhemyM/AMA.git
cd AMA
npm install
npm run build:web
npx http-server dist/web -p 8080 -c-1
```

---

## 🛡️ Segurança e Proteção

Este projeto comercial utiliza proteção ativa contra cópias e engenharia reversa.
O código fonte exposto na branch principal é o **código de desenvolvimento**. Durante a compilação (`npm run build:web`), o sistema aplica:
- **Obfuscação Severa:** Control flow flattening, string encoding e dead code injection.
- **Proteção de Ambiente:** As chaves de banco de dados (Supabase) e de pagamentos (Mercado Pago) nunca são expostas. Elas são injetadas exclusivamente nos servidores da Vercel durante o deploy.

---

## 🤝 Contribuição e Manutenção

Para colaborar técnica e comercialmente com o projeto:
- [Workflow e Estrutura de Pastas](FUTURE_WORKFLOW.md)
- [Termos de Uso e Licenciamento](protecao_e_licenciamento.md)

Leia o nosso [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes de Pull Request.

---

<div align="center">
  <sub>Construído com design Premium Glassmorphism e tecnologias Serverless.</sub><br>
  <sub>Copyright © Jhemy Martins. Todos os direitos reservados.</sub>
</div>
