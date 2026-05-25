![CHATSLAYER — Slash the silence. Own the chat.](resources/chat-slayer-banner.jpg)

# Chat Slayer

*Chat Slayer* is a lightweight, zero-dep [Matrix.org](https://matrix.org) chat server written in TypeScript. It targets **cloud deployment** (e.g. Render free tier): a single Node process, **in-memory** Matrix state by default, and no separate database. You can run it on a home network, but the product model is a small hosted chat API—not a federated “homeserver” appliance.

Matrix protocol terms in the codebase (e.g. `m.homeserver` in discovery JSON) follow the spec; user-facing docs use **chat server** / **server**.

Shared libraries live under `src/fi/cs/` (core, matrix, backend, node). The app compiles to one standalone JavaScript bundle; the only runtime dependency is Node.js (20.19+).

### Configuration and secrets

Copy [`.env.example`](.env.example) to `.env` for local development. **Never commit** `.env` or real secrets.

| Variable | Secret? | Notes |
|----------|---------|-------|
| `BACKEND_JWT_SECRET` | Yes on Render | Optional locally — a dev default is used if unset; set a 32+ char secret when `NODE_ENV=production` |
| `BACKEND_INITIAL_USERS` | Yes | Optional `user:password` pairs, `;`-separated |
| `BACKEND_EMAIL_CONFIG` | Often | SMTP URL may include credentials |
| `BACKEND_PUBLIC_URL` | No | Public Matrix client URL |
| `PORT` | No | Set by Render automatically — do not override in Dashboard |

Build-time constants (`BUILD_VERSION`, `BUILD_NODE_ENV`, etc.) are injected by Vite only. JWT and SMTP values are read at **runtime** from the environment.

To restrict which apps may use the Matrix API, see **[CLIENT_GUIDE.md](CLIENT_GUIDE.md)** (`ALLOWED_CLIENTS`, `X-Chat-Slayer-Client-Id`, demo under [`demo/`](demo/)).

### Local development

```shell
npm ci --include=dev
cp .env.example .env
# Edit .env — set BACKEND_JWT_SECRET to a local dev value
npm run dev
```

### Code quality (Google TypeScript Style Guide)

The repo follows the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). See [STYLEGUIDE.md](STYLEGUIDE.md) for local notes.

```shell
npm run lint          # ESLint (type-aware), entire src/** and demo/**
npm run fix           # gts format + ESLint --fix
npm run typecheck     # tsc strict (including strictNullChecks)
npm run typecheck:test  # optional: typecheck *.test.ts
```

### Demo web client

The demo UI is **served by the same server** as the Matrix API (no second port or `dev:demo` script).

```shell
npm run dev
```

Open http://localhost:8008/ — the page loads `/demo-config.json` so client id and server URL match [`ALLOWED_CLIENTS`](CLIENT_GUIDE.md). Health checks use `GET /health`.

### Build and run (production bundle)

**Local (simple):** after `cp .env.example .env`, run the built server — no Render secrets required:

```shell
npm run build
npm run start-prod
```

Open http://localhost:8008/ (demo + API). JWT and client access use relaxed local defaults unless `NODE_ENV=production`.

**Render-like check** (strict secrets, same as deploy):

```shell
NODE_ENV=production \
BACKEND_JWT_SECRET="$(openssl rand -base64 48)" \
BACKEND_PUBLIC_URL=https://your-app.onrender.com \
npm run start-prod:deploy
```

Production output is `dist/chat-slayer.cjs` (CommonJS bundle; required because the repo uses `"type": "module"`).

The server listens on `http://0.0.0.0:$PORT` (default port `8008` when `PORT` is unset).

### Docker

```shell
export BACKEND_JWT_SECRET='your-secret-from-env'
export BACKEND_INITIAL_USERS='app:your-password'
docker-compose build
docker-compose up
```

Services:

- http://localhost:8008 — demo UI + Matrix client API

### Deploy on Render (free web service)

See **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** for secrets, env vars, free-tier limits, and verification.

1. Connect this repository to Render (or apply [render.yaml](render.yaml)).
2. In the Render Dashboard, add **Secret** environment variables:
   - `BACKEND_JWT_SECRET` — strong random string
   - Optionally `BACKEND_INITIAL_USERS`, `BACKEND_EMAIL_CONFIG`
3. Set `BACKEND_PUBLIC_URL` to `https://<your-service>.onrender.com`.
4. Do **not** set `PORT` — Render injects it.
5. `FEDERATION_ENABLED` defaults to `false` (single HTTP port on free tier).

**Free tier notes:** 512 MB RAM, sleeps after ~15 minutes idle (cold start ~30–60s), no persistent disk (in-memory state resets on redeploy).
