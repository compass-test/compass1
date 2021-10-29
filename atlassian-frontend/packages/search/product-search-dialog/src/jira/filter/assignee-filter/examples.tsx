import React from 'react';
import { IntlProvider } from 'react-intl';
import AssigneeFilter, { AssigneeFilterProps } from './assignee-filter';
import { MockJiraClientsProvider } from '../../../__tests__/__fixtures__/mock-jira-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { FilterContextProvider } from '../../filter-context';
import { createPeopleFilters } from '../../../__tests__/__fixtures__/mock-filters';

const defaultProps: AssigneeFilterProps = {
  isLoading: false,
};

export const Basic = () => <AssigneeFilter {...defaultProps} />;

export const Loading = () => <AssigneeFilter {...defaultProps} isLoading />;

export default {
  title: 'Jira Search Dialog/Filter/Assignee Filter',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="blah">
        <MockJiraClientsProvider mode="normal">
          <FilterContextProvider
            defaultAssigneeFilters={createPeopleFilters(10, {
              visibleNumber: 3,
            })}
          >
            <IntlProvider locale="en">{story()}</IntlProvider>
          </FilterContextProvider>
        </MockJiraClientsProvider>
      </SearchSessionProvider>
    ),
  ],
};
