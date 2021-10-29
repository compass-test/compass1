import { gql } from '@apollo/client/core';
import NodeCache from 'node-cache';

import { gqlClient } from './gql-client';
import logger from '../logger';

const userDetailsCache = new NodeCache({
  stdTTL: 3600, // 1 hour
});

export interface GqlStaffDetails {
  id: string;
  atlassianId: string;
  avatarUrl: string;
}

export const getStaffDetails = async (
  username: string,
): Promise<GqlStaffDetails | undefined> => {
  const cachedUserDetails = userDetailsCache.get<GqlStaffDetails>(username);
  if (cachedUserDetails) {
    return cachedUserDetails;
  }
  try {
    const response = await gqlClient.query<{
      staff: GqlStaffDetails;
    }>({
      query: gql`
        query getCurrentUserDetails($username: ID!) {
          staff(id: $username) {
            id
            atlassianId
            avatarUrl
          }
        }
      `,
      variables: {
        username,
      },
    });

    const userDetails = response.data?.staff;
    userDetailsCache.set(username, userDetails);

    return userDetails;
  } catch (error) {
    logger.error('error getting current user details', error);
    return undefined;
  }
};
