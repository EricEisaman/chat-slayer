/**
 * The status of parsing command line arguments.
 */
export enum ParsedCommandArgumentStatus {
  /**
   * There was no errors while parsing arguments.
   */
  OK,

  /**
   * Error happened. You should use `exitStatus` and `errorString` to inform
   * the end user.
   */
  ERROR,

  /**
   * Built-in --help argument requested.
   */
  HELP,

  /**
   * Built-in --version argument reguested.
   */
  VERSION,
}
