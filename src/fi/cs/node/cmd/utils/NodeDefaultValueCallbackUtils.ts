import {readFile} from 'fs/promises';
import {DefaultValueCallback} from '../../../core/cmd/types/DefaultValueCallback';

export class NodeDefaultValueCallbackUtils {
  public static readFromFile(
    charset: BufferEncoding = 'utf8',
  ): DefaultValueCallback {
    return async (
      fileName?: string | undefined,
    ): Promise<string | undefined> =>
      fileName ? await readFile(fileName, charset) : undefined;
  }
}
