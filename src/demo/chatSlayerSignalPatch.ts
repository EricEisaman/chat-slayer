/** Babylon-style envelope: `{ cs: { name, payload } }` for patchSignals SSE. */
export function chatSlayerSignalPatch(
  name: string,
  payload: unknown,
): {readonly cs: {readonly name: string; readonly payload: unknown}} {
  return {
    cs: {
      name,
      payload,
    },
  };
}

export function stringifyChatSlayerSignalPatch(
  name: string,
  payload: unknown,
): string {
  return JSON.stringify(chatSlayerSignalPatch(name, payload));
}
