const axios = require('axios');
const queryString = require('querystring');
const get = require('lodash/get');

(async () => {
  const {
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_PASSWORD,
    BITBUCKET_USER,
  } = process.env;

  if (!BITBUCKET_REPO_FULL_NAME || !BITBUCKET_USER || !BITBUCKET_PASSWORD) {
    throw Error(
      '$BITBUCKET_REPO_FULL_NAME or $BITBUCKET_USER or $BITBUCKET_PASSWORD environment variables are not set',
    );
  }
  const pipelinesCacheEndpoint = `https://api.bitbucket.org/internal/repositories/${BITBUCKET_REPO_FULL_NAME}/pipelines_caches/`;

  const axiosConfig = {
    auth: {
      username: BITBUCKET_USER,
      password: BITBUCKET_PASSWORD,
    },
  };
  try {
    console.log('Checking for an existing node cache');
    const response = await axios.get(pipelinesCacheEndpoint, axiosConfig);
    const caches = get(response, 'data.values', []);

    // Just in case we ever use a second cache, we'll explicitly look for a node cache
    const nodeCache = caches.find(cache => cache.name === 'node');
    if (!nodeCache) {
      console.log('No node cache found. Exiting.');
      return;
    }

    const cacheUuid = nodeCache.uuid;
    const deleteEndpoint = `${pipelinesCacheEndpoint}${queryString.escape(
      cacheUuid,
    )}`;

    console.log(`Deleting cache "${cacheUuid}"`);
    await axios.delete(deleteEndpoint, axiosConfig);
  } catch (e) {
    // The actual request to delete the cache will return a 500 error... That's what we get for
    // relying on internal api's.... we'll ignore it if we see it
    if (e.message !== 'Request failed with status code 500') {
      console.error('Error fetching or deleting cache: ', e.message);
      process.exit(1);
    } else {
      console.log('Success!');
    }
  }
})();
