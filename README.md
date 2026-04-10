# Sistema de Reembolso - Frontend

Este é o frontend da aplicação web para gestão de pedidos de reembolso e listagem de despesas empresariais.

## 📋 Visão Geral

O sistema permite a criação, visualização, busca, paginação e exclusão de solicitações de reembolso, com suporte a upload de recibos (comprovantes fiscais). O projeto consome uma API backend construída em AdonisJS.

## 🚀 Tecnologias Utilizadas

- **React 19**
- **Vite 8**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router DOM** para roteamento
- **React Query** (`@tanstack/react-query`) para cache e estado assíncrono
- **React Hook Form** + **Zod** para formulários e validações
- **Axios** para requisições HTTP
- **Phosphor Icons** para a iconografia

## ⚙️ Pré-requisitos

Certifique-se de ter o **Node.js** (versão 20 ou superior recomendada) e o **npm** instalados em sua máquina.

## 🛠️ Guia Passo a Passo: Como Instalar e Rodar o Projeto

Como a aplicação é dividida em Frontend (`refund`) e Backend (`refund-api`), você precisará rodar ambos simultaneamente para que a aplicação funcione corretamente.

### Passo 1: Configurar e Rodar a API (Backend)

A API backend não está incluída neste repositório. Para que o projeto funcione, você precisa clonar o repositório da API em um diretório em seu computador.

Abra um terminal e execute:

1. Clone o repositório da API:
   ```bash
   git clone https://github.com/rocketseat-education/refund-api.git
   ```
2. Navegue até a pasta da API clonada:
   ```bash
   cd refund-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Prepare o banco de dados (este comando roda as migrations):
   ```bash
   npm run db:prepare
   ```
5. Inicie o servidor de desenvolvimento da API:
   ```bash
   npm run dev
   ```
   > A API backend será iniciada na porta `http://localhost:3333`. **Mantenha este terminal aberto.**

### Passo 2: Configurar e Rodar o Frontend (Esta pasta)

Abra um **novo terminal** (mantendo o terminal da API da etapa anterior rodando) e execute:

1. Instale as dependências do frontend:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm run dev
   ```
   > A aplicação estará disponível em `http://localhost:5173` (ou porta similar indicada no terminal). Acesse pelo seu navegador e você poderá iteragir com a aplicação.

## 🗂️ Scripts Disponíveis no Frontend

No diretório `refund`, no seu arquivo `package.json`, estão os seguintes scripts principais que você pode rodar via `npm run <script>`:

- `dev`: Inicia o servidor de desenvolvimento com hot-reload.
- `build`: Executa a verificação de tipos e compila o projeto para produção.
- `lint`: Executa o ESLint para verificar a qualidade e encontrar possíveis problemas no código.
- `preview`: Inicia um servidor local básico para visualizar e testar o build de produção final gerado.

---

**Leituras adicionais e documentação técnica:**
Para informações profundas relacionadas a planejamento, casos de uso, modais de figma e arquitetura, você pode visualizar os documentos locais de implementação do projeto.

- [PRD.md](./PRD.md): Documento de requisitos de produto (regras de negócio, protótipos visuais de telas e escopo).
- [IMPLEMENTATION.md](./IMPLEMENTATION.md): Plano rigoroso dividido em etapas sequenciais com o que será exatamente codificado em cada seção.
