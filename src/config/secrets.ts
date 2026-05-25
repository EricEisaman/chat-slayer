import {parseNonEmptyString} from '../fi/cs/core/types/String';
import {isDeployProduction} from './deployMode';

/** Safe default for local dev and `npm run start-prod` without configuring secrets. */
export const LOCAL_DEV_JWT_SECRET =
  'local-dev-only-not-for-production-deploy-32chars';

export const INSECURE_JWT_PLACEHOLDERS = new Set([
  '',
  'change-me',
  'change-me-in-render-dashboard',
  'secretJwtString123',
  'your-secret-here',
  'your-dev-secret',
]);

/**
 * JWT secret for this process. Production deploy must set BACKEND_JWT_SECRET (32+ chars).
 * Locally, missing or placeholder values use LOCAL_DEV_JWT_SECRET automatically.
 */
export function resolveBackendJwtSecret(): string {
  const raw = parseNonEmptyString(process?.env?.BACKEND_JWT_SECRET)?.trim() ?? '';

  if (isDeployProduction()) {
    return raw;
  }

  if (raw && !INSECURE_JWT_PLACEHOLDERS.has(raw)) {
    return raw;
  }

  return LOCAL_DEV_JWT_SECRET;
}
