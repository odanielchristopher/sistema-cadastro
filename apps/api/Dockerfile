# ─── Stage 1: deps ───────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

# Copiar manifests do workspace
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copiar apenas os package.json dos apps para aproveitar cache de camadas
COPY apps/api/package.json ./apps/api/
COPY apps/fe/package.json  ./apps/fe/

# Instalar todas as deps (precisa das raiz também para o prisma client gerado)
RUN pnpm install --frozen-lockfile

# ─── Stage 2: build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

COPY --from=deps /app/node_modules          ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN pnpm run build

# Gerar Prisma Client
RUN pnpm exec prisma generate

# ─── Stage 3: runner ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

ENV NODE_ENV=production

# Copiar apenas o necessário para rodar
COPY --from=builder /app/node_modules               ./node_modules
COPY --from=builder /app/apps/api/node_modules      ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist              ./apps/api/dist
COPY --from=builder /app/apps/api/generated         ./apps/api/generated
COPY --from=builder /app/apps/api/prisma            ./apps/api/prisma
COPY --from=builder /app/apps/api/prisma.config.ts  ./apps/api/prisma.config.ts
COPY --from=builder /app/apps/api/package.json      ./apps/api/package.json

# Script de entrypoint (migrations + seed + start)
COPY apps/api/docker-entrypoint.sh ./apps/api/docker-entrypoint.sh
RUN chmod +x ./apps/api/docker-entrypoint.sh

WORKDIR /app/apps/api

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
