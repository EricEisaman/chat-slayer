import {ReadonlyJsonObject} from '../Json';

export interface I18NextResourceProperty {
  readonly translation: ReadonlyJsonObject;
  readonly [key: string]: ReadonlyJsonObject;
}

/**
 * The keyword is Language
 */
export interface I18NextResource {
  readonly [key: string]: I18NextResourceProperty;
}
