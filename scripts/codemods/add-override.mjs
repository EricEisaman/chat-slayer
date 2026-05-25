import {readFileSync, writeFileSync} from 'node:fs';
import {execSync} from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
let out = '';
try {
  out = execSync('npm run typecheck 2>&1', {cwd: root, encoding: 'utf8'});
} catch (e) {
  out = `${e.stdout ?? ''}${e.stderr ?? ''}`;
}

const byFile = new Map();
for (const line of out.split('\n')) {
  const m = line.match(/^(.+\.ts)\((\d+),\d+\): error TS4114:/);
  if (!m) continue;
  const file = m[1];
  const lineNo = Number(m[2]);
  if (!byFile.has(file)) byFile.set(file, new Set());
  byFile.get(file).add(lineNo);
}

let files = 0;
for (const [file, lines] of byFile) {
  const abs = path.isAbsolute(file) ? file : path.join(root, file);
  const content = readFileSync(abs, 'utf8').split('\n');
  const sorted = [...lines].sort((a, b) => b - a);
  for (const lineNo of sorted) {
    const idx = lineNo - 1;
    const line = content[idx];
    if (!line || line.includes('override')) continue;
    if (/^\s+(public |private |protected )?(static )?(async )?\w+/.test(line)) {
      content[idx] = line.replace(/^(\s+)((public |private |protected |static |async )+)/, '$1override $2');
    } else if (/^\s+(get |set )/.test(line)) {
      content[idx] = line.replace(/^(\s+)/, '$1override ');
    }
  }
  writeFileSync(abs, content.join('\n'));
  files += 1;
}
console.log(`add-override: updated ${files} files`);
