import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const regularObjectAbs = path.join(root, 'src/fi/cs/core/types/RegularObject.ts');
const files = globSync('src/**/*.ts', {cwd: root, absolute: true});

function ensureObjectKeyImport(filePath, text) {
  if (!text.includes('objectKey(')) return text;
  if (/import\s*\{[^}]*\bobjectKey\b/.test(text)) return text;
  const rel = path
    .relative(path.dirname(filePath), regularObjectAbs)
    .replace(/\.ts$/, '')
    .replace(/\\/g, '/');
  const importFrom = rel.startsWith('.') ? rel : `./${rel}`;
  const roImport = text.match(
    /import\s*\{([^}]+)\}\s*from\s*['"][^'"]*RegularObject['"]\s*;/,
  );
  if (roImport) {
    const names = roImport[1].trim();
    if (names.includes('objectKey')) return text;
    return text.replace(
      roImport[0],
      `import {${names}, objectKey} from '${importFrom}';`,
    );
  }
  const firstImport = text.match(/^import\s.+;\s*$/m);
  const line = `import {objectKey} from '${importFrom}';\n`;
  if (firstImport) {
    return text.replace(firstImport[0], `${firstImport[0]}\n${line}`);
  }
  return `${line}${text}`;
}

let n = 0;
for (const file of files) {
  if (file === regularObjectAbs) continue;
  let t = readFileSync(file, 'utf8');
  const b = t;
  t = t.replace(/value\['([a-zA-Z_][a-zA-Z0-9_]*)'\]/g, "objectKey(value, '$1')");
  t = ensureObjectKeyImport(file, t);
  if (t !== b) {
    writeFileSync(file, t);
    n += 1;
  }
}
console.log(`bracket-to-objectKey: ${n} files`);
