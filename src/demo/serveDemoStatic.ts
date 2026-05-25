import {existsSync, readFileSync, statSync} from 'node:fs';
import {join, dirname, normalize} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {IncomingMessage, ServerResponse} from 'http';
import {
  type AllowedClientConfig,
  findAllowedClientById,
  getAllowedClientsConfig,
} from '../config/allowedClients';
import {BACKEND_PUBLIC_URL} from '../constants/runtime';

const DEMO_CLIENT_ID = 'web-demo';

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function getRequestPath(req: IncomingMessage): string {
  const url = req.url ?? '/';
  const q = url.indexOf('?');
  return q >= 0 ? url.substring(0, q) : url;
}

function resolveDemoRoot(): string | undefined {
  const candidates = [
    join(process.cwd(), 'dist', 'demo'),
    join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'demo'),
    join(process.cwd(), 'demo'),
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, 'index.html'))) {
      return dir;
    }
  }
  return undefined;
}

let cachedDemoRoot: string | undefined;

export function getDemoStaticRoot(): string | undefined {
  if (cachedDemoRoot === undefined) {
    cachedDemoRoot = resolveDemoRoot() ?? '';
  }
  return cachedDemoRoot || undefined;
}

export function isHealthCheckPath(path: string): boolean {
  return path === '/health';
}

export function isDemoStaticPath(path: string): boolean {
  if (path === '/' || path === '/index.html') {
    return true;
  }
  if (
    path === '/demo.css' ||
    path === '/demo-config.json' ||
    path === '/favicon.ico'
  ) {
    return true;
  }
  return (
    path.startsWith('/assets/') ||
    path === '/e2ee.mjs' ||
    path.startsWith('/crypto-sdk/')
  );
}

export function buildDemoConfigJson(): string {
  const config = getAllowedClientsConfig();
  const demoClient =
    findAllowedClientById(config.clients, DEMO_CLIENT_ID) ?? config.clients[0];
  const publicOrigin = BACKEND_PUBLIC_URL.replace(/\/$/, '');
  return JSON.stringify(
    {
      enforced: config.enforced,
      defaultClientId: demoClient?.id ?? DEMO_CLIENT_ID,
      apiBase: publicOrigin || '',
      clients: config.clients.map((c: AllowedClientConfig) => ({
        id: c.id,
        label: c.label,
      })),
    },
    null,
    2,
  );
}

function safeFilePath(root: string, relativePath: string): string | undefined {
  const resolved = normalize(join(root, relativePath));
  if (!resolved.startsWith(normalize(root))) {
    return undefined;
  }
  if (!existsSync(resolved)) {
    return undefined;
  }
  const stat = statSync(resolved);
  if (!stat.isFile()) {
    return undefined;
  }
  return resolved;
}

function mapUrlToRelativeFile(path: string): string {
  if (path === '/' || path === '/index.html') {
    return 'index.html';
  }
  if (path === '/demo.css') {
    return 'demo.css';
  }
  if (path === '/favicon.ico') {
    return 'assets/chat-slayer-favicon.png';
  }
  if (path.startsWith('/assets/')) {
    return path.substring(1);
  }
  return path.substring(1);
}

function writeJson(res: ServerResponse, body: string): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function writeFile(res: ServerResponse, filePath: string): void {
  const ext = filePath.includes('.')
    ? filePath.substring(filePath.lastIndexOf('.'))
    : '';
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
  res.end(readFileSync(filePath));
}

export function tryServeHealth(req: IncomingMessage, res: ServerResponse): boolean {
  if (req.method?.toUpperCase() !== 'GET') {
    return false;
  }
  if (!isHealthCheckPath(getRequestPath(req))) {
    return false;
  }
  writeJson(res, JSON.stringify({status: 'ok'}, null, 2));
  return true;
}

export function tryServeDemoStatic(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  const method = req.method?.toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    return false;
  }

  const path = getRequestPath(req);
  if (!isDemoStaticPath(path)) {
    return false;
  }

  if (path === '/demo-config.json') {
    writeJson(res, buildDemoConfigJson());
    return true;
  }

  const root = getDemoStaticRoot();
  if (!root) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Demo static files are not built. Run: npm run build:demo');
    return true;
  }

  const file = safeFilePath(root, mapUrlToRelativeFile(path));
  if (!file) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not found');
    return true;
  }

  if (method === 'HEAD') {
    res.statusCode = 200;
    res.end();
    return true;
  }

  writeFile(res, file);
  return true;
}
