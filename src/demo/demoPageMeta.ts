import {BACKEND_PUBLIC_URL} from '../constants/runtime';
import {buildDemoConfigInlineScript} from './demoClientConfig';

export const DEMO_OG_TITLE =
  'Chat Slayer — Matrix-compatible chat in one Node process';

export const DEMO_OG_DESCRIPTION =
  'Try the live demo: register, pick a room, stream updates over SSE. Optional E2EE. In-memory server built for simple deploys.';

export const DEMO_OG_IMAGE_ALT = 'Chat Slayer logo';

export const DEMO_OG_IMAGE_WIDTH = '1200';
export const DEMO_OG_IMAGE_HEIGHT = '630';

const PLACEHOLDERS = {
  pageUrl: '__CS_PAGE_URL__',
  ogImage: '__CS_OG_IMAGE__',
  ogTitle: '__CS_OG_TITLE__',
  ogDescription: '__CS_OG_DESCRIPTION__',
  demoConfigScript: '__CS_DEMO_CONFIG_SCRIPT__',
} as const;

export function getDemoPublicBaseUrl(): string {
  return BACKEND_PUBLIC_URL.replace(/\/$/, '');
}

export interface DemoOgFields {
  readonly title: string;
  readonly description: string;
  readonly pageUrl: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly imageWidth: string;
  readonly imageHeight: string;
}

export function buildDemoOgFields(baseUrl?: string): DemoOgFields {
  const pageUrl = (baseUrl ?? getDemoPublicBaseUrl()).replace(/\/$/, '');
  return {
    title: DEMO_OG_TITLE,
    description: DEMO_OG_DESCRIPTION,
    pageUrl,
    imageUrl: `${pageUrl}/assets/chat-slayer-og.png`,
    imageAlt: DEMO_OG_IMAGE_ALT,
    imageWidth: DEMO_OG_IMAGE_WIDTH,
    imageHeight: DEMO_OG_IMAGE_HEIGHT,
  };
}

export function injectDemoPageMeta(html: string, baseUrl?: string): string {
  const fields = buildDemoOgFields(baseUrl);
  let out = html;
  const replacements: Record<string, string> = {
    [PLACEHOLDERS.pageUrl]: fields.pageUrl,
    [PLACEHOLDERS.ogImage]: fields.imageUrl,
    [PLACEHOLDERS.ogTitle]: fields.title,
    [PLACEHOLDERS.ogDescription]: fields.description,
  };
  for (const [placeholder, value] of Object.entries(replacements)) {
    if (out.includes(placeholder)) {
      out = out.split(placeholder).join(escapeHtmlAttr(value));
    }
  }
  if (out.includes(PLACEHOLDERS.demoConfigScript)) {
    out = out.split(PLACEHOLDERS.demoConfigScript).join(buildDemoConfigInlineScript());
  } else if (!out.includes('window.__CS_DEMO_CONFIG__')) {
    out = out.replace(
      '</head>',
      `    ${buildDemoConfigInlineScript()}\n  </head>`,
    );
  }
  return out;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}
