import {CommandExitStatus} from '../../types/CommandExitStatus';

export interface MainApp {
  run(args: readonly string[]): Promise<CommandExitStatus> | CommandExitStatus;
}
