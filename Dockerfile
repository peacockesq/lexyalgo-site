# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json package-lock.json ./
COPY scripts/patch-tinacms-vite-define.mjs ./scripts/patch-tinacms-vite-define.mjs
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner

LABEL org.opencontainers.image.title="LexyAlgo static site"
LABEL org.opencontainers.image.description="Static Next.js export served by nginx for lexyalgo.com."

COPY --from=builder /app/out /usr/share/nginx/html
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location = /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 'ok';
    }

    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    error_page 404 /404.html;
}
NGINX

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1
