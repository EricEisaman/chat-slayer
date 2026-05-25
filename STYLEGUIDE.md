# TypeScript style

This project follows the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

## Tooling

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint on `**/*.{ts,tsx}` (gts + `@typescript-eslint/no-explicit-any`; see [eslint.config.cjs](eslint.config.cjs)) |
| `npm run fix` | `gts fix` only (format + ESLint auto-fix via gts) |
| `npm run typecheck` | `tsc` on application sources |
| `npm run typecheck:test` | `tsc` including `*.test.ts` |

## Local conventions

- Prefer `unknown` over `any` for unchecked values; narrow before use.
- Do not use `@ts-ignore` or `@ts-nocheck`. `@ts-expect-error` is discouraged; use only in tests with a short explanation.
- Semicolons are required; do not rely on ASI.
- 2-space indentation; single quotes for strings (Prettier/gts).
- Vendored code under `src/fi/cs/` uses the same formatter and typechecker; ESLint treats `no-explicit-any`, unused symbols, and `@ts-*` comments as **warnings** there while remaining `any` usage is reduced in phases. First-party `src/` (outside `fi/cs`) and `demo/` use **errors** for `no-explicit-any`.
- `strictFunctionTypes` is `false` in `tsconfig.json` because much of the vendored request/repository layer predates contravariant parameter checking; new code should still avoid unsound function assignments.

## Security linting

Google’s internal **tsetse** / **tsec** conformance tools are not used here. Equivalent checks include ESLint `no-eval` and standard TypeScript strictness.

## `@fileoverview`

New or substantially edited first-party files may include a top-level `@fileoverview` JSDoc. Mass-adding fileoverview to all vendored files is not required.
