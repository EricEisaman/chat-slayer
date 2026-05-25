/**
 * Runtime deploy mode — use NODE_ENV only, not build-time BUILD_NODE_ENV.
 * Render sets NODE_ENV=production; local `npm run dev` / `npm run start-prod` do not.
 */
export function isDeployProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
