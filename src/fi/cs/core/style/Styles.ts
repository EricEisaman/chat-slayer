import {ComponentStyle, isComponentStyle} from './compiled/ComponentStyle';
import {ComponentStyleLayoutMapping} from './StyleLayout';
import {isString} from '../types/String';
import {isObjectOf} from '../types/Object';

export interface Styles {
  readonly [key: string]: ComponentStyle;
}

export function createStyles(): Styles {
  return {};
}

export function isStyles(value: unknown): value is ComponentStyleLayoutMapping {
  return isObjectOf<string, ComponentStyle>(value, isString, isComponentStyle);
}
