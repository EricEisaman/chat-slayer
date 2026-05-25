# Demo web client

Browser UI at `/` on the same process and port as the API (default `http://localhost:8008/`). Uses [Datastar](https://data-star.dev/) for signals and SSE; optional E2EE via [`e2ee.mjs`](e2ee.mjs) and Matrix crypto WASM from `npm run build:demo`.

## What it does

- **Register / login** — Matrix-backed accounts; short `POST` responses patch signals (status, session).
- **One SSE stream per tab** — `GET /demo/stream` with `Authorization: Bearer <token>` keeps room list and inbox updated.
- **Mutations** — create room, register room group, join, send (via `POST /demo/actions/*`).
- **Logo** — `resources/chat-slayer-logo.png` and favicon are copied to `/assets/` on `build:demo`.

Room list and inbox updates use SSE (`cs` patches). They do not use Matrix `/sync` polling. E2EE may call `/sync` only for device-key exchange.

`window.__CS_DEMO_CONFIG__` is injected in the HTML at serve time (same fields as `/demo-config.json`). **E2EE is enabled by default** (`e2eeEnabled: true`); set `DEMO_E2EE_ENABLED=false` to force plaintext sends.

`privateRoomsEnabled` is `true` only when the server has `BACKEND_PRIVATE_ROOMS` set (no room names are exposed). Boot-seeded **public** rooms from `BACKEND_INITIAL_ROOMS` appear in the room list and in the **Active room** dropdown under **Public rooms** (green = private, blue = public in the closed picker and list).

## Run

1. From repo root: copy [`.env.example`](../.env.example) to `.env` (optional `BACKEND_INITIAL_USERS=alice:devpass123`).
2. `npm ci --include=dev`
3. `npm run dev` (runs `build:demo`, then starts the server)
4. Open http://localhost:8008/

If port 8008 is in use: `npm run pkill` from the repo root.

All demo actions send `X-Chat-Slayer-Client-Id: web-demo` when client access is enforced — see [CLIENT_GUIDE.md](../CLIENT_GUIDE.md).

## Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/` | GET | Demo HTML |
| `/demo.css`, `/assets/*`, `/favicon.ico` | GET | Static assets |
| `/e2ee.mjs`, `/crypto-sdk/*` | GET | E2EE module + WASM |
| `/demo-config.json` | GET | Public demo flags (`e2eeEnabled`, `privateRoomsEnabled`, client id, API base) — no client header |
| `/demo/stream` | GET | Long-lived SSE (`Authorization: Bearer`) |
| `/demo/actions/register` | POST | Register |
| `/demo/actions/login` | POST | Login |
| `/demo/actions/create-room` | POST | Create uniquely named room |
| `/demo/actions/register-rooms` | POST | Ensure many named rooms exist |
| `/demo/actions/join-room` | POST | Join `roomId` |
| `/demo/actions/send` | POST | Send message (plaintext or encrypted header) |
| `/health` | GET | Health check (no client id) |

## SSE configuration

| Env var | Default | Purpose |
|---------|---------|---------|
| `DEMO_SSE_INACTIVE_RESYNC_MINUTES` | `10` | Push full room list + inbox catch-up after idle |
| `DEMO_SSE_IDLE_CHECK_INTERVAL_MS` | `30000` | How often idle subscribers are checked |
| `DEMO_SSE_KEEPALIVE` | `true` | Long-lived `/demo/stream` connection |

## Two-tab test

1. Tab A (`alice`): register or login → create room **Sigma** (or pick an existing room).
2. Tab B (`bob`): register or login → wait for **SSE live** → pick the same room in the dropdown (triggers join) or send (server auto-joins).
3. Send from either tab — the other tab’s inbox should update on the open stream.

Default demo password in the form is `devpass123` (match `BACKEND_INITIAL_USERS` if you use a seed user).

## Build

```bash
npm run build:demo
```

Copies to `dist/demo/`: `index.html`, `demo.css`, `e2ee.mjs`, `assets/chat-slayer-logo.png`, `assets/chat-slayer-favicon.png`, `assets/chat-slayer-og.png` (1200×630 social preview), and `crypto-sdk/` (from `@matrix-org/matrix-sdk-crypto-wasm`).

### Social link previews (Open Graph)

`index.html` includes OG/Twitter meta; the server injects absolute `og:url` and `og:image` from `BACKEND_PUBLIC_URL` at runtime. After deploy, verify with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or the X Card Validator using `https://<your-service>.onrender.com/`.

```bash
npm run build   # server bundle + build:demo
```

## Client access

When `CLIENT_ACCESS_ENFORCED=true`, list `web-demo` with your public origin (e.g. `http://localhost:8008` locally, `https://<app>.onrender.com` on Render). See [CLIENT_GUIDE.md](../CLIENT_GUIDE.md).
