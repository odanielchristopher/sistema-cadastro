# Eteg - Sistema de Cadastro

Sistema de cadastro de clientes desenvolvido como desafio tecnico.

O projeto foi pensado como um monorepo com:

- uma API em NestJS + Prisma
- um frontend em React + Vite
- banco PostgreSQL

O fluxo principal permite:

- cadastro de clientes em etapas
- selecao de cor para o cliente
- dashboard com listagem de clientes em accordion
- gerenciamento de cores com CRUD
- pagina de administracao protegida por autenticacao

## Stack

- `API`: NestJS, Prisma, PostgreSQL
- `Frontend`: React, Vite, React Hook Form, TanStack Query
- `UI`: Tailwind CSS, Radix UI, Lucide
- `Infra`: Docker, Docker Compose

## Estrutura

```text
eteg/
├── README.md
├── .env.example
├── .dockerignore
├── docker-compose.yml
├── Dockerfile.api
├── Dockerfile.fe
├── docker-entrypoint.sh
└── apps/
    ├── api/
    │   ├── prisma/
    │   ├── src/
    │   ├── package.json
    │   ├── prisma.config.ts
    │   └── docker-entrypoint.sh
    └── fe/
        ├── src/
        ├── public/
        ├── package.json
        └── nginx.conf
```

## Rodando com Docker

Essa e a forma recomendada para avaliar o projeto.

1. Suba os containers:

```bash
docker compose up --build -d
```

2. Acesse as aplicacoes:

- Frontend: `http://localhost:3001`
- API: `http://localhost:3000`
- Docs da API: `http://localhost:3000/docs`

3. Para parar:

```bash
docker compose down
```

4. Para remover os dados do banco tambem:

```bash
docker compose down -v
```

## Credenciais iniciais

O seed cria o usuario administrador padrao:

- `email`: `root@mail.com`
- `password`: `root`

## Variaveis de ambiente

As variaveis de exemplo estao em:

- [`.env.example`](./.env.example)

Principais variaveis:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `JWT_SECRET`
- `USER_NAME`
- `USER_EMAIL`
- `USER_PASSWORD`
- `VITE_API_URL`

## Rodando localmente

Se preferir executar sem Docker, voce precisa de:

- Node.js 22+
- pnpm 10+
- PostgreSQL ativo

Passos base:

1. Instale as dependencias:

```bash
pnpm install
```

2. Configure as variaveis de ambiente:

- copie `.env.example` para `.env`
- ajuste `DATABASE_URL`, `JWT_SECRET` e `VITE_API_URL` conforme o seu ambiente

3. Rode a API em desenvolvimento:

```bash
pnpm --dir apps/api start:dev
```

4. Rode o frontend em desenvolvimento:

```bash
pnpm --dir apps/fe start:dev
```

## Banco de dados

O projeto usa Prisma com migrations e seed.

No Docker, isso acontece automaticamente ao subir a API.

## Organizacao do projeto

### API

- `src/modules/colors`: CRUD de cores
- `src/modules/clients`: CRUD de clientes
- `src/modules/auth`: autenticacao
- `src/shared/database`: repositorios Prisma e conexao com o banco
- `prisma/`: schema, migrations e seeds

### Frontend

- `src/views/pages/ClientForm`: formulario publico de cadastro
- `src/views/pages/Dashboard`: painel administrativo
- `src/views/components/app`: componentes de dominio
- `src/views/components/ui`: componentes base reutilizaveis
- `src/app/hooks`: hooks de dados e regras de fluxo
- `src/app/services`: camada de acesso a API

## Observacoes

- O frontend do dashboard consome a API via `VITE_API_URL`
- O fluxo de clientes usa pagina infinita na listagem
- O backend retorna respostas paginadas com metadados

## Comandos uteis

```bash
# API
pnpm --dir apps/api build
pnpm --dir apps/api test

# Frontend
pnpm --dir apps/fe build

# Monorepo
pnpm typecheck
```
