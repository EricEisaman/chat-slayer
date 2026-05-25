import {WhoisServerOptions} from './WhoisServerOptions';

export interface WhoisServerList {
  readonly [key: string]: string | WhoisServerOptions | null | undefined;
}
