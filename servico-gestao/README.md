# Serviço de Gestão

Este é o microserviço central do sistema, responsável pelo gerenciamento do núcleo do negócio: **Clientes**, **Planos** e **Assinaturas**. Ele orquestra as regras de negócio fundamentais, como a criação de novas assinaturas, controle de fidelidade e consulta de dados cadastrais.

## 📋 Funcionalidades

- **Gestão de Clientes**: Cadastro e consulta de clientes.
- **Gestão de Planos**: Administração dos planos disponíveis.
- **Gestão de Assinaturas**:
  - Criação de novas assinaturas com cálculo automático de fidelidade.
  - Consulta de assinaturas por tipo (Ativa/Cancelada), cliente ou plano.
- **Integração**: Recebe notificações de pagamentos para manter o histórico atualizado.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js robusto e escalável.
- [TypeORM](https://typeorm.io/) - ORM para persistência de dados.
- [MySQL](https://www.mysql.com/) - Banco de dados relacional.
- [RabbitMQ](https://www.rabbitmq.com/) - Message Broker para comunicação assíncrona.
- [Swagger](https://swagger.io/) - Documentação interativa da API.
- [Docker](https://www.docker.com/) - Containerização da aplicação.
- TypeScript - Linguagem base.

## 🏗 Arquitetura e Design

Este projeto foi meticulosamente desenhado seguindo princípios de engenharia de software moderna para garantir manutenibilidade, testabilidade e escalabilidade.

### Clean Architecture

A aplicação é dividida em camadas concêntricas, respeitando a regra de dependência (de fora para dentro):

1.  **Domain**: O núcleo. Contém as Entidades (`AssinaturaModel`), Objetos de Valor (`CriarAssinaturaVO`), Interfaces de Repositório (`IAssinaturaRepository`) e Factories (`AssinaturaFactory`). Não depende de frameworks ou bibliotecas externas.
2.  **Application**: Contém os Casos de Uso (`CriarAssinatura_UC`, `ListarAssinaturasPorCliente_UC`). Orquestra o fluxo de dados entre o domínio e o mundo externo.
3.  **Infra**: Implementações concretas das interfaces do domínio (ex: Repositórios TypeORM) e configurações de banco de dados.
4.  **Presentation**: A camada mais externa, responsável por receber as requisições (Controladores HTTP e Consumers RabbitMQ) e converter dados.

### Domain-Driven Design (DDD)

Aplicamos conceitos de DDD para modelar a complexidade do negócio:

- **Entities**: Objetos com identidade única e ciclo de vida (ex: `Assinatura`, `Cliente`).
- **Value Objects (VOs)**: Objetos imutáveis definidos por seus atributos (ex: `CriarAssinaturaVO`), usados para encapsular dados de entrada e garantir integridade.
- **Repositories**: Abstrações para acesso a dados, permitindo que o domínio permaneça agnóstico à persistência.
- **Factories**: Encapsulam a lógica complexa de criação de objetos (ex: `AssinaturaFactory` define a data de fidelidade ao criar uma assinatura).

### SOLID Principles

- **SRP (Single Responsibility Principle)**: Cada classe tem um único motivo para mudar. Ex: `AssinaturaController` lida apenas com HTTP/RPC, enquanto `CriarAssinatura_UC` lida apenas com a regra de negócio da criação.
- **OCP (Open/Closed Principle)**: O código é aberto para extensão, mas fechado para modificação. Novos casos de uso podem ser adicionados sem alterar os existentes.
- **LSP (Liskov Substitution Principle)**: As implementações de repositório podem ser substituídas por outras (ex: Mock para testes) sem quebrar a aplicação, graças ao uso de interfaces.
- **ISP (Interface Segregation Principle)**: Interfaces focadas (ex: `IAssinaturaRepository`, `IClienteRepository`) evitam que classes dependam de métodos que não usam.
- **DIP (Dependency Inversion Principle)**: Os módulos de alto nível (Casos de Uso) não dependem de módulos de baixo nível (Infraestrutura); ambos dependem de abstrações (Interfaces de Domínio).

### Padrões de Projeto

- **Repository Pattern**: Desacopla a lógica de negócio da lógica de acesso a dados.
- **Factory Pattern**: Centraliza a lógica de criação de objetos complexos (`AssinaturaFactory`).
- **Dependency Injection**: O NestJS gerencia as dependências, facilitando o teste e a modularização.
- **Decorator Pattern**: Amplamente usado pelo NestJS (`@Controller`, `@Injectable`) para adicionar metadados e comportamento às classes de forma declarativa.

## ⚙️ Configuração

Crie um arquivo `.env` na raiz:

```env
PORT=3001
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_GESTAO_QUEUE=gestao_queue

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senha
DB_DATABASE=gestao_db
```

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run start:dev

# Rodar em produção
npm run build
npm run start:prod
```

## 🔌 Pontos de Entrada

O serviço expõe endpoints HTTP e também escuta comandos via RabbitMQ.

### Documentação Swagger

Acesse `http://localhost:3001/api` para visualizar a documentação interativa completa.

### Principais Endpoints HTTP

| Método | Rota                                 | Descrição                                            |
| :----- | :----------------------------------- | :--------------------------------------------------- |
| `POST` | `/gestao/assinatura`                 | Cria uma nova assinatura.                            |
| `GET`  | `/gestao/assinatura/:tipo`           | Lista assinaturas por tipo (`ATIVAS`, `CANCELADAS`). |
| `GET`  | `/gestao/assinaturascliente/:codCli` | Lista assinaturas de um cliente específico.          |
| `GET`  | `/gestao/assinaturasplano/:codPlano` | Lista assinaturas de um plano específico.            |

### Mensageria (RabbitMQ)

**MessagePatterns (RPC):**

- `criar_assinatura`: Cria uma assinatura (mesmo payload do POST).
- `listar_assinaturas_tipo`: Retorna assinaturas por tipo.
- `listar_assinaturas_cliente`: Retorna assinaturas de um cliente.
- `listar_assinaturas_plano`: Retorna assinaturas de um plano.

## 🐳 Docker

O serviço está pronto para ser containerizado.

```bash
# Construir a imagem
docker build -t servico-gestao .

# Rodar o container
docker run -p 3001:3001 --env-file .env servico-gestao
```
