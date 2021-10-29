import React from 'react';
import { IntlProvider } from 'react-intl';
import BinaryStatusCategoryFilter from './binary-status-category-filter';
import { MockJiraClientsProvider } from '../../../__tests__/__fixtures__/mock-jira-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { FilterContextProvider } from '../../filter-context';

export const Basic = () => <BinaryStatusCategoryFilter />;

export default {
  title: 'Jira Search Dialog/Filter/Binary Status Category Filter',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="blah">
        <MockJiraClientsProvider mode="normal">
          <FilterContextProvider>
            <IntlProvider locale="en">{story()}</IntlProvider>
          </FilterContextProvider>
        </MockJiraClientsProvider>
      </SearchSessionProvider>
    ),
  ],
};
