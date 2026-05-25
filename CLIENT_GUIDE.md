# Chat Slayer client guide

Chat Slayer can restrict which applications may call Matrix client APIs. Each registered client has an **id** and optional **allowed origins** (for browsers). Every request must include the header:

```http
X-Chat-Slayer-Client-Id: <your-client-id>
```

Render health checks (`GET /health`) and demo static assets (`GET /`, `/demo.css`, `/assets/*`, `/demo-config.json`, `/favicon.ico`, `/e2ee.mjs`, `/crypto-sdk/*`) are exempt and do not need this header. Demo **API** routes (`GET /demo/stream`, `POST /demo/actions/*`) require `X-Chat-Slayer-Client-Id` when enforcement is on (same as Matrix APIs).

## Environment variables

| Variable | Description |
|----------|-------------|
| `ALLOWED_CLIENTS` | JSON array of client entries (see below). |
| `CLIENT_ACCESS_ENFORCED` | `true` or `false`. Default: `true` in production, `false` in development when unset. |

**Development (permissive):** leave `ALLOWED_CLIENTS` unset and `CLIENT_ACCESS_ENFORCED` unset — all clients are allowed.

**Production:** set `ALLOWED_CLIENTS` with at least one entry when enforcement is on (required on Render; see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)).

## Client entry schema

```json
{
  "id": "web-demo",
  "label": "Demo web UI",
  "origins": ["http://localhost:8008", "https://myapp.example.com"],
  "allowWithoutOrigin": false
}
```

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | Yes | Value for `X-Chat-Slayer-Client-Id`. Unique in the list. |
| `label` | No | Human-readable name (logs/docs only). |
| `origins` | No | Browser origins allowed for this client (`scheme://host:port`). |
| `allowWithoutOrigin` | No | Default `false`. If `true`, allows curl/scripts with only the client id header (no `Origin`). |

### Browser (web) client

- Set `allowWithoutOrigin` to `false`.
- List every origin that will host your UI (for the built-in demo, use the server URL, e.g. `http://localhost:8008` or `https://<app>.onrender.com`).
- Send `X-Chat-Slayer-Client-Id` on **every** request (including login).
- The server returns CORS headers only for allowed origins.

### Script / CLI client

- Set `allowWithoutOrigin` to `true`.
- Send `X-Chat-Slayer-Client-Id` on every request.
- No `Origin` header is required.

## Example `ALLOWED_CLIENTS` (local + script)

One-line for `.env` (escape quotes as needed) or Render Dashboard:

```json
[
  {
    "id": "web-demo",
    "label": "Web demo",
    "origins": ["http://localhost:8008"],
    "allowWithoutOrigin": false
  },
  {
    "id": "ops-cli",
    "label": "curl / automation",
    "origins": [],
    "allowWithoutOrigin": true
  }
]
```

## Configure the server

### Local development

In `.env` (from [`.env.example`](.env.example)):

```env
CLIENT_ACCESS_ENFORCED=true
ALLOWED_CLIENTS=[{"id":"web-demo","origins":["http://localhost:8008"],"allowWithoutOrigin":false},{"id":"ops-cli","allowWithoutOrigin":true}]
```

Start the server:

```bash
npm run dev
```

### Render (production)

1. Dashboard → your web service → **Environment**.
2. Set `BACKEND_PUBLIC_URL` to `https://<your-service>.onrender.com`.
3. Add `ALLOWED_CLIENTS` if you need extra clients; the built-in demo at `/` uses client id `web-demo`. The server **adds `BACKEND_PUBLIC_URL` to `web-demo` origins** when that client is listed.
4. If `ALLOWED_CLIENTS` is omitted, production still registers `web-demo` for the public URL origin (same-origin demo).
5. Redeploy after changes.

Health checks: `GET /health` (not `/`).

## Web client example (Datastar + SSE)

