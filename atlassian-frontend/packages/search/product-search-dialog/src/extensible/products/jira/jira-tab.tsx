import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { useSearchSessionId } from '../../../common/search-session-provider';
import { useJiraSearchClientContext } from '../../../jira/clients';
import { JiraFeatures, JiraFeaturesProvider } from '../../../jira/features';
import { useFiltersAdvancedSearchUrlFactory } from '../../../jira/jira-advanced-search-url-factory';
import { messages } from '../../../messages';
import { LegacyContextConverter } from '../../legacy-context-converter';
import { SearchDialogProduct } from '../../product-router';
import {
  ResultSuppliers,
  CacheWarmingProps,
  EMPTY_SEARCH_ITEMS,
} from '../../product-router/product';
import { SearchDialogProductProps } from '../../product-router/product/search-dialog-product';
import JiraSearchDialog, { JiraSearchDialogProps } from './jira-search-dialog';
import { JiraUserUpdater } from './jira-user-updater';

export const JiraTabWithIntl: React.FC<
  Omit<JiraSearchDialogProps, 'debounceTime'> &
    InjectedIntlProps & { features?: JiraFeatures } & Pick<
      SearchDialogProductProps,
      'permissionSupplier' | 'order'
    > &
    Partial<ResultSuppliers> &
    CacheWarmingProps
> = ({ intl, features, ...rest }) => {
  const { sites, searchClient } = useJiraSearchClientContext();
  const searchSessionId = useSearchSessionId();

  const defaultRecentItemSupplier = () => {
    const context = { sessionId: searchSessionId, referrerId: null };
    return Promise.all([
      searchClient.getRecentIssues(context, sites).promise(),
      searchClient.getRecentBoardsProjectsFilters(context, sites).promise(),
    ]).then((results) => ({
      size: results.reduce((sum, { items }) => {
        return sum + items.length;
      }, 0),
      sections: [],
    }));
  };

  // Post query supplier not implemented in Jira until it starts using the generic dialog components
  const defaultPostQueryItemSupplier = () =>
    Promise.resolve(EMPTY_SEARCH_ITEMS);

  const suppliers: ResultSuppliers = {
    preQueryItemSupplier:
      rest.preQueryItemSupplier || defaultRecentItemSupplier,
    postQueryItemSupplier:
      rest.postQueryItemSupplier || defaultPostQueryItemSupplier,
  };

  const advancedIssueSearchUrlFactory = useFiltersAdvancedSearchUrlFactory();

  return (
    <LegacyContextConverter>
      <JiraUserUpdater>
        <JiraFeaturesProvider features={features}>
          <SearchDialogProduct
            {...rest}
            urlGeneratorForNoResultsScreen={(query: string = '') => ''}
            PLS_DONT_USE_skipDefaultStateManagement
            id="jira"
            title={intl.formatMessage(messages.jira_tab_label)}
            // A note: These sections are not actually interpreted by the Jira tab, but are put here for future use
            sections={[
              {
                id: 'jira.issue',
                title: intl.formatMessage(messages.jira_issues_section_heading),
              },
              {
                id: 'jira.board,project,filter',
                title: intl.formatMessage(
                  messages.jira_boards_projects_filters_section_heading,
                ),
              },
            ]}
            {...suppliers}
            generateAdvancedSearchUrl={advancedIssueSearchUrlFactory}
            expandedStateInputPlaceholder={intl.formatMessage(
              messages.jira_search_placeholder,
            )}
          >
            <JiraSearchDialog {...rest} debounceTime={250} />
          </SearchDialogProduct>
        </JiraFeaturesProvider>
      </JiraUserUpdater>
    </LegacyContextConverter>
  );
};

/**
 * The canonical implementation of a tab to show Jira search results inside of the search dialog
 *
 * Can be imported across multiple Atlassian products and will show Jira results there
 */
export const JiraTab = injectIntl(JiraTabWithIntl);
