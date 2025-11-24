# Serviço de Faturamento

Este microserviço é responsável pelo registro e processamento de pagamentos no sistema de controle de operadora. Ele atua como o ponto central para a entrada de dados financeiros, validando as informações, persistindo os registros e notificando outros serviços interessados sobre a confirmação dos pagamentos.

## 📋 Funcionalidades

- **Registro de Pagamentos**: Recebe dados de pagamentos via HTTP ou Mensageria.
- **Validação de Regras de Negócio**: Garante a integridade dos dados (datas válidas, valores positivos, etc.).
- **Persistência**: Salva o histórico de pagamentos no banco de dados.
- **Notificação de Eventos**: Emite eventos para outros microserviços (`Gestão` e `Planos Ativos`) após o sucesso do registro.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js
- [TypeORM](https://typeorm.io/) - ORM para interação com o banco de dados
- [MySQL](https://www.mysql.com/) - Banco de dados relacional
- [RabbitMQ](https://www.rabbitmq.com/) - Message Broker para comunicação assíncrona
- [Docker](https://www.docker.com/) - Containerização
- TypeScript

## 🏗 Arquitetura

O projeto foi desenhado seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, garantindo desacoplamento e facilidade de manutenção. A estrutura é dividida nas seguintes camadas:

- **Application**: Contém os Casos de Uso (`RegistrarPagamento_UC`), orquestrando a lógica da aplicação sem depender de detalhes de infraestrutura.
- **Domain**: O coração do sistema. Contém as Entidades (`PagamentoModel`), Objetos de Valor (`PagamentoVO`) e Interfaces de Repositório (`IRegistrarPagamentoRepository`). Aqui residem as regras de negócio puras.
- **Infra**: Implementações concretas, como repositórios com TypeORM e configurações de banco de dados.
- **Presentation**: Responsável pela entrada de dados, contendo os Controladores (`PagamentoController`) e DTOs.

### Boas Práticas Adotadas

- **Injeção de Dependência**: Uso extensivo do container do NestJS para gerenciar dependências, facilitando testes e modularização.
- **SOLID**: Aplicação dos princípios, especialmente:
  - _Single Responsibility Principle (SRP)_: Cada classe tem uma única responsabilidade (ex: Use Case apenas orquestra, Service valida e persiste).
  - _Dependency Inversion Principle (DIP)_: O domínio depende de abstrações (interfaces), não de implementações concretas.
- **Tratamento de Erros Centralizado**: Uso de filtros de exceção (`HttpExceptionFilter`) e erros de domínio personalizados (`RegraNegocioError`).

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo):

```env
DATABASE_HOST=sql10.freesqldatabase.com
DATABASE_NAME=name
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_PORT=3306
DATABASE_TYPE=mysql

PORT=3002

RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_FATURAMENTO_QUEUE=faturamento_queue
RABBITMQ_GESTAO_QUEUE=gestao_queue
RABBITMQ_PLANOS_ATIVOS_QUEUE=planos_ativos_queue

```

## 📦 Instalação

```bash
npm install
```

## ▶️ Execução

### Desenvolvimento

```bash
npm run start
```

### Produção

```bash
npm run build
npm run start:prod
```

## 🔌 Pontos de Entrada (API & Mensageria)

O serviço aceita requisições tanto via HTTP quanto via RabbitMQ, processando a mesma estrutura de dados.

### HTTP Endpoint

**POST** `/registrarpagamento`

**Corpo da Requisição (JSON):**

```json
{
  "dia": 24,
  "mes": 11,
  "ano": 2025,
  "codAssinatura": 123,
  "valorPago": 99.9
}
```

### Mensageria (RabbitMQ)

**MessagePattern:** `registrar_pagamento`

**Payload:**

Mesma estrutura do JSON acima (`PagamentoDTO`).

## 📡 Eventos Emitidos

Após o registro bem-sucedido de um pagamento, o serviço emite os seguintes eventos para o barramento (RabbitMQ):

| Evento                              | Destino                  | Descrição                                                            |
| ----------------------------------- | ------------------------ | -------------------------------------------------------------------- |
| `PagamentoPlanoServicoGestao`       | Serviço de Gestão        | Notifica para fins de histórico e controle administrativo.           |
| `PagamentoPlanoServicoPlanosAtivos` | Serviço de Planos Ativos | Notifica para atualização imediata do cache de status da assinatura. |

## 🐳 Docker

O serviço está pronto para ser containerizado.

```bash
# Construir a imagem
docker build -t servico-faturamento .

# Rodar o container
docker run -p 3002:3002 --env-file .env servico-faturamento
```
