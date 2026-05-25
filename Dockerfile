# Multi-stage build for docker-compose and optional Render Docker deploy.
# Render Blueprint (render.yaml) uses native Node buildCommand instead — see RENDER_DEPLOYMENT.md.

ARG NODE_IMAGE=node:22.12

FROM ${NODE_IMAGE} AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Install all deps for Vite build; do not set NODE_ENV=production before npm ci.
RUN npm ci --include=dev

COPY tsconfig.json vite.config.ts ./
COPY src ./src
COPY demo ./demo
COPY resources ./resources

ENV BUILD_NODE_ENV=production
RUN npm run build

FROM ${NODE_IMAGE} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV BACKEND_LOG_LEVEL=INFO
ENV FEDERATION_ENABLED=false

EXPOSE 8008

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/chat-slayer.cjs"]