Source: [demo/](demo/) — served at `/` on the same process as the API. Uses [Datastar](https://data-star.dev/) (CDN) and [`@starfederation/datastar-sdk`](https://github.com/starfederation/datastar-typescript) on the server. Signal events use a `cs` envelope (`{ cs: { name, payload } }`), similar to `mp` in [babylon-game-starter](https://github.com/EricEisaman/babylon-game-starter).

```bash
npm run dev
```

Open http://localhost:8008/ on the **same origin** as the API. Use **Register** or **Login** with optional `BACKEND_INITIAL_USERS` (password must match seed, e.g. `alice:devpass123`).

**Live updates:** room list and inbox use **Datastar SSE** (`GET /demo/stream`, `cs` patches) — not Matrix `/sync` polling for the UI.

**Optional E2EE:** [`demo/e2ee.mjs`](demo/e2ee.mjs) may call `GET /_matrix/client/r0/sync` for Olm/Megolm device keys only. Sends use `POST /demo/actions/send` with optional `X-Demo-Encrypted-Event`. Requires `npm run build:demo` (copies `crypto-sdk/`). See [demo/README.md](demo/README.md).

The access token is sent as `Authorization: Bearer …` (not in the URL).

| Demo route | Purpose |
|------------|---------|
| `POST /demo/actions/register` | Register; returns SSE `patchSignals` + session |
| `POST /demo/actions/login` | Login |
| `POST /demo/actions/create-room` | Create uniquely named room (`roomName` signal) |
| `POST /demo/actions/discover-private-room` | Open a preconfigured private room by exact display name (`X-Demo-Room-Name`) |
| `POST /demo/actions/register-rooms` | Ensure many rooms exist (`roomNames` comma-separated or array); reuses existing names |
| `POST /demo/actions/join-room` | Join selected `roomId` |
| `POST /demo/actions/send` | Send message to `roomId` |
| `GET /demo/stream` | Long-lived SSE: room directory, messages, idle resync (`Authorization: Bearer`) |

SSE `cs.name` values: `room-directory`, `room-message`, `session`, `error`.

Optional env: `DEMO_SSE_INACTIVE_RESYNC_MINUTES`, `DEMO_SSE_IDLE_CHECK_INTERVAL_MS`, `DEMO_SSE_KEEPALIVE` (see [demo/README.md](demo/README.md)).

### Demo action headers (same-origin browser)

The demo UI often sends these on `POST /demo/actions/*` (in addition to Datastar signal bodies) to avoid signal sync races:

| Header | Purpose |
|--------|---------|
| `X-Demo-Room-Id` | Active room for join/send |
| `X-Demo-Room-Name` | Create-room display name |
| `X-Demo-Room-Names` | Comma-separated names for register-rooms |
| `X-Demo-Message` | Plaintext message (when not using E2EE) |
| `X-Demo-Encrypted-Event` | JSON encrypted event body from `e2ee.mjs` |

Same-origin requests to `http://localhost:8008/` do not need extra CORS configuration for these headers.

Matrix REST (`/_matrix/client/...`) remains available for programmatic clients (curl, SDKs) with `X-Chat-Slayer-Client-Id`.

### Register a group of rooms (idempotent)

`POST /_matrix/client/r0/rooms/register` ensures every listed display name exists. Names already registered (case-insensitive) are returned with `"created": false` and the existing `room_id`; only missing names are allocated. The caller is joined to each room. Duplicate names in one request are deduplicated.

```bash
curl -s -X POST "http://localhost:8008/_matrix/client/r0/rooms/register" \
  -H "Content-Type: application/json" \
  -H "X-Chat-Slayer-Client-Id: ops-cli" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"names":["Lobby","Team Chat","Lobby"]}'
```

Example response:

```json
{
  "rooms": [
    { "name": "Lobby", "room_id": "!lobby:localhost", "created": true },
    { "name": "Team Chat", "room_id": "!team-chat:localhost", "created": true },
    { "name": "Lobby", "room_id": "!lobby:localhost", "created": false }
  ]
}
```

Single-room `POST /_matrix/client/r0/createRoom` still returns **409** if `name` is already taken (strict create).

## Create an account (Matrix registration)

Registration follows the [Matrix Client-Server API](https://spec.matrix.org/latest/client-server-api/#post_matrixclientv3register): the first request **without** `auth` returns **HTTP 401** with `flows` and `session`; the client retries with `auth: { type: "m.login.dummy", session }` plus `username` and `password` in the body (not as a UIA password stage).

| Step | Request | Response |
|------|---------|----------|
| 1 | `POST /_matrix/client/r0/register?kind=user` — `username`, `password`, no `auth` | **401** `{ "flows": [{ "stages": ["m.login.dummy"] }], "session": "…", "params": {} }` |
| 2 | Same URL — `auth: { "type": "m.login.dummy", "session": "…" }`, `username`, `password` | **200** `{ "user_id", "access_token", "device_id", "home_server" }` |

Common errcodes: `M_USER_IN_USE` (409), `M_INVALID_USERNAME` (400). Sending `auth.type` of `m.login.password` on register returns **400** (`M_UNKNOWN`).

Optional seed users (local demo only): `BACKEND_INITIAL_USERS=alice:devpass123` in `.env` — matches the demo form default password. Not required for open registration.

### Preconfigured private rooms (server-enforced)

Set `BACKEND_INITIAL_ROOMS=NameOne,NameTwo` (comma-separated display names). The server **never** exposes those names in `/demo-config.json`, unscoped room listings, or another user’s SSE directory. A user only sees a room after submitting the **exact** name via `discover-private-room`, create/register with that name, or Matrix `POST /_matrix/client/r0/rooms/register` including that name.

Even with a `room_id`, `join` and `send` return **404 Room not found** until that user has discovered the name. `/demo-config.json` only includes `privateRoomsEnabled: true` when the env var is set (no name list).

### curl (step 1 + 2)

```bash
# Step 1 — UIA challenge
curl -s -w "\n%{http_code}\n" -X POST "http://localhost:8008/_matrix/client/r0/register?kind=user" \
  -H "Content-Type: application/json" \
  -H "X-Chat-Slayer-Client-Id: ops-cli" \
  -d '{"username":"myuser","password":"mysecret12"}'

# Step 2 — complete dummy auth (replace SESSION from step 1)
curl -s -X POST "http://localhost:8008/_matrix/client/r0/register?kind=user" \
  -H "Content-Type: application/json" \
  -H "X-Chat-Slayer-Client-Id: ops-cli" \
  -d '{"username":"myuser","password":"mysecret12","auth":{"type":"m.login.dummy","session":"SESSION"}}'
```

Production: add rate limiting and persistent storage; in-memory accounts reset on restart.

## Test with curl

Allow CLI client `ops-cli` with `allowWithoutOrigin: true`.

Login:

```bash
curl -s -X POST "http://localhost:8008/_matrix/client/r0/login" \
  -H "Content-Type: application/json" \
  -H "X-Chat-Slayer-Client-Id: ops-cli" \
  -d '{"type":"m.login.password","identifier":{"type":"m.id.user","user":"alice"},"password":"devpass123"}'
```

Without the header (when enforcement is on):

```bash
curl -s "http://localhost:8008/_matrix/client/r0/login" -X POST -H "Content-Type: application/json" -d '{}'
# → 403 M_FORBIDDEN
```

## Troubleshooting

| Problem | Cause | Fix |
|---------|--------|-----|
| CORS error in browser | Origin not in `origins` for that `id` | Add exact origin (scheme + host + port). |
| `403 Client not allowed` | Missing/wrong `X-Chat-Slayer-Client-Id` | Match an `id` in `ALLOWED_CLIENTS`. |
| `403` with Origin message | Browser origin not listed | Add origin to the client entry. |
| Server exits on startup (production) | Empty/invalid `ALLOWED_CLIENTS` | Set valid JSON with ≥1 client. |
| Health check fails on Render | Wrong health path | Use `GET /health`; demo is at `GET /`. |
| Preflight fails | OPTIONS blocked | Allowed clients get `204` + CORS headers automatically. |

## Security notes

- JWT secrets and SMTP URLs stay in environment variables only (never in `ALLOWED_CLIENTS`).
- A stolen access token still requires a valid client id (and origin for browser clients) on each request.
- `GET /health` is public for load balancer health checks; `GET /` serves the demo UI.

## Related docs

- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) — Render env vars and free tier
- [README.md](README.md) — build and run
