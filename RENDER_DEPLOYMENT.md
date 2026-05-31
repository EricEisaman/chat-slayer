# Deploying Chat Slayer on Render (free web service)

> **Deploy failed with `BACKEND_TLS_FINGERPRINT_SHA256 is required`?**  
> Render Dashboard → **Environment** → paste from [`scripts/render-dashboard-phase1.env`](scripts/render-dashboard-phase1.env) (`BACKEND_TLS_PIN_ENFORCED=false`) → **Save, rebuild, and deploy**.  
> After the service is **Live**, paste [`scripts/render-dashboard-phase2.env`](scripts/render-dashboard-phase2.env) for TLS fingerprint verification (or run `npm run render:gen:env -- --url https://<your-service>.onrender.com --write`).

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
4. **First deploy:** include `BACKEND_TLS_PIN_ENFORCED=false` (see [Two-phase deploy checklist](#two-phase-deploy-checklist-tls-fingerprint)). You cannot generate the TLS pin until HTTPS is live.
5. Deploy. Build runs: `BUILD_NODE_ENV=production npm ci --include=dev && npm run build`. Start runs: `node dist/chat-slayer.cjs`.
6. **Second deploy:** after the service is Live, run `npm run render:gen:env -- --url https://<your-service>.onrender.com`, paste the TLS pin vars from Sections **B** and **G**, set `BACKEND_TLS_PIN_ENFORCED=true`, Save → redeploy.

Manual deploy (without Blueprint) is fine: create a **Web Service**, runtime **Node**, same build/start commands, same env rules.

## Two-phase deploy checklist (TLS fingerprint)

Production **defaults** to TLS pin enforcement (`BACKEND_TLS_PIN_ENFORCED=true`). Without `BACKEND_TLS_FINGERPRINT_SHA256`, the process **exits on startup**. Because the pin comes from your live HTTPS certificate, use two phases:

| Phase | When | Dashboard env (minimum) |
|-------|------|-------------------------|
| **1 — First deploy** | Service does not exist yet (or HTTPS not reachable) | `BACKEND_JWT_SECRET`, `BACKEND_PUBLIC_URL`, `BACKEND_HOSTNAME`, `ALLOWED_CLIENTS`, **`BACKEND_TLS_PIN_ENFORCED=false`** |
| **2 — Enable pinning** | After `GET /health` succeeds on your public URL | Run `npm run render:gen:env -- --url https://<your-service>.onrender.com`. Add **`BACKEND_TLS_FINGERPRINT_SHA256`**, update **`ALLOWED_CLIENTS`** (`expectedTlsFingerprintSha256` on `web-demo`), set **`BACKEND_TLS_PIN_ENFORCED=true`**, redeploy |

**Generate pin (phase 2):**

```bash
npm run render:deploy:test          # preflight build (before every push)
npm run render:gen:env -- --url https://your-service.onrender.com
```

When the live TLS probe succeeds, **Section B** auto-includes `BACKEND_TLS_FINGERPRINT_SHA256`, `BACKEND_TLS_PIN_ENFORCED=true`, and `expectedTlsFingerprintSha256` inside `ALLOWED_CLIENTS`. **Section G** always prints the OpenSSL command and [GRC fingerprints](https://www.grc.com/fingerprints.htm) link for independent verification.

**First-deploy `ALLOWED_CLIENTS` example (no pin yet):**

```json
[
  {
    "id": "web-demo",
    "label": "Web demo",
    "origins": ["https://your-service.onrender.com"],
    "allowWithoutOrigin": false
  },
  {
    "id": "ops-cli",
    "label": "CLI",
    "origins": [],
    "allowWithoutOrigin": true
  }
]
```

After phase 2, the same `web-demo` entry should include `"expectedTlsFingerprintSha256": "<64 hex SPKI SHA-256>"` matching `BACKEND_TLS_FINGERPRINT_SHA256`.

## Fingerprint hash verification

Chat Slayer uses a **TLS SPKI SHA-256** hash (64 lowercase hex characters) — not the whole-certificate fingerprint — so the pin survives leaf cert renewal when the key is reused ([GRC-style](https://www.grc.com/fingerprints.htm)).

Verification runs at **three layers**. All three must agree on the same hash when pinning is enabled:

| Layer | When | What is checked | On mismatch |
|-------|------|-----------------|-------------|
| **Server (startup)** | Every boot | Live TLS probe to `BACKEND_PUBLIC_URL` vs `BACKEND_TLS_FINGERPRINT_SHA256` (and optional backup pin) | Process **exits** — deploy blocked |
| **Client (browser demo)** | First page load | `GET /.well-known/chat-slayer.json` + header `X-Chat-Slayer-TLS-Fingerprint-SHA256` vs `expectedTlsFingerprintSha256` in `ALLOWED_CLIENTS` / `__CS_DEMO_CONFIG__` | User **alert**, UI **blocked**, `POST /demo/actions/report-tls-pin-failure`, client id **disabled** |
| **Operator (manual)** | After phase 2 deploy | Gold-standard pin from [GRC fingerprints](https://www.grc.com/fingerprints.htm) or OpenSSL vs Dashboard + live endpoint | Fix env / investigate MITM before enabling clients |

### Server startup verification

On boot the server:

1. Connects to `BACKEND_PUBLIC_URL` over TLS and computes the live **SPKI SHA-256**.
2. Compares it to `BACKEND_TLS_FINGERPRINT_SHA256` (accepts `BACKEND_TLS_FINGERPRINT_BACKUP_SHA256` during rotation).
3. Logs `TLS SPKI SHA-256 fingerprint: <hash>` on success.
4. **Fail-fast exits** if pin enforcement is on and the configured pin does not match the live certificate.

### Client verification (browser demo)

When `BACKEND_TLS_PIN_ENFORCED=true` and `expectedTlsFingerprintSha256` is set, [`demo/fingerprint.mjs`](demo/fingerprint.mjs) runs before login:

1. Fetches `/.well-known/chat-slayer.json` (also reads response header `X-Chat-Slayer-TLS-Fingerprint-SHA256`).
2. Compares the observed hash to the **gold-standard** expected pin from Dashboard `ALLOWED_CLIENTS` (not from the page alone).
3. Optional **trust-on-first-use**: stores the first seen pin in `localStorage`; alerts if the server pin changes on a later visit.
4. On mismatch: browser alert, API calls blocked, security report sent, `web-demo` disabled server-side until restart.

Full client details: [CLIENT_GUIDE.md — TLS fingerprint pinning](CLIENT_GUIDE.md#tls-fingerprint-pinning-grc-style).

### Operator verification (run after phase 2)

Confirm the live service matches your Dashboard pin:

```bash
# 1. Well-known document (what clients read)
curl -s https://<your-service>.onrender.com/.well-known/chat-slayer.json

# 2. Response header (same hash)
curl -sI https://<your-service>.onrender.com/health | grep -i x-chat-slayer-tls-fingerprint

# 3. Independent gold-standard (compare to BACKEND_TLS_FINGERPRINT_SHA256)
openssl s_client -connect <your-service>.onrender.com:443 -servername <your-service>.onrender.com </dev/null 2>/dev/null \
  | openssl x509 -pubkey -noout \
  | openssl pkey -pubin -outform der \
  | openssl dgst -sha256
```

Also verify at [https://www.grc.com/fingerprints.htm](https://www.grc.com/fingerprints.htm) from a trusted network. All three sources should show the **same 64-character hex hash**.

### What gets published

| Source | Field / header |
|--------|----------------|
| `GET /.well-known/chat-slayer.json` | `tlsFingerprintSha256`, `tlsFingerprintBackupSha256`, `pinEnforced` |
| Every HTTP response | Header `X-Chat-Slayer-TLS-Fingerprint-SHA256` |
| Demo inline config | `window.__CS_DEMO_CONFIG__.expectedTlsFingerprintSha256` |

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
| `BACKEND_TLS_FINGERPRINT_SHA256` | No | **Phase 2** (required when pin enforced) | TLS **SPKI SHA-256** pin (64 hex). Server probes `BACKEND_PUBLIC_URL` at startup and publishes via `/.well-known/chat-slayer.json`. Generate after first deploy — see [Two-phase deploy checklist](#two-phase-deploy-checklist-tls-fingerprint). |
| `BACKEND_TLS_FINGERPRINT_BACKUP_SHA256` | No | Optional | Backup pin for certificate rotation overlap. |
| `BACKEND_TLS_PIN_ENFORCED` | No | **Phase 1: set `false`** | Default `true` in production if unset. **First deploy:** set `false` until pin is configured. **Phase 2:** set `true` after `BACKEND_TLS_FINGERPRINT_SHA256` and `expectedTlsFingerprintSha256` are set. |
| `BACKEND_AUTO_DISABLE_ON_PIN_FAILURE` | No | Optional | Default `true` in production. When a client reports a pin mismatch, that client id is disabled in-memory until restart. |

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

### TLS fingerprint pinning (GRC-style)

See **[Fingerprint hash verification](#fingerprint-hash-verification)** for how server, client, and operator checks work.

Render terminates TLS at the edge; the Node process probes your public HTTPS URL at startup and compares the live **SPKI SHA-256** to `BACKEND_TLS_FINGERPRINT_SHA256`. Clients validate the published pin on first request; a mismatch triggers a security alert and disables that client id until restart.

Follow the [two-phase deploy checklist](#two-phase-deploy-checklist-tls-fingerprint) above. Summary:

1. **Phase 1** — deploy with `BACKEND_TLS_PIN_ENFORCED=false`.
2. **Phase 2** — `npm run render:gen:env -- --url https://<your-service>.onrender.com`; paste pin into Dashboard; redeploy with `BACKEND_TLS_PIN_ENFORCED=true`.
3. Verify independently via [GRC fingerprints](https://www.grc.com/fingerprints.htm) (gold-standard out-of-band check).
4. For certificate rotation, set `BACKEND_TLS_FINGERPRINT_BACKUP_SHA256` before rotating, then swap primary/backup after cutover.

Local dev (`http://localhost`) skips pin enforcement by default.

### Generate Dashboard env vars (recommended)

From the repo root, run the local generator. It prints **colored sections A–G** that map to the Render UI (which vars to skip, which need **Secret** on, and what to copy into each field):

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
| **G** | **Fingerprint hash verification** — OpenSSL + [GRC fingerprints](https://www.grc.com/fingerprints.htm); see [RENDER_DEPLOYMENT.md § Fingerprint hash verification](RENDER_DEPLOYMENT.md#fingerprint-hash-verification) |

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

**TLS fingerprint (after first Live deploy):**

```bash
npm run render:gen:env -- --url https://<your-service>.onrender.com
```

Paste Sections **B** + **C** (and **G** if the live probe failed). See [Two-phase deploy checklist](#two-phase-deploy-checklist-tls-fingerprint).

For a brand-new service (no HTTPS yet), generate JWT + clients only:

```bash
npm run render:gen:env
# Use Section B/C; set BACKEND_TLS_PIN_ENFORCED=false manually for phase 1
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

1. **Logs** — No `BACKEND_JWT_SECRET must be...` or `BACKEND_PUBLIC_URL must be...` errors; expect `Started at http://0.0.0.0:<PORT>`. After phase 2, expect `TLS SPKI SHA-256 fingerprint: <64 hex>`.
2. **Health** — `curl -s https://<your-service>.onrender.com/health` → `{"status":"ok"}`.
3. **TLS fingerprint verification** — `curl -s https://<your-service>.onrender.com/.well-known/chat-slayer.json` → `tlsFingerprintSha256` matches Dashboard `BACKEND_TLS_FINGERPRINT_SHA256` and [operator OpenSSL/GRC check](#operator-verification-run-after-phase-2).
4. **Demo** — open `https://<your-service>.onrender.com/` in a browser (built-in client; uses `web-demo` + same origin). No TLS alert on load = client verification passed.
5. **Matrix discovery** — `curl -s https://<your-service>.onrender.com/_matrix/client/r0/login` (or your login route) should not reference `localhost`.
6. **Secrets** — Confirm Dashboard variables are marked **Secret** where applicable; rotate `BACKEND_JWT_SECRET` if it was ever committed.

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
| Immediate exit: `BACKEND_TLS_FINGERPRINT_SHA256 is required` | Pin enforcement on before pin configured | **Phase 1:** set `BACKEND_TLS_PIN_ENFORCED=false`, deploy. **Phase 2:** run `render:gen:env -- --url https://…`, add pin, set enforcement `true`. |
| Exit: configured pin does not match live SPKI | Stale/wrong pin in Dashboard | Re-run `npm run render:gen:env -- --url https://…`; update `BACKEND_TLS_FINGERPRINT_SHA256` and `expectedTlsFingerprintSha256`. |
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
    "allowWithoutOrigin": false,
    "expectedTlsFingerprintSha256": "<64 hex — add in phase 2 via render:gen:env>"
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
