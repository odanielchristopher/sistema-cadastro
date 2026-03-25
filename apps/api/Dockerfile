# ─── Stage 1: deps ───────────────────────────────────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

COPY apps/api/package.json ./apps/api/
COPY apps/fe/package.json  ./apps/fe/

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

# Gera o client em apps/api/generated/prisma  (output = "../generated/prisma")
RUN pnpm exec prisma generate

RUN pnpm run build

# ─── Stage 3: runner ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules               ./node_modules
COPY --from=builder /app/apps/api/node_modules      ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist              ./apps/api/dist
COPY --from=builder /app/apps/api/prisma.config.ts  ./apps/api/prisma.config.ts
COPY --from=builder /app/apps/api/prisma            ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json      ./apps/api/package.json

# O client fica em apps/api/generated/prisma
# O import nos fontes é bare: 'generated/prisma/client'
# Node resolve bare imports SOMENTE via node_modules — não via path relativo.
# Solução: symlink  apps/api/node_modules/generated  →  /app/apps/api/generated
# Assim  require('generated/prisma/client')  resolve para
#        apps/api/node_modules/generated/prisma/client  →  apps/api/generated/prisma/client  ✓
COPY --from=builder /app/apps/api/generated         ./apps/api/generated
RUN ln -s /app/apps/api/generated \
          /app/apps/api/node_modules/generated

COPY apps/api/docker-entrypoint.sh ./apps/api/docker-entrypoint.sh
RUN chmod +x ./apps/api/docker-entrypoint.sh

WORKDIR /app/apps/api

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]