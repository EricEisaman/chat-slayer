/**
 * Allow property reads on `unknown` in explain/guard helpers (Google TS: bracket access).
 */
import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const files = globSync('src/**/*.ts', {cwd: root, absolute: true});

let changed = 0;
for (const file of files) {
  let text = readFileSync(file, 'utf8');
  const before = text;
  text = text.replace(/value\?\.([a-zA-Z_][a-zA-Z0-9_]*)/g, "value['$1']");
  if (text !== before) {
    writeFileSync(file, text);
    changed += 1;
  }
}
console.log(`value-dot-to-bracket: updated ${changed} files`);
