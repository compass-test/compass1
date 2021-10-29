import { BaseCrossFlowApiProvider } from '@atlassiansox/cross-flow-api-internals';
import { ProductKeys } from '../growth-constants';
import { mount, ReactWrapper } from 'enzyme';
import React, { ComponentType } from 'react';
import { act } from 'react-dom/test-utils';
import { createCrossFlowProvider } from '../CrossFlowProvider';
import { ErrorBoundary } from '../errorBoundary';
import { CrossFlowProviderProps } from '../types';
import { IntegrationViewProps } from '../view/types';
import { setProductSignUpLocation } from '../redirects-helpers/redirectsHelpers';

jest.mock('../redirects-helpers/redirectsHelpers');

const IntegrationViewMock: ComponentType<IntegrationViewProps> = () => <div />;

describe('The CrossFlowProvider component', () => {
  const mockAnalyticsWebClient = {
    sendUIEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
  };

  let CrossFlowProvider: ComponentType<CrossFlowProviderProps>;
  let ProductComponent: ComponentType<any>;

  beforeEach(() => {
    CrossFlowProvider = createCrossFlowProvider(IntegrationViewMock);
    ProductComponent = jest.fn(() => <div />);
    jest.clearAllMocks();
  });

  it('should render base provider and children only', () => {
    const wrapper = mount(
      <CrossFlowProvider
        analyticsClient={mockAnalyticsWebClient}
        locale="en"
        originProduct="confluence"
      >
        <ProductComponent />
      </CrossFlowProvider>,
    );

    // Base API porvider is rendered
    expect(wrapper.find(BaseCrossFlowApiProvider)).toHaveLength(1);
    // Product stuff is rendered
    expect(wrapper.find(ProductComponent)).toHaveLength(1);
    // Ensure ONLY Product stuff is rendered
    expect(wrapper.find(BaseCrossFlowApiProvider).children()).toHaveLength(1);
  });

  it('should render IntegrationView when onOpen API is invoked', () => {
    const wrapper = mount(
      <CrossFlowProvider
        analyticsClient={mockAnalyticsWebClient}
        locale="en"
        originProduct="confluence"
      >
        <ProductComponent />
      </CrossFlowProvider>,
    );

    // Base API provider is rendered
    act(() => {
      wrapper
        .find(BaseCrossFlowApiProvider)
        .props()
        .onOpen({
          targetProduct: ProductKeys.CONFLUENCE,
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
          experimentalOptions: {
            contextInfo: {
              contextualImage: 'example.png',
              contextualHeading: 'Example',
            },
          },
          journey: 'get-started',
        });
    });
    wrapper.update();

    // Product stuff is rendered
    expect(wrapper.find(ProductComponent)).toHaveLength(1);

    // Integration view is rendered correctly
    expect(wrapper.find(IntegrationViewMock)).toHaveLength(1);
    expect(wrapper.find(IntegrationViewMock).props()).toEqual(
      expect.objectContaining({
        locale: 'en',
        sourceComponent: 'test-component',
        sourceContext: 'test-context',
        experimentalOptions: {
          contextInfo: {
            contextualImage: 'example.png',
            contextualHeading: 'Example',
          },
        },
        onAnalyticsEvent: expect.any(Function),
        onClose: expect.any(Function),
      }),
    );

    // Product stuff should not be re-rendered
    expect(ProductComponent).toHaveBeenCalledTimes(1);
  });

  it('should unmount cross flow when onClosed in invoked', () => {
    const wrapper = mount(
      <CrossFlowProvider
        analyticsClient={mockAnalyticsWebClient}
        locale="en"
        originProduct="confluence"
      >
        <ProductComponent />
      </CrossFlowProvider>,
    );

    // Base API provider is rendered
    act(() => {
      wrapper.find(BaseCrossFlowApiProvider).props().onOpen({
        targetProduct: ProductKeys.CONFLUENCE,
        sourceComponent: 'test-component',
        sourceContext: 'test-context',
        journey: 'get-started',
      });
    });
    wrapper.update();

    act(() => {
      wrapper.find(IntegrationViewMock).props().onClose({});
    });

    wrapper.update();

    // Cross Flow integration should be removed
    expect(wrapper.find(IntegrationViewMock)).toHaveLength(0);
    // Product stuff should still be in tree
    expect(wrapper.find(ProductComponent)).toHaveLength(1);
    // Product stuff should NOT be re-rendered
    expect(ProductComponent).toHaveBeenCalledTimes(1);
  });

  describe('redirectToWac', () => {
    it('should NOT call setProductSignUpLocation when redirectToWac === "false" and journey === "get-started"', () => {
      const wrapper = mount(
        <CrossFlowProvider
          analyticsClient={mockAnalyticsWebClient}
          locale="en"
          originProduct="confluence"
          env="production"
        >
          <ProductComponent />
        </CrossFlowProvider>,
      );
      // Base API provider is rendered
      act(() => {
        wrapper.find(BaseCrossFlowApiProvider).props().onOpen({
          targetProduct: ProductKeys.CONFLUENCE,
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
          journey: 'get-started',
        });
      });
      wrapper.update();
      // Integration view is rendered
      expect(wrapper.find(IntegrationViewMock)).toHaveLength(1);
      expect(setProductSignUpLocation).not.toHaveBeenCalled();
    });

    it('should call setProductSignUpLocation when redirectToWac === "true" and journey === "get-started"', () => {
      const wrapper = mount(
        <CrossFlowProvider
          analyticsClient={mockAnalyticsWebClient}
          locale="en"
          originProduct="confluence"
          redirectToWac
          env="production"
        >
          <ProductComponent />
        </CrossFlowProvider>,
      );

      // Base API provider is rendered
      act(() => {
        wrapper.find(BaseCrossFlowApiProvider).props().onOpen({
          targetProduct: ProductKeys.CONFLUENCE,
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
          journey: 'get-started',
        });
      });

      wrapper.update();

      // Integration view is shorted and is not rendered
      expect(wrapper.find(IntegrationViewMock)).toHaveLength(0);
      expect(setProductSignUpLocation).toHaveBeenCalledWith(
        ProductKeys.CONFLUENCE,
        'production',
        'test-component',
        'test-context',
      );
    });

    it('should call NOT setProductSignUpLocation when redirectToWac === "true" and journey !== "get-started"', () => {
      const wrapper = mount(
        <CrossFlowProvider
          analyticsClient={mockAnalyticsWebClient}
          locale="en"
          originProduct="confluence"
          redirectToWac
          env="production"
        >
          <ProductComponent />
        </CrossFlowProvider>,
      );

      // Base API provider is rendered
      act(() => {
        wrapper.find(BaseCrossFlowApiProvider).props().onOpen({
          targetProduct: ProductKeys.CONFLUENCE,
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
          journey: 'decide',
        });
      });

      wrapper.update();

      // Integration view is rendered
      expect(wrapper.find(IntegrationViewMock)).toHaveLength(1);
      expect(setProductSignUpLocation).not.toHaveBeenCalled();
    });
  });
});

