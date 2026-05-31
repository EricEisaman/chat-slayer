import {execSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const demoDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(demoDir, '..');
const outDir = join(repoRoot, 'dist', 'demo');
const wasmPkg = join(
  repoRoot,
  'node_modules',
  '@matrix-org',
  'matrix-sdk-crypto-wasm',
);

mkdirSync(outDir, {recursive: true});
for (const file of [
  'index.html',
  'demo.css',
  'e2ee.mjs',
  'fingerprint.mjs',
  'private-rooms.mjs',
  'room-picker.mjs',
]) {
  cpSync(join(demoDir, file), join(outDir, file));
}

const logoSrc = join(repoRoot, 'resources', 'chat-slayer-logo.png');
const faviconSrc = join(repoRoot, 'resources', 'chat-slayer-favicon.png');
const ogSrc = join(repoRoot, 'resources', 'chat-slayer-og.png');

/** macOS only: build 1200x630 OG card from logo if og asset is missing (Linux CI uses committed PNG). */
if (
  !existsSync(ogSrc) &&
  existsSync(logoSrc) &&
  process.platform === 'darwin'
) {
  const tmpLogo = join(repoRoot, '.tmp-og-logo.png');
  try {
    execSync(`sips -Z 480 "${logoSrc}" --out "${tmpLogo}"`, {stdio: 'ignore'});
    execSync(
      `sips --padToHeightWidth 630 1200 --padColor 1a1a2e "${tmpLogo}" --out "${ogSrc}"`,
      {stdio: 'ignore'},
    );
  } catch {
    /* commit resources/chat-slayer-og.png for non-macOS builds */
  }
}

if (existsSync(logoSrc) && process.platform === 'darwin') {
  try {
    execSync(`sips -z 256 256 "${logoSrc}" --out "${faviconSrc}"`, {
      stdio: 'ignore',
    });
  } catch {
    /* keep checked-in favicon */
  }
}

const assetsDir = join(outDir, 'assets');
mkdirSync(assetsDir, {recursive: true});
cpSync(logoSrc, join(assetsDir, 'chat-slayer-logo.png'));
cpSync(faviconSrc, join(assetsDir, 'chat-slayer-favicon.png'));
if (existsSync(ogSrc)) {
  cpSync(ogSrc, join(assetsDir, 'chat-slayer-og.png'));
}

const cryptoOut = join(outDir, 'crypto-sdk');
mkdirSync(cryptoOut, {recursive: true});
cpSync(join(wasmPkg, 'index.mjs'), join(cryptoOut, 'index.mjs'));
cpSync(join(wasmPkg, 'pkg'), join(cryptoOut, 'pkg'), {recursive: true});
