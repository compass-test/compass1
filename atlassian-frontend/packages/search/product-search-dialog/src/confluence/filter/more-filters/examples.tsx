/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { action } from '@storybook/addon-actions';
import MoreFilters, { MoreFiltersProps } from './more-filters';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { LinkComponent } from '@atlassian/search-dialog';
import { FilterContextProvider } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';

const defaultProps: MoreFiltersProps = {
  query: 'test',
  isLoading: false,
};

const LoggingLinkComponent: LinkComponent = ({ children, ...rest }) => (
  <a
    {...rest}
    onClick={(e) => {
      e.preventDefault();
      action(`Link clicked: ${rest.href}`)(e);
      (rest as any)?.onClick?.(e);
    }}
  >
    {children}
  </a>
);

export const Basic = () => <MoreFilters {...defaultProps} />;

export const BasicWithLinkComponent = () => (
  <MoreFilters {...defaultProps} linkComponent={LoggingLinkComponent} />
);

export const LinkComponentWithFiltersSelected = () => (
  <MoreFilters {...defaultProps} linkComponent={LoggingLinkComponent} />
);

export default {
  title: 'Confluence Search Dialog/Filter/More Filters Link',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="story">
        <FilterContextProvider
          defaultPeopleFilters={['23wdfa'].map((id) => ({
            id,
            displayName: 'someName',
            avatarUrl: 'someAvatar',
            filterSource: FilterOptionSource.COLLABORATION_GRAPH,
            isChecked: true,
            isVisible: true,
          }))}
          defaultSpaceFilters={['SS', 'BB'].map((id) => ({
            id,
            spaceName: 'someName',
            iconUrl: 'someIcon',
            filterSource: FilterOptionSource.COLLABORATION_GRAPH,
            isChecked: true,
            isVisible: true,
          }))}
        >
          {story()}
        </FilterContextProvider>
      </SearchSessionProvider>
    ),
  ],
};
