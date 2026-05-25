import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
let n = 0;
for (const file of globSync('src/**/*.ts', {cwd: root, absolute: true})) {
  let t = readFileSync(file, 'utf8');
  const b = t;
  t = t.replace(/return err\?\.message;/g, 'return err instanceof Error ? err.message : String(err);');
  if (t !== b) {
    writeFileSync(file, t);
    n += 1;
  }
}
console.log(`fix-err-message: ${n} files`);
