# Demo web client

**Live interactive tutorial** at `/` (not a separate dev port): step-by-step sign-in → SSE stream → rooms → join → chat, with explorable architecture notes and CSS entry animations ([Una-style interactivity](https://una.im/2025-in-review), [`@starting-style` / `allow-discrete`](https://developer.chrome.com/blog/entry-exit-animations/)). Updates are **server-pushed over SSE only** — no Matrix `/sync` polling.

## Run

1. Copy `.env.example` to `.env` (optional `BACKEND_INITIAL_USERS=alice:devpassword` for a seed user)
2. `npm run dev` (copies demo assets, then starts the server)
3. Open http://localhost:8008/

After **Register** or **Login**, the page opens **one** `GET /demo/stream` per tab with `Authorization: Bearer <token>` (no token in the URL). Register/login/create/join/send return **short** `POST` SSE responses that `patchSignals` (status, `roomId`, room list on create/register). Live updates stay on the **same** keepalive stream via `cs` + `rooms` / `inbox` patches — same idea as [babylon-game-starter](https://github.com/EricEisaman/babylon-game-starter) `mp` events, without reconnecting.

All demo actions use `X-Chat-Slayer-Client-Id: web-demo` (see `ALLOWED_CLIENTS` when enforcement is on).

## SSE configuration

| Env var | Default | Purpose |
|---------|---------|---------|
| `DEMO_SSE_INACTIVE_RESYNC_MINUTES` | `10` | Push full room list + inbox catch-up after idle |
| `DEMO_SSE_IDLE_CHECK_INTERVAL_MS` | `30000` | How often idle subscribers are checked |
| `DEMO_SSE_KEEPALIVE` | `true` | Long-lived `/demo/stream` connection |

## Manual two-tab test

1. Tab A (alice): register/login, create room **Lobby**
2. Tab B (bob): register/login — room list should show **Lobby** without refresh
3. Bob clicks **Lobby** to join; alice sends a message — bob’s inbox updates over SSE

## Build only

```bash
npm run build:demo   # copies index.html + demo.css → dist/demo/
npm run build        # server bundle + demo
```

## Styling

[`demo.css`](demo.css) uses `contrast-color()` / `color-mix()` on the status area; see the repo README for browser notes.

## Client access

When `CLIENT_ACCESS_ENFORCED=true`, list `web-demo` with your public origin (e.g. `http://localhost:8008` locally, `https://<app>.onrender.com` on Render). Demo routes: `GET|POST /demo/stream`, `POST /demo/actions/*`. See [CLIENT_GUIDE.md](../CLIENT_GUIDE.md).
