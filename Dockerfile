ARG NODE_IMAGE=node:22.12

FROM $NODE_IMAGE AS node-image

FROM node-image

ARG DEFAULT_NODE_ENV=production

ENV PATH=/app/node_modules/.bin:$PATH
ENV NODE_ENV=$DEFAULT_NODE_ENV
ENV BACKEND_LOG_LEVEL=INFO
ENV FEDERATION_ENABLED=false

EXPOSE 8008

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev --silent
COPY tsconfig.json vite.config.ts ./
COPY src ./src
RUN npm run build

CMD ["node", "dist/chat-slayer.cjs"]
