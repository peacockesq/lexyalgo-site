# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
COPY scripts/patch-tinacms-vite-define.mjs ./scripts/patch-tinacms-vite-define.mjs
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_LEXYCORPUS_API_URL
ARG NEXT_PUBLIC_LEXYCORPUS_MCP_URL
ENV NEXT_PUBLIC_LEXYCORPUS_API_URL=$NEXT_PUBLIC_LEXYCORPUS_API_URL
ENV NEXT_PUBLIC_LEXYCORPUS_MCP_URL=$NEXT_PUBLIC_LEXYCORPUS_MCP_URL
RUN npm run build

FROM nginx:stable-alpine AS runner

LABEL org.opencontainers.image.title="LexyAlgo static site"
LABEL org.opencontainers.image.description="Static Next.js export served by nginx for lexyalgo.com."

COPY --from=builder /app/out /usr/share/nginx/html
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1
