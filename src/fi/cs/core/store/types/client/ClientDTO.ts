import {isArray, isArrayOrUndefinedOf} from '../../../types/Array';
import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {hasNoOtherKeys} from '../../../types/OtherKeys';

/**
 * The client object used in the REST API communication
 */
export interface ClientDTO {
  readonly id: string;
  readonly updated?: string;
  readonly created?: string;
  readonly date?: string;
  readonly company?: string;
  readonly companyCode?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly address?: string[];
  readonly postCode?: string;
  readonly postName?: string;
  readonly country?: string;
  readonly email?: string[];
  readonly phone?: string;
  readonly mobile?: string;
  readonly fax?: string;
  readonly billingLang?: string;
  readonly sendEmail?: boolean;
  readonly sendPost?: boolean;
  readonly isTerminated?: boolean;
}

export function createClientDTO(
  id: string,
  updated: string,
  created: string,
  date: string,
  company: string,
  companyCode: string,
  firstname: string,
  lastname: string,
  address: string | readonly string[] | undefined,
  postCode: string,
  postName: string,
  country: string,
  email: string | readonly string[] | undefined,
  phone: string,
  mobile: string,
  fax: string,
  billingLang: string,
  sendEmail: boolean,
  sendPost: boolean,
  isTerminated: boolean,
): ClientDTO {
  return {
    id,
    updated,
    created,
    date,
    company,
    companyCode,
    firstname,
    lastname,
    address: !address ? [] : isArray(address) ? [...address] : [address],
    postCode,
    postName,
    country,
    email: !email ? [] : isArray(email) ? [...email] : [email],
    phone,
    mobile,
    fax,
    billingLang,
    sendEmail,
    sendPost,
    isTerminated,
  };
}

export function isClientDTO(value: unknown): value is ClientDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeys(value, [
      'id',
      'updated',
      'created',
      'date',
      'company',
      'companyCode',
      'firstname',
      'lastname',
      'address',
      'postCode',
      'postName',
      'country',
      'email',
      'phone',
      'mobile',
      'fax',
      'billingLang',
      'sendEmail',
      'sendPost',
      'isTerminated',
    ]) &&
    isString(objectKey(value, 'id')) &&
    isStringOrUndefined(objectKey(value, 'updated')) &&
    isStringOrUndefined(objectKey(value, 'created')) &&
    isStringOrUndefined(objectKey(value, 'date')) &&
    isStringOrUndefined(objectKey(value, 'company')) &&
    isStringOrUndefined(objectKey(value, 'companyCode')) &&
    isStringOrUndefined(objectKey(value, 'firstname')) &&
    isStringOrUndefined(objectKey(value, 'lastname')) &&
    isArrayOrUndefinedOf<string>(objectKey(value, 'address'), isString) &&
    isStringOrUndefined(objectKey(value, 'postCode')) &&
    isStringOrUndefined(objectKey(value, 'postName')) &&
    isStringOrUndefined(objectKey(value, 'country')) &&
    isArrayOrUndefinedOf<string>(objectKey(value, 'email'), isString) &&
    isStringOrUndefined(objectKey(value, 'phone')) &&
    isStringOrUndefined(objectKey(value, 'mobile')) &&
    isStringOrUndefined(objectKey(value, 'fax')) &&
    isStringOrUndefined(objectKey(value, 'billingLang')) &&
    isBooleanOrUndefined(objectKey(value, 'sendEmail')) &&
    isBooleanOrUndefined(objectKey(value, 'sendPost')) &&
    isBooleanOrUndefined(objectKey(value, 'isTerminated'))
  );
}

export function stringifyClientDTO(value: ClientDTO): string {
  if (!isClientDTO(value)) throw new TypeError(`Not ClientDTO: ${value}`);
  return `ClientDTO(${value})`;
}

export function parseClientDTO(value: unknown): ClientDTO | undefined {
  if (isClientDTO(value)) return value;
  return undefined;
}
