import React from 'react';
import { mount } from 'enzyme';
import { getProductStoreSrc } from '../lib/ProductStoreIntegration';
import { ProductStoreIntegration } from '../lib/ProductStoreIntegration';
import { Routes } from '../lib/types';
import * as useSpaHostClient from '../lib/useSpaHostClient';

describe('getProductSrc', () => {
  it('should return DEFAULT_SRC if site-scoped', () => {
    expect(getProductStoreSrc({ edgePrefix: '', cloudId: 'cloud-id' })).toEqual(
      '/gpa-product-store/',
    );
  });
  it('should return TENANTLESS_SRC if tenantless', () => {
    expect(getProductStoreSrc({ edgePrefix: '' })).toEqual(
      '/gpa-product-store/tenantless.html',
    );
  });
  it('should prepend source with edge prefix', () => {
    const edgePrefix = 'https://api-gateway.domain';
    const cloudId = 'cloud-id';
    expect(getProductStoreSrc({ edgePrefix, cloudId })).toEqual(
      'https://api-gateway.domain/gpa-product-store/',
    );
    expect(getProductStoreSrc({ edgePrefix })).toEqual(
      'https://api-gateway.domain/gpa-product-store/tenantless.html',
    );
  });
  it('should return custom src only', () => {
    const edgePrefix = 'api-gateway.domain';
    const src = '/test-custom-source/test-custom-gpa-product-store/';
    expect(getProductStoreSrc({ edgePrefix, src })).toEqual(src);
  });
});

describe('assembledSrc', () => {
  const ProductStoreWrapper = ({
    isLinkExpansion,
    env,
    sourceComponent = 'source-component',
    sourceContext = 'source-context',
  }: {
    isLinkExpansion?: boolean;
    env?: string;
    sourceComponent?: string;
    sourceContext?: string;
  }) => {
    return (
      <ProductStoreIntegration
        locale="en"
        onClose={() => {}}
        onTryClicked={() => {}}
        route={Routes.DISCOVERY_PRODUCTS}
        isLinkExpansion={isLinkExpansion}
        sourceComponent={sourceComponent}
        sourceContext={sourceContext}
        env={env}
      />
    );
  };

  let useSpaHostClientSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    useSpaHostClientSpy = jest.spyOn(useSpaHostClient, 'useSpaHostClient');
  });

  it('should contain source params', () => {
    mount(
      <ProductStoreWrapper
        sourceComponent="my-source-component"
        sourceContext="my-source-context"
      ></ProductStoreWrapper>,
    );
    expect(useSpaHostClientSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        src:
          '/gpa-product-store/tenantless.html?iframeIsEmbedded=false&locale=en&route=%2F&sourceComponent=my-source-component&sourceContext=my-source-context',
      }),
      expect.anything(),
    );
  });

  it('should contain env query param', () => {
    mount(<ProductStoreWrapper env="production" />);
    expect(useSpaHostClientSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        src:
          '/gpa-product-store/tenantless.html?env=production&iframeIsEmbedded=false&locale=en&route=%2F&sourceComponent=source-component&sourceContext=source-context',
      }),
      expect.anything(),
    );
  });

  it('should contain isLinkExpansion query param', () => {
    mount(<ProductStoreWrapper isLinkExpansion />);
    expect(useSpaHostClientSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        src:
          '/gpa-product-store/tenantless.html?iframeIsEmbedded=false&isLinkExpansion=true&locale=en&route=%2F&sourceComponent=source-component&sourceContext=source-context',
      }),
      expect.anything(),
    );
  });

  it('should not contain optional query params', () => {
    mount(<ProductStoreWrapper />);
    expect(useSpaHostClientSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        src:
          '/gpa-product-store/tenantless.html?iframeIsEmbedded=false&locale=en&route=%2F&sourceComponent=source-component&sourceContext=source-context',
      }),
      expect.anything(),
    );
  });
});
