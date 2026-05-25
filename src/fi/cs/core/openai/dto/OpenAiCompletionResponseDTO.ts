import {
  explainOpenAiCompletionResponseChoiceOrError,
  isOpenAiCompletionResponseChoiceOrError,
  OpenAiCompletionResponseChoice,
} from './OpenAiCompletionResponseChoice';
import {OpenAiModel} from '../types/OpenAiModel';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../types/OtherKeys';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../types/String';
import {explain, explainProperty} from '../../types/explain';
import {explainArrayOf, isArrayOf} from '../../types/Array';
import {startsWith} from '../../functions/startsWith';
import {parseJson} from '../../Json';
import {
  explainOpenAiCompletionResponseUsage,
  isOpenAiCompletionResponseUsage,
  OpenAiCompletionResponseUsage,
} from './OpenAiCompletionResponseUsage';
import {explainNumber, isNumber} from '../../types/Number';
import {OpenAiError} from './OpenAiError';

/**
 * @typedef {Object} OpenAiCompletionResponseDTO
 *
 * The response to an OpenAI completion request.
 */
export interface OpenAiCompletionResponseDTO {
  /**
   * The ID of the response.
   */
  readonly id: string;

  /**
   *
   */
  readonly object: string;

  /**
   *
   */
  readonly created: number;

  /**
   * The name of the model used to generate the response.
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-model
   */
  readonly model: OpenAiModel | string;

  /**
   */
  readonly choices: readonly (OpenAiCompletionResponseChoice | OpenAiError)[];

  /**
   *
   */
  readonly usage: OpenAiCompletionResponseUsage;

  readonly warning?: string;
}

/**
 * Create a new `OpenAiCompletionResponseDTO` object.
 *
 * @param {string} id - The ID of the response.
 * @param {string} object -
 * @param {number} created -
 * @param {OpenAiModel} model - The name of the model used to generate the response.
 * @param {readonly OpenAiCompletionResponseChoice[]} choices -
 * @param {OpenAiCompletionResponseUsage} usage -
 * @returns {OpenAiCompletionResponseDTO} The new `OpenAiCompletionResponseDTO` object.
 */
export function createOpenAiCompletionResponseDTO(
  id: string,
  object: string,
  created: number,
  model: OpenAiModel | string,
  choices: readonly (OpenAiCompletionResponseChoice | OpenAiError)[],
  usage: OpenAiCompletionResponseUsage,
): OpenAiCompletionResponseDTO {
  return {
    id,
    object,
    created,
    model,
    choices,
    usage,
  };
}

/**
 * Check if the given value is an `OpenAiCompletionResponseDTO` object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid `OpenAiCompletionResponseDTO` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseDTO(
  value: unknown,
): value is OpenAiCompletionResponseDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'object',
      'created',
      'model',
      'choices',
      'usage',
      'warning',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isString(objectKey(value, 'object')) &&
    isNumber(objectKey(value, 'created')) &&
    isString(objectKey(value, 'model')) &&
    isArrayOf<OpenAiCompletionResponseChoice | OpenAiError>(
      objectKey(value, 'choices'),
      isOpenAiCompletionResponseChoiceOrError,
    ) &&
    isOpenAiCompletionResponseUsage(objectKey(value, 'usage')) &&
    isStringOrUndefined(objectKey(value, 'warning'))
  );
}

/**
 * Explain why a value is not a valid OpenAiCompletionResponseDTO object.
 *
 * @param {any} value - The value to check.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseDTO object.
 */
export function explainOpenAiCompletionResponseDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'id',
      'object',
      'created',
      'model',
      'choices',
      'usage',
      'warning',
    ]),
    explainProperty('id', explainString(objectKey(value, 'id'))),
    explainProperty('object', explainString(objectKey(value, 'object'))),
    explainProperty('created', explainNumber(objectKey(value, 'created'))),
    explainProperty('model', explainString(objectKey(value, 'model'))),
    explainProperty(
      'choices',
      explainArrayOf<OpenAiCompletionResponseChoice | OpenAiError>(
        'OpenAiCompletionResponseChoice|OpenAiError',
        explainOpenAiCompletionResponseChoiceOrError,
        objectKey(value, 'choices'),
        isOpenAiCompletionResponseChoiceOrError,
      ),
    ),
    explainProperty(
      'usage',
      explainOpenAiCompletionResponseUsage(objectKey(value, 'usage')),
    ),
    explainProperty(
      'warning',
      explainStringOrUndefined(objectKey(value, 'warning')),
    ),
  ]);
}

/**
 * Convert the given `OpenAiCompletionResponseDTO` object to a string.
 *
 * @param {OpenAiCompletionResponseDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionResponseDTO` object.
 */
export function stringifyOpenAiCompletionResponseDTO(
  value: OpenAiCompletionResponseDTO,
): string {
  return `OpenAiCompletionResponseDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionResponseDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionResponseDTO|undefined} The parsed `OpenAiCompletionResponseDTO` object, or `undefined` if the value is not a valid `OpenAiCompletionResponseDTO` object.
 */
export function parseOpenAiCompletionResponseDTO(
  value: unknown,
): OpenAiCompletionResponseDTO | undefined {
  if (isString(value)) {
    if (startsWith(value, 'OpenAiCompletionResponseDTO(')) {
      value = value.substring(
        'OpenAiCompletionResponseDTO('.length,
        value.length - 1,
      );
    }
    value = parseJson(value);
  }
  if (isOpenAiCompletionResponseDTO(value)) return value;
  return undefined;
}
