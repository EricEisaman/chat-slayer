import {log} from './log';

/**
 * Change the current working directory.
 *
 * Utility for testing framework.
 *
 * @param dir
 */
export function chdir(dir: string): void {
  try {
    log(`# cd ${dir}`);
    process.chdir(dir);
  } catch (err) {
    throw new Error(`Directory change to '${dir}' failed: ${err}`);
  }
}
