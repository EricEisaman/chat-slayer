import {WhoisServerOptions} from './WhoisServerOptions';

export interface WhoisLookupOptions {
  readonly server?: string | WhoisServerOptions | null;
  readonly follow?: number;
  readonly timeout?: number;
  readonly punycode?: boolean;
  readonly encoding?: BufferEncoding;
  readonly responseEncoding?: BufferEncoding;
  readonly bind?: string | null;
}
