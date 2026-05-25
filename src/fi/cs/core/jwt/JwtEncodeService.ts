import {JwtEngine} from './JwtEngine';

export interface JwtEncodeService {
  getDefaultAlgorithm(): string;

  setDefaultAlgorithm(value: string): void;

  /**
   * Creates a jwt engine which hides secret
   *
   * @param secret
   * @param defaultAlgorithm
   */
  createJwtEngine(secret: string, defaultAlgorithm?: string): JwtEngine;
}
