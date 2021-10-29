import React from 'react';

import { MockJiraClientsProvider } from '../../../../__tests__/__fixtures__/mock-jira-clients-provider';
import { UserProvider } from '../../../../common/user-context';

import { JiraFilterPane } from '../jira-filters-pane';

import { useFilterContext } from '../../../filter-context';
import AssigneeFilter from '../../../filter/assignee-filter';
import ProjectFilter from '../../../filter/project-filter';
import BinaryStatusCategoryFilter from '../../../filter/binary-status-category-filter';
import { useLoadFilters } from '../../../../common/filters/use-load-filters';
import { useFeatures } from '../../../features';
import { MoreFilters } from '../more-filters';
import { mountWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';

const defaultProps = {
  query: '',
  isLoading: false,
};

const defaultUser = {
  id: 'fh8321hf982h3f-fgdfgg3g-fn',
  name: 'John Doe',
  email: 'user@example.com',
  avatarUrl: 'http://lorempixel.com/24/24/people',
};

// Mocks
// ------------------------------
jest.mock('../../../filter/assignee-filter', () => (props: any) => (
  <div>{props.children}</div>
));
jest.mock('../../../filter/project-filter', () => (props: any) => (
  <div>{props.children}</div>
));
jest.mock('../more-filters', () => ({
  MoreFilters: (props: any) => <div>{props.children}</div>,
}));

jest.mock('../../../../common/filters/filter-pane.styled', () => ({
  FilterContainer: (props: any) => <div>{props.children}</div>,
  FeedbackCollectorButtonContainer: (props: any) => <div>{props.children}</div>,
}));

jest.mock('../../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'someSeachSession',
}));

jest.mock('../../../filter-context', () =>
  Object.assign({}, jest.requireActual('../../../filter-context'), {
    useFilterContext: jest.fn(),
  }),
);

jest.mock('../../../../common/feedback-collector', () => ({
  FeedbackCollector: () => <div />,
}));

jest.mock('../../../clients/jira-current-user-client.tsx', () => ({
  useJiraCurrentUser: () => {},
}));

jest.mock('../../../../common/filters/use-load-filters', () => ({
  useLoadFilters: jest.fn(),
}));

jest.mock('../../../features', () => ({
  useFeatures: jest.fn(),
}));

// Tests
// ----------------------------

describe('<JiraFilterPane />', () => {
  beforeEach(() => {
    (useLoadFilters as jest.Mock).mockReturnValue(false);

    (useFeatures as jest.Mock).mockReturnValue({});

    (useFilterContext as jest.Mock).mockReturnValue({
      projectFilters: {
        availableFilters: [],
        addFilters: jest.fn(),
      },
      assigneeFilters: {
        availableFilters: [],
        addFilters: jest.fn(),
      },
      siteFilters: {
        availableFilters: [],
        dispatch: jest.fn(),
      },
      binaryStatusCategoryFilters: {
        availableFilters: [],
      },
    });
  });

  it('renders filters', async () => {
    const wrapper = mountWithIntl(
      <MockJiraClientsProvider>
        <UserProvider user={defaultUser}>
          <JiraFilterPane {...defaultProps} />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render filter while loading', async () => {
    (useLoadFilters as jest.Mock).mockReturnValue(true);

    const wrapper = mountWithIntl(
      <MockJiraClientsProvider mode="loading">
        <UserProvider user={defaultUser}>
          <JiraFilterPane {...defaultProps} isLoading />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(AssigneeFilter).prop('isLoading')).toBe(true);
    expect(wrapper.find(ProjectFilter).prop('isLoading')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders no filters if error', async () => {
    const wrapper = mountWithIntl(
      <MockJiraClientsProvider mode="error">
        <UserProvider user={defaultUser}>
          <JiraFilterPane {...defaultProps} />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(AssigneeFilter).prop('isLoading')).toBe(false);
    expect(wrapper.find(ProjectFilter).prop('isLoading')).toBe(false);

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render Assignee Filter if user is anonymous', async () => {
    const wrapper = mountWithIntl(
      <MockJiraClientsProvider
        clientOverrides={{ currentUserClient: undefined }}
      >
        <UserProvider>
          <JiraFilterPane {...defaultProps} />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(AssigneeFilter)).toHaveLength(0);
    expect(wrapper.find(ProjectFilter)).toHaveLength(1);
    expect(wrapper.find(BinaryStatusCategoryFilter)).toHaveLength(1);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders filters without current user assignee user invalid', async () => {
    const wrapper = mountWithIntl(
      <MockJiraClientsProvider>
        <UserProvider user={{ name: 'Test' }}>
          <JiraFilterPane {...defaultProps} />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(AssigneeFilter).prop('isLoading')).toBe(false);
    expect(wrapper.find(ProjectFilter).prop('isLoading')).toBe(false);
    expect(wrapper.find(BinaryStatusCategoryFilter)).toHaveLength(1);

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render `more filters` button when in multi-site mode', async () => {
    (useFeatures as jest.Mock).mockReturnValue({
      isMultiSite: true,
      hasSoftwareAccess: true,
    });

    const wrapper = mountWithIntl(
      <MockJiraClientsProvider>
        <UserProvider user={{ name: 'Test' }}>
          <JiraFilterPane {...defaultProps} />
        </UserProvider>
      </MockJiraClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(MoreFilters)).toHaveLength(0);
  });
});
