import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { useClients } from '../../../confluence/clients';
import {
  ConfluenceFeatures,
  ConfluenceFeaturesProvider,
} from '../../../confluence/confluence-features';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../../../confluence/confluence-utils/confluence-url-utils';
import { messages } from '../../../messages';
import { LegacyContextConverter } from '../../legacy-context-converter';
import { SearchDialogProduct } from '../../product-router';
import {
  CacheWarmingProps,
  EMPTY_SEARCH_ITEMS,
  ResultSuppliers,
} from '../../product-router/product';
import { SearchDialogProductProps } from '../../product-router/product/search-dialog-product';
import ConfluenceSearchDialog, {
  ConfluenceSearchDialogProps,
} from './confluence-search-dialog';

export const ConfluenceTabWithIntl: React.FC<
  Omit<ConfluenceSearchDialogProps, 'debounceTime'> &
    InjectedIntlProps & { features?: ConfluenceFeatures } & Pick<
      SearchDialogProductProps,
      'order' | 'permissionSupplier'
    > &
    Partial<ResultSuppliers> &
    CacheWarmingProps
> = ({ intl, features, ...rest }) => {
  const { recentClient } = useClients();

  const defaultRecentItemSupplier = () => {
    return Promise.all([
      recentClient.getRecentItems().promise(),
      recentClient.getRecentSpaces().promise(),
    ]).then((results) => ({
      size: results.reduce((sum, { items }) => {
        return sum + items.length;
      }, 0),
      sections: [],
    }));
  };

  // Post query supplier not implemented in Confluence until it starts using the generic dialog components
  const defaultPostQueryItemSupplier = () =>
    Promise.resolve(EMPTY_SEARCH_ITEMS);

  const suppliers: ResultSuppliers = {
    preQueryItemSupplier:
      rest.preQueryItemSupplier || defaultRecentItemSupplier,
    postQueryItemSupplier:
      rest.postQueryItemSupplier || defaultPostQueryItemSupplier,
  };

  const confluenceAdvancedSearchUrlFactory = usePrimarySiteConfluenceAdvancedSearchUrlFactory();

  return (
    <LegacyContextConverter>
      <ConfluenceFeaturesProvider features={features}>
        <SearchDialogProduct
          {...rest}
          PLS_DONT_USE_skipDefaultStateManagement
          urlGeneratorForNoResultsScreen={(query: string = '') => ''}
          id="confluence"
          title={intl.formatMessage(messages.confluence_tab_label)}
          // A note: These sections are not actually interpreted by the Confluence tab, but are put here for future use
          sections={[
            {
              id: 'confluence.page,blogpost,attachment',
              title: intl.formatMessage(
                messages.confluence_pages_blogs_attachments_section_heading,
              ),
            },
            {
              id: 'confluence.space',
              title: intl.formatMessage(
                messages.confluence_spaces_section_heading,
              ),
            },
            {
              id: 'cpus.user',
              title: intl.formatMessage(
                messages.confluence_people_section_heading,
              ),
            },
          ]}
          {...suppliers}
          generateAdvancedSearchUrl={confluenceAdvancedSearchUrlFactory}
          expandedStateInputPlaceholder={intl.formatMessage(
            messages.confluence_search_input_expanded_placeholder,
          )}
        >
          <ConfluenceSearchDialog {...rest} debounceTime={250} />
        </SearchDialogProduct>
      </ConfluenceFeaturesProvider>
    </LegacyContextConverter>
  );
};

/**
 * The canonical implementation of a tab to show Confluence search results inside of the search dialog
 *
 * Can be imported across multiple Atlassian products and will show Confluence results there
 */
export const ConfluenceTab = injectIntl(ConfluenceTabWithIntl);
