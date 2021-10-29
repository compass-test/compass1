import { CONNECT_BASE_URL } from '../../constants';

import { BitbucketWorkspaceConnection } from './types';

export default async function getBitbucketWorkspaceConnection(
  cloudId: string,
): Promise<BitbucketWorkspaceConnection> {
  const url = `${CONNECT_BASE_URL}/cloudsite-connection/${cloudId}`;

  try {
    const resp = await fetch(url);
    return await resp.json();
  } catch (e) {
    // TODO (COMPASS-2092): figure out how to handle errors
    return {
      connected: false,
      workspace: null,
    };
  }
}
