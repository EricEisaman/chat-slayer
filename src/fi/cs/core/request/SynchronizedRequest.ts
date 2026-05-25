import {RequestControllerUtils} from './utils/RequestControllerUtils';
import {LogService} from '../LogService';

const LOG = LogService.createLogger('SynchronizedRequest');

export function SynchronizedRequest() {
  return (
    target: any | Function,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) => {
    const requestController = RequestControllerUtils.findController(target);
    if (requestController !== undefined) {
      RequestControllerUtils.attachControllerSynchronizedRequest(
        requestController,
        propertyKey,
      );
    } else {
      LOG.debug(
        'mapping: for other: target=',
        target,
        'propertyKey=',
        propertyKey,
        'descriptor=',
        descriptor,
      );
    }
  };
}
