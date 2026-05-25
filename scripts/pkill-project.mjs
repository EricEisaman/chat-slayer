#!/usr/bin/env node
/**
 * Stop stray Chat Slayer dev/server processes (port + known command lines).
 * Safe to run before `npm run dev`; does not match npm/pkill by project folder name alone.
 */
import {execSync} from 'node:child_process';

const port = String(process.env.PORT ?? '8008').trim() || '8008';

const COMMAND_PATTERNS = [
  'vite-node.*src/chat-slayer\\.ts',
  'vite-node.*chat-slayer\\.ts',
  'node dist/chat-slayer\\.cjs',
  'node dist/chat-slayer\\.js',
];

function runShell(command) {
  try {
    return execSync(command, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']}).trim();
  } catch {
    return '';
  }
}

function parsePids(output) {
  return output
    .split(/\s+/)
    .map((s) => Number.parseInt(s, 10))
    .filter((n) => Number.isFinite(n) && n > 1);
}

function killPids(pids, label) {
  const unique = [...new Set(pids)];
  if (unique.length === 0) {
    return;
  }
  console.log(`Stopping ${unique.length} process(es) ${label}: ${unique.join(', ')}`);
  for (const pid of unique) {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      /* already gone */
    }
  }
  for (const pid of unique) {
    try {
      process.kill(pid, 0);
      process.kill(pid, 'SIGKILL');
    } catch {
      /* exited */
    }
  }
}

const byPort = parsePids(runShell(`lsof -ti :${port} 2>/dev/null || true`));
killPids(byPort, `on port ${port}`);

for (const pattern of COMMAND_PATTERNS) {
  const out = runShell(`pgrep -f '${pattern}' 2>/dev/null || true`);
  killPids(parsePids(out), `matching /${pattern}/`);
}

console.log('Done.');
