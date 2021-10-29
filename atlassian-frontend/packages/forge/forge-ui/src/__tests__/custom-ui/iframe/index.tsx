jest.mock('@atlassian/bridge-core', () => {
  let callbacksMap = {} as any;

  return {
    createIframeBridge: jest.fn().mockImplementation(({ features }) => {
      Object.entries(features).forEach(([eventKey, callback]) => {
        callbacksMap[eventKey] = callback;
      });

      return {
        open: jest.fn().mockImplementation(() => jest.fn()),
      };
    }),

    __mockCallBridge: (eventKey: string, payload: any) =>
      callbacksMap[eventKey](payload),
  };
});

import React, { useEffect } from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  getByTestId,
} from '@testing-library/react';
import { clear as clearUserAgent, mockUserAgent } from 'jest-useragent-mock';
import AnalyticsListener from '@atlaskit/analytics-next/AnalyticsListener';
import * as bridge from '@atlassian/bridge-core';
import type { Extension } from '../../../web-client';
import {
  invokeExtensionMutation,
  getActiveTunnelsQuery,
} from '../../../web-client';
import { ProductEnvironment, EnvironmentType } from '@atlassian/forge-ui-types';
import { temporarilySilenceActAndAtlaskitDeprecationWarnings } from '@atlassian/aux-test-utils';
import { createMockClient } from 'mock-apollo-client';
import {
  Iframe,
  createSrcFromExtension,
  getExtensionEntryPoint,
  getIsSupportedBrowser,
  getSrcUrl,
} from '../../../custom-ui/iframe';
import { createBrowserHistory } from 'history';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

const createIframeBridge = bridge.createIframeBridge;
// @ts-ignore
const __mockCallBridge = bridge.__mockCallBridge;

// To suppress the `Could not load iframe:` error message
// eslint-disable-next-line no-console
const originalError = console.error;

beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = (...args: any[]) => {
    if (/Could not load iframe:/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalError;
});

