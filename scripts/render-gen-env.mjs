#!/usr/bin/env node
/**
 * Generate Render Dashboard environment variables (colored terminal guide + optional .env.render).
 * No npm dependencies — inline ANSI only (no chalk).
 */
import {randomBytes, createHash, X509Certificate} from 'node:crypto';
import {connect} from 'node:tls';
import {writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const DEFAULT_SERVICE = 'chat-slayer';
const BLUEPRINT_VARS = [
  'NODE_ENV',
  'NODE_VERSION',
  'BACKEND_LOG_LEVEL',
  'FEDERATION_ENABLED',
];
const DO_NOT_SET = ['PORT', 'BACKEND_URL', 'NODE_ENV'];

const STYLES = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
};

function supportsColor(forceNoColor) {
  if (forceNoColor) return false;
  if (process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== '') {
    return false;
  }
  return Boolean(process.stdout.isTTY);
}

function c(style, text, useColor) {
  if (!useColor) return text;
  const parts = [];
  if (style.includes('bold')) parts.push(STYLES.bold);
  if (style.includes('dim')) parts.push(STYLES.dim);
  if (style.includes('italic')) parts.push(STYLES.italic);
  if (style.includes('cyan')) parts.push(STYLES.cyan);
  if (style.includes('yellow')) parts.push(STYLES.yellow);
  if (style.includes('green')) parts.push(STYLES.green);
  if (style.includes('magenta')) parts.push(STYLES.magenta);
  if (style.includes('red')) parts.push(STYLES.red);
  if (style.includes('white')) parts.push(STYLES.white);
  return `${parts.join('')}${text}${STYLES.reset}`;
}

function println(style, text, useColor) {
  console.log(c(style, text, useColor));
}

function printPlainValue(value) {
  console.log(value);
}

function divider(char, width, useColor) {
  println('bold cyan', char.repeat(width), useColor);
}

function parseArgs(argv) {
  const opts = {
    service: DEFAULT_SERVICE,
    url: undefined,
    seed: undefined,
    write: false,
    noColor: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
    } else if (arg === '--no-color') {
      opts.noColor = true;
    } else if (arg === '--write') {
      opts.write = true;
    } else if (arg === '--service' && argv[i + 1]) {
      opts.service = argv[++i].trim();
    } else if (arg === '--url' && argv[i + 1]) {
      opts.url = argv[++i].trim();
    } else if ((arg === '--seed' || arg === '--seed-users') && argv[i + 1]) {
      opts.seed = argv[++i].trim();
    }
  }
  return opts;
}

function printHelp() {
  console.log(`Usage: npm run render:gen:env -- [options]

Generate Render Dashboard env vars with a colored copy-paste guide (no chalk dependency).

Options:
  --service <slug>     Render service name (default: ${DEFAULT_SERVICE})
  --url <https://...>  Override public URL (hostname derived for BACKEND_HOSTNAME)
  --seed <user:pass>   Optional BACKEND_INITIAL_USERS (mark Secret in Dashboard)
  --write              Also write plain .env.render at repo root (gitignored)
  --no-color           Plain text output (respects NO_COLOR env)
  --help               Show this help

Examples:
  npm run render:gen:env
  npm run render:gen:env -- --write
  npm run render:gen:env -- --service my-app --seed alice:devpass123
  npm run render:gen:env -- --url https://my-app.onrender.com   # phase 2: TLS pin after first deploy
`);
}

function validatePublicUrl(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch {
    throw new Error(`Invalid URL: ${urlString}`);
  }
  const lower = urlString.toLowerCase();
  if (url.protocol !== 'https:') {
    throw new Error('BACKEND_PUBLIC_URL must use https:// in production');
  }
  if (lower.includes('localhost') || lower.includes('127.0.0.1')) {
    throw new Error('BACKEND_PUBLIC_URL must not be localhost for Render');
  }
  if (urlString.endsWith('/')) {
    throw new Error('BACKEND_PUBLIC_URL must not have a trailing slash');
  }
  return url;
}

function resolveHost(opts) {
  if (opts.url) {
    const url = validatePublicUrl(opts.url);
    return {
      publicUrl: url.origin,
      hostname: url.hostname,
      service: opts.service,
    };
  }
  const hostname = `${opts.service}.onrender.com`;
  const publicUrl = `https://${hostname}`;
  validatePublicUrl(publicUrl);
  return {publicUrl, hostname, service: opts.service};
}

function generateJwtSecret() {
  return randomBytes(36).toString('base64');
}

