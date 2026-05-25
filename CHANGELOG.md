# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.0.1] - 2026-05-25

First public release.

### Added

- Lightweight Matrix-compatible chat server (TypeScript, in-memory state, single Node process).
- Browser demo at `/` with Datastar SSE, room actions, and optional E2EE (`DEMO_E2EE_ENABLED`, default on).
- Client access gate: `ALLOWED_CLIENTS`, `X-Chat-Slayer-Client-Id`, production enforcement.
- Preconfigured **private** rooms via `BACKEND_PRIVATE_ROOMS` (hidden until discover-by-name; server-gated join/send).
- Preconfigured **public** rooms via `BACKEND_INITIAL_ROOMS` (boot-seeded at startup when `BACKEND_INITIAL_USERS` is set).
- Demo “room by name” flow when private rooms are enabled (`privateRoomsEnabled` in `/demo-config.json` only — never room name lists).
- Room picker UX: optgroups and styling for private vs public vs user-created rooms.
- Render tooling: `render:gen:env`, `render:deploy:test`, [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md).
- Startup logs for allowed client origins and preconfigured room counts (no secret room names).

### Changed

- **Breaking:** `BACKEND_INITIAL_ROOMS` now means **public** boot-seeded rooms visible to all users. Move former secret room names to **`BACKEND_PRIVATE_ROOMS`** (see [CLIENT_GUIDE.md](CLIENT_GUIDE.md#migration-v001-room-env-vars)).

### Fixed

- `/demo-config.json` served without client header (no longer 403).
- Inline `window.__CS_DEMO_CONFIG__` when config fetch fails.
- Demo auth form password field DOM nesting warning.
