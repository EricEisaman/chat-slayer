import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../../types/OtherKeys';
import {
  explainNumber,
  explainNumberOrNullOrUndefined,
  isNumber,
  isNumberOrNullOrUndefined,
} from '../../types/Number';
import {explainString, isString} from '../../types/String';
import {explain, explainOk, explainProperty} from '../../types/explain';
import {startsWith} from '../../functions/startsWith';
import {parseJson} from '../../Json';
import {isOpenAiError, OpenAiError} from './OpenAiError';

/**
 * @typedef {Object} OpenAiCompletionResponseChoice
 *
 * A completion response item returned by the OpenAI API.
 */
export interface OpenAiCompletionResponseChoice {
  /**
   * The completed text.
   */
  readonly text: string;
  readonly index: number;
  readonly logprobs: number | null;
  readonly finish_reason: string;
}

/**
 * Creates an `OpenAiCompletionResponseChoice` object.
 *
 * @param {string} text - The completed text.
 * @param {number} index -
 * @param {number|null} logprobs -
 * @param {string} finish_reason -
 * @returns {OpenAiCompletionResponseChoice} The created `OpenAiCompletionResponseChoice` object.
 */
export function createOpenAiCompletionResponseChoice(
  text: string,
  index: number,
  logprobs: number | null,
  finish_reason: string,
): OpenAiCompletionResponseChoice {
  return {
    text,
    index,
    logprobs: logprobs ?? null,
    finish_reason,
  };
}

/**
 * Check if the given value is a valid `OpenAiCompletionResponseChoice` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiCompletionResponseChoice} `true` if the value is a valid `OpenAiCompletionResponseChoice` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseChoice(
  value: unknown,
): value is OpenAiCompletionResponseChoice {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, [
      'text',
      'index',
      'logprobs',
      'finish_reason',
    ]) &&
    isString(objectKey(value, 'text')) &&
    isNumber(objectKey(value, 'index')) &&
    isNumberOrNullOrUndefined(objectKey(value, 'logprobs')) &&
    isString(objectKey(value, 'finish_reason'))
  );
}

/**
 * Attempts to explain why the given value is not a valid OpenAiCompletionResponseChoice object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseChoice object.
 */
export function explainOpenAiCompletionResponseChoice(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, [
      'text',
      'index',
      'logprobs',
      'finish_reason',
    ]),
    explainProperty('text', explainString(objectKey(value, 'text'))),
    explainProperty('index', explainNumber(objectKey(value, 'index'))),
    explainProperty(
      'logprobs',
      explainNumberOrNullOrUndefined(objectKey(value, 'logprobs')),
    ),
    explainProperty(
      'finish_reason',
      explainString(objectKey(value, 'finish_reason')),
    ),
  ]);
}

/**
 * Check if the given value is a valid `OpenAiCompletionResponseChoice` object or an OpenAiError.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiCompletionResponseChoice| OpenAiError} `true` if the value is a valid `OpenAiCompletionResponseChoice` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseChoiceOrError(
  value: unknown,
): value is OpenAiCompletionResponseChoice | OpenAiError {
  return isOpenAiCompletionResponseChoice(value) || isOpenAiError(value);
}

/**
 * Attempts to explain why the given value is not a valid OpenAiCompletionResponseChoice or OpenAiError object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseChoice or an OpenAiError object.
 */
export function explainOpenAiCompletionResponseChoiceOrError(
  value: unknown,
): string {
  return isOpenAiCompletionResponseChoiceOrError(value)
    ? explainOk()
    : 'Not OpenAiError or OpenAiCompletionResponseChoice';
}

/**
 * Convert the given `OpenAiCompletionResponseChoice` object to a string.
 *
 * @param {OpenAiCompletionResponseChoice} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionResponseChoice` object.
 */
export function stringifyOpenAiCompletionResponseChoice(
  value: OpenAiCompletionResponseChoice,
): string {
  return `OpenAiCompletionResponseChoice(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionResponseChoice` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionResponseChoice|undefined} The parsed `OpenAiCompletionResponseChoice` object, or `undefined` if the value is not a valid `OpenAiCompletionResponseChoice` object.
 */
export function parseOpenAiCompletionResponseChoice(
  value: unknown,
): OpenAiCompletionResponseChoice | undefined {
  if (isString(value)) {
    if (startsWith(value, 'OpenAiCompletionResponseChoice(')) {
      value = value.substring(
        'OpenAiCompletionResponseChoice('.length,
        value.length - 1,
      );
    }
    value = parseJson(value);
  }
  if (isOpenAiCompletionResponseChoice(value)) return value;
  return undefined;
}
