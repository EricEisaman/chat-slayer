import {OpAuthClient} from '../OpAuthClient';

export class MockOpAuthClient implements OpAuthClient {
  public async authenticate(): Promise<void> {}

  public getAccessKey(): string {
    return '';
  }

  public isAuthenticated(): boolean {
    return false;
  }
}
