import { ProductKeys } from '@atlassiansox/product-store-react';
import {
  getProductSignUpLink,
  setProductSignUpLocation,
} from '../redirectsHelpers';

describe('redirectHelpers', () => {
  describe('get product sign up link', () => {
    const jsdUrl =
      'https://www.atlassian.com/try/cloud/signup?bundle=jira-service-desk&edition=free';
    const opsgenieUrl = 'https://www.atlassian.com/software/opsgenie/try';
    const confluenceUrl =
      'https://www.atlassian.com/try/cloud/signup?bundle=confluence&edition=free';
    const defaultUrl = 'https://www.atlassian.com/software';

    it('should return custom sign up URL', () => {
      expect(getProductSignUpLink(ProductKeys.OPSGENIE)).toEqual(opsgenieUrl);
    });

    it('should return bundle sign up URL', () => {
      expect(getProductSignUpLink(ProductKeys.JIRA_SERVICE_DESK)).toEqual(
        jsdUrl,
      );
      expect(getProductSignUpLink(ProductKeys.CONFLUENCE)).toEqual(
        confluenceUrl,
      );
    });

    it('should return default sign up URL', () => {
      // @ts-ignore
      expect(getProductSignUpLink('halp')).toEqual(defaultUrl);
    });

    it.each`
      productKey                       | expectUrl
      ${ProductKeys.CONFLUENCE}        | ${confluenceUrl + '&utm_campaign=atlassian_switcher&utm_medium=in_product_ad&utm_source=SomeSourceContext'}
      ${ProductKeys.OPSGENIE}          | ${opsgenieUrl + '?utm_campaign=atlassian_switcher&utm_medium=in_product_ad&utm_source=SomeSourceContext'}
      ${ProductKeys.JIRA_SERVICE_DESK} | ${jsdUrl + '&utm_campaign=atlassian_switcher&utm_medium=in_product_ad&utm_source=SomeSourceContext'}
      ${'halp'}                        | ${defaultUrl + '?utm_campaign=atlassian_switcher&utm_medium=in_product_ad&utm_source=SomeSourceContext'}
    `(
      'should return url with utm params when product key is $productKey',
      ({ productKey, expectUrl }) => {
        expect(
          getProductSignUpLink(
            productKey,
            'production',
            'atlassian-switcher',
            'SomeSourceContext',
          ),
        ).toEqual(expectUrl);
      },
    );
  });

  describe('window open', () => {
    const { open } = window;

    it('should be called with staging sign up URL', () => {
      delete window.open;
      window.open = jest.fn();
      setProductSignUpLocation(ProductKeys.JIRA_SOFTWARE, 'staging');
      expect(window.open).toHaveBeenCalledWith(
        'https://qa-wac.internal.atlassian.com/try/cloud/signup?bundle=jira-software&edition=free',
        '_blank',
      );
    });

    it('should be called with prod sign up URL', () => {
      delete window.open;
      window.open = jest.fn();
      setProductSignUpLocation(ProductKeys.OPSGENIE);
      expect(window.open).toHaveBeenCalledWith(
        'https://www.atlassian.com/software/opsgenie/try',
        '_blank',
      );
    });
    afterEach(() => {
      window.open = open;
    });
  });
});