function buildAllowedClientsJson(publicUrl, tlsFingerprintSha256) {
  const webDemo = {
    id: 'web-demo',
    label: 'Web demo',
    origins: [publicUrl],
    allowWithoutOrigin: false,
  };
  if (tlsFingerprintSha256) {
    webDemo.expectedTlsFingerprintSha256 = tlsFingerprintSha256;
  }
  const clients = [
    webDemo,
    {
      id: 'ops-cli',
      label: 'CLI',
      origins: [],
      allowWithoutOrigin: true,
    },
  ];
  const json = JSON.stringify(clients);
  JSON.parse(json);
  return json;
}

function computeSpkiSha256FromRawCert(raw) {
  const cert = new X509Certificate(raw);
  const spkiDer = cert.publicKey.export({type: 'spki', format: 'der'});
  return createHash('sha256').update(spkiDer).digest('hex');
}

function probeTlsSpkiSha256(publicUrl) {
  const url = new URL(publicUrl);
  const host = url.hostname;
  const port = url.port ? parseInt(url.port, 10) : 443;
  return new Promise((resolve, reject) => {
    const socket = connect(
      {host, port, servername: host, rejectUnauthorized: true},
      () => {
        const peer = socket.getPeerCertificate();
        socket.end();
        if (!peer?.raw) {
          reject(new Error('No peer certificate'));
          return;
        }
        try {
          resolve(computeSpkiSha256FromRawCert(peer.raw));
        } catch (err) {
          reject(err);
        }
      },
    );
    socket.on('error', reject);
  });
}

function opensslFingerprintCommand(hostname) {
  return (
    `openssl s_client -connect ${hostname}:443 -servername ${hostname} </dev/null 2>/dev/null \\\n` +
    '  | openssl x509 -pubkey -noout \\\n' +
    '  | openssl pkey -pubin -outform der \\\n' +
    '  | openssl dgst -sha256'
  );
}

function buildEnvBundle(host, tlsFingerprintSha256) {
  const jwt = generateJwtSecret();
  const allowedClients = buildAllowedClientsJson(host.publicUrl, tlsFingerprintSha256);
  const plain = {
    BACKEND_PUBLIC_URL: host.publicUrl,
    BACKEND_HOSTNAME: host.hostname,
    CLIENT_ACCESS_ENFORCED: 'true',
    ALLOWED_CLIENTS: allowedClients,
  };
  if (tlsFingerprintSha256) {
    plain.BACKEND_TLS_FINGERPRINT_SHA256 = tlsFingerprintSha256;
    plain.BACKEND_TLS_PIN_ENFORCED = 'true';
  } else {
    plain.BACKEND_TLS_PIN_ENFORCED = 'false';
  }
  const secrets = {
    BACKEND_JWT_SECRET: jwt,
  };
  if (host.seed) {
    secrets.BACKEND_INITIAL_USERS = host.seed;
  }
  return {plain, secrets, jwt, allowedClients, tlsFingerprintSha256};
}

function buildDotEnvLines(plain, secrets) {
  const lines = [];
  for (const [key, value] of Object.entries(plain)) {
    lines.push(`${key}=${value}`);
  }
  for (const [key, value] of Object.entries(secrets)) {
    lines.push(`${key}=${value}`);
  }
  return lines;
}

function printVarBox({
  index,
  total,
  key,
  value,
  secret,
  extraHint,
  useColor,
}) {
  const frame = '─'.repeat(72);
  println('dim', `  Variable ${index} of ${total}`, useColor);
  println('dim', `  ┌${frame}┐`, useColor);
  println(
    'bold magenta',
    `  │ Key:   ${key.padEnd(64)}│`,
    useColor,
  );
  println(
    'dim',
    `  │ Value: (copy next line only)${' '.repeat(33)}│`,
    useColor,
  );
  if (extraHint) {
    println('dim', `  │ ${extraHint.padEnd(69)}│`, useColor);
  }
  println('dim', `  └${frame}┘`, useColor);
  if (secret) {
    println('bold red', '  Secret toggle: ON in Render Dashboard', useColor);
  }
  printPlainValue(value);
  console.log('');
}

