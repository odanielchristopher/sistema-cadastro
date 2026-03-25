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

COPY --from=deps /app/node_modules         ./node_modules
COPY --from=deps /app/apps/fe/node_modules ./apps/fe/node_modules

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/fe ./apps/fe

WORKDIR /app/apps/fe

# VITE_API_URL é injetada em build time via ARG → ENV
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm run build

# ─── Stage 3: runner (Nginx) ─────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/apps/fe/dist /usr/share/nginx/html
COPY apps/fe/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80