describe('error boundary component', () => {
  /**
   * Tests in this this suite are NOT isolated, the state is shared, order is important
   */

  const CrossFlowProvider = createCrossFlowProvider(IntegrationViewMock);
  const ProductComponent: ComponentType<any> = jest.fn(() => <div />);

  const mockAnalyticsWebClient = {
    sendUIEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
  };

  const onError = jest.fn();

  const wrapper = mount(
    <CrossFlowProvider
      analyticsClient={mockAnalyticsWebClient}
      locale="en"
      originProduct="confluence"
      onError={onError}
    >
      <ProductComponent />
    </CrossFlowProvider>,
  );

  beforeEach(() => {
    mockAnalyticsWebClient.sendOperationalEvent.mockReset();
  });

  it('should render', () => {
    // Base API provider is rendered
    act(() => {
      wrapper.find(BaseCrossFlowApiProvider).props().onOpen({
        targetProduct: ProductKeys.CONFLUENCE,
        sourceComponent: 'test-component',
        sourceContext: 'test-context',
        journey: 'get-started',
      });
    });
    wrapper.update();

    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
  });
  it('should fire an operational analytic event if error is thrown from product store integration', (done) => {
    const error = new Error();
    wrapper.find(IntegrationViewMock).simulateError(error);
    setTimeout(() => {
      // appears the analyticsWrapper from iframe-plugin resolves the mapped function from a promise thus this hack for the next tick.
      expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'errorCaught',
        actionSubject: 'errorBoundary',
        actionSubjectId: undefined,
        attributes: {
          crossFlowSupport: expect.any(Object),
          packageName: expect.any(String),
          packageVersion: expect.any(String),
          source: 'crossFlowProvider',
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
        },
        eventType: 'operational',
        source: 'crossFlowProvider',
        tags: ['growth'],
      });
      expect(onError).toHaveBeenCalledWith(error);
      done();
    }, 0);
  });
});