function printDashboardGuide(host, bundle, useColor) {
  const {plain, secrets} = bundle;
  const plainEntries = Object.entries(plain);
  const secretEntries = Object.entries(secrets);
  const plainCount = plainEntries.length;
  const secretCount = secretEntries.length;

  divider('=', 80, useColor);
  println(
    'bold cyan',
    `RENDER DASHBOARD — WHERE TO PASTE (service: ${host.service})`,
    useColor,
  );
  divider('=', 80, useColor);
  println('bold white', '1. Open https://dashboard.render.com', useColor);
  println(
    'bold white',
    `2. Select Web Service: ${host.service}  (name from render.yaml)`,
    useColor,
  );
  println(
    'bold white',
    '3. Left sidebar → Environment',
    useColor,
  );
  println(
    'bold white',
    '4. After pasting all variables → Save → "Save, rebuild, and deploy"',
    useColor,
  );
  println(
    'dim',
    `   Public URL for this run: ${host.publicUrl}`,
    useColor,
  );
  if (bundle.tlsFingerprintSha256) {
    println(
      'green',
      '   TLS phase 2: live probe OK — Section B includes BACKEND_TLS_FINGERPRINT_SHA256 + pin in ALLOWED_CLIENTS.',
      useColor,
    );
  } else {
    println(
      'yellow',
      '   TLS phase 1: no live pin (service not reachable yet). Set BACKEND_TLS_PIN_ENFORCED=false for first deploy.',
      useColor,
    );
    println(
      'yellow',
      '   After HTTPS is live, re-run: npm run render:gen:env -- --url https://<your-service>.onrender.com',
      useColor,
    );
  }
  console.log('');

  divider('-', 80, useColor);
  println(
    'bold yellow',
    'SECTION A — DO NOT ADD (already set by render.yaml on deploy)',
    useColor,
  );
  divider('-', 80, useColor);
  println(
    'yellow',
    `  ${BLUEPRINT_VARS.join(', ')}`,
    useColor,
  );
  println(
    'dim',
    '  → Skip these in Dashboard unless you intentionally override blueprint values.',
    useColor,
  );
  console.log('');

  divider('-', 80, useColor);
  println(
    'bold yellow',
    'SECTION B — Environment Variables → "+ Add Environment Variable"',
    useColor,
  );
  println('cyan', '         Secret toggle: OFF  (plaintext env vars)', useColor);
  divider('-', 80, useColor);
  println(
    'dim',
    '  For each variable below, click "+ Add Environment Variable", then:',
    useColor,
  );
  console.log('');

  let idx = 0;
  for (const [key, value] of plainEntries) {
    idx++;
    const hint =
      key === 'ALLOWED_CLIENTS'
        ? 'paste entire JSON as Value (one line)'
        : undefined;
    printVarBox({
      index: idx,
      total: plainCount,
      key,
      value,
      secret: false,
      extraHint: hint,
      useColor,
    });
  }

  divider('-', 80, useColor);
  println(
    'bold red',
    'SECTION C — Environment Variables → "+ Add Environment Variable"',
    useColor,
  );
  println('bold red', '         Secret toggle: ON  (lock icon)', useColor);
  divider('-', 80, useColor);
  console.log('');

  idx = 0;
  for (const [key, value] of secretEntries) {
    idx++;
    printVarBox({
      index: idx,
      total: secretCount,
      key,
      value,
      secret: true,
      useColor,
    });
  }

  divider('-', 80, useColor);
  println(
    'dim italic',
    'SECTION D — OPTIONAL bulk import (alternative to Section B + C one-by-one)',
    useColor,
  );
  divider('-', 80, useColor);
  println(
    'cyan',
    '  Same sidebar → Environment → "Add from .env"',
    useColor,
  );
  println(
    'dim',
    '  Paste ONLY the block between --- BEGIN .env --- / --- END .env ---',
    useColor,
  );
  println(
    'dim',
    '  Mark BACKEND_JWT_SECRET (and seed users) as Secret before Save.',
    useColor,
  );
  console.log('');

  const dotEnvLines = buildDotEnvLines(plain, secrets);
  println('bold green', '--- BEGIN .env ---', useColor);
  for (const line of dotEnvLines) {
    printPlainValue(line);
  }
  println('bold green', '--- END .env ---', useColor);
  console.log('');

  divider('-', 80, useColor);
  println('bold yellow', 'SECTION E — DO NOT SET in Dashboard', useColor);
  divider('-', 80, useColor);
  for (const key of DO_NOT_SET) {
    let note = '';
    if (key === 'PORT') note = 'Render injects automatically';
    else if (key === 'BACKEND_URL') note = 'app defaults to http://0.0.0.0:$PORT';
    else if (key === 'NODE_ENV') note = 'set by render.yaml blueprint';
    println('yellow', `  ${key.padEnd(16)} ${note}`, useColor);
  }
  console.log('');

  divider('-', 80, useColor);
  println('dim italic', 'SECTION F — MANUAL (not generated)', useColor);
  divider('-', 80, useColor);
  println(
    'dim',
    '  BACKEND_EMAIL_CONFIG — only if you use SMTP; add as Secret (Section C style).',
    useColor,
  );
  println(
    'dim',
    '  BACKEND_INITIAL_ROOMS — optional public rooms (comma-separated); needs BACKEND_INITIAL_USERS.',
    useColor,
  );
  println(
    'dim',
    '  BACKEND_PRIVATE_ROOMS — optional private rooms (comma-separated); hidden until discovered.',
    useColor,
  );
  println(
    'dim',
    '  BACKEND_ROOM_HISTORY_LIMIT — optional max recent messages per room (default 20).',
    useColor,
  );
  console.log('');

  divider('-', 80, useColor);
  println(
    'bold yellow',
    'SECTION G — Fingerprint hash verification (GRC-style MITM defense)',
    useColor,
  );
  divider('-', 80, useColor);
  println(
    'dim',
    '  Three layers: (1) server startup probe vs BACKEND_TLS_FINGERPRINT_SHA256',
    useColor,
  );
  println(
    'dim',
    '  (2) browser demo compares /.well-known/chat-slayer.json vs expectedTlsFingerprintSha256',
    useColor,
  );
  println(
    'dim',
    '  (3) operator gold-standard below vs Dashboard + live endpoint',
    useColor,
  );
  println(
    'cyan',
    '  Independent check: https://www.grc.com/fingerprints.htm',
    useColor,
  );
  println(
    'dim',
    '  SPKI SHA-256 hash (64 hex; survives leaf cert renewal when key is reused).',
    useColor,
  );
  println('bold white', '  Operator verification (OpenSSL):', useColor);
  printPlainValue(opensslFingerprintCommand(host.hostname));
  console.log('');
  println('bold white', '  After deploy, confirm live hash matches Dashboard:', useColor);
  printPlainValue(
    `curl -s ${host.publicUrl}/.well-known/chat-slayer.json`,
  );
  printPlainValue(
    `curl -sI ${host.publicUrl}/health | grep -i x-chat-slayer-tls-fingerprint`,
  );
  console.log('');
  if (bundle.tlsFingerprintSha256) {
    println(
      'green',
      `  Live probe succeeded — BACKEND_TLS_FINGERPRINT_SHA256=${bundle.tlsFingerprintSha256}`,
      useColor,
    );
    println(
      'dim',
      '  Included in Section B plain vars and web-demo expectedTlsFingerprintSha256 in ALLOWED_CLIENTS.',
      useColor,
    );
  } else {
    println(
      'yellow',
      '  Live probe skipped or failed — run the OpenSSL command after first deploy, then set:',
      useColor,
    );
    println('yellow', '    BACKEND_TLS_FINGERPRINT_SHA256=<64 hex chars>', useColor);
    println(
      'yellow',
      '    expectedTlsFingerprintSha256 on web-demo in ALLOWED_CLIENTS (same value)',
      useColor,
    );
  }
  console.log('');

  println(
    'green',
    'Done. See RENDER_DEPLOYMENT.md § Fingerprint hash verification. Rotate BACKEND_JWT_SECRET if it was ever committed.',
    useColor,
  );
}

