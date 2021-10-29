import React from 'react';
import { IntlProvider } from 'react-intl';
import PeopleFilter, { PeopleFilterProps } from './people-filter';
import { MockConfluenceClientsProvider } from '../../../__tests__/__fixtures__/mock-confluence-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { FilterContextProvider } from '../../filter-context';
import { createPeopleFilters } from '../../../__tests__/__fixtures__/mock-filters';

const defaultProps: PeopleFilterProps = {
  isLoading: false,
};

export const Basic = () => <PeopleFilter {...defaultProps} />;

export const Loading = () => <PeopleFilter {...defaultProps} isLoading />;

export default {
  title: 'Confluence Search Dialog/Filter/People Filter',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="blah">
        <MockConfluenceClientsProvider mode="normal">
          <FilterContextProvider
            defaultPeopleFilters={createPeopleFilters(10, { visibleNumber: 3 })}
          >
            <IntlProvider locale="en">{story()}</IntlProvider>
          </FilterContextProvider>
        </MockConfluenceClientsProvider>
      </SearchSessionProvider>
    ),
  ],
};
