import { Secrets } from '@atlassian/micros-serverless-platform';
import { createAsapAuthenticationMiddleware } from '@atlassian/micros-support';
import { ALBEvent } from '../types';
import { requireAuthentication } from './auth';

jest.mock('@atlassian/micros-serverless-platform');
jest.mock('@atlassian/micros-support');

describe('requireAuthentication', () => {
  let secrets: Record<string, string>;
  let mockAsapAuthenticationMiddleware: any;
  beforeEach(() => {
    jest.clearAllMocks();
    secrets = {
      WEBHOOK_API_KEY: 'foo',
      ASAP_AUDIENCE: 'audience',
      ASAP_PUBLIC_KEY_REPOSITORY_URL: 'publicKeyRepo',
      ASAP_PUBLIC_KEY_FALLBACK_REPOSITORY_URL: 'fallbackRepo',
    };
    (Secrets.get as any).mockImplementation((key: string) => secrets[key]);
    mockAsapAuthenticationMiddleware = {
      requireIssuer: jest.fn(),
    };
    (createAsapAuthenticationMiddleware as any).mockImplementation(
      () => mockAsapAuthenticationMiddleware,
    );
  });
  describe('apiKey', () => {
    const defaultEvent: Readonly<ALBEvent> = {
      httpMethod: 'post',
      path: '/foo',
      isBase64Encoded: false,
      body: '{}',
    };
    it('should succeed if apiKey query string value matches', async () => {
      const event: ALBEvent = {
        ...defaultEvent,
        queryStringParameters: {
          apiKey: 'foo',
        },
      };
      expect(await requireAuthentication(event, 'apiKey')).toBe(true);
    });
    it('should throw if apiKey query string value does not match', async () => {
      const event: ALBEvent = {
        ...defaultEvent,
        queryStringParameters: {
          apiKey: 'bar',
        },
      };
      await expect(requireAuthentication(event, 'apiKey')).rejects.toThrowError(
        'Invalid API key',
      );
    });

    it('should throw if no apiKey provided', async () => {
      const event: ALBEvent = {
        ...defaultEvent,
        queryStringParameters: {},
      };
      await expect(requireAuthentication(event, 'apiKey')).rejects.toThrowError(
        'Missing API key',
      );
    });
  });
  describe('asap', () => {
    const defaultEvent: Readonly<ALBEvent> = {
      httpMethod: 'post',
      path: '/foo',
      isBase64Encoded: false,
      body: '{}',
    };

    it('should create asap middleware and call requireIssuer', async () => {
      const event: ALBEvent = {
        ...defaultEvent,
        headers: {
          authorization: 'Bearer foo',
        },
      };
      await requireAuthentication(event, 'asap');
      expect(createAsapAuthenticationMiddleware).toHaveBeenCalledWith({
        publicKeyBaseUrls: ['publicKeyRepo', 'fallbackRepo'],
        resourceServerAudience: 'micros/audience',
      });
      expect(
        mockAsapAuthenticationMiddleware.requireIssuer,
      ).toHaveBeenCalledWith('Bearer foo', ['micros/af-product-integration']);
    });
  });
});
