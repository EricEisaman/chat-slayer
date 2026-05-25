import {
  explainOpenAiModel,
  isOpenAiModel,
  OpenAiModel,
} from '../../types/OpenAiModel';
import {
  explain,
  explainNot,
  explainOk,
  explainProperty,
} from '../../../types/explain';
import {
  explainStringOrUndefined,
  isStringOrUndefined,
} from '../../../types/String';
import {
  explainNumberOrUndefined,
  isNumberOrUndefined,
} from '../../../types/Number';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../types/OtherKeys';
import {isReadonlyJsonObject, ReadonlyJsonObject} from '../../../Json';
import {
  explainArrayOf,
  explainArrayOfOrUndefined,
  isArrayOf,
  isArrayOfOrUndefined,
} from '../../../types/Array';
import {
  explainOpenAiChatCompletionMessage,
  isOpenAiChatCompletionMessage,
  OpenAiChatCompletionMessage,
} from './OpenAiChatCompletionMessage';
import {
  explainOpenAiChatCompletionFunctionsOrUndefined,
  isOpenAiChatCompletionFunctionsOrUndefined,
  OpenAiChatCompletionFunctions,
} from './OpenAiChatCompletionFunctions';
import {isStringArrayOrUndefined} from '../../../types/StringArray';
import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isUndefined} from '../../../types/undefined';
import {isOpenAiChatCompletionFunctionCall} from './OpenAiChatCompletionFunctionCall';

/**
 * Data Transfer Object for requesting a completion from the OpenAI API.
 *
 * @see https://beta.openai.com/docs/api-reference/completions/create
 */
export interface OpenAiChatCompletionRequestDTO {
  /**
   * The model to use for completion.
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-model
   */
  readonly model: OpenAiModel | string;

  /**
   * A list of messages comprising the conversation so far.
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-messages
   */
  readonly messages?: OpenAiChatCompletionMessage[];

  /**
   * A list of functions the model may generate JSON inputs for.
   */
  readonly functions?: OpenAiChatCompletionFunctions[];

  /**
   * Controls how the model responds to function calls.
   * "none" means the model does not call a function, and responds to the end-user.
   * "auto" means the model can pick between an end-user or calling a function.
   * Specifying a particular function via {"name":\ "my_function"}
   * forces the model to call that function.
   * "none" is the default when no functions are present.
   * "auto" is the default if functions are present.
   */
  readonly function_call?: string | object;

  /**
   * The maximum number of tokens to generate in the completion.
   *
   * Defaults to 16
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-max_tokens
   */
  readonly max_tokens?: number;

  /**
   * The temperature to use for sampling.
   *
   * Defaults to 1
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-temperature
   */
  readonly temperature?: number;

  /**
   * The top probability to use for sampling.
   *
   * Defaults to 1
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-top_p
   */
  readonly top_p?: number;

  /**
   * The presence penalty to use for sampling.
   *
   * Defaults to `0`
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-presence_penalty
   */
  readonly presence_penalty?: number;

  /**
   * The frequency penalty to use for sampling.
   *
   * Defaults to `0`
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-frequency_penalty
   */
  readonly frequency_penalty?: number;

  /**
   * How many chat completion choices to generate for each input message.
   */
  readonly n?: number;

  /**
   * If set, partial message deltas will be sent, like in ChatGPT.
   * Tokens will be sent as data-only server-sent events as they become available,
   * with the stream terminated by a data: [DONE]
   */
  readonly stream?: boolean;

  /**
   * Up to 4 sequences where the API will stop generating further tokens.
   */
  readonly stop?: string | string[];

  /**
   * Detaults to `null`
   *
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-logit_bias
   * Modify the likelihood of specified tokens appearing in the completion.
   */
  readonly logit_bias?: ReadonlyJsonObject;

  /**
   * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-user
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
   */
  readonly user?: string;
}

/**
 * Create an `OpenAiChatCompletionRequestDTO` object with the given properties.
 *
 * @param {OpenAiChatCompletionMessageDTO} messages - The messages to complete.
 * @param {OpenAiModel} model - The model to use for completion.
 * @param {OpenAiChatCompletionFunctions} functions
 * @param {number} max_tokens - The maximum number of tokens to generate in the completion.
 * @param {number} temperature - The temperature to use for sampling.
 * @param {number} top_p - The top probability to use for sampling.
 * @param {number} frequency_penalty - The frequency penalty to use for sampling.
 * @param {number} presence_penalty - The presence penalty to use for sampling.
 * @param {number} function_call
 * @param {number} n
 * @param {number} stream
 * @param {number} stop
 * @param {number} logit_bias
 * @param {number} user
 * @returns {OpenAiChatCompletionRequestDTO} An `OpenAiChatCompletionRequestDTO` object with the given properties.
 */
export function createOpenAiChatCompletionRequestDTO(
  messages: OpenAiChatCompletionMessage[],
  model: OpenAiModel | string,
  functions?: OpenAiChatCompletionFunctions[],
  max_tokens?: number,
  temperature?: number,
  top_p?: number,
  frequency_penalty?: number,
  presence_penalty?: number,
  function_call?: string | object,
  n?: number,
  stream?: boolean,
  stop?: string | string[],
  logit_bias?: ReadonlyJsonObject,
  user?: string,
): OpenAiChatCompletionRequestDTO {
  return {
    messages,
    model: model ?? OpenAiModel.GPT_4,
    functions,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    function_call,
    n,
    stream,
    stop,
    logit_bias,
    user,
  };
}

