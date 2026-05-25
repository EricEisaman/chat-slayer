import {OpenAiModel} from '../../types/OpenAiModel';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';
import {
  explainString,
  explainStringOrUndefined,
  isString,
  isStringOrUndefined,
} from '../../../types/String';
import {explain, explainProperty} from '../../../types/explain';
import {explainArrayOf, isArrayOf} from '../../../types/Array';
import {startsWith} from '../../../functions/startsWith';
import {parseJson} from '../../../Json';
import {
  explainOpenAiCompletionResponseUsage,
  isOpenAiCompletionResponseUsage,
  OpenAiCompletionResponseUsage,
} from '../OpenAiCompletionResponseUsage';
import {explainNumber, isNumber} from '../../../types/Number';
import {OpenAiError} from '../OpenAiError';
import {
  explainOpenAiChatCompletionResponseChoice,
  isOpenAiChatCompletionResponseChoice,
  OpenAiChatCompletionResponseChoice,
} from './OpenAiChatCompletionResponseChoice';

/**
 * @typedef {Object} OpenAiChatCompletionResponseDTO
 *
 * The response to an OpenAI completion request.
 */
export interface OpenAiChatCompletionResponseDTO {
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
  readonly choices: readonly (
    | OpenAiChatCompletionResponseChoice
    | OpenAiError
  )[];

  /**
   *
   */
  readonly usage: OpenAiCompletionResponseUsage;

  readonly warning?: string;
}

/**
 * Create a new `OpenAiChatCompletionResponseDTO` object.
 *
 * @param {string} id - The ID of the response.
 * @param {string} object -
 * @param {number} created -
 * @param {OpenAiModel} model - The name of the model used to generate the response.
 * @param {readonly OpenAiCompletionResponseChoice[]} choices -
 * @param {OpenAiCompletionResponseUsage} usage -
 * @returns {OpenAiChatCompletionResponseDTO} The new `OpenAiChatCompletionResponseDTO` object.
 */
export function createOpenAiChatCompletionResponseDTO(
  id: string,
  object: string,
  created: number,
  model: OpenAiModel | string,
  choices: readonly (OpenAiChatCompletionResponseChoice | OpenAiError)[],
  usage: OpenAiCompletionResponseUsage,
): OpenAiChatCompletionResponseDTO {
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
 * Check if the given value is an `OpenAiChatCompletionResponseDTO` object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid `OpenAiChatCompletionResponseDTO` object, `false` otherwise.
 */
export function isOpenAiChatCompletionResponseDTO(
  value: unknown,
): value is OpenAiChatCompletionResponseDTO {
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
    isArrayOf<OpenAiChatCompletionResponseChoice | OpenAiError>(
      objectKey(value, 'choices'),
      isOpenAiChatCompletionResponseChoice,
    ) &&
    isOpenAiCompletionResponseUsage(objectKey(value, 'usage')) &&
    isStringOrUndefined(objectKey(value, 'warning'))
  );
}

/**
 * Explain why a value is not a valid OpenAiChatCompletionResponseDTO object.
 *
 * @param {any} value - The value to check.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiChatCompletionResponseDTO object.
 */
export function explainOpenAiChatCompletionResponseDTO(value: unknown): string {
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
      explainArrayOf<OpenAiChatCompletionResponseChoice | OpenAiError>(
        'OpenAiChatCompletionResponseChoice|OpenAiError',
        explainOpenAiChatCompletionResponseChoice,
        objectKey(value, 'choices'),
        isOpenAiChatCompletionResponseChoice,
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
 * Convert the given `OpenAiChatCompletionResponseDTO` object to a string.
 *
 * @param {OpenAiChatCompletionResponseDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiChatCompletionResponseDTO` object.
 */
export function stringifyOpenAiChatCompletionResponseDTO(
  value: OpenAiChatCompletionResponseDTO,
): string {
  return `OpenAiChatCompletionResponseDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiChatCompletionResponseDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiChatCompletionResponseDTO|undefined} The parsed `OpenAiChatCompletionResponseDTO` object, or `undefined` if the value is not a valid `OpenAiChatCompletionResponseDTO` object.
 */
export function parseOpenAiChatCompletionResponseDTO(
  value: unknown,
): OpenAiChatCompletionResponseDTO | undefined {
  if (isString(value)) {
    if (startsWith(value, 'OpenAiChatCompletionResponseDTO(')) {
      value = value.substring(
        'OpenAiChatCompletionResponseDTO('.length,
        value.length - 1,
      );
    }
    value = parseJson(value);
  }
  if (isOpenAiChatCompletionResponseDTO(value)) return value;
  return undefined;
}
