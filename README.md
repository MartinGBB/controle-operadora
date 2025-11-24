# Sistema de Controle de Operadora

Bem-vindo ao repositório do Sistema de Controle de Operadora. Este projeto constitui uma implementação robusta de um sistema distribuído baseado em microsserviços, desenvolvido no contexto acadêmico como um estudo sobre Arquitetura de Software, Clean Architecture, Domain-Driven Design (DDD) e Boas Práticas de Engenharia.

O objetivo principal foi arquitetar uma solução escalável, desacoplada e de fácil manutenção, utilizando este cenário para aplicar rigorosamente padrões de mercado na resolução de problemas complexos de negócio e comunicação entre sistemas.

---

## 🏗 Arquitetura e Design

O sistema foi projetado seguindo uma arquitetura de **Microserviços**, onde cada serviço possui responsabilidade única e se comunica de forma assíncrona.

### Principais Conceitos Aplicados

- **Clean Architecture**: Separação rigorosa de responsabilidades em camadas (Domain, Application, Infra, Presentation), garantindo que o núcleo do negócio não dependa de frameworks ou detalhes de infraestrutura.
- **Domain-Driven Design (DDD)**: Modelagem rica do domínio com Entidades, Value Objects, Aggregates e Repositories.
- **SOLID Principles**: Aplicação prática dos 5 princípios para criar código flexível e robusto.
- **Microservices**: Decomposição do sistema em serviços autônomos.
- **Event-Driven Architecture**: Comunicação entre serviços via mensageria (RabbitMQ) para garantir desacoplamento e resiliência.

### Padrões de Projeto (Design Patterns)

- **Factory**: Para criação complexa de agregados (ex: Assinaturas com regras de fidelidade).
- **Repository**: Abstração da camada de persistência.
- **Dependency Injection**: Gerenciamento de dependências via NestJS.
- **DTO (Data Transfer Object)**: Padronização de dados entre camadas e serviços.
- **Adapter**: Integração com serviços externos e protocolos.

---

## 🧩 Microserviços

O sistema é composto pelos seguintes serviços:

1.  **[API Gateway](./api-gateway)**:

    - **Função**: Porta de entrada única (Facade).
    - **Responsabilidade**: Roteamento de requisições HTTP para os microserviços via RPC/Mensageria.

2.  **[Serviço de Gestão](./servico-gestao)**:

    - **Função**: Core do negócio.
    - **Responsabilidade**: Gerenciamento de Clientes, Planos e Assinaturas. Aplica as principais regras de negócio.

3.  **[Serviço de Faturamento](./servico-faturamento)**:

    - **Função**: Financeiro.
    - **Responsabilidade**: Registro e processamento de pagamentos. Notifica outros serviços sobre confirmações.

4.  **[Serviço de Planos Ativos](./servico-planos-ativos)**:
    - **Função**: Performance/Cache.
    - **Responsabilidade**: Manter um estado otimizado das assinaturas ativas para consultas rápidas, reduzindo carga no serviço de gestão.

---

## 🚀 Tecnologias

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/TypeORM-FE0C05?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

---

## 📊 Diagrama principal da Arquitetura

![Diagrama Principal da Arquitetura](https://github.com/user-attachments/assets/4e722ebd-3533-40d5-9350-27ec673e2fc3)

---

## 📦 Instalação e Execução

### Pré-requisitos

- **Com Docker (Recomendado)**:
  - [Docker](https://www.docker.com/) e Docker Compose instalados.
- **Sem Docker (Manual)**:
  - [Node.js](https://nodejs.org/) (v18+)
  - [MySQL](https://www.mysql.com/) rodando localmente ou remotamente.
  - [RabbitMQ](https://www.rabbitmq.com/) rodando localmente ou remotamente.

### ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto e em cada subdiretório de serviço.

```env
  # RabbitMQ
  RABBITMQ_URL=rabbit_url
  RABBITMQ_GESTAO_QUEUE=gestao_queue
  RABBITMQ_FATURAMENTO_QUEUE=faturamento_queue

  # API GATEWAY
  GATEWAY_PORT=3000

  # SERVIÇO DE FATURAMENTO (DB + Configs)
  FATURAMENTO_PORT=faturament_port
  FATURAMENTO_DB_HOST=faturament_db_host
  FATURAMENTO_DB_NAME=faturament_db_name
  FATURAMENTO_DB_USER=faturament_db_user
  FATURAMENTO_DB_PASS=faturament_db_pass
  FATURAMENTO_DB_PORT=faturament_db_port
  FATURAMENTO_DB_TYPE=faturament_db_type

  # SERVIÇO DE GESTÃO (DB + Configs)
  GESTAO_PORT=gestao_port
  GESTAO_DB_HOST=gestao_db_host
  GESTAO_DB_NAME=gestao_db_name
  GESTAO_DB_USER=gestao_db_user
  GESTAO_DB_PASS=gestao_db_pass
  GESTAO_DB_PORT=gestao_db_port
  GESTAO_DB_TYPE=gestao_db_type

  # SERVIÇO DE PLANOS ATIVOS
  PLANOS_ATIVOS_PORT=planos_ativos_port
  RABBITMQ_PLANOS_ATIVOS_QUEUE=planos_ativos_queue
```

### Opção 1: Rodando com Docker (Fácil)

Esta é a maneira mais simples de rodar todo o ecossistema.

1.  **Clone o repositório**:

    ```bash
    git clone https://github.com/MartinGBB/controle-operadora.git
    cd controle-operadora
    ```

2.  **Configure as variáveis de ambiente**:
    Certifique-se de que o arquivo `.env` na raiz (e em cada serviço) esteja configurado corretamente.

3.  **Suba os containers**:

    ```bash
    docker-compose up --build
    ```

    Isso irá:

    - Construir as imagens de todos os microserviços.
    - Iniciar os serviços e conectá-los na rede `operadora-network`.
    - O API Gateway estará acessível em `http://localhost:3000`.

### Opção 2: Rodando Manualmente (Desenvolvimento)

Se você preferir rodar cada serviço individualmente para desenvolvimento:

1.  **Infraestrutura**:
    Garanta que você tem instâncias de **MySQL** e **RabbitMQ** rodando e acessíveis.

2.  **Instalação e Execução (para cada serviço)**:
    Você precisará abrir 4 terminais.

    **Terminal 1 (RabbitMQ & Banco)**:
    (Se não tiver instalado localmente, você pode usar docker apenas para a infra)

    ```bash
    # Exemplo genérico
    docker run -d -p 5672:5672 rabbitmq:3-management
    ```

    **Terminal 2 (Gestão)**:

    ```bash
    cd servico-gestao
    npm install
    npm run start
    ```

    **Terminal 3 (Faturamento)**:

    ```bash
    cd servico-faturamento
    npm install
    npm run start
    ```

    **Terminal 4 (Planos Ativos)**:

    ```bash
    cd servico-planos-ativos
    npm install
    npm run start
    ```

    **Terminal 5 (API Gateway)**:

    ```bash
    cd api-gateway
    npm install
    npm run start
    ```

---

## 📚 Documentação da API

Com o projeto rodando, você pode acessar a documentação interativa (Swagger) através do serviço de Gestão (se exposto) ou consultar os READMEs individuais para detalhes dos payloads.

- **Swagger (Gestão)**: `http://localhost:3001/api` (se rodando localmente ou com porta exposta no docker)

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Desenvolvido por Martin Brazón como parte das atividades acadêmicas da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS).

---

### Agradecimentos

Agradecimento especial aos professores da disciplina pela orientação nos conceitos de arquitetura distribuída e padrões de projeto.
