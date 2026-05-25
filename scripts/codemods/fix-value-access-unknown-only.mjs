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

function processFunctionChunk(chunk, paramType) {
  if (paramType !== 'unknown') {
    return chunk;
  }
  return chunk.replace(/value\.([a-zA-Z_][a-zA-Z0-9_]*)/g, "objectKey(value, '$1')");
}

let changed = 0;
for (const file of files) {
  if (file === regularObjectAbs) continue;
  let text = readFileSync(file, 'utf8');
  const before = text;
  const parts = text.split(/(?=export function )/);
  text = parts
    .map((part, idx) => {
      if (idx === 0 && !part.startsWith('export function ')) {
        return part;
      }
      const m = part.match(/^export function \w+\s*\([^)]*value:\s*([^),]+)/);
      if (!m) return part;
      const paramType = m[1].trim();
      return processFunctionChunk(part, paramType);
    })
    .join('');
  text = ensureObjectKeyImport(file, text);
  if (text !== before) {
    writeFileSync(file, text);
    changed += 1;
  }
}
console.log(`fix-value-access-unknown-only: ${changed} files`);
