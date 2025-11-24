# Serviço de Planos Ativos

Este microserviço é responsável por gerenciar o cache de assinaturas ativas no sistema de controle de operadora. Ele escuta eventos de pagamento para atualizar o status das assinaturas e fornece uma interface para verificar se uma assinatura está ativa.

## 📋 Funcionalidades

- **Atualização de Cache**: Recebe eventos de pagamento e atualiza o estado da assinatura.
- **Verificação de Status**: Permite consultar se uma assinatura específica está ativa.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js
- [RabbitMQ](https://www.rabbitmq.com/) - Message Broker
- TypeScript

## 🏗 Arquitetura

O projeto segue os princípios da **Clean Architecture** e **DDD**, organizado nas seguintes camadas:

- **Application**: Casos de uso (`AtualizarCache_UC`, `ConsultarStatus_UC`).
- **Domain**: Entidades e regras de negócio (`AssinaturaCache`).
- **Infra**: Implementações de configuração dos serviços externos.
- **Presentation**: Controladores e DTOs.

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo):

```env
PORT=3003
RABBITMQ_URL=amqp://localhost:5672
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

## 📡 Mensageria (RabbitMQ)

### Eventos Consumidos (EventPattern)

| Padrão                              | Payload         | Descrição                                                     |
| ----------------------------------- | --------------- | ------------------------------------------------------------- |
| `PagamentoPlanoServicoPlanosAtivos` | `PlanoAtivoDTO` | Atualiza o cache da assinatura após confirmação de pagamento. |

### Mensagens Respondidas (MessagePattern)

| Padrão                       | Payload              | Retorno              | Descrição                              |
| ---------------------------- | -------------------- | -------------------- | -------------------------------------- |
| `verificar_assinatura_ativa` | `{ codAss: number }` | `{ ativa: boolean }` | Verifica se uma assinatura está ativa. |
