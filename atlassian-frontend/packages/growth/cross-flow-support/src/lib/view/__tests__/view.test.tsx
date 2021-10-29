import { DrawerProps } from '@atlaskit/drawer';
import CrossFlowIntegration from '@atlassiansox/cross-flow-react';
import ProductStoreIntegration, {
  ProductKeys,
} from '@atlassiansox/product-store-react';
import { mount } from 'enzyme';
import React, { ComponentType } from 'react';
import { act } from 'react-dom/test-utils';
import { IntegrationViewProps } from '../types';
import { IntegrationView } from '../view';

const ProductStoreMock: typeof ProductStoreIntegration = () => <div></div>;
const CrossFlowMock: typeof CrossFlowIntegration = () => <div></div>;
const DrawerMock: ComponentType<DrawerProps> = ({ children, onClose }) => (
  <div>
    <button
      onClick={(e) => {
        onClose && onClose(e, {});
      }}
    >
      Close
    </button>
    {children}
  </div>
);

const noop = () => {};

describe('The CrossFlow View', () => {
  let IntegrationViewWithMocks: ComponentType<IntegrationViewProps>;

  beforeEach(() => {
    IntegrationViewWithMocks = (props) => (
      <IntegrationView
        {...props}
        ProductStoreComponent={ProductStoreMock}
        CrossFlowComponent={CrossFlowMock}
        DrawerComponent={DrawerMock}
      />
    );
    jest.clearAllMocks();
  });

  it('should supply Drawer with correct parameters', () => {
    const wrapper = mount(
      <IntegrationViewWithMocks
        locale="en"
        cloudId="123"
        sourceComponent="test"
        sourceContext="test"
        onAnalyticsEvent={noop}
        onClose={noop}
        onHandShake={noop}
        originProduct="confluence"
        journey="discover"
        plugins={[]}
      />,
    );

    expect(wrapper.find(DrawerMock).props()).toEqual(
      expect.objectContaining({
        onClose: expect.any(Function),
        onCloseComplete: expect.any(Function),
      }),
    );
  });

  it('should call onClose when Drawer is closed', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <IntegrationViewWithMocks
        locale="en"
        cloudId="123"
        sourceComponent="test"
        sourceContext="test"
        onAnalyticsEvent={noop}
        onHandShake={noop}
        onClose={onClose}
        originProduct="confluence"
        journey="discover"
        plugins={[]}
      />,
    );

    act(() => {
      // onCloseComplete expects an HTML element passed to it.
      wrapper.find(DrawerMock).props().onCloseComplete!(
        document.createElement('div'),
      );
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('Discover journey', () => {
    it('should render with ProductStore only on initial render', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          experimentalOptions={{
            example: 'test',
          }}
          journey="discover"
          plugins={[]}
        />,
      );
      expect(wrapper.find(CrossFlowMock)).toHaveLength(0);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(1);

      expect(wrapper.find(ProductStoreMock).props()).toEqual(
        expect.objectContaining({
          locale: 'en',
          route: '/',
          cloudId: '123',
          onTryClicked: expect.any(Function),
          onChangeRoute: expect.any(Function),
          onAnalyticsEvent: expect.any(Function),
          experimentalOptions: expect.objectContaining({
            example: 'test',
          }),
        }),
      );
    });

    it('should switch from ProductStore to CrossFlow when onTryClicked is invoked', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          experimentalOptions={{
            example: 'test',
          }}
          journey="discover"
          plugins={[]}
        />,
      );

      act(() => {
        wrapper
          .find(ProductStoreMock)
          .props()
          .onTryClicked(ProductKeys.CONFLUENCE);
      });
      wrapper.update();

      expect(wrapper.find(ProductStoreMock)).toHaveLength(0);
      expect(wrapper.find(CrossFlowMock)).toHaveLength(1);
      expect(wrapper.find(CrossFlowMock).props()).toEqual(
        expect.objectContaining({
          locale: 'en',
          cloudId: '123',
          sourceComponent: 'test',
          sourceContext: 'test',
          targetProduct: ProductKeys.CONFLUENCE,
          onAnalyticsEvent: expect.any(Function),
          onClose: expect.any(Function),
          experimentalOptions: expect.objectContaining({
            example: 'test',
          }),
          plugins: [],
        }),
      );
    });

    it('should keep Product Store closed when Drawer is being closed by Cross Flow', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          journey="discover"
          plugins={[]}
        />,
      );

      act(() => {
        wrapper
          .find(ProductStoreMock)
          .props()
          .onTryClicked(ProductKeys.CONFLUENCE);
      });
      wrapper.update();

      act(() => {
        wrapper.find(CrossFlowMock).props().onClose!({});
      });
      wrapper.update();

      expect(wrapper.find(ProductStoreMock)).toHaveLength(0);
      expect(wrapper.find(CrossFlowMock)).toHaveLength(1);
    });

    it('should keep Product Store closed when Drawer is being closed by clicking the Drawer button', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onHandShake={noop}
          onClose={noop}
          originProduct="confluence"
          journey="discover"
          plugins={[]}
        />,
      );

      expect(wrapper.find(ProductStoreMock)).toHaveLength(1);

      act(() => {
        // Open Cross Flow
        wrapper
          .find(ProductStoreMock)
          .props()
          .onTryClicked(ProductKeys.CONFLUENCE);
        // Close Drawer
        wrapper.find(DrawerMock).find('button').simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(CrossFlowMock)).toHaveLength(1);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(0);
    });
  });

  describe('Get Started journey', () => {
    it('should render only Cross Flow', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          journey="get-started"
          targetProduct="confluence.ondemand"
          plugins={[]}
        />,
      );

      expect(wrapper.find(DrawerMock)).toHaveLength(1);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(0);
      expect(wrapper.find(CrossFlowMock)).toHaveLength(1);
    });

    it('should not render Product Store when Drawer is being closed', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          journey="get-started"
          targetProduct="confluence.ondemand"
          plugins={[]}
        />,
      );

      act(() => {
        // Close Drawer
        wrapper.find(DrawerMock).find('button').simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(DrawerMock)).toHaveLength(1);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(0);
      expect(wrapper.find(CrossFlowMock)).toHaveLength(1);
    });
  });

  describe('redirectToWac', () => {
    it('should set env and isLinkExpansion', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          journey="discover"
          plugins={[]}
          env="production"
          redirectToWac
        />,
      );
      expect(wrapper.find(CrossFlowMock)).toHaveLength(0);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(1);

      expect(wrapper.find(ProductStoreMock).props()).toEqual(
        expect.objectContaining({
          isLinkExpansion: true,
          env: 'production',
        }),
      );
    });

    it('should NOT set isLinkExpansion when redirectToWac is false', () => {
      const wrapper = mount(
        <IntegrationViewWithMocks
          locale="en"
          cloudId="123"
          sourceComponent="test"
          sourceContext="test"
          onAnalyticsEvent={noop}
          onClose={noop}
          onHandShake={noop}
          originProduct="confluence"
          journey="discover"
          plugins={[]}
          env="production"
          redirectToWac={false}
        />,
      );
      expect(wrapper.find(CrossFlowMock)).toHaveLength(0);
      expect(wrapper.find(ProductStoreMock)).toHaveLength(1);

      expect(wrapper.find(ProductStoreMock).props()).toEqual(
        expect.objectContaining({
          isLinkExpansion: false,
        }),
      );
    });
  });
});
