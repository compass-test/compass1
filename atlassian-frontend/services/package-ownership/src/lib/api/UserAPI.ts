import axios from 'axios';

import { Logger } from '../Logger';

type UserResponse = {
  aa_id: string;
};

const baseURL = 'https://directory.prod.atl-paas.net/api/staff/';

/**
 * Client for fetching user information.
 */
export class UserAPI {
  private static instance = axios.create({ baseURL });

  // Some attempts to the staff directory fail,
  // after a bit of testing, trying again once seems to work without any issues
  private static MAX_ATTEMPTS = 2;

  /**
   * Fetch the Atlassian account ID
   * @param staffId Atlassian Staff ID to use
   */
  static async getAccountId(staffId: string) {
    const request = (attemptsLeft: number): Promise<string | undefined> =>
      this.instance
        .get<UserResponse>(staffId)
        .then(res => res.data.aa_id)
        .catch(() => {
          attemptsLeft -= 1;
          Logger.error('Failed to fetch user from directory', {
            attemptsLeft,
          });
          if (attemptsLeft === 0) {
            return undefined;
          }
          return request(attemptsLeft);
        });

    return request(this.MAX_ATTEMPTS);
  }
}
