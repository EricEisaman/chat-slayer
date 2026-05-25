import {CommandExitStatus} from '../types/CommandExitStatus';

/**
 */
export interface CsPackageCommandService {
  /**
   * The main command line handler
   *
   * @param args
   */
  main(args: readonly string[]): Promise<CommandExitStatus>;
}
