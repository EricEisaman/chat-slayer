import {CsPackageCommandService} from '../pkg/CsPackageCommandService';
import {CommandExitStatus} from '../types/CommandExitStatus';
import {CsCommandService} from './CsCommandService';
import {CsAiCommandService} from '../ai/CsAiCommandService';

export class CsCommandServiceImpl implements CsCommandService {
  private readonly _ai: CsAiCommandService;
  private readonly _pkg: CsPackageCommandService;

  public static create(
    ai: CsAiCommandService,
    pkg: CsPackageCommandService,
  ): CsCommandServiceImpl {
    return new CsCommandServiceImpl(ai, pkg);
  }

  protected constructor(ai: CsAiCommandService, pkg: CsPackageCommandService) {
    this._ai = ai;
    this._pkg = pkg;
  }

  public async main(args: readonly string[]): Promise<CommandExitStatus> {
    if (args.length === 0) return CommandExitStatus.USAGE;

    const [arg, ...freeArgs] = args;
    switch (arg) {
      case 'ai':
        return await this._ai.main(freeArgs);
      case 'pkg':
        return await this._pkg.main(freeArgs);
    }
    console.error(`Unknown command: ${arg}`);
    return CommandExitStatus.COMMAND_NOT_FOUND;
  }

  public async ai(args: readonly string[]): Promise<CommandExitStatus> {
    return await this._ai.main(args);
  }
}