describe('The firstHandshakeReceived capability - ', () => {
  const IntegrationViewMock: ComponentType<IntegrationViewProps> = () => (
    <div />
  );
  const mockAnalyticsWebClient = {
    sendUIEvent: jest.fn(),
    sendTrackEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
  };
  const openUi = (passedWrapper: ReactWrapper) => {
    act(() => {
      passedWrapper.find(BaseCrossFlowApiProvider).props().onOpen({
        targetProduct: ProductKeys.CONFLUENCE,
        sourceComponent: 'test-component',
        sourceContext: 'test-context',
        journey: 'get-started',
      });
    });
    passedWrapper.update();
  };
  let CrossFlowProvider: ComponentType<CrossFlowProviderProps>;
  let ProductComponent: ComponentType<any>;
  let wrapper: ReactWrapper;

  beforeEach(() => {
    CrossFlowProvider = createCrossFlowProvider(IntegrationViewMock);
    ProductComponent = jest.fn(() => <div />);
    wrapper = mount(
      <CrossFlowProvider
        analyticsClient={mockAnalyticsWebClient}
        locale="en"
        originProduct="confluence"
      >
        <ProductComponent />
      </CrossFlowProvider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fire an openInvoked analytic event on first open', (done) => {
    openUi(wrapper);
    setTimeout(() => {
      expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(
        1,
      );
      done();
    }, 0);
  });

  it('handshake callback should be passed down to the integration view component', () => {
    openUi(wrapper);
    const onHandshake = wrapper.find(IntegrationViewMock).props().onHandShake;
    expect(onHandshake).toStrictEqual(expect.any(Function));
  });

  it('handshake callback should fire an analytics event when called', (done) => {
    openUi(wrapper);
    act(() => {
      wrapper.find(IntegrationViewMock).props().onHandShake('mockName');
    });
    setTimeout(() => {
      expect(mockAnalyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'openInvoked',
        actionSubject: 'crossFlowSupport',
        actionSubjectId: undefined,
        attributes: {
          crossFlowSupport: { version: '0.0.0' },
          packageName: undefined,
          packageVersion: undefined,
          source: 'crossFlowProvider',
          sourceComponent: 'test-component',
          sourceContext: 'test-context',
        },
        eventType: 'operational',
        source: 'crossFlowProvider',
        tags: ['growth'],
      });
      done();
    }, 0);
  });

  it('second and subsequent handshake callbacks should not call analytics event again', async () => {
    /**
     * Story of this test
     * 1. open ui - fires analytic event for open UI
     * 2. onHandshake is invoked from cross-flow-react or product-store-react and fires analytic event
     * 3. state should be updated and subsequent handshake invocations do not fire analytic events.
     */
    openUi(wrapper); // 1
    act(() => {
      wrapper.find(IntegrationViewMock).props().onHandShake('mockName'); // first onHandshake invocation
    });
    wrapper.update();
    await new Promise((res) => {
      setTimeout(() => {
        expect(
          mockAnalyticsWebClient.sendOperationalEvent,
        ).toHaveBeenCalledTimes(2); // openInoked and UiInitialized events
        mockAnalyticsWebClient.sendOperationalEvent.mockClear();
        expect(
          mockAnalyticsWebClient.sendOperationalEvent,
        ).not.toHaveBeenCalled(); // ensure mock state is cleared
        res();
      }, 0);
    });
    act(() => {
      wrapper.find(IntegrationViewMock).props().onHandShake('mockName');
    });
    wrapper.update();
    await new Promise((res) => {
      setTimeout(() => {
        expect(
          mockAnalyticsWebClient.sendOperationalEvent,
        ).not.toHaveBeenCalled(); // ensure it doesn't fire again
        mockAnalyticsWebClient.sendOperationalEvent.mockClear();
        res();
      }, 0);
    });
  });
});
