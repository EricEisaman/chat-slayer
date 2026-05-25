import {ReadonlyJsonAny} from './Json';
import {HttpService} from './HttpService';
import {isStoreIndexDTO, StoreIndexDTO} from './store/types/api/StoreIndexDTO';
import {LogService} from './LogService';
import {LogLevel} from './types/LogLevel';

const LOG = LogService.createLogger('StoreClientService');

export class StoreClientService {
  public static setLogLevel(level: LogLevel) {
    LOG.setLogLevel(level);
  }

  public static async getStoreIndex(url: string): Promise<StoreIndexDTO> {
    const response: ReadonlyJsonAny | undefined =
      await HttpService.getJson(url);
    if (!isStoreIndexDTO(response)) {
      LOG.debug('response = ', response);
      throw new TypeError('Response was not StoreIndexDTO');
    }
    return response;
  }
}
