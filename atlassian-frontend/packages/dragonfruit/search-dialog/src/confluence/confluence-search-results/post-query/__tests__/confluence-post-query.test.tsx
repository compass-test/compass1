import React, { ReactElement } from 'react';
import {
  assertSearchResultSectionsHaveTitles,
  getSearchResultSectionTitleText,
  shallowWithIntl,
} from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createPeopleTeamsResult,
  createServiceResults,
} from '../../../../__tests__/__fixtures__/mock-search-results';
import { ConfluencePostQuery } from '../confluence-post-query';
import {
  SearchResultSection,
  SearchResultSectionLink,
} from '@atlassian/search-dialog';
import { messages } from '../../../../messages';
import { SearchResultsShownHandler } from '../../../../common/analytics';
import { ScreenType } from '../../../../common/analytics/events';
import { ProductSearchResult } from '../../../../common/product-search-result';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

jest.mock('@atlassian/search-dialog', () => ({
  SearchResultSection: (props: any) => <div {...props} />,
  SearchResultSectionLink: () => <div />,
  Link: () => 'a',
}));

jest.mock('../../../../common/product-search-result', () => ({
  ProductSearchResult: () => <div />,
}));

jest.mock('../../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'abc',
}));

jest.mock('../../../confluence-features', () => ({
  useFeatures: () => ({ isMultiSite: false }),
}));

jest.mock('../../../confluence-utils/confluence-url-utils', () => ({
  usePrimarySiteConfluenceAdvancedSearchUrlFactory: () => () =>
    'some/advanced/search/url',
}));

describe('<ConfluencePostQuery />', () => {
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
  const createResults = (num: number = 1) => ({
    items: {
      isLoading: false,
      results: null,
    },
    spaces: {
      isLoading: false,
      results: null,
    },
    people: {
      isLoading: false,
      results: null,
    },
    services: {
      isLoading: false,
      cursor: null,
      results: createServiceResults(num, CompassComponentType.SERVICE),
      teamNames: names,
    },
    libsAppsMore: {
      isLoading: false,
      cursor: null,
      results: createServiceResults(num, CompassComponentType.OTHER),
      teamNames: names,
    },
    peopleTeams: {
      isLoading: false,
      results: createPeopleTeamsResult(num),
    },
  });

  const advancedSearchSelected = jest.fn();
  const showMoreClicked = jest.fn();
  const showAllClicked = jest.fn();
  const fetchMoreFn = jest.fn();

  const baseProps = {
    query: 'abcdef!@#$%^',
    advancedSearchUrl: 'advanced/search/link',
    advancedSearchSelected,
    showMoreClicked,
    showAllClicked,
    searchSessionId: 'testSearchSessionId',
    formatDate: (date: string) => <>{date}</>,
    screenType: 'postQuerySearchResults' as ScreenType,
    isLoading: false,
    isCollapsed: false,
    enabledFilters: [],
    items: {
      isLoading: false,
      results: {
        items: [],
        timings: 0,
        totalSize: 0,
      },
    },
    spaces: {
      isLoading: false,
      results: {
        items: [],
        timings: 0,
      },
    },
    people: {
      isLoading: false,
      results: {
        items: [],
        timings: 0,
      },
    },
    services: {
      isLoading: false,
      cursor: null,
      results: [],
      teamNames: {},
    },
    libsAppsMore: {
      isLoading: false,
      cursor: null,
      results: [],
      teamNames: {},
    },
    peopleTeams: {
      isLoading: false,
      results: [],
    },
    isMultiSite: false,
  };

  const shallow = <P extends {}>(
    node: ReactElement<P>,
    additionalOptions: {} = {},
  ) => {
    return shallowWithIntl(node, additionalOptions).dive();
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render with results matches snapshot - with team names', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        query="query"
        teamNames={names}
        fetchMoreFn={fetchMoreFn}
        {...createResults()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results matches snapshot', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        query="query"
        teamNames={{}}
        fetchMoreFn={fetchMoreFn}
        {...createResults()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('with 20 results', () => {
    it('renders item results properly', () => {
      const wrapper = shallow(
        <ConfluencePostQuery
          {...baseProps}
          services={{
            isLoading: false,
            cursor: null,
            results: createServiceResults(31, CompassComponentType.SERVICE),
          }}
          teamNames={{}}
          fetchMoreFn={fetchMoreFn}
        />,
      );

      expect(wrapper.find(ProductSearchResult)).toHaveLength(31);
    });

    it('fires search results shown with 10 results and 1 section', () => {
      const wrapper = shallow(
        <ConfluencePostQuery
          {...baseProps}
          services={{
            isLoading: false,
            cursor: null,
            results: createServiceResults(10, CompassComponentType.SERVICE),
          }}
          teamNames={{}}
          fetchMoreFn={fetchMoreFn}
        />,
      );

      expect(wrapper.find(SearchResultsShownHandler).prop('resultCount')).toBe(
        10,
      );
      expect(wrapper.find(SearchResultsShownHandler).prop('sectionCount')).toBe(
        1,
      );
    });
  });

  it('does not render empty services results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        {...createResults()}
        services={baseProps.services}
        fetchMoreFn={fetchMoreFn}
        teamNames={{}}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.compass_libraries_applications_more_section_heading,
      messages.compass_teams_and_people_section_heading,
    ]);
  });

  it('does not render empty peopleTeams results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        {...createResults()}
        peopleTeams={baseProps.peopleTeams}
        fetchMoreFn={fetchMoreFn}
        teamNames={{}}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.compass_services_section_heading,
      messages.compass_libraries_applications_more_section_heading,
    ]);
  });

  it('renders no results screen if no results at all', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        teamNames={{}}
        fetchMoreFn={fetchMoreFn}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(0);
  });

  it('renders a show more link when there are more than 30 service results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        services={{
          isLoading: false,
          cursor: 'a cursor',
          results: createServiceResults(31, CompassComponentType.SERVICE),
        }}
        teamNames={{}}
        fetchMoreFn={fetchMoreFn}
      />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (resultSection) =>
          getSearchResultSectionTitleText(resultSection) ===
          messages.compass_services_section_heading.defaultMessage,
      );

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('renders the right show more link when there are more than 13 library etc results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        libsAppsMore={{
          isLoading: false,
          cursor: 'a cursor',
          results: createServiceResults(14, CompassComponentType.OTHER),
        }}
        teamNames={{}}
        fetchMoreFn={fetchMoreFn}
      />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (resultSection) =>
          getSearchResultSectionTitleText(resultSection) ===
          messages.compass_libraries_applications_more_section_heading
            .defaultMessage,
      );

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('does not render show more link when all results are loaded', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        services={{
          isLoading: false,
          cursor: null,
          results: createServiceResults(35, CompassComponentType.SERVICE),
        }}
        teamNames={{}}
        fetchMoreFn={fetchMoreFn}
      />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (w) =>
          getSearchResultSectionTitleText(w) ===
          messages.compass_services_section_heading.defaultMessage,
      );

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeFalsy();
  });
});
