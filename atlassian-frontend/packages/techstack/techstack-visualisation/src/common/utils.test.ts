import {
  ConfluenceIcon,
  ConfluenceLogo,
  JiraIcon,
  JiraLogo,
} from '@atlaskit/logo';

import { Product } from './types';
import { getProductIcon, getProductLogo } from './utils';

describe('utils', () => {
  describe('getProductIcon', () => {
    it('should return Jira Icon', () => {
      const Icon = getProductIcon(Product.JIRA);
      expect(Icon).toEqual(JiraIcon);
    });

    it('should return Confluence Icon', () => {
      const Icon = getProductIcon(Product.CONFLUENCE);
      expect(Icon).toEqual(ConfluenceIcon);
    });

    it('should throw given an invalid product', () => {
      expect(() => {
        getProductIcon('invalid-product' as Product);
      }).toThrow();
    });
  });

  describe('getProductLogo', () => {
    it('should return Jira Logo', () => {
      const Icon = getProductLogo(Product.JIRA);
      expect(Icon).toEqual(JiraLogo);
    });

    it('should return Confluence Logo', () => {
      const Icon = getProductLogo(Product.CONFLUENCE);
      expect(Icon).toEqual(ConfluenceLogo);
    });

    it('should throw given an invalid product', () => {
      expect(() => {
        getProductLogo('invalid-product' as Product);
      }).toThrow();
    });
  });
});
