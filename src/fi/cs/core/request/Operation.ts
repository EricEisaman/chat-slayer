import {OpenAPIV3} from '../types/openapi';
import {MethodDecoratorFunction} from '../decorators/types/MethodDecoratorFunction';
import {RequestControllerUtils} from './utils/RequestControllerUtils';
import {LogService} from '../LogService';
import {LogLevel} from '../types/LogLevel';

const LOG = LogService.createLogger('Operation');

/**
 * Define OpenAPI operation
 *
 * @param config
 */
export function Operation(
  config: Partial<OpenAPIV3.OperationObject>,
): MethodDecoratorFunction {
  return (
    target: any | Function,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) => {
    const requestController = RequestControllerUtils.findController(target);
    if (requestController !== undefined) {
      if (propertyKey === undefined) {
        RequestControllerUtils.attachControllerOperation(
          requestController,
          undefined,
          config,
        );
      } else {
        RequestControllerUtils.attachControllerOperation(
          requestController,
          propertyKey,
          config,
        );
      }
    } else {
      LOG.debug(
        'mapping: for other: config=',
        config,
        'target=',
        target,
        'propertyKey=',
        propertyKey,
        'descriptor=',
        descriptor,
      );
    }
  };
}

Operation.setLogLevel = (level: LogLevel): void => {
  LOG.setLogLevel(level);
};
