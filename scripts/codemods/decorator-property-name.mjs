import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const pattern =
  /const propertyName = isStringOrSymbol\(context\) \? context : context\?\.name;/g;
const replacement = 'const propertyName = decoratorPropertyName(context);';
const importLine =
  "import { decoratorPropertyName } from './utils/decoratorPropertyName';";
const importLinePost =
  "import { decoratorPropertyName } from './utils/decoratorPropertyName';";

const files = globSync('src/fi/cs/core/data/**/*.ts', {cwd: root, absolute: true});
let n = 0;
for (const file of files) {
  let t = readFileSync(file, 'utf8');
  if (!pattern.test(t)) continue;
  t = t.replace(pattern, replacement);
  if (!t.includes('decoratorPropertyName')) {
    const utilsImport = file.includes('/data/utils/')
      ? null
      : t.includes("from './utils/")
        ? null
        : importLine;
    if (utilsImport) {
      const lastImport = t.lastIndexOf('\nimport ');
      if (lastImport >= 0) {
        const end = t.indexOf('\n', lastImport + 1);
        t = `${t.slice(0, end + 1)}${importLine}\n${t.slice(end + 1)}`;
      }
    } else if (!file.endsWith('decoratorPropertyName.ts')) {
      const depth = path.relative(path.join(root, 'src/fi/cs/core/data'), file).split(path.sep).length - 1;
      const rel = `${'../'.repeat(depth)}utils/decoratorPropertyName`;
      const line = `import { decoratorPropertyName } from '${rel}';`;
      const lastImport = t.lastIndexOf('\nimport ');
      if (lastImport >= 0) {
        const end = t.indexOf('\n', lastImport + 1);
        t = `${t.slice(0, end + 1)}${line}\n${t.slice(end + 1)}`;
      }
    }
  }
  writeFileSync(file, t);
  n += 1;
}
console.log(`decorator-property-name: ${n} files`);
