import {TranslationParams} from './TranslationParams';

export interface TranslationFunction {
  (key: string, translationParams?: TranslationParams): string;
}
