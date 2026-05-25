import {MatrixErrorCode} from './types/response/error/types/MatrixErrorCode';

export class MatrixRegistrationError extends Error {
  public readonly errcode: MatrixErrorCode;
  public readonly httpStatus: number;

  public constructor(
    errcode: MatrixErrorCode,
    message: string,
    httpStatus: number,
  ) {
    super(message);
    this.name = 'MatrixRegistrationError';
    this.errcode = errcode;
    this.httpStatus = httpStatus;
  }
}
