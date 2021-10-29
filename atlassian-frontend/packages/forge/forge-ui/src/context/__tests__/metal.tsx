import React, { useState, useEffect } from 'react';
import MetalClient from '@atlassiansox/metal-client';
import { waitForNextTick } from '@atlassian/aux-test-utils';
import { ProductEnvironment } from '@atlassian/forge-ui-types';
import { act, render } from '@testing-library/react';

import { createMetalClient, MetalClientProvider } from '../metal';

describe('metal', () => {
  const destroySpy = jest.fn();
  // @ts-ignore - does not need to have all the attributes of MetalClient for this test
  const mockMetalClient = {
    destroy: destroySpy,
  } as MetalClient;

  const mockConstructorSpy = jest
    .fn()
    .mockImplementation(() => mockMetalClient);

  jest.mock('@atlassiansox/metal-client', () => {
    const { catalog } = jest.requireActual('@atlassiansox/metal-client');
    return {
      __esModule: true,
      // Constructor and return mockMetalClient with mocked methods
      default: (args: any) => {
        mockConstructorSpy(args);
        return mockMetalClient;
      },
      envTypes: {
        LOCAL: 'local',
        DEV: 'dev',
        STAGING: 'staging',
        PROD: 'prod',
      },
      catalog: {
        performance: {
          REQUEST_TIMING: catalog.performance.REQUEST_TIMING,
        },
      },
      PerformanceMarkPlugin: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const product = 'confluence';

  it('passes (host) product as the subproduct since product=forge', async () => {
    const [metalClient, destroy] = createMetalClient(
      ProductEnvironment.DEVELOPMENT,
      product,
    );
    await metalClient;

    expect(mockConstructorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        settings: {
          meta: {
            subproduct: product,
          },
        },
      }),
    );

    destroy();
  });

  it('creates a singleton metal client on create calls', async () => {
    const [metalClient1, destroyClient1] = createMetalClient(
      ProductEnvironment.DEVELOPMENT,
      product,
    );
    const awaitedMetalClient1 = await metalClient1;

    const [metalClient2, destroyClient2] = createMetalClient(
      ProductEnvironment.DEVELOPMENT,
      product,
    );
    const awaitedMetalClient2 = await metalClient2;

    expect(awaitedMetalClient1).toBe(awaitedMetalClient2);
    destroyClient1();
    destroyClient2();
  });

  it('destroys both clients when destroy has been called twice', async () => {
    const [metalClient1, destroyClient1] = createMetalClient(
      ProductEnvironment.DEVELOPMENT,
      product,
    );
    let awaitedMetalClient1 = await metalClient1;

    const [metalClient2, destroyClient2] = createMetalClient(
      ProductEnvironment.DEVELOPMENT,
      product,
    );
    let awaitedMetalClient2 = await metalClient2;

    destroyClient1();

    expect(destroySpy).toBeCalledTimes(0);

    // Check if client1 still exists after first destroy call
    expect(awaitedMetalClient2).toEqual(mockMetalClient);
    expect(awaitedMetalClient1).toBe(awaitedMetalClient2);

    // Destroy both clients
    destroyClient2();
    await waitForNextTick();
    expect(destroySpy).toBeCalledTimes(1);
  });

  describe('MetalClientProvider', () => {
    function MyMetalClientUser({
      setStopRendering,
      mountedText = 'mounted',
      unmountedText = 'unmounted',
      children,
    }: {
      setStopRendering: (x: Function) => void;
      mountedText?: string;
      unmountedText?: string;
      children?: React.ReactNode;
    }) {
      const [shouldRender, setShouldRender] = useState(true);
      useEffect(() => {
        setStopRendering(() => setShouldRender(false));
      }, [setStopRendering]);

      if (!shouldRender) {
        return <p>{unmountedText}</p>;
      }
      return (
        <MetalClientProvider
          value={{
            environment: ProductEnvironment.DEVELOPMENT,
            page: 'jest',
            product: 'Jest',
          }}
        >
          <>
            <p>{mountedText}</p>
            {children}
          </>
        </MetalClientProvider>
      );
    }
    it('creates a metal client on mount and destroys it on unmount', async () => {
      let stopRendering: Function = () => {
        throw new Error('not initialized');
      };
      const view = render(
        <MyMetalClientUser setStopRendering={(cb) => (stopRendering = cb)} />,
      );

      await view.findByText('mounted');
      await waitForNextTick();
      expect(mockConstructorSpy).toHaveBeenCalled();

      act(() => {
        stopRendering();
      });

      await view.findByText('unmounted');
      await waitForNextTick();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('does not destroy on rerender', async () => {
      function MyMetalClientUser(props: {}) {
        return (
          <MetalClientProvider
            value={{
              environment: ProductEnvironment.DEVELOPMENT,
              page: 'jest',
              product: 'Jest',
            }}
          >
            my metal client
          </MetalClientProvider>
        );
      }
      const view = render(<MyMetalClientUser />);
      view.rerender(<MyMetalClientUser />);

      await view.findByText('my metal client');
      await waitForNextTick();

      expect(destroySpy).not.toHaveBeenCalled();
    });

    it('only creates one MetalClient when nesting multiple providers', async () => {
      let stopRendering: Function = () => {
        throw new Error('not initialized');
      };
      let stopRenderingInner: Function = () => {
        throw new Error('not initialized');
      };
      const view = render(
        <MyMetalClientUser
          mountedText="mounted outer"
          unmountedText="unmounted outer"
          setStopRendering={(cb) => (stopRendering = cb)}
        >
          <MyMetalClientUser
            mountedText="mounted inner"
            unmountedText="unmounted inner"
            setStopRendering={(cb) => (stopRenderingInner = cb)}
          >
            <p>inner</p>
          </MyMetalClientUser>
        </MyMetalClientUser>,
      );

      await view.findByText('mounted inner');
      await waitForNextTick();
      expect(mockConstructorSpy).toHaveBeenCalledTimes(1);

      act(() => {
        stopRenderingInner();
      });

      await view.findByText('unmounted inner');
      await waitForNextTick();
      expect(destroySpy).not.toHaveBeenCalled();

      act(() => {
        stopRendering();
      });

      await view.findByText('unmounted outer');
      await waitForNextTick();

      expect(destroySpy).toHaveBeenCalledTimes(1);
    });
  });
});
