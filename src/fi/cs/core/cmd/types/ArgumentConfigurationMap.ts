import {ArgumentConfiguration} from './ArgumentConfiguration';

/**
 * User defined program arguments.
 *
 * @example
 *         {
 *             backend : [ ArgumentType.STRING, '--backend', '-b', 'AGENT_BACKEND', 'localhost' ]
 *         }
 */
export interface ArgumentConfigurationMap {
  [key: string]: ArgumentConfiguration;
}
