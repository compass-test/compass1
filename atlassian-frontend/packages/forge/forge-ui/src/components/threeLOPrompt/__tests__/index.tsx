import React from 'react';
import { Suspense } from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  temporarilySilenceActAndAtlaskitDeprecationWarnings,
  waitForNextTick,
} from '@atlassian/aux-test-utils';
import { safeAuth, ATLASSIAN_AUTH_SERVICE_KEY } from '../auth';
import { ThreeLOPrompt, ModalThreeLOPrompt } from '..';
import { MetalClientContext } from '../../../context';
import MetalClient from '@atlassiansox/metal-client';
import { mocked } from 'ts-jest/utils';
import { METRICS_TASK_CONSENT } from '../useAuth';

temporarilySilenceActAndAtlaskitDeprecationWarnings();

jest.mock('../auth', () => {
  const authMocks = jest.requireActual('../auth');
  return {
    ...authMocks,
    safeAuth: jest.fn(),
  };
});

const mockMetricSubmit = jest.fn();

const authUrl = `https://example.com?serviceKey=${ATLASSIAN_AUTH_SERVICE_KEY}`;
const promptText = 'prompt text';
const message = 'message';
const props = {
  message,
  promptText,
  authUrl,
};

jest.mock('@atlassiansox/metal-client', () => ({
  __esModule: true,
  default: function () {
    return {
      metric: {
        submit: mockMetricSubmit,
      },
    };
  },
  catalog: {
    userInteraction: { TASK_FAILURE: 'fail', TASK_SUCCESS: 'success' },
  },
}));

describe('threeLOPrompt', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display button which links to login url', async () => {
    const dispatchSpy = jest.fn(() => Promise.resolve({} as any));
    (safeAuth as any).mockImplementation(() => Promise.resolve());

    const { getByText, findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <ThreeLOPrompt {...props} onSuccess={dispatchSpy} />
      </Suspense>,
    );

    const spanInButton = await findByText(promptText);

    fireEvent.click(spanInButton);
    expect(safeAuth).toHaveBeenCalledWith(authUrl);
    expect(getByText(message)).toBeTruthy();
    await waitForNextTick();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should show failure message if authentication fails', async () => {
    const dispatchSpy = jest.fn();
    (safeAuth as any).mockImplementation(() => Promise.reject('error'));

    const { findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <ThreeLOPrompt {...props} onSuccess={dispatchSpy} />
      </Suspense>,
    );

    const spanInButton = await findByText(promptText);

    fireEvent.click(spanInButton);
    expect(safeAuth).toHaveBeenCalledWith(authUrl);
    await expect(findByText('Failed to authenticate.')).resolves.toBeTruthy();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should send metrics if authentication fails', async () => {
    const dispatchSpy = jest.fn();
    (safeAuth as any).mockImplementation(() => Promise.reject('error'));
    const mockClient = mocked(new MetalClient({} as any), true);
    const page = 'foo';

    const { findByText } = render(
      <MetalClientContext.Provider
        value={{
          page,
          metalClient: Promise.resolve(mockClient as any),
          product: 'bar',
        }}
      >
        <Suspense fallback={<div>loading</div>}>
          <ThreeLOPrompt {...props} onSuccess={dispatchSpy} />
        </Suspense>
      </MetalClientContext.Provider>,
    );

    const spanInButton = await findByText(promptText);

    fireEvent.click(spanInButton);
    await expect(findByText('Failed to authenticate.')).resolves.toBeTruthy();

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      name: 'fail',
      task: METRICS_TASK_CONSENT,
      page,
    });
  });

  it('should send metrics if authentication succeeds', async () => {
    const dispatchSpy = jest.fn().mockResolvedValue(null);
    (safeAuth as any).mockImplementation(() => Promise.resolve());
    const mockClient = mocked(new MetalClient({} as any), true);
    const page = 'foo';

    const { findByText } = render(
      <MetalClientContext.Provider
        value={{
          page,
          metalClient: Promise.resolve(mockClient as any),
          product: 'bar',
        }}
      >
        <Suspense fallback={<div>loading</div>}>
          <ThreeLOPrompt {...props} onSuccess={dispatchSpy} />
        </Suspense>
      </MetalClientContext.Provider>,
    );

    const spanInButton = await findByText(promptText);

    fireEvent.click(spanInButton);
    await waitForNextTick();

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      name: 'success',
      task: METRICS_TASK_CONSENT,
      page,
    });
  });

  it('should display a generic message if no app name or custom message is provided', () => {
    const dispatchSpy = jest.fn();

    const { findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <ThreeLOPrompt
          {...props}
          appName={undefined}
          message={undefined}
          onSuccess={dispatchSpy}
        />
      </Suspense>,
    );

    return expect(
      findByText(
        'For this app to display, you need to allow the app to access Atlassian products on your behalf.',
      ),
    ).resolves.toBeTruthy();
  });

  it('should show 3LO prompt in a modal', async () => {
    const dispatchSpy = jest.fn(() => Promise.resolve({} as any));
    (safeAuth as any).mockImplementation(() => Promise.resolve());

    const { getByText, findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <ModalThreeLOPrompt {...props} onSuccess={dispatchSpy} />
      </Suspense>,
    );

    const spanInButton = await findByText(promptText);

    fireEvent.click(spanInButton);
    expect(safeAuth).toHaveBeenCalledWith(authUrl);
    expect(getByText(message)).toBeTruthy();
    await waitForNextTick();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should call onClose when 3LO prompt modal prompt is closed', async () => {
    const dispatchSpy = jest.fn(() => Promise.resolve({} as any));
    const tearDownSpy = jest.fn();
    (safeAuth as any).mockImplementation(() => Promise.resolve());

    const { findByText } = render(
      <Suspense fallback={<div>loading</div>}>
        <ModalThreeLOPrompt
          {...props}
          onSuccess={dispatchSpy}
          onClose={tearDownSpy}
        />
      </Suspense>,
    );

    const spanInButton = await findByText('Cancel');

    fireEvent.click(spanInButton);
    expect(safeAuth).not.toHaveBeenCalled();
    expect(tearDownSpy).toHaveBeenCalled();
  });

  describe('for external auth', () => {
    const externalAuthUrl = 'https://example.com?serviceKey=google';

    it('should display button with custom text which links to login url', async () => {
      const dispatchSpy = jest.fn(() => Promise.resolve({} as any));
      (safeAuth as any).mockImplementation(() => Promise.resolve());

      const { findByText } = render(
        <Suspense fallback={<div>loading</div>}>
          <ThreeLOPrompt authUrl={externalAuthUrl} onSuccess={dispatchSpy} />
        </Suspense>,
      );

      const spanInButton = await findByText('Configure access');

      fireEvent.click(spanInButton);
      expect(safeAuth).toHaveBeenCalledWith(externalAuthUrl);
      await waitForNextTick();
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should display a custom message if authUrl contains a non Atlassian service key', () => {
      const dispatchSpy = jest.fn();

      const { findByText } = render(
        <Suspense fallback={<div>loading</div>}>
          <ThreeLOPrompt authUrl={externalAuthUrl} onSuccess={dispatchSpy} />
        </Suspense>,
      );

      return expect(
        findByText('This app requires additional access to your account.'),
      ).resolves.toBeTruthy();
    });
  });
});
