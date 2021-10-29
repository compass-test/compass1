import React, { Suspense } from 'react';
import { catalog } from '@atlassiansox/metal-client';
import { ProductEnvironment } from '@atlassian/forge-ui-types';
import {
  waitForNextTick,
  provideMockMetalClient,
} from '@atlassian/aux-test-utils';
import { render } from '@testing-library/react';
import { ForgeErrorBoundary } from '..';
import { MetalClientProvider } from '../../context';
import { APIError } from '../../web-client';

const { metalErrorSubmitSpy } = provideMockMetalClient();

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

const Bomb = () => {
  throw new Error('💣');
};

describe('ErrorBoundary', () => {
  test('shows error message and renders that there was a problem', async () => {
    const { findAllByText } = render(
      <Suspense fallback={() => 'loading'}>
        <ForgeErrorBoundary>
          <Bomb />
        </ForgeErrorBoundary>
      </Suspense>,
    );
    await expect(findAllByText('Error rendering app')).toBeTruthy();
  });

  describe('reporting errors', () => {
    const page = 'editPageScreen';

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('reports errors using the provided metal client', async () => {
      render(
        <MetalClientProvider
          value={{
            environment: ProductEnvironment.DEVELOPMENT,
            product: 'tests',
            page,
          }}
        >
          <ForgeErrorBoundary>
            <Bomb />
          </ForgeErrorBoundary>
        </MetalClientProvider>,
      );

      await waitForNextTick();

      expect(metalErrorSubmitSpy).toHaveBeenCalledWith({
        component: 'renderer',
        page,
        name: catalog.error.COMPONENT_BOUNDARY,
      });
    });

    test('does not report API errors', async () => {
      const ThrowsAPIError = () => {
        throw new APIError('API error');
      };
      render(
        <MetalClientProvider
          value={{
            environment: ProductEnvironment.DEVELOPMENT,
            product: 'tests',
            page,
          }}
        >
          <Suspense fallback={null}>
            <ForgeErrorBoundary>
              <ThrowsAPIError />
            </ForgeErrorBoundary>
          </Suspense>
        </MetalClientProvider>,
      );

      await waitForNextTick();

      expect(metalErrorSubmitSpy).not.toHaveBeenCalled();
    });
  });
});
