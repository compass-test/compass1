import axios from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import { ENVIRONMENT, getEnvironment } from '../constants';

export function proxyBitbucketRequests(): number | undefined {
  if (getEnvironment() !== ENVIRONMENT.LOCALHOST) {
    const { WHITELIST_PROXY } = process.env;
    if (!WHITELIST_PROXY) {
      throw new Error(
        `Missing required proxy environment variables!\n\tWHITELIST_PROXY: '${WHITELIST_PROXY}'`,
      );
    }

    // Setup the WHITELIST_PROXY for all requests to Bitbucket
    // https://hello.atlassian.net/wiki/spaces/EDGE/pages/315794033/Whitelist+Proxy+-+Usage
    return axios.interceptors.request.use((config) => {
      if (config.url) {
        const { url } = config;
        if (url.includes('api.bitbucket.org')) {
          // The axios default proxy doesn't support our Squid proxy with HTTPS so
          // we use an additional third party https agent to act as our proxy.
          // See https://github.com/axios/axios/issues/2072#issuecomment-567473812
          const proxyUrl = `http://${WHITELIST_PROXY}`;
          config.proxy = false;
          config.httpsAgent = new (HttpsProxyAgent as any)(proxyUrl);
          console.info('Enabled Proxy for Bitbucket requests: ', proxyUrl);
        }
      }
      return config;
    });
  }
}
