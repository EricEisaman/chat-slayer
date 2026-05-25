import {
  RequestParamValueType,
  isRequestParamValueType,
} from './RequestParamValueType';
import {objectKey} from '../../types/RegularObject';

import {isBoolean} from '../../types/Boolean';
import {RequestParamObjectType} from './RequestParamObjectType';
import {isString} from '../../types/String';

export interface RequestPathVariableParamObject {
  readonly objectType: RequestParamObjectType.PATH_VARIABLE;
  readonly valueType: RequestParamValueType;
  readonly variableName: string;
  readonly isRequired: boolean;
  readonly defaultValue: string | undefined;
  readonly decodeValue: boolean;
}

export function isRequestPathVariableParamObject(
  value: unknown,
): value is RequestPathVariableParamObject {
  return (
    !!value &&
    objectKey(value, 'objectType') === RequestParamObjectType.PATH_VARIABLE &&
    isString(objectKey(value, 'variableName')) &&
    isBoolean(objectKey(value, 'isRequired')) &&
    isRequestParamValueType(objectKey(value, 'valueType')) &&
    (objectKey(value, 'defaultValue') === undefined ||
      isString(objectKey(value, 'defaultValue')))
  );
}