/**
 * Test whether the given value is an `OpenAiChatCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {value is OpenAiChatCompletionRequestDTO} `true` if the value is an `OpenAiChatCompletionRequestDTO` object, `false` otherwise.
 */
export function isOpenAiChatCompletionRequestDTO(
  value: unknown,
): value is OpenAiChatCompletionRequestDTO {
  return (
    (isRegularObject(value) &&
      hasNoOtherKeys(value, [
        'messages',
        'model',
        'functions',
        'max_tokens',
        'temperature',
        'top_p',
        'frequency_penalty',
        'presence_penalty',
        'function_call',
        'n',
        'stream',
        'stop',
        'logit_bias',
        'user',
      ]) &&
      isArrayOf<OpenAiChatCompletionMessage>(
        objectKey(value, 'messages'),
        isOpenAiChatCompletionMessage,
      ) &&
      isOpenAiModel(objectKey(value, 'model')) &&
      isArrayOfOrUndefined<OpenAiChatCompletionFunctions>(
        objectKey(value, 'functions'),
        isOpenAiChatCompletionFunctionsOrUndefined,
      ) &&
      isNumberOrUndefined(objectKey(value, 'max_tokens')) &&
      isNumberOrUndefined(objectKey(value, 'temperature')) &&
      isNumberOrUndefined(objectKey(value, 'top_p')) &&
      isNumberOrUndefined(objectKey(value, 'frequency_penalty')) &&
      isNumberOrUndefined(objectKey(value, 'presence_penalty')) &&
      isStringOrUndefined(objectKey(value, 'function_call')) &&
      isNumberOrUndefined(objectKey(value, 'n')) &&
      isBooleanOrUndefined(objectKey(value, 'stream')) &&
      isStringArrayOrUndefined(objectKey(value, 'stop'))) ||
    (isStringOrUndefined(objectKey(value, 'stop')) &&
      isReadonlyJsonObject(objectKey(value, 'logit_bias')) &&
      isStringOrUndefined(objectKey(value, 'user')))
  );
}

/**
 * Explain why the given value is not an `OpenAiChatCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiChatCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionRequestDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, [
      'messages',
      'model',
      'functions',
      'max_tokens',
      'temperature',
      'top_p',
      'frequency_penalty',
      'presence_penalty',
      'function_call',
      'n',
      'stream',
      'stop',
      'logit_bias',
      'user',
    ]),
    explainProperty(
      'messages',
      explainArrayOf<OpenAiChatCompletionMessage>(
        'OpenAiChatCompletionMessageDTO',
        explainOpenAiChatCompletionMessage,
        objectKey(value, 'messages'),
        isOpenAiChatCompletionMessage,
      ),
    ),
    explainProperty('model', explainOpenAiModel(objectKey(value, 'model'))),
    explainProperty(
      'functions',
      explainArrayOfOrUndefined<OpenAiChatCompletionFunctions>(
        'OpenAiChatCompletionFunctions',
        explainOpenAiChatCompletionFunctionsOrUndefined,
        objectKey(value, 'functions'),
        isOpenAiChatCompletionFunctionsOrUndefined,
      ),
    ),
    explainProperty(
      'max_tokens',
      explainNumberOrUndefined(objectKey(value, 'max_tokens')),
    ),
    explainProperty(
      'temperature',
      explainNumberOrUndefined(objectKey(value, 'temperature')),
    ),
    explainProperty(
      'top_p',
      explainNumberOrUndefined(objectKey(value, 'top_p')),
    ),
    explainProperty(
      'frequency_penalty',
      explainNumberOrUndefined(objectKey(value, 'frequency_penalty')),
    ),
    explainProperty(
      'presence_penalty',
      explainNumberOrUndefined(objectKey(value, 'presence_penalty')),
    ),
    explainProperty(
      'function_call',
      explainStringOrUndefined(objectKey(value, 'function_call')),
    ),
    explainProperty('n', explainStringOrUndefined(objectKey(value, 'n'))),
    explainProperty(
      'stream',
      explainStringOrUndefined(objectKey(value, 'stream')),
    ),
    explainProperty('stop', explainStringOrUndefined(objectKey(value, 'stop'))),
    explainProperty(
      'logit_bias',
      explainStringOrUndefined(objectKey(value, 'logit_bias')),
    ),
    explainProperty('user', explainStringOrUndefined(objectKey(value, 'user'))),
  ]);
}

export function isOpenAiChatCompletionFunctionCallOrUndefined(
  value: unknown,
): value is OpenAiChatCompletionFunctions | undefined {
  return isOpenAiChatCompletionFunctionCall(value) || isUndefined(value);
}

export function explainOpenAiChatCompletionFunctionCallOrUndefined(
  value: unknown,
): string {
  return isOpenAiChatCompletionFunctionCallOrUndefined(value)
    ? explainOk()
    : explainNot('OpenAiChatCompletionFunctionCall or undefined');
}
