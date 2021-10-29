import axios from 'axios';
import { getCommitURL } from '../constants';
import getHeaders from './headers';
import { getAxiosErrorMessage } from './errors';

export type BitbucketCommit = {
  hash: string;
  date: string;
  message: string;
  type: string;
  error?: string;
};

export const getCommit = async (commitHash: string) => {
  return await axios
    .get<BitbucketCommit>(getCommitURL(commitHash), getHeaders())
    .then(async (response) => {
      const error = getAxiosErrorMessage(response);
      if (error) {
        throw new Error(error);
      }
      return response.data;
    })
    .catch((error) => {
      const message =
        getAxiosErrorMessage(error.response) || error.message || error;
      console.error(message);
      throw new Error(
        `Failed to fetch Commit metadata from Bitbucket.\n\t${message}`,
      );
    });
};