describe('Iframe', () => {
  const extension: Extension = {
    id:
      'ari:cloud:ecosystem::extension/app-id/environment-id/static/module-key',
    appVersion: '1.0.0',
    environmentId: 'environmentId',
    installationId: 'installationId',
    properties: {
      resource: 'resource-key',
      title: 'Example',
      license: {
        isActive: true,
      },
    },
  } as Extension;

  const coreData = {
    cloudId: 'cloud-id',
    localId: 'local-id',
  };

  describe('getIsSupportedBrowser', () => {
    it('should return true for Chrome with version greater than or equal to 25', () => {
      expect(
        getIsSupportedBrowser(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
        ),
      ).toBe(true);
    });
    it('should return true for Firefox with version greater than or equal to 23', () => {
      expect(
        getIsSupportedBrowser(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0',
        ),
      ).toBe(true);
    });
    it('should return false for Chrome with version less than 25', () => {
      expect(
        getIsSupportedBrowser(
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/23.0.4147.125 Safari/537.36',
        ),
      ).toBe(false);
    });
    it('should return false for Internet Explorer', () => {
      expect(
        getIsSupportedBrowser(
          'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko',
        ),
      ).toBe(false);
    });
  });

  describe('getSrcUrl', () => {
    it('should use the tunnel URL if it matches the resource key', () => {
      expect(
        getSrcUrl(
          [{ resourceKey: 'resource-key', tunnelUrl: 'res-key-url' }],
          extension.properties.resource,
          'cdn-url',
        ),
      ).toBe('res-key-url');
    });
    it('should use the default URL if no match is found', () => {
      expect(
        getSrcUrl(
          [
            {
              resourceKey: 'other-resource-key',
              tunnelUrl: 'other-res-key-url',
            },
          ],
          extension.properties.resource,
          'cdn-url',
        ),
      ).toBe('cdn-url');
    });
  });

  describe('createSrcFromExtension', () => {
    it('formats the extension data into a valid cdn uri', () => {
      expect(
        createSrcFromExtension(
          'app-id',
          extension,
          ProductEnvironment.DEVELOPMENT,
          'resource-key',
        ),
      ).toBe(
        'https://installationId.cdn.stg.atlassian-dev.net/app-id/environmentId/1.0.0/resource-key/index.html',
      );
    });

    it('maps different product environments to the correct cdn uri', () => {
      expect(
        createSrcFromExtension(
          'app-id',
          extension,
          ProductEnvironment.STAGING,
          'resource-key',
        ),
      ).toBe(
        'https://installationId.cdn.stg.atlassian-dev.net/app-id/environmentId/1.0.0/resource-key/index.html',
      );
      expect(
        createSrcFromExtension(
          'app-id',
          extension,
          ProductEnvironment.PRODUCTION,
          'resource-key',
        ),
      ).toBe(
        'https://installationId.cdn.prod.atlassian-dev.net/app-id/environmentId/1.0.0/resource-key/index.html',
      );
    });

    it('uses resourceUploadId when it exists', () => {
      expect(
        createSrcFromExtension(
          'app-id',
          {
            ...extension,
            properties: {
              ...extension.properties,
              resourceUploadId: 'resource-upload-id',
            },
          },
          ProductEnvironment.DEVELOPMENT,
          'resource-key',
        ),
      ).toBe(
        'https://installationId.cdn.stg.atlassian-dev.net/app-id/environmentId/resource-upload-id/resource-key/index.html',
      );
    });
  });

  describe('getExtensionEntryPoint', () => {
    it('returns the default entrypoint if no alternative entrypoint is passed', () => {
      expect(getExtensionEntryPoint(extension)).toBe('resource-key');
    });

    it('returns the alternative entrypoint if passed', () => {
      const extensionWithEntryPoint = {
        ...extension,
        properties: {
          ...extension.properties,
          test: {
            resource: 'alternative-resource-key',
          },
        },
      };

      expect(getExtensionEntryPoint(extensionWithEntryPoint, 'test')).toBe(
        'alternative-resource-key',
      );
    });
  });

  describe('component', () => {
    beforeEach(() => {
      const supportedBrowser =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'; // Chrome
      mockUserAgent(supportedBrowser);
    });

    afterEach(() => {
      clearUserAgent();
    });

    it('fires a viewed event on mount', () => {
      const mockClient = createMockClient();
      const onEventStub = jest.fn();
      render(
        <AnalyticsListener channel="forge-ui" onEvent={onEventStub}>
          <Iframe
            accountId="account-id"
            apolloClient={mockClient}
            contextIds={['story']}
            extension={extension}
            coreData={coreData}
            extensionData={{
              type: 'jira:issuePanel',
              issueKey: 'AT-1',
              projectKey: 'AT',
            }}
            height="100px"
            width="100px"
          />
        </AnalyticsListener>,
      );

      expect(onEventStub).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            data: {
              action: 'viewed',
              actionSubject: 'forgeUIExtension',
              attributes: { isCustomUI: true },
            },
            eventType: 'ui',
          },
        }),
        'forge-ui',
      );
    });

    it('renders with the src, onload, allow and sandbox props defined', async () => {
      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={createMockClient()}
          contextIds={['test']}
          coreData={coreData}
          extension={extension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );
      const iframe = container.querySelector('iframe')!;

      const attributeValues = Array.from(iframe.attributes).reduce<{
        [key: string]: Attr['value'];
      }>((obj, attr) => {
        obj[attr.name] = attr.value;
        return obj;
      }, {});

      expect(attributeValues.sandbox).toEqual(
        'allow-downloads allow-forms allow-modals allow-same-origin allow-scripts',
      );
      expect(attributeValues.allow).toEqual('camera; microphone');
      expect(iframe.src).toBeDefined();
      expect(iframe.onload).toBeDefined();
    });

    it('should render an unsupported browser warning if the browser does not support CSP', async () => {
      const mockAgent =
        'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko'; // Internet Explorer
      mockUserAgent(mockAgent);
      expect(window.navigator.userAgent).toEqual(mockAgent);

      const { findByText } = render(
        <Iframe
          accountId="account-id"
          apolloClient={createMockClient()}
          contextIds={['test']}
          coreData={coreData}
          extension={extension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );
      expect(await findByText('Cannot render "Example"')).toBeTruthy();
      expect(
        await findByText(
          "Your browser version isn't compatible. We recommend upgrading to a compatible version.",
        ),
      ).toBeTruthy();
    });

    it('should render the correct height and width', async () => {
      const mockClient = createMockClient();
      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['story']}
          extension={extension}
          coreData={coreData}
          extensionData={{
            type: 'jira:issuePanel',
            issueKey: 'AT-1',
            projectKey: 'AT',
          }}
          height="100px"
          width="100px"
        />,
      );
      const div = container.querySelector('div') as HTMLIFrameElement;
      expect(div).toHaveStyle('height: 100px; width: 100px;');
    });

    it('should check for active tunnels and derive the src property accordingly for DEV app - with tunnel', async () => {
      const mockClient = createMockClient();

      mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
        return {
          data: {
            appActiveTunnels: {
              customUI: [
                {
                  resourceKey: 'resource-key',
                  tunnelUrl: 'http://localhost:8080',
                },
              ],
            },
          },
        };
      });

      const devExtension = {
        ...extension,
        environmentType: 'DEVELOPMENT' as EnvironmentType,
      };

      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={devExtension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframeContainer = getByTestId(
        container,
        'hosted-resources-iframe-container',
      ) as HTMLDivElement;
      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;

      expect(iframe.src).toStrictEqual('http://localhost:8080/');
    });

    it('should check for active tunnels and derive the src property accordingly for DEV app - no tunnel', async () => {
      const mockClient = createMockClient();

      mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
        return {
          data: {
            activeTunnels: {
              customUI: [
                {
                  resourceKey: 'other-resource-key',
                  tunnelUrl: 'http://localhost:8080',
                },
              ],
            },
          },
        };
      });

      const devExtension = {
        ...extension,
        environmentType: 'DEVELOPMENT' as EnvironmentType,
      };

      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={devExtension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframeContainer = getByTestId(
        container,
        'hosted-resources-iframe-container',
      ) as HTMLDivElement;
      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;

      expect(iframe.src).toStrictEqual(
        'https://installationid.cdn.prod.atlassian-dev.net/app-id/environmentId/1.0.0/resource-key/index.html',
      );
    });

    it('should check for active tunnels and derive the src property accordingly for PROD app', async () => {
      const mockClient = createMockClient();

      mockClient.setRequestHandler(getActiveTunnelsQuery(), async () => {
        return {
          data: {
            activeTunnels: {
              customUI: [
                {
                  resourceKey: 'resource-key',
                  tunnelUrl: 'http://localhost:8080',
                },
              ],
            },
          },
        };
      });

      const prodExtension = {
        ...extension,
        environmentType: 'PRODUCTION' as EnvironmentType,
      };

      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={prodExtension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframeContainer = getByTestId(
        container,
        'hosted-resources-iframe-container',
      ) as HTMLDivElement;
      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;

      expect(iframe.src).toStrictEqual(
        'https://installationid.cdn.prod.atlassian-dev.net/app-id/environmentId/1.0.0/resource-key/index.html',
      );
    });

    it('should use resourceUploadId when it exists', async () => {
      const mockClient = createMockClient();

      const extensionWithResourceUploadId = {
        ...extension,
        properties: {
          ...extension.properties,
          resourceUploadId: 'resource-upload-id',
        },
      };

      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={extensionWithResourceUploadId}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframeContainer = getByTestId(
        container,
        'hosted-resources-iframe-container',
      ) as HTMLDivElement;
      const iframe = (await waitForElement(
        () => getByTestId(iframeContainer, 'hosted-resources-iframe'),
        { container: iframeContainer },
      )) as HTMLIFrameElement;

      expect(iframe.src).toStrictEqual(
        'https://installationid.cdn.prod.atlassian-dev.net/app-id/environmentId/resource-upload-id/resource-key/index.html',
      );
    });

    describe('bridge', () => {
      describe('invoke', () => {
        it('should pass through coreData and extensionData correctly to invoker', async () => {
          const mockClient = createMockClient();

          mockClient.setRequestHandler(
            invokeExtensionMutation,
            async (body) => {
              return {
                data: {
                  invokeExtension: {
                    success: true,
                    errors: null,
                    response: { body: body.input.payload.context },
                  },
                },
              };
            },
          );

          const { container } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extension}
              extensionData={{
                type: 'jira:issuePanel',
              }}
            />,
          );

          const iframe = container.querySelector('iframe') as HTMLIFrameElement;
          fireEvent.load(iframe);

          const response = await __mockCallBridge('invoke', {});

          expect(response).toMatchObject({
            cloudId: coreData.cloudId,
            extension: {
              type: 'jira:issuePanel',
            },
            moduleKey: 'module-key',
          });
        });
      });

      ['submit', 'close'].forEach((method) => {
        describe(method, () => {
          it(`should call supplied ${method} method when called through bridge`, async () => {
            const mockClient = createMockClient();
            const mockMethod = jest.fn();
            const { container } = render(
              <Iframe
                accountId="account-id"
                apolloClient={mockClient}
                contextIds={['test']}
                coreData={coreData}
                extension={extension}
                extensionData={{
                  type: 'jira:issueAction',
                }}
                bridge={{
                  [method]: mockMethod,
                }}
              />,
            );

            const iframe = container.querySelector(
              'iframe',
            ) as HTMLIFrameElement;
            fireEvent.load(iframe);

            const response = await __mockCallBridge(method);

            expect(response).toBe(true);
            expect(mockMethod).toHaveBeenCalled();
          });

          it(`should return false if no ${method} method and called through bridge`, async () => {
            const mockClient = createMockClient();
            const { container } = render(
              <Iframe
                accountId="account-id"
                apolloClient={mockClient}
                contextIds={['test']}
                coreData={coreData}
                extension={extension}
                extensionData={{
                  type: 'jira:issueAction',
                }}
                bridge={{}}
              />,
            );

            const iframe = container.querySelector(
              'iframe',
            ) as HTMLIFrameElement;
            fireEvent.load(iframe);

            const response = await __mockCallBridge(method);

            expect(response).toBe(false);
          });

          it('should pass through return value if called through bridge', async () => {
            const mockClient = createMockClient();
            const mockMethod = jest.fn().mockReturnValueOnce(false);
            const { container } = render(
              <Iframe
                accountId="account-id"
                apolloClient={mockClient}
                contextIds={['test']}
                coreData={coreData}
                extension={extension}
                extensionData={{
                  type: 'jira:issueAction',
                }}
                bridge={{
                  [method]: mockMethod,
                }}
              />,
            );

            const iframe = container.querySelector(
              'iframe',
            ) as HTMLIFrameElement;
            fireEvent.load(iframe);

            const response = await __mockCallBridge(method);

            expect(response).toBe(false);
            expect(mockMethod).toHaveBeenCalled();
          });
        });
      });

      describe('getContext', () => {
        it('should return coreData, accountId, license and extensionData correctly', async () => {
          const mockClient = createMockClient();
          const { container } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extension}
              extensionData={{
                type: 'jira:issueAction',
              }}
            />,
          );

          const iframe = container.querySelector('iframe') as HTMLIFrameElement;
          fireEvent.load(iframe);

          const context = await __mockCallBridge('getContext');
          expect(context).toEqual({
            accountId: 'account-id',
            cloudId: coreData.cloudId,
            extension: {
              type: 'jira:issueAction',
            },
            license: {
              isActive: true,
            },
            localId: coreData.localId,
            moduleKey: 'module-key',
          });
        });
      });

      describe('createHistory', () => {
        it('should return a history object if routing api providers are passed', async () => {
          const mockClient = createMockClient();
          const history = createBrowserHistory();
          const { container } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extension}
              extensionData={{
                type: 'jira:issueAction',
              }}
              bridge={{
                history,
                extensionBasePath: '/test',
              }}
            />,
          );

          const iframe = container.querySelector('iframe') as HTMLIFrameElement;
          fireEvent.load(iframe);

          const response = await __mockCallBridge('createHistory');

          expect(JSON.stringify(response)).toEqual(JSON.stringify(history));
        });

        it('should throw an error if no routing api providers are passed', async () => {
          const mockClient = createMockClient();
          const history = createBrowserHistory();
          const { container } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extension}
              extensionData={{
                type: 'jira:issueAction',
              }}
              bridge={{
                history,
              }}
            />,
          );

          const iframe = container.querySelector('iframe') as HTMLIFrameElement;
          fireEvent.load(iframe);

          const response = __mockCallBridge('createHistory');

          await expect(response).rejects.toThrow();
        });
      });

      it('should update returned value when props change', async () => {
        const mockClient = createMockClient();
        const { container, rerender } = render(
          <Iframe
            accountId="account-id"
            apolloClient={mockClient}
            contextIds={['test']}
            coreData={coreData}
            extension={extension}
            extensionData={{
              type: 'jira:issueAction',
              testKey: 'testValue',
            }}
          />,
        );

        const iframe = container.querySelector('iframe') as HTMLIFrameElement;
        fireEvent.load(iframe);

        rerender(
          <Iframe
            accountId="account-id"
            apolloClient={mockClient}
            contextIds={['test']}
            coreData={coreData}
            extension={extension}
            extensionData={{
              type: 'jira:issueAction',
              testKey: 'differentValue',
            }}
          />,
        );

        const rerenderedIframe = container.querySelector(
          'iframe',
        ) as HTMLIFrameElement;
        fireEvent.load(rerenderedIframe);

        const context = await __mockCallBridge('getContext');
        expect(context).toEqual({
          accountId: 'account-id',
          cloudId: coreData.cloudId,
          extension: {
            type: 'jira:issueAction',
            testKey: 'differentValue',
          },
          license: {
            isActive: true,
          },
          localId: coreData.localId,
          moduleKey: 'module-key',
        });
        expect(iframe).not.toBeInTheDocument();
        expect(rerenderedIframe).toBeInTheDocument();
      });

      it('should not reload if props are equal', async () => {
        const mockClient = createMockClient();
        const { container, rerender } = render(
          <Iframe
            accountId="account-id"
            apolloClient={mockClient}
            contextIds={['test']}
            coreData={coreData}
            extension={extension}
            extensionData={{
              type: 'jira:issueAction',
            }}
          />,
        );

        const iframe = container.querySelector('iframe') as HTMLIFrameElement;
        fireEvent.load(iframe);

        rerender(
          <Iframe
            accountId="account-id"
            apolloClient={mockClient}
            contextIds={['test']}
            coreData={coreData}
            extension={extension}
            extensionData={{
              type: 'jira:issueAction',
            }}
          />,
        );

        const rerenderedIframe = container.querySelector(
          'iframe',
        ) as HTMLIFrameElement;
        fireEvent.load(rerenderedIframe);

        const context = await __mockCallBridge('getContext');
        expect(context).toEqual({
          accountId: 'account-id',
          cloudId: coreData.cloudId,
          extension: {
            type: 'jira:issueAction',
          },
          license: {
            isActive: true,
          },
          localId: coreData.localId,
          moduleKey: 'module-key',
        });
        expect(iframe).toBeInTheDocument();
        expect(iframe === rerenderedIframe).toBe(true);
      });
    });

    it('should call onLoad prop when it is passed', async () => {
      const mockClient = createMockClient();

      mockClient.setRequestHandler(invokeExtensionMutation, async (body) => {
        return {
          data: {
            invokeExtension: {
              success: true,
              errors: null,
              response: { body: body.input.payload.context },
            },
          },
        };
      });

      const onLoadMock = jest.fn();

      const { container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={extension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
          onLoad={onLoadMock}
        />,
      );

      expect(onLoadMock).not.toHaveBeenCalled();

      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      fireEvent.load(iframe);

      __mockCallBridge('invoke', {});

      expect(onLoadMock).toHaveBeenCalled();
    });
  });

  describe('3LO', () => {
    beforeEach(() => {
      const supportedBrowser =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'; // Chrome
      mockUserAgent(supportedBrowser);
    });

    afterEach(() => {
      clearUserAgent();
    });

    it('should not show 3LO prompt if user consent is not required', async () => {
      const createIframeBridgeMock = createIframeBridge as any;

      const mockClient = createMockClient();
      mockClient.setRequestHandler(invokeExtensionMutation, async () => ({
        data: {
          invokeExtension: {
            success: true,
            errors: null,
            response: null,
          },
        },
      }));

      const { findByTestId, container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={extension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      fireEvent.load(iframe);

      __mockCallBridge('invoke', {});

      expect(createIframeBridgeMock).toHaveBeenCalled();
      await expect(findByTestId('three-lo-prompt')).rejects.toThrow();
    });

    it('should show 3LO prompt when consent error is returned', async () => {
      const createIframeBridgeMock = createIframeBridge as any;

      const mockClient = createMockClient();
      mockClient.setRequestHandler(invokeExtensionMutation, async () => ({
        data: {
          invokeExtension: {
            success: false,
            response: null,
            errors: [
              {
                message: 'Needs authentication error',
                extensions: {
                  statusCode: 400,
                  errorType: 'USER_CONSENT_REQUIRED',
                  fields: {
                    authInfoUrl: 'test-url',
                  },
                },
              },
            ],
          },
        },
      }));

      const { findByTestId, container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          coreData={coreData}
          extension={extension}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      fireEvent.load(iframe);

      __mockCallBridge('invoke', {});

      expect(createIframeBridgeMock).toHaveBeenCalled();
      expect(await findByTestId('three-lo-prompt')).toBeDefined();
    });

    it('should retry resolver after going through 3LO dance', async () => {
      let invokeExtensionMock = jest
        .fn()
        .mockResolvedValueOnce({
          data: {
            invokeExtension: {
              success: false,
              response: null,
              errors: [
                {
                  message: 'Needs authentication error',
                  extensions: {
                    statusCode: 400,
                    errorType: 'USER_CONSENT_REQUIRED',
                    fields: {
                      authInfoUrl: 'test-url',
                    },
                  },
                },
              ],
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            invokeExtension: {
              success: true,
              errors: null,
              response: { body: { greeting: 'hello' } },
            },
          },
        });

      const mockClient = createMockClient();
      mockClient.setRequestHandler(
        invokeExtensionMutation,
        invokeExtensionMock,
      );

      let onThreeLOGranted = () => {};
      const BasicThreeLOPrompt = ({
        onSuccess,
      }: {
        onSuccess: () => Promise<void>;
      }) => {
        useEffect(() => {
          onThreeLOGranted = onSuccess;
        }, [onSuccess]);
        return <div data-testid="three-lo-prompt">authorizing</div>;
      };

      const { findByTestId, queryByTestId, container } = render(
        <Iframe
          accountId="account-id"
          apolloClient={mockClient}
          contextIds={['test']}
          extension={extension}
          components={(defaults) => ({
            ...defaults,
            ThreeLOPrompt: (props) => <BasicThreeLOPrompt {...props} />,
          })}
          coreData={coreData}
          extensionData={{
            type: 'jira:issuePanel',
          }}
        />,
      );

      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      fireEvent.load(iframe);

      const response = __mockCallBridge('invoke', {});

      expect(await findByTestId('three-lo-prompt')).toBeDefined();
      onThreeLOGranted();
      expect(await response).toEqual({ greeting: 'hello' });
      expect(queryByTestId('three-lo-prompt')).toBeNull();
    });
  });

  describe('Egress Disclosure', () => {
    beforeEach(() => {
      const supportedBrowser =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'; // Chrome
      mockUserAgent(supportedBrowser);
    });

    afterEach(() => {
      clearUserAgent();
    });

    describe('user is required to consent for an extension', () => {
      const extensionPreConsent: Extension = {
        ...extension,
        consentUrl: 'https://mock.dev',
        requiresUserConsent: true,
      };

      const extensionPostConsent: Extension = {
        ...extensionPreConsent,
        currentUserConsent: {
          user: {
            aaid: 'aaid',
          },
          appEnvironmentVersion: {
            id: 'appEnvironmentId',
          },
          consentedAt: 'some time',
        },
      };

      it.each([
        [
          'show',
          { userHasConsented: false, featureFlag: true },
          extensionPreConsent,
        ],
        [
          'not show',
          { userHasConsented: true, featureFlag: true },
          extensionPostConsent,
        ],
        [
          'not show',
          { userHasConsented: false, featureFlag: false },
          extensionPreConsent,
        ],
        [
          'not show',
          { userHasConsented: true, featureFlag: false },
          extensionPostConsent,
        ],
      ])(
        'should %s the 3LO prompt with: %p',
        async (
          _,
          { userHasConsented, featureFlag },
          extensionWithConsentInfo,
        ) => {
          const mockClient = createMockClient();

          const { findByTestId, getByTestId, container } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extensionWithConsentInfo}
              extensionData={{
                type: 'jira:issuePanel',
              }}
              egressConsentFlowEnabled={featureFlag}
            />,
          );

          if (featureFlag && !userHasConsented) {
            expect(await findByTestId('three-lo-prompt')).toBeDefined();
            expect(container.querySelector('iframe')).toBeNull();
          } else {
            expect(await findByTestId('hosted-resources-iframe')).toBeDefined();
            expect(() => getByTestId('three-lo-prompt')).toThrow();
          }
        },
      );
    });

    describe('user is not required to consent for an extension', () => {
      const extensionPreConsent: Extension = {
        ...extension,
        consentUrl: 'https://mock.dev',
        requiresUserConsent: false,
      };

      it.each([
        ['not show', extension],
        ['not show', extensionPreConsent],
      ])(
        'should %s the 3LO prompt',
        async (_, extensionWithMaybeConsentInfo) => {
          const mockClient = createMockClient();

          const { findByTestId, getByTestId } = render(
            <Iframe
              accountId="account-id"
              apolloClient={mockClient}
              contextIds={['test']}
              coreData={coreData}
              extension={extensionWithMaybeConsentInfo}
              extensionData={{
                type: 'jira:issuePanel',
              }}
              egressConsentFlowEnabled={true}
            />,
          );

          expect(await findByTestId('hosted-resources-iframe')).toBeDefined();
          expect(() => getByTestId('three-lo-prompt')).toThrow();
        },
      );
    });
  });
});
