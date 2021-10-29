import axios from 'axios';

type BitbucketCommit = {
  hash: string;
  date: string;
  message: string;
  type: 'commit' | 'error';
  error?: {
    message: string;
    data: {
      shas: string[];
    };
  };
};

const getHeaders = () => {
  const auth = Buffer.from(
    `${process.env.BITBUCKET_USER}:${process.env.BITBUCKET_PASSWORD}`,
  ).toString('base64');
  return {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  };
};

export const BitbucketApi = {
  /**
   * Look up a specific commit hash
   */
  getCommit: async function getCommit(commitHash: string) {
    const response = await axios.get<BitbucketCommit>(
      `https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/commit/${commitHash}`,
      getHeaders(),
    );
    return response.data;
  },

  /**
   * Validate that the latest commit exists upstream.
   *
   * We need to wait for this to occur before we can auto-approve a PR
   */
  waitForCommit: async function recursiveCheckLatestRemoteCommit(
    expectedCommitHash: string,
    attempts: number,
    retryTimeout: number,
    attempt = 1,
  ) {
    expectedCommitHash = expectedCommitHash.trim();
    const { hash: latestRemoteCommit } = await this.getCommit(
      expectedCommitHash,
    );
    if (latestRemoteCommit === expectedCommitHash) {
      return true;
    }
    if (attempt >= attempts) {
      // Give up after max attempts
      console.error(
        `Failed to find commit "${expectedCommitHash}" upstream after ${attempt} attempts. Aborting.`,
      );
      return false;
    }
    // Increment ahead of next invocation
    attempt++;
    // Check again in several seconds
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await this.waitForCommit(
            expectedCommitHash,
            attempts,
            retryTimeout,
            attempt,
          );
          resolve(result);
        } catch (error) {
          reject(false);
        }
      }, retryTimeout);
    });
  },
};
