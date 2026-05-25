import type {ServerResponse} from 'http';

const corsAllowOriginKey = Symbol('chatSlayerCorsAllowOrigin');

export function setCorsAllowOrigin(res: ServerResponse, origin: string): void {
  (res as ServerResponse & {[corsAllowOriginKey]?: string})[
    corsAllowOriginKey
  ] = origin;
}

export function getCorsAllowOrigin(res: ServerResponse): string | undefined {
  return (res as ServerResponse & {[corsAllowOriginKey]?: string})[
    corsAllowOriginKey
  ];
}

export function applyCorsHeaders(res: ServerResponse, origin: string): void {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, X-Chat-Slayer-Client-Id, X-Demo-Room-Name, X-Demo-Room-Names, X-Demo-Room-Id, X-Demo-Message',
  );
  res.setHeader('Access-Control-Max-Age', '86400');
}
