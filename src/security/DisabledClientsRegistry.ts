export interface DisabledClientRecord {
  readonly clientId: string;
  readonly reason: string;
  readonly observedFingerprint?: string;
  readonly expectedFingerprint?: string;
  readonly disabledAt: number;
}

const disabledIds = new Set<string>();
const auditLog: DisabledClientRecord[] = [];

export function disableClient(
  record: Omit<DisabledClientRecord, 'disabledAt'>,
): void {
  disabledIds.add(record.clientId);
  auditLog.push({...record, disabledAt: Date.now()});
  console.error(
    `[SECURITY] Client "${record.clientId}" disabled: ${record.reason}` +
      (record.observedFingerprint
        ? ` (observed=${record.observedFingerprint}, expected=${record.expectedFingerprint ?? '?'})`
        : ''),
  );
}

export function isClientDisabled(clientId: string | undefined): boolean {
  if (!clientId?.trim()) {
    return false;
  }
  return disabledIds.has(clientId.trim());
}

export function getDisabledClientsAuditLog(): readonly DisabledClientRecord[] {
  return auditLog;
}

export function resetDisabledClientsRegistry(): void {
  disabledIds.clear();
  auditLog.length = 0;
}
