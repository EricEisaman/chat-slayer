/**
 * @see https://spec.matrix.org/v1.2/client-server-api/#mroomjoin_rules
 */
export enum MatrixJoinRule {
  PUBLIC = 'public',
  INVITE = 'invite',
  KNOCK = 'knock',

  /**
   * Room v8 feature.
   * See https://github.com/matrix-org/matrix-doc/blob/master/proposals/3083-restricted-rooms.md
   */
  RESTRICTED = 'restricted',

  PRIVATE = 'private',
}

export function isMatrixJoinRule(value: unknown): value is MatrixJoinRule {
  switch (value) {
    case MatrixJoinRule.PUBLIC:
    case MatrixJoinRule.INVITE:
    case MatrixJoinRule.KNOCK:
    case MatrixJoinRule.RESTRICTED:
    case MatrixJoinRule.PRIVATE:
      return true;
    default:
      return false;
  }
}

export function stringifyMatrixJoinRule(value: MatrixJoinRule): string {
  switch (value) {
    case MatrixJoinRule.PUBLIC:
      return 'PUBLIC';
    case MatrixJoinRule.KNOCK:
      return 'KNOCK';
    case MatrixJoinRule.INVITE:
      return 'INVITE';
    case MatrixJoinRule.PRIVATE:
      return 'PRIVATE';
    case MatrixJoinRule.RESTRICTED:
      return 'RESTRICTED';
  }
  throw new TypeError(`Unsupported MatrixJoinRule value: ${value}`);
}

export function parseMatrixJoinRule(
  value: unknown,
): MatrixJoinRule | undefined {
  if (value === undefined) return undefined;
  switch (`${value}`.toUpperCase()) {
    case 'PUBLIC':
      return MatrixJoinRule.PUBLIC;
    case 'KNOCK':
      return MatrixJoinRule.KNOCK;
    case 'INVITE':
      return MatrixJoinRule.INVITE;
    case 'PRIVATE':
      return MatrixJoinRule.PRIVATE;
    case 'RESTRICTED':
      return MatrixJoinRule.RESTRICTED;
    default:
      return undefined;
  }
}
