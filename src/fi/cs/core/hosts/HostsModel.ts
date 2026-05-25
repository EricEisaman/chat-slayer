import {
  explainRegularObject,
  isRegularObject,
  objectKey,
} from '../types/RegularObject';
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from '../types/OtherKeys';
import {explain, explainProperty} from '../types/explain';
import {
  explainHostEntryModel,
  HostEntryModel,
  isHostEntryModel,
} from './HostEntryModel';
import {explainArrayOf, isArrayOf} from '../types/Array';

export interface HostsModel {
  readonly entries: readonly HostEntryModel[];
}

export function createHostsModel(
  entries: readonly HostEntryModel[],
): HostsModel {
  return {
    entries: entries,
  };
}

export function isHostsModel(value: unknown): value is HostsModel {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['entries']) &&
    isArrayOf<HostEntryModel>(objectKey(value, 'entries'), isHostEntryModel)
  );
}

export function explainHostsModel(value: unknown): string {
  return explain([
    explainRegularObject(value),
    explainNoOtherKeysInDevelopment(value, ['entries']),
    explainProperty(
      'entries',
      explainArrayOf<HostEntryModel>(
        'HostEntryModel',
        explainHostEntryModel,
        objectKey(value, 'entries'),
        isHostEntryModel,
      ),
    ),
  ]);
}

export function stringifyHostsModel(value: HostsModel): string {
  return `HostsModel(${value})`;
}

export function parseHostsModel(value: unknown): HostsModel | undefined {
  if (isHostsModel(value)) return value;
  return undefined;
}
