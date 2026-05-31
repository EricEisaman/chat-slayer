#!/usr/bin/env node
/**
 * Preflight Render deploy: lockfile (npm 10.9), native build, artifacts, runner npm ci.
 * Run before push: npm run render:deploy:test
 */
import {execSync, spawnSync} from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const NPM_RENDER = 'npm@10.9.0';
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const STYLES = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
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

function println(style, text, useColor) {
  const parts = [];
  if (style.includes('bold')) parts.push(STYLES.bold);
  if (style.includes('dim')) parts.push(STYLES.dim);
  if (style.includes('cyan')) parts.push(STYLES.cyan);
  if (style.includes('yellow')) parts.push(STYLES.yellow);
  if (style.includes('green')) parts.push(STYLES.green);
  if (style.includes('red')) parts.push(STYLES.red);
  if (style.includes('white')) parts.push(STYLES.white);
  const prefix = parts.join('');
  console.log(`${prefix}${text}${useColor ? STYLES.reset : ''}`);
}

function parseArgs(argv) {
  return {
    clean: argv.includes('--clean'),
    docker: argv.includes('--docker'),
    noColor: argv.includes('--no-color'),
    help: argv.includes('--help') || argv.includes('-h'),
  };
}

function printHelp() {
  console.log(`Usage: npm run render:deploy:test -- [options]

Preflight checks before Render deploy (matches Node 22.12 / npm 10.9).

Steps:
  1. Lockfile sync — npm@10.9.0 ci in temp dir
  2. Render native build — BUILD_NODE_ENV=production npm ci --include=dev && npm run build
  3. Artifacts — dist/chat-slayer.cjs and demo bundle
  4. Runner deps — npm@10.9.0 ci --omit=dev in temp dir

After this passes, deploy to Render (see RENDER_DEPLOYMENT.md two-phase TLS checklist):
  Phase 1 — first deploy: BACKEND_TLS_PIN_ENFORCED=false
  Phase 2 — after HTTPS is live:
    npm run render:gen:env -- --url https://<your-service>.onrender.com

Options:
  --clean     Remove node_modules before step 2
  --docker    Also run docker build (if docker is installed)
  --no-color  Plain output
  --help      Show this help
`);
}

function run(cmd, cwd = repoRoot, env = process.env) {
  execSync(cmd, {cwd, env, stdio: 'inherit'});
}

function commandExists(name) {
  const r = spawnSync('which', [name], {encoding: 'utf8'});
  return r.status === 0 && Boolean(r.stdout?.trim());
}

function stepHeader(n, total, title, useColor) {
  console.log('');
  println('bold cyan', `${'='.repeat(72)}`, useColor);
  println('bold white', `STEP ${n}/${total} — ${title}`, useColor);
  println('bold cyan', `${'='.repeat(72)}`, useColor);
}

function makeTempDir(prefix) {
  return mkdtempSync(join(tmpdir(), prefix));
}

function copyPackageFiles(targetDir) {
  cpSync(join(repoRoot, 'package.json'), join(targetDir, 'package.json'));
  cpSync(join(repoRoot, 'package-lock.json'), join(targetDir, 'package-lock.json'));
}

function stepLockfileCi(includeDev, label, useColor) {
  const dir = makeTempDir('cs-render-ci-');
  try {
    copyPackageFiles(dir);
    println('dim', `  ${label} (temp: ${dir})`, useColor);
    const omitFlag = includeDev ? '--include=dev' : '--omit=dev';
    run(`npx -y ${NPM_RENDER} ci ${omitFlag}`, dir);
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
}

function stepArtifacts(useColor) {
  const required = [
    'dist/chat-slayer.cjs',
    'dist/demo/index.html',
    'dist/demo/assets/chat-slayer-og.png',
  ];
  for (const rel of required) {
    const path = join(repoRoot, rel);
    if (!existsSync(path)) {
      throw new Error(`Missing artifact: ${rel}`);
    }
    println('dim', `  ok ${rel}`, useColor);
  }
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    return;
  }

  const useColor = supportsColor(opts.noColor);
  const totalSteps = opts.docker ? 5 : 4;
  let step = 0;

  println(
    'bold cyan',
    'Render deploy preflight (npm 10.9 ≈ node:22.12 on Render/Docker)',
    useColor,
  );

  step++;
  stepHeader(step, totalSteps, 'Lockfile (npm ci --include=dev)', useColor);
  stepLockfileCi(true, 'npx npm@10.9.0 ci --include=dev', useColor);
  println('green', '  Lockfile is in sync with package.json.', useColor);

  step++;
  stepHeader(step, totalSteps, 'Render native build (render.yaml)', useColor);
  if (opts.clean) {
    println('yellow', '  --clean: removing node_modules', useColor);
    rmSync(join(repoRoot, 'node_modules'), {recursive: true, force: true});
  }
  println(
    'dim',
    '  BUILD_NODE_ENV=production npx npm@10.9.0 ci --include=dev && npm run build',
    useColor,
  );
  const buildEnv = {...process.env};
  delete buildEnv.NODE_ENV;
  run(`npx -y ${NPM_RENDER} ci --include=dev`, repoRoot, buildEnv);
  run('npm run build', repoRoot, {
    ...process.env,
    BUILD_NODE_ENV: 'production',
  });
  println('green', '  Production build completed.', useColor);

  step++;
  stepHeader(step, totalSteps, 'Artifacts', useColor);
  stepArtifacts(useColor);
  println('green', '  Required dist/ outputs present.', useColor);

  step++;
  stepHeader(step, totalSteps, 'Dockerfile runner (npm ci --omit=dev)', useColor);
  stepLockfileCi(false, 'npx npm@10.9.0 ci --omit=dev', useColor);
  println('green', '  Runner-stage install OK.', useColor);

  if (opts.docker) {
    step++;
    stepHeader(step, totalSteps, 'Docker build', useColor);
    if (!commandExists('docker')) {
      println(
        'yellow',
        '  docker not found — skip (install Docker or omit --docker)',
        useColor,
      );
    } else {
      run('docker build -t chat-slayer-preflight .', repoRoot);
      println('green', '  docker build OK.', useColor);
    }
  }

  console.log('');
  println('bold green', 'All preflight checks passed.', useColor);
  println(
    'dim',
    'Next (new service, phase 1): npm run render:gen:env  →  Dashboard env + BACKEND_TLS_PIN_ENFORCED=false  →  git push / deploy',
    useColor,
  );
  println(
    'dim',
    'Next (after HTTPS live, phase 2): npm run render:gen:env -- --url https://<service>.onrender.com  →  add TLS pin  →  BACKEND_TLS_PIN_ENFORCED=true  →  redeploy',
    useColor,
  );
  println('dim', 'See RENDER_DEPLOYMENT.md § Fingerprint hash verification', useColor);
}

try {
  main();
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error('');
  console.error(`\x1b[1m\x1b[31mPREFLIGHT FAILED:\x1b[0m ${msg}`);
  process.exit(1);
}
