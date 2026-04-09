# Sistema de reembolso

O projeto é uma aplicação web de pedidos de reembolso e listagem de despesas empresariais, com gestão das solicitações.
A aplicação contempla criação, listagem e remoção de reembolsos. Além disso, também contempla o upload de recibo relacionado ao reembolso, busca pelo nome do autor da solicitação, paginação e página de detalhes do pedido.

## 1. Objetivo

Construir um aplicativo de sistema de reembolso funcional, aplicando os seguintes pontos:

- Criação, listagem e exclusão de reembolsos.
- Upload de recibo da solicitação.
- Paginação da listagem de reembolsos.
- Busca pelo nome do autor da solicitação.
- Página de detalhes da solicitação.
- Exibição do recibo enviado.
- Consumo da **API fornecida**.

## 2. Conceitos e Regras

1.  **Consumo de API**
    - Utilizar **Axios** para chamadas HTTP.
    - Integrar com a API disponibilizada na pasta: "refund-api".
    - Integrar com React Query para melhor gerenciamento do estados assíncronos
    - Gerenciar erros e exibir mensagens de feedback para o usuário.
2.  **Formulários**
    - Utilizar **React Hook Form** para formulários, com validação.
    - Criar formulários para cadastro de reembolso.
3.  **Imagem e Upload**
    - Enviar um recibo em formato JPG, PNG ou PDF.
    - A imagem não deve ser maior do que 2mb.
4.  **Funcionalidades do App**
    - **Home**: página que lista reembolsos de forma paginada, com barra de busca.
    - **Detalhes do Reembolso**: página que exibe detalhes do reembolso. Nessa página deve ser possível exibir o recibo e excluir o reembolso.
    - **Criar Reembolso**: modal que exibe formulário com os seguintes campos: nome da solicitação, valor, categoria e arquivo do recibo.
    - **Sucesso da solicitação**: página que exibe uma mensagem de sucesso ao registrar o reembolso.
    - **Confirmação de exlusão**: modal que exibe uma confirmação se o usuário quer realmente apagar aquele reembolso.

## 3. Desenvolvendo o projeto

Você deve consumir a API que criada para esse projeto, assim você pode se concentrar em desenvolver apenas a parte web frontend. Nas 2 próximas seções, abordaremos com mais detalhes sobre a estrutura e como utilizá-la.

### 3.1 Como utilizar a API?

Para que você consiga utilizar a API, é preciso acessar a pasta: "refund-apirefund-api".

Então instalar as dependências com o comando `npm i`. Para executar o projeto, é preciso preparar o banco de dados primeiro. Para isso, execute o comando `npm run db:prepare`, isso criará o banco de dados SQLite. Por fim, para executar a aplicação basta executar o comando `npm run dev`.

Com isso, a sua API estará pronta para ser consumida no endereço `http://localhost:3333`.

### 3.2 Estrutura da API

A API foi estruturada seguindo a opinião do framework Adonis. Porém, você não é obrigado a entender o framework/node para entender as rotas, pois documentaremos elas mais abaixo. Para interagir com o banco e API, sugerimos duas ferramentas para te auxiliar:

- Para visualização dos dados do banco de dados. Basta apontar para o arquivo `db.sqlite3` gerado na pasta `tmp` após a execução do comando `npm run db:prepare`.
- Caso queira interagir com a API de uma maneira bem direta e fácil, você pode utilizar um API Rest Client como o Insomnia. Basta importar as configurações que disponibilizadas em: "refund-api/Insomnia.json". Dessa forma, você terá acesso a todas as rotas e poderá fazer as requisições diretamente por ele.

Existe um documento em markdown com todas as rotas, ele pode ser consultado em: "Projetos/refound_project/refund-api/rotas.md".

### 4. Desenvolvendo o projeto

O projeto é somente frontend, com a api backend já pronta para consumo.
O frontend já foi iniciado em React com React Compiler usando o vite.

Versões das bibliotecas:

> Node: v24.14.0;
> npm: 11.11.0;
> TypeScript: 5.9.3;
> react: 19.0.0;
> vite: 8.0.0.

Esquema de pastas:

```
refound_project: {
	refund: "Pasta com um prójeto iniciado com React com React Compiler usando o vite",
	refund-api: "Pasta da api backend já pronta para uso "
}
```

Para rodar o projeto frontend já iniciado:

1. Acesse a pasta: "refund".

2. Instale dependencias:

```
npm install
```

3. Rode em desnvolvimento:

```
npm run dev
```

O projeto seguirá o style guide que está em: "refound_project/refund/style_guide.png".
Também será fornecido acesso ao Figma MCP com os designs a serem seguidos.
Os componentes devem ser criados com: "Shadcn UI".

### 5. Entregas

Seguindo o design do Figma:

1. Implementar listagem de reembolsos com paginação e busca;
2. Criar modal de novo reembolso com formulário validado;
3. Fazer upload do recibo e associar ao reembolso;
4. Exibir detalhes do reembolso;
5. Permitir visualização do recibo;
6. Adicionar exclusão de reembolso com confirmação;
7. Mostrar feedbacks visuais (sucesso, erro, carregando);
8. Criar página de sucesso após cadastrar um reembolso;
9. Usar React Query para cache e atualização automática das listas.

---
