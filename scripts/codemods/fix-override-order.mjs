import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const files = globSync('src/**/*.ts', {cwd: root, absolute: true});
let n = 0;
for (const file of files) {
  let t = readFileSync(file, 'utf8');
  const b = t;
  t = t
    .replace(/override public/g, 'public override')
    .replace(/override protected/g, 'protected override')
    .replace(/override private/g, 'private override')
    .replace(/override static/g, 'static override')
    .replace(/override async/g, 'async override');
  if (t !== b) {
    writeFileSync(file, t);
    n += 1;
  }
}
console.log(`fix-override-order: ${n} files`);
