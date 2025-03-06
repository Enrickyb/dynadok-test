# API de Clientes

Esta API foi desenvolvida utilizando Node.js, TypeScript, Express, MongoDB, Redis e BullMQ, seguindo os princípios da Clean Architecture e SOLID.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express** para API REST
- **MongoDB** com **Mongoose** para o banco de dados
- **Redis** com **ioredis** para cache
- **BullMQ** para mensageria e filas
- **Docker** e **docker-compose** para containerização
- **Jest** para testes unitários e de integração
- **GitHub Actions** para CI/CD

## Configuração do Ambiente

1. **Clonar o Repositório**

   ```sh
   git clone https://github.com/Enrickyb/dynadok-test
   cd dynadok-test
   ```
2. **Instalar as Dependências**


   ```sh
   npm install
   ```
3. **Configurar as Variáveis de Ambiente**
  Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
  
  ```sh
  PORT=3000
  MONGO_URI=mongodb://mongo:27017/meu_projeto
  REDIS_HOST=redis
  REDIS_PORT=6379
  ```
   
4. **Rodar a Aplicação com Docker**


   ```sh
   docker-compose up --build


## Endpoints da API

### Criar Cliente
- **URL:** `POST /api/clients`
- **Body:**
  ```json
  {
    "name": "João da Silva",
    "email": "joao@example.com",
    "phone": "123456789"
  }

### Atualizar Cliente
- **URL:** `PUT /api/clients/:id`
- **Body:** `Dados a serem atualizados`

### Buscar Cliente por ID
- **URL:** `GET /api/clients/:id`

### Listar Clientes
- **URL:** `GET /api/clients`



## CI/CD
- A integração contínua está configurada utilizando GitHub Actions. Toda vez que houver push ou pull request na branch main, os testes serão executados automaticamente. Consulte o arquivo .github/workflows/ci.yml para detalhes da implementação.

## Mensageria
- Ao criar um cliente, a aplicação envia uma mensagem para a fila clientQueue e o worker processa a tarefa assincronamente (ex: enviar e-mail ou registrar log).


## Proximos passos:
- Implementação de autenticação e JWT.

## Observações
1. **Teste**
 - O ideal para rodar uma suite de testes seria criar uma ambientação de banco de dados e cache diferente do usado no desenvolvimento e produção. Entretando a fim de escrever testes em um curto periodo de tempo, fiz uma adaptação para testar a aplicação com stub.

2. **Redis Cache**
 - O cache foi utilizado na busca de um cliente por id.

3. **Mensageria (bullMQ)**
 - Implementei um worker para o consumo de mensagens.
 - Ao criar um usuário é enviado para a queue uma mensagem, a qual é consumida pelo worker, que por sua vez, simula o envio de um log para o redis (o qual poderia ser utilizado por um sistema de monitoramento posteriormente)


