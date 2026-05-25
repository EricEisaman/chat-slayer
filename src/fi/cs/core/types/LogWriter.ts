export interface LogWriter {
  /**
   * Writes string messages to log output
   *
   * @param input
   */
  write(input: string): void;
}
