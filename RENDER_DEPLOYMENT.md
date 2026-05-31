# Deploying Chat Slayer on Render (free web service)

This guide matches the repo’s [render.yaml](render.yaml) blueprint and how the app reads configuration at **runtime** (never from the Vite build).

## Free-tier constraints (what the app expects)

| Render free tier | How Chat Slayer handles it |
|------------------|----------------------------|
| **One HTTP port** | Listens on `0.0.0.0` and `process.env.PORT` (injected by Render). Do **not** set `PORT` in the Dashboard. |
| **No second port** | `FEDERATION_ENABLED=false` in `render.yaml` (Matrix federation listener stays off). |
| **Ephemeral disk** | Matrix state is in-memory; redeploys and restarts clear users/rooms. Plan for `BACKEND_INITIAL_USERS` to re-seed if needed. |
| **Service sleeps when idle** | First request after ~15 min idle can take 30–60s (cold start). Health check path `/health` (see [render.yaml](render.yaml)). |
| **512 MB RAM** | Single Node process + bundled deps; avoid enabling federation or extra listeners. |
| **HTTPS at the edge** | Set `BACKEND_PUBLIC_URL` to `https://<your-service>.onrender.com` (required in production). |

## Quick deploy (Blueprint)

1. Push this repository to GitHub/GitLab.
2. In [Render](https://render.com) → **New** → **Blueprint** → connect the repo (uses `render.yaml`).
3. After the service is created, open **Environment** and add the variables in [Required Dashboard configuration](#required-dashboard-configuration) below.
4. Deploy. Build runs: `BUILD_NODE_ENV=production npm ci --include=dev && npm run build`. Start runs: `node dist/chat-slayer.cjs`.

Manual deploy (without Blueprint) is fine: create a **Web Service**, runtime **Node**, same build/start commands, same env rules.

## Required Dashboard configuration

Set these in **Environment** for the web service. Use **Secret** for sensitive values (Render encrypts at rest; values are not shown after save).

| Variable | Secret? | Required on Render | Value / notes |
|----------|---------|-------------------|---------------|
| `BACKEND_JWT_SECRET` | **Yes** | **Yes** | Random string, **at least 32 characters**. Signs Matrix access tokens. Validated only when **`NODE_ENV=production`** (set by Render). Local `npm run start-prod` does not require this. |
| `BACKEND_PUBLIC_URL` | No | **Yes** | Public HTTPS URL, e.g. `https://chat-slayer.onrender.com` (no trailing slash). Used for Matrix client discovery (`/_matrix/client/...`). Must be `https://` in production; localhost is rejected. |
| `BACKEND_HOSTNAME` | No | Recommended | Matrix server name host only, e.g. `chat-slayer.onrender.com` (same host as `BACKEND_PUBLIC_URL`, without `https://`). Defaults to `localhost` if unset (wrong for real clients). |
| `BACKEND_INITIAL_USERS` | **Yes** | Optional | Seed users: `user:password` or `user:password;user2:pass2`. Passwords are secrets; only needed if you want users recreated after each deploy (ephemeral memory). Required if you use `BACKEND_INITIAL_ROOMS` (public boot-seed). |
| `BACKEND_INITIAL_ROOMS` | No | Optional | Comma-separated **public** room display names. Boot-seeded at startup for the first seed user; visible to all users. |
| `BACKEND_PRIVATE_ROOMS` | No | Optional | Comma-separated **private** room display names. Hidden until each user discovers the exact name. Never logged by name (count only). |
| `BACKEND_ROOM_HISTORY_LIMIT` | No | Optional | Max recent messages per room on history fetch (default **20**). Demo join/switch and `GET /messages`. |
| `BACKEND_EMAIL_CONFIG` | **Yes** (often) | Optional | SMTP URL, e.g. `smtps://user:pass@smtp.example.com:465`. May embed credentials — always use a Secret. Default `smtp://localhost:25` is not useful on Render unless you add SMTP elsewhere. |
| `BACKEND_EMAIL_FROM` | No | Optional | From header, e.g. `Chat Slayer <noreply@yourdomain.com>`. |
| `BACKEND_JWT_ALG` | No | Optional | Default `HS256`. |
| `BACKEND_DEFAULT_LANGUAGE` | No | Optional | Default `en`. |
| `BACKEND_ACCESS_TOKEN_EXPIRATION_TIME` | No | Optional | Minutes; default `3600`. |
| `BACKEND_LOG_LEVEL` | No | Optional | Blueprint sets `INFO`. Use `DEBUG` only while troubleshooting. |
| `ALLOWED_CLIENTS` | No | **Yes** (production) | JSON array of allowed client ids and browser origins. Required when client access is enforced (default in production). See [CLIENT_GUIDE.md](CLIENT_GUIDE.md). |
| `CLIENT_ACCESS_ENFORCED` | No | Optional | Default `true` in production. Set `false` only if you intentionally disable the client gate. |

### Do not set on Render (unless you know why)

| Variable | Reason |
|----------|--------|
| `PORT` | **Injected by Render.** Overriding it breaks routing/health checks. |
| `BACKEND_URL` | Defaults to `http://0.0.0.0:$PORT` — correct for binding inside the container. |
| `FEDERATION_ENABLED` | Blueprint sets `false`. Free tier cannot expose a second federation port. |
| `FEDERATION_PORT` / `FEDERATION_URL` | Only relevant if federation were enabled (not supported on free tier here). |
| Secrets in `render.yaml` | Never commit JWT, SMTP passwords, or user passwords to git. |

## Already set by `render.yaml` (safe, non-secret)

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Enables production JWT/public URL checks at startup. |
| `NODE_VERSION` | `22.12.0` | Matches [.node-version](.node-version). |
| `BACKEND_LOG_LEVEL` | `INFO` | Less verbose logs on free tier. |
| `FEDERATION_ENABLED` | `false` | Single listener only. |
| `BACKEND_PUBLIC_URL` | `sync: false` | Placeholder for Blueprint; **you must set the real HTTPS URL in the Dashboard**. |

## Security model (triple-checked)

1. **No secrets in the build** — Vite only substitutes non-secret `BUILD_*` metadata ([vite.config.ts](vite.config.ts), [src/constants/build.ts](src/constants/build.ts)). JWT and SMTP come from `process.env` at runtime ([src/constants/runtime.ts](src/constants/runtime.ts)).
2. **Production fail-fast** — [src/config/validateEnv.ts](src/config/validateEnv.ts) runs before the server listens when `NODE_ENV=production` or the bundle was built with `BUILD_NODE_ENV=production` (set in the Render build command).
3. **Render env wins over `.env`** — If a `.env` file existed on disk, `ProcessUtils` merges it but **existing `process.env` (Dashboard) overrides** file values.
4. **No `.env` in the image** — `.env` is gitignored; do not add one in Render’s file editor for production.
5. **Placeholder blocklist** — Values like `change-me-in-render-dashboard` from [.env.example](.env.example) are rejected in production (example file is for local dev only).
6. **Repo scanning** — [.github/workflows/gitleaks.yml](.github/workflows/gitleaks.yml) runs on push/PR to catch accidental secret commits.

### Generate Dashboard env vars (recommended)

From the repo root, run the local generator. It prints **colored sections A–F** that map to the Render UI (which vars to skip, which need **Secret** on, and what to copy into each field):

```bash
npm run render:gen:env
npm run render:gen:env -- --write   # also writes plain .env.render for "Add from .env"
```

| Section | Render Dashboard |
|---------|------------------|
| **A** | Skip — already in [render.yaml](render.yaml) |
| **B** | Environment → **+ Add Environment Variable**, Secret **OFF** |
| **C** | Same, Secret **ON** (`BACKEND_JWT_SECRET`, optional seed) |
| **D** | **Add from .env** — paste `--- BEGIN .env ---` block |
| **E** | Do not set (`PORT`, etc.) |
| **F** | Manual (`BACKEND_EMAIL_CONFIG` if needed) |

Options: `--service <slug>`, `--url https://…`, `--seed user:pass`, `--no-color`. Values to paste are printed on **plain lines** (no ANSI) for easy copy.

### Generate a JWT secret (manual alternative)

```bash
openssl rand -base64 48
```

Paste the output into Render → Environment → `BACKEND_JWT_SECRET` → **Secret**.

## Build and start commands (must match)

| Phase | Command |
|-------|---------|
| Build | `BUILD_NODE_ENV=production npm ci --include=dev && npm run build` |
| Start | `node dist/chat-slayer.cjs` |

`npm ci --include=dev` is required because `NODE_ENV=production` would otherwise skip Vite (a devDependency). The production **runtime** still uses only `dependencies` after build.

### Pre-deploy (run before every push)

```bash
npm run render:deploy:test
```

This mirrors Render’s **Node 22.12 / npm 10.9** install and [render.yaml](render.yaml) production build: lockfile `npm ci`, `BUILD_NODE_ENV=production npm run build`, artifact checks, and Dockerfile runner `npm ci --omit=dev`. Use `--clean` for a cold install, `--docker` to also run `docker build`.

Then generate Dashboard secrets if needed:

```bash
npm run render:gen:env
```

Optional quality gates:

```bash
npm run lint
npm run typecheck
npm test
```

If local port 8008 is stuck after a dev session: `npm run pkill`.

Regenerate the lockfile with the same npm Render uses if step 1 fails:

```bash
rm -rf node_modules && npx -y npm@10.9.0 install
```

See [STYLEGUIDE.md](STYLEGUIDE.md) and [README.md](README.md) for the Google TypeScript Style Guide tooling (`npm run fix` for formatting).

## Health checks

- Render `healthCheckPath: /health` → `GET /health` returns `{"status":"ok"}` (no auth). The demo UI is at `GET /` on the same URL as the API.
- Ensure the service is **Live** before testing Matrix clients.

## Verify after deploy

1. **Logs** — No `BACKEND_JWT_SECRET must be...` or `BACKEND_PUBLIC_URL must be...` errors; expect `Started at http://0.0.0.0:<PORT>`.
2. **Health** — `curl -s https://<your-service>.onrender.com/health` → `{"status":"ok"}`.
3. **Demo** — open `https://<your-service>.onrender.com/` in a browser (built-in client; uses `web-demo` + same origin).
4. **Matrix discovery** — `curl -s https://<your-service>.onrender.com/_matrix/client/r0/login` (or your login route) should not reference `localhost`.
5. **Secrets** — Confirm Dashboard variables are marked **Secret** where applicable; rotate `BACKEND_JWT_SECRET` if it was ever committed.

## Local production-like test (before Render)

```bash
npm ci --include=dev
BUILD_NODE_ENV=production npm run build
PORT=10000 \
NODE_ENV=production \
BACKEND_JWT_SECRET="$(openssl rand -base64 48)" \
BACKEND_PUBLIC_URL=https://chat-slayer.onrender.com \
BACKEND_HOSTNAME=chat-slayer.onrender.com \
ALLOWED_CLIENTS='[{"id":"web-demo","origins":["http://localhost:8008"],"allowWithoutOrigin":false}]' \
FEDERATION_ENABLED=false \
node dist/chat-slayer.cjs
```

```bash
curl -s http://127.0.0.1:10000/
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Build log shows **Dockerfile** / `npm ci` exit 1 | Service uses **Docker** runtime, or **lockfile out of sync** with npm 10.9 | Run `npm run render:deploy:test`. If step 1 fails: `npx -y npm@10.9.0 install` and commit `package-lock.json`. Or set **Runtime** to **Node** in Dashboard. |
| `Missing: @emnapi/core from lock file` | Lockfile generated with npm 11+ only | `rm -rf node_modules && npx -y npm@10.9.0 install`, commit lockfile, rerun `render:deploy:test`. |
| Build fails: `vite: not found` | Dev deps skipped | Use `npm ci --include=dev` in build (already in blueprint). |
| Immediate exit on start | Missing/weak `BACKEND_JWT_SECRET` or bad `BACKEND_PUBLIC_URL` | Set Secret JWT (32+ chars) and HTTPS public URL in Dashboard. |
| Health check failed | App not binding to `PORT` | Remove custom `PORT` / `BACKEND_URL` overrides; redeploy. |
| Matrix clients see `localhost` | `BACKEND_PUBLIC_URL` / `BACKEND_HOSTNAME` unset | Set both to your `*.onrender.com` host. |
| Users gone after deploy | Ephemeral memory | Expected on free tier; use `BACKEND_INITIAL_USERS` or external store (not in this guide). |
| Email auth fails | SMTP not reachable from Render | Use a real provider URL in `BACKEND_EMAIL_CONFIG` (Secret). |

## Allowed clients on Render

Production enforces the client gate by default. The **built-in demo UI** is served from the **same** web service at `https://<your-service>.onrender.com/` (not a separate static site). Example `ALLOWED_CLIENTS`:

```json
[
  {
    "id": "web-demo",
    "origins": ["https://your-service.onrender.com"],
    "allowWithoutOrigin": false
  },
  {
    "id": "ops-cli",
    "allowWithoutOrigin": true
  }
]
```

Replace `your-service` with your Render hostname. The server also adds `BACKEND_PUBLIC_URL` to `web-demo` origins when that client is listed.

On each deploy/start, the service logs **client access enforcement** and every allowed **client id** with its **origins** list (and whether `allowWithoutOrigin` is set). When preconfigured rooms are configured, logs also show **counts** only, for example `Preconfigured public rooms: N (boot-seeded)` and `Preconfigured private room names: M (hidden until discovered)` — never secret room names. Check Render **Logs** right after boot to confirm your Dashboard env matches what the process loaded.

### v0.0.1 migration (room env vars)

If you previously set `BACKEND_INITIAL_ROOMS` for **secret** rooms:

1. Copy those names into **`BACKEND_PRIVATE_ROOMS`** in the Dashboard.
2. Use **`BACKEND_INITIAL_ROOMS`** only for public lobby-style rooms (with **`BACKEND_INITIAL_USERS`**).
3. Save and redeploy.

See [CLIENT_GUIDE.md](CLIENT_GUIDE.md#migration-v001-room-env-vars).

- External browser UIs need their exact HTTPS origin in `origins`.
- Scripts use `X-Chat-Slayer-Client-Id: ops-cli` without an `Origin` header when `allowWithoutOrigin` is `true`.
- `GET /health` and static demo assets do not require a client id; Matrix API routes and demo API routes do when enforcement is on.

Full details: [CLIENT_GUIDE.md](CLIENT_GUIDE.md).

## Related files

- [render.yaml](render.yaml) — Blueprint
- [.env.example](.env.example) — Local dev template (not used on Render)
- [CLIENT_GUIDE.md](CLIENT_GUIDE.md) — Allowed clients and web demo
- [README.md](README.md) — General project overview
- [Dockerfile](Dockerfile) — Optional Docker deploy (docker-compose; multi-stage). Blueprint uses **native Node**, not Docker, unless you change runtime in the Dashboard.
