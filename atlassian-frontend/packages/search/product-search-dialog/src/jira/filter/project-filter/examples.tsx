import React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import ProjectFilter, { ProjectFilterProps } from './project-filter';
import { MockJiraClientsProvider } from '../../../__tests__/__fixtures__/mock-jira-clients-provider';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { FilterContextProvider } from '../../filter-context';
import { createProjectFilters } from '../../../__tests__/__fixtures__/mock-filters';

const defaultProps: ProjectFilterProps = {
  isLoading: false,
};

const Wrapper = styled.div`
  max-width: 300px;
  padding: 1rem;
`;

export const Basic = () => <ProjectFilter {...defaultProps} />;

export const Loading = () => <ProjectFilter {...defaultProps} isLoading />;

export default {
  title: 'Jira Search Dialog/Filter/Project Filter',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="blah">
        <MockJiraClientsProvider mode="normal">
          <FilterContextProvider
            defaultProjectFilters={createProjectFilters(10, {
              visibleNumber: 3,
            })}
          >
            <IntlProvider locale="en">
              <Wrapper>{story()}</Wrapper>
            </IntlProvider>
          </FilterContextProvider>
        </MockJiraClientsProvider>
      </SearchSessionProvider>
    ),
  ],
};
