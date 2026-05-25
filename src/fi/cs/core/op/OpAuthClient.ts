/**
 * Auth client for OP APIs
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#section/Usage-example
 */
export interface OpAuthClient {
  /**
   * Returns true if we have a access token
   */
  isAuthenticated(): boolean;

  /**
   * Authenticates
   *
   * @param clientId OP client ID
   * @param clientSecret OP client secret
   */
  authenticate(clientId: string, clientSecret: string): Promise<void>;

  /**
   * Returns access token
   */
  getAccessKey(): string;
}
