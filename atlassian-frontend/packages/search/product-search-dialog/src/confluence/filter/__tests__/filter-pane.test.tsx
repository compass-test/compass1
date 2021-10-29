import React from 'react';
import { mount } from 'enzyme';
import { FilterPane } from '../filter-pane';
import { MockConfluenceClientsProvider } from '../../../__tests__/__fixtures__/mock-confluence-clients-provider';
import PeopleFilter from '../people-filter';
import SpaceFilter from '../space-filter';
import { useFilterContext } from '../../filter-context';
import { useUserContext } from '../../../common/user-context';
import { useLoadFilters } from '../../../common/filters/use-load-filters';
import { useFeatures } from '../../confluence-features/confluence-features';

const defaultProps = {
  query: '',
  isLoading: false,
};

const defaultUser = {
  name: 'Confluence User',
  email: 'confluence.user@example.com',
  id: '1234567890',
  avatarUrl: 'path/to/user/avatar',
};

jest.mock('../people-filter', () => (props: any) => (
  <div>{props.children}</div>
));
jest.mock('../space-filter', () => (props: any) => <div>{props.children}</div>);
jest.mock('../more-filters', () => (props: any) => <div>{props.children}</div>);
jest.mock(
  '../../../common/filters/site-filter/site-filter',
  () => (props: any) => <div>{props.children}</div>,
);
jest.mock('../../../common/filters/filter-pane.styled', () => ({
  FilterContainer: (props: any) => <div>{props.children}</div>,
  FeedbackCollectorButtonContainer: (props: any) => <div>{props.children}</div>,
}));

jest.mock('../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'someSeachSession',
}));

jest.mock('../../../common/user-context', () => ({
  useUserContext: jest.fn(),
}));

jest.mock('../../filter-context', () =>
  Object.assign({}, jest.requireActual('../../filter-context'), {
    useFilterContext: jest.fn(),
  }),
);

jest.mock('../../../common/feedback-collector', () => ({
  FeedbackCollector: () => <div />,
}));

jest.mock('../../../common/filters/use-load-filters', () => ({
  useLoadFilters: jest.fn(),
}));

jest.mock('../../confluence-features/confluence-features', () => ({
  useFeatures: jest.fn(),
}));

describe('<FilterPane />', () => {
  beforeEach(() => {
    (useLoadFilters as jest.Mock).mockReturnValue(false);
    (useFeatures as jest.Mock).mockReturnValue({ isMultiSite: false });

    (useFilterContext as jest.Mock).mockReturnValue({
      peopleFilters: {
        availableFilters: [],
        addFilters: jest.fn(),
      },
      spaceFilters: {
        availableFilters: [],
        addFilters: jest.fn(),
      },
      siteFilters: {
        availableFilters: [],
        dispatch: jest.fn(),
      },
    });
    (useUserContext as jest.Mock).mockReturnValue({
      user: defaultUser,
    });
  });

  it('renders filters', async () => {
    const wrapper = mount(
      <MockConfluenceClientsProvider>
        <FilterPane {...defaultProps} />
      </MockConfluenceClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(PeopleFilter).prop('isLoading')).toBe(false);
    expect(wrapper.find(SpaceFilter).prop('isLoading')).toBe(false);

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render filter while loading', async () => {
    (useLoadFilters as jest.Mock).mockReturnValue(true);

    const wrapper = mount(
      <MockConfluenceClientsProvider mode="loading">
        <FilterPane {...defaultProps} />
      </MockConfluenceClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(PeopleFilter).prop('isLoading')).toBe(true);
    expect(wrapper.find(SpaceFilter).prop('isLoading')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders no filters if error', async () => {
    const wrapper = mount(
      <MockConfluenceClientsProvider mode="error">
        <FilterPane {...defaultProps} />
      </MockConfluenceClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(PeopleFilter).prop('isLoading')).toBe(false);
    expect(wrapper.find(SpaceFilter).prop('isLoading')).toBe(false);

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render People Filter if user is anonymous', async () => {
    (useUserContext as jest.Mock).mockReturnValue({
      user: {
        name: undefined,
        email: undefined,
        id: undefined,
        avatarUrl: undefined,
      },
    });

    const wrapper = mount(
      <MockConfluenceClientsProvider>
        <FilterPane {...defaultProps} />
      </MockConfluenceClientsProvider>,
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();

    expect(wrapper.find(PeopleFilter)).toHaveLength(0);
    expect(wrapper.find(SpaceFilter)).toHaveLength(1);

    expect(wrapper).toMatchSnapshot();
  });
});
