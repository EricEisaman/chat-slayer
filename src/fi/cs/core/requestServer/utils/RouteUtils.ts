import {RequestRouterMappingObject} from '../types/RequestRouterMappingObject';
import {BaseRoutes} from '../types/BaseRoutes';
import {ParamRoutes} from '../types/ParamRoutes';
import {StaticRoutes} from '../types/StaticRoutes';
import {keys} from '../../functions/keys';
import {some} from '../../functions/some';

export class RouteUtils {
  public static createRoutes(routes: RequestRouterMappingObject): BaseRoutes {
    if (RouteUtils.routesHasParameter(routes)) {
      return new ParamRoutes(routes);
    }

    return new StaticRoutes(routes);
  }

  public static pathHasParameter(value: string): boolean {
    return value.split('/').some((item: string) => {
      if (item.length >= 2 && item[0] === ':') {
        return true;
      }
      return (
        item.length >= 3 && item[0] === '{' && item[item.length - 1] === '}'
      );
    });
  }

  public static routesHasParameter(
    routes: RequestRouterMappingObject,
  ): boolean {
    return some(keys(routes), RouteUtils.pathHasParameter);
  }
}
