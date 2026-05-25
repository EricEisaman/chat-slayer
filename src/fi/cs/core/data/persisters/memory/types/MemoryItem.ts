import {Entity} from '../../../Entity';

export interface MemoryItem {
  readonly id: string | number;
  value: Entity;
}

export function createMemoryItem(
  id: string | number,
  value: Entity,
): MemoryItem {
  return {
    id,
    value,
  };
}

export function cloneMemoryItem(item: MemoryItem): MemoryItem {
  const {id, value} = item;
  return {
    id,
    value: value.clone(),
  };
}
