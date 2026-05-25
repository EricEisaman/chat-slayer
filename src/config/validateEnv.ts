import {parseAllowedClientsJson} from './allowedClients';
import {isDeployProduction} from './deployMode';
import {INSECURE_JWT_PLACEHOLDERS, resolveBackendJwtSecret} from './secrets';
import {
  BACKEND_PUBLIC_URL,
  CLIENT_ACCESS_ENFORCED,
} from '../constants/runtime';
import {parseNonEmptyString} from '../fi/cs/core/types/String';

/**
 * Fail fast on Render / production deploy when secrets or public URL are missing or unsafe.
 */
export function validateProductionEnv(): void {
  if (!isDeployProduction()) {
    return;
  }

  const secret = resolveBackendJwtSecret().trim();
  if (INSECURE_JWT_PLACEHOLDERS.has(secret) || secret.length < 32) {
    console.error(
      'BACKEND_JWT_SECRET must be a strong secret (32+ characters) when NODE_ENV=production.\n' +
        'On Render: Dashboard → Environment → add BACKEND_JWT_SECRET as a Secret.\n' +
        'Locally: use `npm run dev` (no strict check), or set a 32+ char secret in .env for deploy testing.',
    );
    process.exit(1);
  }

  const publicUrl = BACKEND_PUBLIC_URL?.trim() ?? '';
  const publicUrlLower = publicUrl.toLowerCase();
  if (
    !publicUrl ||
    publicUrlLower.includes('localhost') ||
    publicUrlLower.includes('127.0.0.1') ||
    !publicUrlLower.startsWith('https://')
  ) {
    console.error(
      'BACKEND_PUBLIC_URL must be your public Render HTTPS URL when NODE_ENV=production ' +
        '(e.g. https://chat-slayer.onrender.com). Set it in the Render Dashboard.',
    );
    process.exit(1);
  }

  if (!CLIENT_ACCESS_ENFORCED) {
    return;
  }

  const raw = parseNonEmptyString(process?.env?.ALLOWED_CLIENTS);
  if (!raw) {
    // loadAllowedClientsConfig seeds web-demo from BACKEND_PUBLIC_URL when unset
    return;
  }

  try {
    const clients = parseAllowedClientsJson(raw);
    if (clients.length === 0) {
      console.error(
        'ALLOWED_CLIENTS must contain at least one client entry when NODE_ENV=production.',
      );
      process.exit(1);
    }
  } catch (err) {
    console.error(`ALLOWED_CLIENTS is invalid: ${err}`);
    process.exit(1);
  }
}
