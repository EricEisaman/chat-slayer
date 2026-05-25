import {isStringOrSymbol} from '../../types/String';

export function decoratorPropertyName(
  context: unknown,
): string | symbol | undefined {
  if (isStringOrSymbol(context)) {
    return context;
  }
  if (typeof context === 'object' && context !== null && 'name' in context) {
    const name = (context as {name: unknown}).name;
    return isStringOrSymbol(name) ? name : undefined;
  }
  return undefined;
}
