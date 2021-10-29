import React from 'react';
import { SearchDialog, SearchFooter } from '@atlassian/search-dialog';
import { action } from '@storybook/addon-actions';
import { InjectedIntlProps, IntlProvider } from 'react-intl';
import { Products } from '../../common/product-context';
import { generateMockSitesWithAdvancedSearch } from '../../utils/site-util';
import {
  MultiSiteAdvancedSearchLink,
  Props,
} from './multi-site-advanced-search-link';

const commonProps: Props = {
  sites: [...generateMockSitesWithAdvancedSearch(5, Products.confluence)],
  isLoading: false,
  onClick: (href, e) => {
    e.preventDefault();
    return action(`onclick ${href}`)(e);
  },
};

export const MultiSite = (props: InjectedIntlProps) => (
  <MultiSiteAdvancedSearchLink {...props} {...commonProps} />
);

export const ManySites = (props: InjectedIntlProps) => (
  <MultiSiteAdvancedSearchLink
    {...props}
    {...commonProps}
    sites={generateMockSitesWithAdvancedSearch(100, Products.confluence)}
  />
);

export const NoDropdown = (props: InjectedIntlProps) => (
  <MultiSiteAdvancedSearchLink
    {...props}
    {...commonProps}
    sites={generateMockSitesWithAdvancedSearch(4, Products.confluence)}
  />
);

export default {
  title: 'common/Advanced Search Link',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">
        <SearchDialog>
          <SearchFooter>{story()}</SearchFooter>
        </SearchDialog>
      </IntlProvider>
    ),
  ],
};
