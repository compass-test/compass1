import { provideMockSentryClient } from '@atlassian/aux-test-utils';
import {
  ProductEnvironment,
  ForgeUIExtensionType,
} from '@atlassian/forge-ui-types';
import { captureAndReportError } from '..';

describe('captureAndReportError', () => {
  const { client, hub } = provideMockSentryClient();
  const mockExtension: ForgeUIExtensionType = {
    id: '123',
    properties: {
      title: 'Title',
    },
    appOwner: {
      accountId: '456',
      name: 'name',
      picture: 'picture',
    },
    installationId: '123',
    environmentId: '234',
    appVersion: '2.20.0',
    environmentType: 'DEVELOPMENT',
    type: 'jira:issueGlance',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the Sentry client functions with the correct arguments', async () => {
    const error = new Error();
    const errorInfo = {
      componentStack: 'in A in B',
    };
    await captureAndReportError({
      error,
      extension: mockExtension,
      environment: ProductEnvironment.DEVELOPMENT,
      errorInfo,
      page: 'jira:issueGlance',
    });
    expect(client.constructor).toBeCalledWith({
      environment: ProductEnvironment.DEVELOPMENT,
      dsn: expect.stringContaining('sentry'),
    });
    expect(hub.scope.setTag).toHaveBeenCalledWith(
      'extensionPoint',
      'jira:issueGlance',
    );
    expect(hub.captureException).toBeCalledWith(error);
    expect(client.close).toHaveBeenCalled();
  });
});
