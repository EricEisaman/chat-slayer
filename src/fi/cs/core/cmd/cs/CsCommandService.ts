import {CommandExitStatus} from '../types/CommandExitStatus';

export interface CsCommandService {
  main(args: readonly string[]): Promise<CommandExitStatus>;

  ai(args: readonly string[]): Promise<CommandExitStatus>;
}
