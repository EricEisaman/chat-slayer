import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const files = globSync('src/**/*.ts', {cwd: root, absolute: true});

let n = 0;
for (const file of files) {
  let t = readFileSync(file, 'utf8');
  const before = t;
  // Restore direct property access when `value` is already a typed parameter (not `unknown`).
  t = t.replace(
    /function\s+(\w+)\s*\(\s*value:\s*([A-Za-z0-9_]+)\s*\)/g,
    (match, fnName, typeName) => match,
  );
  t = t.replace(/objectKey\(value,\s*'([a-zA-Z0-9_]+)'\)/g, (m, key) => {
    return `value['${key}']`;
  });
  // In functions where value param is NOT unknown, use dot notation
  const chunks = t.split(/(?=export function )/);
  t = chunks
    .map((chunk) => {
      const sig = chunk.match(/export function \w+\s*\(\s*value:\s*([^)]+)\)/);
      if (!sig) return chunk;
      const paramType = sig[1].trim();
      if (paramType === 'unknown' || paramType.startsWith('ReadonlyJson')) {
        return chunk;
      }
      return chunk.replace(/value\['([a-zA-Z0-9_]+)'\]/g, 'value.$1');
    })
    .join('');
  if (t !== before) {
    writeFileSync(file, t);
    n += 1;
  }
}
console.log(`revert-objectKey-typed-value: ${n} files`);
