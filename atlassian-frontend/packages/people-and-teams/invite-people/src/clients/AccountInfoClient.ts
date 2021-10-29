import { AccountInfo } from '../types';

import { DEFAULT_STARGATE_SERVICE_URL } from './common';

export interface AccountInfoClientInterface {
  getAccountInfo(): Promise<AccountInfo>;
}

export class AccountInfoClient implements AccountInfoClientInterface {
  public async getAccountInfo(): Promise<AccountInfo> {
    const path = `${DEFAULT_STARGATE_SERVICE_URL}/me`;
    const resp = await fetch(path);

    if (!resp.ok) {
      return Promise.reject(new Error('Unable to fetch account info'));
    }
    return resp.json();
  }
}
