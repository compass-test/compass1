import axios from 'axios';
import * as proxy from '../../../bitbucket/proxy';
import { BITBUCKET_PULL_REQUESTS_URL } from '../../../constants';

describe('Bitbucket proxy', () => {
  let nodeEnv: string | undefined;
  let microsEnv: string | undefined;
  let proxyUrl: string | undefined;
  let interceptorId: number | undefined;

  afterEach(() => {
    if (!Number.isNaN(interceptorId)) {
      // Remove interceptor to avoid it leaking into other tests
      axios.interceptors.request.eject(interceptorId!);
    }
  });

  describe('localhost', () => {
    it('should not add proxy', () => {
      interceptorId = proxy.proxyBitbucketRequests();
      expect(interceptorId).toBeUndefined();

      // @ts-ignore private API for request.handlers
      const { handlers } = axios.interceptors.request;
      expect(handlers.length).toBe(0);
    });
  });

  describe('production', () => {
    const proxyHost = 'proxy.atlassian.net';
    const proxyPort = 1234;

    beforeEach(() => {
      // Store original values
      nodeEnv = process.env.NODE_ENV;
      microsEnv = process.env.MICROS_ENV;
      proxyUrl = process.env.WHITELIST_PROXY;
      // Replace original values
      process.env.NODE_ENV = 'production';
      process.env.MICROS_ENV = 'dev-west2';
      process.env.WHITELIST_PROXY = `${proxyHost}:${proxyPort}`;
    });

    afterEach(() => {
      // Restore original values
      process.env.NODE_ENV = nodeEnv;
      process.env.MICROS_ENV = microsEnv;
      process.env.WHITELIST_PROXY = proxyUrl;
    });

    it('should not proxy non Bitbucket URLs', async () => {
      interceptorId = proxy.proxyBitbucketRequests()!;
      expect(interceptorId).toBeDefined();

      // @ts-ignore private API for request.handlers
      const { handlers } = axios.interceptors.request;
      expect(handlers.length).toBe(1);

      const handler = handlers[0];
      expect(handler).toBeDefined();

      const configGeneral = await handler.fulfilled({
        url: 'https://foo.com/resource',
        headers: {},
      });
      expect(configGeneral.proxy).toBeUndefined();
      expect(configGeneral.httpsAgent).toBeUndefined();
    });

    it('should proxy Bitbucket URLs', async () => {
      const consoleSpy = jest
        .spyOn(console, 'info')
        .mockImplementation((_msg: string) => {});

      interceptorId = proxy.proxyBitbucketRequests()!;
      expect(interceptorId).toBeDefined();

      // @ts-ignore private API for request.handlers
      const { handlers } = axios.interceptors.request;

      // Although we eject interceptors between tests, they remain as null values
      // within the array, so here we ensure the cleanup/ejection happened.
      expect(handlers.length).toBe(2);
      expect(handlers[0]).toBeNull();

      const handler = handlers[1];
      expect(handler).toBeDefined();

      const configBitBucket = await handler.fulfilled({
        url: BITBUCKET_PULL_REQUESTS_URL,
        headers: {},
      });
      expect(configBitBucket.proxy).toEqual(false);
      expect(configBitBucket.httpsAgent).toBeDefined();
      expect(configBitBucket.httpsAgent.proxy).toMatchObject(
        expect.objectContaining({
          protocol: 'http:',
          host: proxyHost,
          port: proxyPort,
          hostname: proxyHost,
          href: `http://${proxyHost}:${proxyPort}/`,
        }),
      );

      consoleSpy.mockRestore();
    });

    it('should utilise proxy within deployment-history endpoint', () => {
      const proxySpy = jest.spyOn(proxy, 'proxyBitbucketRequests');
      // Import endpoint
      require('../index').default;
      // Ensure it immediately self invoked `proxyBitbucketRequests`
      expect(proxySpy).toHaveBeenCalledTimes(1);
      // Cleanup the import/required module
      jest.resetModules();
    });
  });
});
