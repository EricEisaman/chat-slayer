![Chat Slayer](resources/chat-slayer-logo.png)

# Chat Slayer

*Chat Slayer* is a lightweight Matrix-compatible chat server written in TypeScript. It runs as a **single Node process** with **in-memory** state by default (no separate database), bundled for deployment (e.g. Render free tier). Client apps use standard Matrix client API routes under `/_matrix/client/...`.

### Documentation

| Doc | Purpose |
|-----|---------|
| This file | Overview, local dev, build scripts, Docker |
| [demo/README.md](demo/README.md) | Browser demo at `/` (Datastar SSE, actions, optional E2EE) |
| [CLIENT_GUIDE.md](CLIENT_GUIDE.md) | `ALLOWED_CLIENTS`, `X-Chat-Slayer-Client-Id`, curl examples |
| [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) | Production deploy on Render |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |
| [STYLEGUIDE.md](STYLEGUIDE.md) | Lint, format, TypeScript conventions |

Shared code lives under `src/fi/cs/` (core, matrix, backend, node). Vite builds the server entry [`src/chat-slayer.ts`](src/chat-slayer.ts) to `dist/chat-slayer.cjs`. Node **20.19+** is required at runtime.

### Configuration and secrets

Copy [`.env.example`](.env.example) to `.env` for local development. **Never commit** `.env` or real secrets.

| Variable | Secret? | Notes |
|----------|---------|-------|
| `BACKEND_JWT_SECRET` | Yes on Render | Optional locally — a dev default is used if unset; set a 32+ char secret when `NODE_ENV=production` |
| `BACKEND_INITIAL_USERS` | Yes | Optional `user:password` pairs, `;`-separated (demo UI defaults to `devpass123`) |
| `BACKEND_INITIAL_ROOMS` | No | Optional public room names (comma-separated); boot-seeded at startup — requires seed users |
| `BACKEND_PRIVATE_ROOMS` | No | Optional private room names (hidden until discovered); see [CLIENT_GUIDE.md](CLIENT_GUIDE.md) |
| `BACKEND_ROOM_HISTORY_LIMIT` | No | Max recent messages per room on join/history fetch (default **20**) |
| `BACKEND_EMAIL_CONFIG` | Often | SMTP URL may include credentials |
| `BACKEND_PUBLIC_URL` | No | Public URL clients use for discovery |
| `PORT` | No | Set by Render automatically — do not override in Dashboard |

Build-time constants (`BUILD_VERSION`, `BUILD_NODE_ENV`, etc.) are injected by Vite only. JWT and SMTP values are read at **runtime** from the environment.

To restrict which apps may call the API, see **[CLIENT_GUIDE.md](CLIENT_GUIDE.md)** (`ALLOWED_CLIENTS`, `X-Chat-Slayer-Client-Id`).

### Local development

```shell
npm ci --include=dev
cp .env.example .env
# Optional: npm run pkill   # free port 8008 if a previous dev server is still running
npm run dev
```

`npm run dev` runs `build:demo` then starts the server with `vite-node src/chat-slayer.ts`.

Open http://localhost:8008/ — demo UI and API on the same origin. The page loads `/demo-config.json` for client id and API base URL. Health checks: `GET /health`.

For a two-browser smoke test, see [demo/README.md](demo/README.md).

### npm scripts

| Script | What it does |
|--------|----------------|
| `dev` | `build:demo` + `vite-node src/chat-slayer.ts` |
| `build` | Vite server bundle + `build:demo` |
| `build:demo` | Copy demo UI, logo/favicon, `e2ee.mjs`, crypto WASM → `dist/demo/` |
| `start-prod` | `build:demo` + `node dist/chat-slayer.cjs` |
| `start-prod:deploy` | Production-mode env checks + `node dist/chat-slayer.cjs` (run after `npm run build`) |
| `pkill` | Stop processes on port 8008 and stray vite-node/chat-slayer runs |
| `render:gen:env` | Generate Render Dashboard env vars (sections A–G; Section G = fingerprint hash verification — see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md#fingerprint-hash-verification)) |
| `render:deploy:test` | Preflight Render deploy (npm 10.9 lockfile + production build; run before push; prints two-phase TLS next steps) |
| `test` | Vitest-node unit tests |
| `lint` / `fix` / `typecheck` | See [STYLEGUIDE.md](STYLEGUIDE.md) |

### Code quality (Google TypeScript Style Guide)

The repo follows the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). See [STYLEGUIDE.md](STYLEGUIDE.md) for local notes.

```shell
npm run lint            # ESLint on **/*.{ts,tsx} (see eslint.config.cjs)
npm run fix             # gts fix (format + ESLint fixes via gts)
npm run typecheck       # tsc strict (including strictNullChecks)
npm run typecheck:test  # typecheck *.test.ts
```

### Build and run (production bundle)

**Local (simple):** after `cp .env.example .env`:

```shell
npm run build
npm run start-prod
```

Open http://localhost:8008/. JWT and client access use relaxed local defaults unless `NODE_ENV=production`.

**Production-like check** (strict env, same as Render):

```shell
npm run build
NODE_ENV=production \
BACKEND_JWT_SECRET="$(openssl rand -base64 48)" \
BACKEND_PUBLIC_URL=https://your-app.onrender.com \
ALLOWED_CLIENTS='[{"id":"web-demo","origins":["http://localhost:8008"],"allowWithoutOrigin":false}]' \
npm run start-prod:deploy
```

Set `ALLOWED_CLIENTS` as required in production — see [CLIENT_GUIDE.md](CLIENT_GUIDE.md).

Production output is `dist/chat-slayer.cjs` (CommonJS; the repo uses `"type": "module"` for source).

The server listens on `http://0.0.0.0:$PORT` (default `8008` when `PORT` is unset).

### Docker

```shell
export BACKEND_JWT_SECRET='your-secret-from-env'
export BACKEND_INITIAL_USERS='app:your-password'
docker-compose build
docker-compose up
```

- http://localhost:8008 — demo UI + API

### Deploy on Render

See **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** for blueprint steps, secrets, free-tier behavior, [fingerprint hash verification](RENDER_DEPLOYMENT.md#fingerprint-hash-verification), and post-deploy checks.

- Set `BACKEND_JWT_SECRET` (Secret) and `BACKEND_PUBLIC_URL` (`https://<your-service>.onrender.com`) in the Dashboard.
- Do **not** set `PORT` — Render injects it.
- Apply [render.yaml](render.yaml) or connect the repo as a Blueprint.
