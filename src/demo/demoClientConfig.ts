import {
  type AllowedClientConfig,
  findAllowedClientById,
  getAllowedClientsConfig,
} from '../config/allowedClients';
import {
  isPreconfiguredPrivateRoomsEnabled,
  parsePrivateRoomNames,
} from '../config/initialRooms';
import {
  BACKEND_PRIVATE_ROOMS,
  BACKEND_PUBLIC_URL,
  DEMO_E2EE_ENABLED,
} from '../constants/runtime';

const DEMO_CLIENT_ID = 'web-demo';

export interface DemoClientConfig {
  readonly enforced: boolean;
  readonly defaultClientId: string;
  readonly apiBase: string;
  readonly privateRoomsEnabled: boolean;
  readonly e2eeEnabled: boolean;
  readonly clients: readonly {id: string; label?: string}[];
}

export function buildDemoClientConfig(): DemoClientConfig {
  const config = getAllowedClientsConfig();
  const demoClient =
    findAllowedClientById(config.clients, DEMO_CLIENT_ID) ?? config.clients[0];
  const publicOrigin = BACKEND_PUBLIC_URL.replace(/\/$/, '');
  const privateRoomNames = parsePrivateRoomNames(BACKEND_PRIVATE_ROOMS);
  return {
    enforced: config.enforced,
    defaultClientId: demoClient?.id ?? DEMO_CLIENT_ID,
    apiBase: publicOrigin || '',
    privateRoomsEnabled: isPreconfiguredPrivateRoomsEnabled(privateRoomNames),
    e2eeEnabled: DEMO_E2EE_ENABLED,
    clients: config.clients.map((c: AllowedClientConfig) => ({
      id: c.id,
      label: c.label,
    })),
  };
}

export function buildDemoConfigJson(): string {
  return JSON.stringify(buildDemoClientConfig(), null, 2);
}

/** Inline script for index.html (JSON-safe embedding). */
export function buildDemoConfigInlineScript(): string {
  return `<script>window.__CS_DEMO_CONFIG__=${JSON.stringify(buildDemoClientConfig())};</script>`;
}
