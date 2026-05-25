/**
 * Mechanical migration: type-guard `any` parameters → `unknown` (Google TS guide).
 */
import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'glob';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const files = globSync('src/**/*.ts', {cwd: root, absolute: true})
  .concat(globSync('demo/**/*.ts', {cwd: root, absolute: true}));

const replacements = [
  [/\(value: any\):/g, '(value: unknown):'],
  [/\(value: any,/g, '(value: unknown,'],
  [/\(err: any\)/g, '(err: unknown)'],
  [/\(err : any\)/g, '(err: unknown)'],
  [/: any\)/g, ': unknown)'],
  [/, err: any\b/g, ', err: unknown'],
  [/\(callName: string, err: any\)/g, '(callName: string, err: unknown)'],
];

let changed = 0;
for (const file of files) {
  let text = readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of replacements) {
    text = text.replace(from, to);
  }
  if (text !== before) {
    writeFileSync(file, text);
    changed += 1;
  }
}
console.log(`any-to-unknown: updated ${changed} files`);
