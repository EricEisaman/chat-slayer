import {isMatrixJoinRule, MatrixJoinRule} from './MatrixJoinRule';
import {
  isRoomJoinRulesAllowConditionDTO,
  RoomJoinRulesAllowConditionDTO,
} from './RoomJoinRulesAllowConditionDTO';
import {ReadonlyJsonObject} from '../../../../core/Json';
import {isRegularObject, objectKey} from '../../../../core/types/RegularObject';
import {hasNoOtherKeysInDevelopment} from '../../../../core/types/OtherKeys';
import {isArrayOf} from '../../../../core/types/Array';

/**
 * @see https://spec.matrix.org/v1.2/client-server-api/#mroomjoin_rules
 */
export interface RoomJoinRulesStateContentDTO extends ReadonlyJsonObject {
  readonly allow: readonly RoomJoinRulesAllowConditionDTO[];
  readonly join_rule: MatrixJoinRule;
}

export function createRoomJoinRulesStateContentDTO(
  join_rule: MatrixJoinRule,
  allow: readonly RoomJoinRulesAllowConditionDTO[],
): RoomJoinRulesStateContentDTO {
  return {
    join_rule,
    allow,
  };
}

export function isRoomJoinRulesStateContentDTO(
  value: unknown,
): value is RoomJoinRulesStateContentDTO {
  return (
    isRegularObject(value) &&
    hasNoOtherKeysInDevelopment(value, ['allow', 'join_rule']) &&
    isArrayOf<RoomJoinRulesAllowConditionDTO>(
      objectKey(value, 'allow'),
      isRoomJoinRulesAllowConditionDTO,
    ) &&
    isMatrixJoinRule(objectKey(value, 'join_rule'))
  );
}

export function stringifyRoomJoinRulesStateContentDTO(
  value: RoomJoinRulesStateContentDTO,
): string {
  return `RoomJoinRulesStateContentDTO(${value})`;
}

export function parseRoomJoinRulesStateContentDTO(
  value: unknown,
): RoomJoinRulesStateContentDTO | undefined {
  if (isRoomJoinRulesStateContentDTO(value)) return value;
  return undefined;
}
