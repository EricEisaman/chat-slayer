import {addNodeInitializer} from './addNodeInitializer';
import {CsNode} from '../../CsNode';
import {LogLevel} from '../../../core/types/LogLevel';

jest.mock('../../CsNode', () => ({
  CsNode: {
    initialize: jest.fn(),
  },
}));

describe('addNodeInitializer', () => {
  beforeEach(() => {
    addNodeInitializer.setLogLevel(LogLevel.NONE);

    jest.clearAllMocks();
  });

  it('initializes CsNode before executing method', async () => {
    class MyApp {
      @addNodeInitializer()
      public static async run(args: string[] = []) {
        return 'Hello world args=' + args.join(',');
      }
    }

    // Execute the method
    const result = await MyApp.run([]);

    // Assert CsNode.initialize was called
    expect(CsNode.initialize).toHaveBeenCalledTimes(1);

    // Assert method returned the expected result
    expect(result).toEqual('Hello world args=');
  });

  it('throws the error and logs a warning when an error occurs in the method', async () => {
    const err = new Error('Error in run method');
    class MyApp {
      @addNodeInitializer()
      public static async run(
        // @ts-ignore
        args: string[] = [],
      ) {
        throw err;
      }
    }

    // Assert that the method throws the error
    await expect(MyApp.run([])).rejects.toThrow(err);

    // Assert CsNode.initialize was called
    expect(CsNode.initialize).toHaveBeenCalledTimes(1);
  });
});
