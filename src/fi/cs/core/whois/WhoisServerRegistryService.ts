import {WhoisServerOptions} from './types/WhoisServerOptions';

export interface WhoisServerRegistryService {
  resolveServerFromAddress(
    addr: string,
  ): string | WhoisServerOptions | undefined;
}
