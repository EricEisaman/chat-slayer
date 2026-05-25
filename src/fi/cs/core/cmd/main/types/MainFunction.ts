import {CommandExitStatus} from '../../types/CommandExitStatus';

export interface MainFunction {
  (args: readonly string[]): Promise<CommandExitStatus> | CommandExitStatus;
}