function buildPlainFileContent(host, bundle) {
  const {plain, secrets} = bundle;
  const lines = [
    '# Generated by: npm run render:gen:env -- --write',
    `# Service: ${host.service}  Public URL: ${host.publicUrl}`,
    '# Paste via Render Dashboard → Environment → "Add from .env"',
    '# Mark BACKEND_JWT_SECRET and BACKEND_INITIAL_USERS as Secret after import.',
    '#',
    '# SECTION A — skip (in render.yaml): ' + BLUEPRINT_VARS.join(', '),
    '# SECTION E — do not set: ' + DO_NOT_SET.join(', '),
    '',
    ...buildDotEnvLines(plain, secrets),
    '',
  ];
  return lines.join('\n');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    return;
  }
  const useColor = supportsColor(opts.noColor);
  const host = resolveHost(opts);
  let tlsFingerprintSha256;
  try {
    tlsFingerprintSha256 = await probeTlsSpkiSha256(host.publicUrl);
  } catch {
    tlsFingerprintSha256 = undefined;
  }
  const bundle = buildEnvBundle({...host, seed: opts.seed}, tlsFingerprintSha256);

  printDashboardGuide(host, bundle, useColor);

  if (opts.write) {
    const root = join(dirname(fileURLToPath(import.meta.url)), '..');
    const outPath = join(root, '.env.render');
    writeFileSync(outPath, buildPlainFileContent(host, bundle), 'utf8');
    println(
      'green',
      `Wrote plain ${outPath} (gitignored; no ANSI in file)`,
      useColor,
    );
  }
}

try {
  await main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
