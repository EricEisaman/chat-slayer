// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {has} from '../../functions/has';
import {map} from '../../functions/map';
import {filter} from '../../functions/filter';
import {TestCallback} from '../../types/TestCallback';
import {isFunction} from '../../types/Function';
import {isObject} from '../../types/Object';
import {keys} from '../../functions/keys';
import {every} from '../../functions/every';
import {some} from '../../functions/some';

export class RequestInterfaceUtils {
  static isObject(value: unknown): value is {} {
    return isObject(value);
  }

  static hasPropertyMethods(value: unknown): value is {methods: any} {
    return has(value, 'methods');
  }

  static hasPropertyControllerProperties(
    value: unknown,
  ): value is {controllerProperties: any} {
    return has(value, 'controllerProperties');
  }

  static hasPropertyPaths(value: unknown): value is {paths: any} {
    return has(value, 'paths');
  }

  static hasPropertyParams(value: unknown): value is {params: any} {
    return has(value, 'params');
  }

  static hasPropertyModelAttributes(
    value: unknown,
  ): value is {modelAttributes: any} {
    return has(value, 'modelAttributes');
  }

  static hasPropertySynchronized(value: unknown): value is {synchronized: any} {
    return has(value, 'synchronized');
  }

  static hasPropertyMappings(value: unknown): value is {mappings: any} {
    return has(value, 'mappings');
  }

  static hasPropertyController(value: unknown): value is {controller: any} {
    return has(value, 'controller');
  }

  static hasPropertyQueryParam(value: unknown): value is {queryParam: any} {
    return has(value, 'queryParam');
  }

  static hasPropertyType(value: unknown): value is {type: any} {
    return has(value, 'type');
  }

  static hasProperty__requestMappings(
    value: unknown,
  ): value is {__requestMappings: any} {
    return has(value, '__requestMappings');
  }

  static hasPropertyStatus(value: unknown): value is {status: any} {
    return has(value, 'status');
  }

  static hasPropertyMessage(value: unknown): value is {message: any} {
    return has(value, 'message');
  }

  static createOrFunction(
    ...values: Array<Function | any>
  ): (item: unknown) => boolean {
    return (item: unknown): boolean => {
      return some(values, (item2: Function | any): boolean => {
        if (isFunction(item2)) return item2(item);

        return item === item2;
      });
    };
  }

  static everyPropertyIs<T>(
    value: {[key: string]: any},
    test: TestCallback,
  ): value is {[key: string]: T} {
    return every(
      map(keys(value), (key: string): any => value[key]),
      test,
    );
  }

  static explainEveryPropertyIs(
    value: {[key: string]: any},
    test: Function,
    explain: Function,
  ): Array<string> {
    return filter(
      map(
        map(keys(value), (key: string): unknown => value[key]),
        (item: unknown, index: number): string => {
          if (!test(item)) {
            return `#${index}: ${explain(item)}`;
          } else {
            return '';
          }
        },
      ),
      (item: string) => !!item,
    ) as string[];
  }
}
