import {WhoisLookupResult} from './types/WhoisLookupResult';
import {WhoisLookupOptions} from './types/WhoisLookupOptions';

/**
 * @see NodeWhoisService at https://github.com//fi.cs.node
 * @see example use at https://github.com/example/whois/blob/main/src/controllers/FiCsWhoisBackendController.ts#L51
 */
export interface WhoisService {
  whoisLookup(
    address: string,
    options?: WhoisLookupOptions,
  ): Promise<readonly WhoisLookupResult[]>;
}
