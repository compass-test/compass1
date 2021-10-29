import React from 'react';
import { IntlProvider } from 'react-intl';
import SpaceFilter, { SpaceFilterProps } from './space-filter';
import { FilterContextProvider } from '../../filter-context';
import { MockConfluenceClientsProvider } from '../../../__tests__/__fixtures__/mock-confluence-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { createSpaceFilters } from '../../../__tests__/__fixtures__/mock-filters';

const defaultProps: SpaceFilterProps = {
  isLoading: false,
};

export const Basic = () => <SpaceFilter {...defaultProps} />;

export const Loading = () => <SpaceFilter {...defaultProps} isLoading />;

export default {
  title: 'Confluence Search Dialog/Filter/Space Filter',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="blah">
        <MockConfluenceClientsProvider mode="normal">
          <FilterContextProvider
            defaultSpaceFilters={createSpaceFilters(10, { visibleNumber: 3 })}
          >
            <IntlProvider locale="en">{story()}</IntlProvider>
          </FilterContextProvider>
        </MockConfluenceClientsProvider>
      </SearchSessionProvider>
    ),
  ],
};
