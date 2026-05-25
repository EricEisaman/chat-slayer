import {
  explainJokerDomainResult,
  isJokerDomainResult,
  JokerDomainResult,
} from './JokerDomainResult';
import {explain, explainProperty} from '../../../../types/explain';
import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../../../../types/RegularObject';
import {explainNoOtherKeys, hasNoOtherKeys} from '../../../../types/OtherKeys';
import {explainArrayOf, isArrayOf} from '../../../../types/Array';

export interface JokerComApiDomainListDTO {
  readonly domainList: readonly JokerDomainResult[];
}

export function createJokerComApiDomainListDTO(
  domainList: readonly JokerDomainResult[],
): JokerComApiDomainListDTO {
  return {
    domainList,
  };
}

export function isJokerComApiDomainListDTO(
  value: unknown,
): value is JokerComApiDomainListDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, ['domainList']) &&
    isArrayOf<JokerDomainResult>(
      objectKey(value, 'domainList'),
      isJokerDomainResult,
    )
  );
}

export function explainJokerComApiDomainListDTO(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeys(value, ['domainList']),
    explainProperty(
      'domainList',
      explainArrayOf<JokerDomainResult>(
        'JokerDomainResult',
        explainJokerDomainResult,
        objectKey(value, 'domainList'),
        isJokerDomainResult,
      ),
    ),
  ]);
}

export function stringifyJokerComApiDomainListDTO(
  value: JokerComApiDomainListDTO,
): string {
  return `JokerComApiDomainListDTO(${value})`;
}

export function parseJokerComApiDomainListDTO(
  value: unknown,
): JokerComApiDomainListDTO | undefined {
  if (isJokerComApiDomainListDTO(value)) return value;
  return undefined;
}
