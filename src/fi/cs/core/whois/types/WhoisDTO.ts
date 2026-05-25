import {WhoisLookupResult} from './WhoisLookupResult';

import {objectKey} from '../../types/RegularObject';

export interface WhoisDTO {
  readonly payload: readonly WhoisLookupResult[];
}

export function createWhoisDTO(
  payload: readonly WhoisLookupResult[],
): WhoisDTO {
  return {
    payload,
  };
}

// export function isWhoisDTO (value: unknown) : value is WhoisDTO {
//     return (
//         isRegularObject(value)
//         && hasNoOtherKeys(value, [
//             'payload'
//         ])
//         && isString(objectKey(value, 'foo'))
//     );
// }
//
// export function explainWhoisDTO (value: unknown) : string {
//     return explain(
//         [
//             explainRegularObject(value),
//             explainNoOtherKeys(value, [
//                 ''
//             ]),
//             explainProperty("foo", explainString(objectKey(value, 'foo')))
//         ]
//     );
// }
//
// export function stringifyWhoisDTO (value : WhoisDTO) : string {
//     return `WhoisDTO(${value})`;
// }
//
// export function parseWhoisDTO (value: unknown) : WhoisDTO | undefined {
//     if (isWhoisDTO(value)) return value;
//     return undefined;
// }
