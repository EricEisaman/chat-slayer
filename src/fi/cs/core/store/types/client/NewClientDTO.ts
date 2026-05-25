import {isBooleanOrUndefined} from '../../../types/Boolean';
import {isString, isStringOrUndefined} from '../../../types/String';
import {isRegularObject, objectKey} from '../../../types/RegularObject';
import {isArrayOrUndefinedOf} from '../../../types/Array';

/**
 * The client object used in the REST API communication when creating a new client record
 */
export interface NewClientDTO {
  readonly company?: string;
  readonly companyCode?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly address?: string | string[];
  readonly postCode?: string;
  readonly postName?: string;
  readonly country?: string;
  readonly email?: string | string[];
  readonly phone?: string;
  readonly mobile?: string;
  readonly fax?: string;
  readonly billingLang?: string;
  readonly sendEmail?: boolean;
  readonly sendPost?: boolean;
}

export function createNewClientDTO(
  company?: string,
  companyCode?: string,
  firstName?: string,
  lastName?: string,
  address?: string | string[],
  postCode?: string,
  postName?: string,
  country?: string,
  email?: string | string[],
  phone?: string,
  mobile?: string,
  fax?: string,
  billingLang?: string,
  sendEmail?: boolean,
  sendPost?: boolean,
): NewClientDTO {
  return {
    ...(company !== undefined ? {company} : {}),
    ...(companyCode !== undefined ? {companyCode} : {}),
    ...(firstName !== undefined ? {firstName} : {}),
    ...(lastName !== undefined ? {lastName} : {}),
    ...(address !== undefined ? {address} : {}),
    ...(postCode !== undefined ? {postCode} : {}),
    ...(postName !== undefined ? {postName} : {}),
    ...(country !== undefined ? {country} : {}),
    ...(email !== undefined ? {email} : {}),
    ...(phone !== undefined ? {phone} : {}),
    ...(mobile !== undefined ? {mobile} : {}),
    ...(fax !== undefined ? {fax} : {}),
    ...(billingLang !== undefined ? {billingLang} : {}),
    ...(sendEmail !== undefined ? {sendEmail} : {}),
    ...(sendPost !== undefined ? {sendPost} : {}),
  };
}

export function isNewClientDTO(value: unknown): value is NewClientDTO {
  return (
    isRegularObject(value) &&
    isStringOrUndefined(objectKey(value, 'company')) &&
    isStringOrUndefined(objectKey(value, 'companyCode')) &&
    isStringOrUndefined(objectKey(value, 'firstName')) &&
    isStringOrUndefined(objectKey(value, 'lastName')) &&
    (isString(objectKey(value, 'address')) ||
      isArrayOrUndefinedOf<string>(objectKey(value, 'address'), isString)) &&
    isStringOrUndefined(objectKey(value, 'postCode')) &&
    isStringOrUndefined(objectKey(value, 'postName')) &&
    isStringOrUndefined(objectKey(value, 'country')) &&
    (isString(objectKey(value, 'email')) ||
      isArrayOrUndefinedOf<string>(objectKey(value, 'email'), isString)) &&
    isStringOrUndefined(objectKey(value, 'phone')) &&
    isStringOrUndefined(objectKey(value, 'mobile')) &&
    isStringOrUndefined(objectKey(value, 'fax')) &&
    isStringOrUndefined(objectKey(value, 'billingLang')) &&
    isBooleanOrUndefined(objectKey(value, 'sendEmail')) &&
    isBooleanOrUndefined(objectKey(value, 'sendPost'))
  );
}

export function stringifyNewClientDTO(value: NewClientDTO): string {
  if (!isNewClientDTO(value)) throw new TypeError(`Not NewClientDTO: ${value}`);
  return `NewClientDTO(${value})`;
}

export function parseNewClientDTO(value: unknown): NewClientDTO | undefined {
  if (isNewClientDTO(value)) return value;
  return undefined;
}
