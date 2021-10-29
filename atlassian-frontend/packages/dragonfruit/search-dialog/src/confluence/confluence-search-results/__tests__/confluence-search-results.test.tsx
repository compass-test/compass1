import React from 'react';
import { shallow } from 'enzyme';
import { enableDeterministicResponses } from '../../../__tests__/__fixtures__/mock-search-results';
import { SearchResults } from '../confluence-search-results';
import { ConfluencePreQuery } from '../pre-query';
import { ConfluencePostQuery } from '../post-query';
import { LoadingSpinner } from '../../../common/loading-spinner';
import { DefaultFeatures } from '../../confluence-features';
import {
  CompassComponentType,
  CompassSearchComponentResult,
} from '@atlassian/dragonfruit-graphql';

jest.mock('../pre-query');
jest.mock('../post-query');
jest.mock('../../../common/loading-spinner', () => ({
  LoadingSpinner: () => 'div',
}));
jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => <div />,
}));
jest.mock('../../filter');

describe('<SearchResults />', () => {
  let fetchMoreFn: any;

  beforeEach(() => {
    fetchMoreFn = jest.fn();
  });

  const names = {
    '1eb19c9d-e4c7-45c8-aec3-8a2d7cbe5515': {
      displayName: 'this is a team',
    } as any,
    '15c3f236-8339-43e0-9049-2fd03e808d9d': {
      displayName: 'another team',
    } as any,
    '5a740f67-ee17-4558-b567-60116bcd266d': {
      displayName: 'yet another team',
    } as any,
  };

  const createResults = () => ({
    services: {
      isLoading: false,
      results: [
        {
          component: {
            id: 'id-123',
            name: 'name-123',
            description: 'description-text-Lorem ipsum',
            ownerId: '1eb19c9d-e4c7-45c8-aec3-8a2d7cbe5515',
          },
          link: 'https://link',
        } as CompassSearchComponentResult,
      ],
      cursor: null,
    },
    libsAppsMore: {
      isLoading: false,
      results: [],
      cursor: null,
    },
    peopleTeams: {
      isLoading: false,
      results: [],
    },
    people: {
      isLoading: false,
      results: null,
    },
    fetchMoreFn,
    teamNames: names,
  });

  const LoadingResultState = {
    isLoading: true,
    results: null,
  };

  const loadingProps = {
    services: { ...LoadingResultState, cursor: null },
    libsAppsMore: { ...LoadingResultState, cursor: null },
    peopleTeams: LoadingResultState,
    people: LoadingResultState,
  };

  const baseProps = {
    query: 'query',
    advancedSearchUrl: 'some/advanced/search/url?q=query',
    enabledFilters: [],
    onSearchResultsShown: jest.fn(),
    searchSessionId: 'testSearchSeassionId',
    features: DefaultFeatures,
    isBelowTakeoverWidth: false,
    recentlyViewedComponents: { loading: false, components: [] },
    recentlyViewedTeams: { loading: false, teams: [] },
  };

  beforeAll(() => {
    enableDeterministicResponses();
  });

  it('render with results matches snapshot for pre query', () => {
    const wrapper = shallow(
      <SearchResults {...baseProps} {...createResults()} isPreQuery />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(true);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results matches snapshot for pre query with components and teams', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        {...createResults()}
        isPreQuery
        recentlyViewedComponents={{
          loading: false,
          components: [
            {
              id: 'id1',
              name: 'component-1',
              type: CompassComponentType.SERVICE,
            },
          ],
        }}
        recentlyViewedTeams={{
          loading: false,
          teams: [
            {
              id: 'team1',
              displayName: 'Lodestone',
              smallAvatarImageUrl: 'https://atlassian.net/test.svg',
            },
          ],
        }}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(true);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results matches snapshot for post query', () => {
    const wrapper = shallow(
      <SearchResults {...baseProps} {...createResults()} isPreQuery={false} />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(true);
    expect(wrapper.find(ConfluencePostQuery).prop('screenType')).toBe(
      'postQuerySearchResults',
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results matches snapshot for pre query loading', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        fetchMoreFn={fetchMoreFn}
        teamNames={{}}
        {...loadingProps}
        isPreQuery
        recentlyViewedComponents={{ loading: true, components: [] }}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
    expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  describe('with no results', () => {
    let wrapper: any;
    beforeEach(() => {
      baseProps.onSearchResultsShown = jest.fn();
      wrapper = shallow(
        <SearchResults
          {...baseProps}
          fetchMoreFn={fetchMoreFn}
          teamNames={{}}
          {...loadingProps}
          isPreQuery={false}
        />,
      );
    });

    it('render and matches snapshot for post query loading', () => {
      expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
      expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
      expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('render with intermediate results matches snapshot for post query loading', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        {...loadingProps}
        services={{
          isLoading: false,
          cursor: null,
          results: [
            {
              component: {
                id: 'id-123',
                name: 'name-123',
                description: 'description-text-Lorem ipsum',
                ownerId: '123',
              },
              link: 'https://link',
            } as CompassSearchComponentResult,
          ],
        }}
        libsAppsMore={{
          isLoading: false,
          cursor: null,
          results: [],
        }}
        isPreQuery={false}
        fetchMoreFn={fetchMoreFn}
        teamNames={{}}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);

    // We expect the post query screen to show here along with the spinner
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(true);
    expect(wrapper.find(ConfluencePostQuery).prop('screenType')).toBe(
      'cachedResults',
    );
    expect(wrapper.find(LoadingSpinner).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
