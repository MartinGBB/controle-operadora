# API Gateway

O **API Gateway** atua como a porta de entrada para o sistema de controle de operadora. Ele recebe as requisições HTTP dos clientes e as encaminha para os microserviços apropriados (`Gestão`, `Faturamento`, `Planos Ativos`) utilizando mensageria assíncrona (RabbitMQ).

## 🎯 Objetivo

Centralizar o acesso externo, abstraindo a complexidade da arquitetura de microserviços e garantindo um ponto único para roteamento e conversão de protocolos (HTTP -> AMQP).

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [RabbitMQ](https://www.rabbitmq.com/) (ClientProxy)
- [Docker](https://www.docker.com/) (Containerização)
- TypeScript

## 🔌 Pontos de Entrada (Rotas HTTP)

Abaixo estão as rotas disponíveis e para qual serviço/mensagem elas são direcionadas.

### Módulo de Gestão (`/gestao`)

Responsável por Clientes, Planos e Assinaturas.

| Método  | Rota                                 | Microserviço Alvo | Mensagem RPC                 |
| :------ | :----------------------------------- | :---------------- | :--------------------------- |
| `GET`   | `/gestao/clientes`                   | Gestão            | `listar_clientes`            |
| `GET`   | `/gestao/planos`                     | Gestão            | `listar_planos`              |
| `PATCH` | `/gestao/planos/:idPlano`            | Gestão            | `atualizar_custo_plano`      |
| `POST`  | `/gestao/assinaturas`                | Gestão            | `criar_assinatura`           |
| `GET`   | `/gestao/assinaturas/tipo/:tipo`     | Gestão            | `listar_assinaturas_tipo`    |
| `GET`   | `/gestao/assinaturascliente/:codCli` | Gestão            | `listar_assinaturas_cliente` |
| `GET`   | `/gestao/assinaturasplano/:codPlano` | Gestão            | `listar_assinaturas_plano`   |

### Módulo de Faturamento (`/faturamento`)

Responsável pelo registro de pagamentos.

| Método | Rota                              | Microserviço Alvo | Mensagem RPC          |
| :----- | :-------------------------------- | :---------------- | :-------------------- |
| `POST` | `/faturamento/registrarpagamento` | Faturamento       | `registrar_pagamento` |

### Módulo de Planos Ativos (`/planosativos`)

Responsável pela verificação rápida de status.

| Método | Rota                    | Microserviço Alvo | Mensagem RPC                 |
| :----- | :---------------------- | :---------------- | :--------------------------- |
| `GET`  | `/planosativos/:codAss` | Planos Ativos     | `verificar_assinatura_ativa` |

## ⚙️ Configuração

Crie um arquivo `.env` na raiz:

```env
GESTAO_HOST=localhost
GESTAO_PORT=gestao_port

FATURAMENTO_HOST=localhost
FATURAMENTO_PORT=faturamento_port


RABBITMQ_URL=rabbitmq_url
RABBITMQ_PORT=rabbitmq_port
RABBITMQ_PORT_TLS=rabbitmq_port_tls
RABBITMQ_GESTAO_QUEUE=gestao_queue
RABBITMQ_FATURAMENTO_QUEUE=faturamento_queue
RABBITMQ_PLANOS_ATIVOS_QUEUE=planos_ativos_queue

PORT=port

```

## ▶️ Execução

```bash
# Instalar dependências
npm install

# Rodar
npm run start
```

## 🐳 Docker

```bash
# Construir a imagem
docker build -t api-gateway .

# Rodar o container
docker run -p 3000:3000 --env-file .env api-gateway
```
