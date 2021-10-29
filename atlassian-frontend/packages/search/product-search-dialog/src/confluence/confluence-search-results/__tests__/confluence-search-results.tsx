import React from 'react';
import { shallow } from 'enzyme';
import {
  createPageBlogAttachmentResults,
  createSpaceResponse,
  createPeopleResults,
  enableDeterministicResponses,
} from '../../../__tests__/__fixtures__/mock-search-results';
import { SearchResults } from '../confluence-search-results';
import { ConfluencePreQuery } from '../pre-query';
import { ConfluencePostQuery } from '../post-query';
import { LoadingSpinner } from '../../../common/loading-spinner';
import { FilterPane } from '../../filter';
import NoResults from '../confluence-search-no-results';
import { DefaultFeatures } from '../../confluence-features';

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
  const createResults = () => ({
    items: {
      isLoading: false,
      results: createPageBlogAttachmentResults(1),
    },
    spaces: {
      isLoading: false,
      results: createSpaceResponse(1),
    },
    people: {
      isLoading: false,
      results: createPeopleResults(1),
    },
  });

  const emptyResults = {
    items: {
      isLoading: false,
      results: createPageBlogAttachmentResults(0),
    },
    spaces: {
      isLoading: false,
      results: createSpaceResponse(0),
    },
    people: {
      isLoading: false,
      results: createPeopleResults(0),
    },
  };

  const onFiltersCleared = jest.fn();

  const LoadingResultState = {
    isLoading: true,
    results: null,
  };

  const loadingProps = {
    items: LoadingResultState,
    spaces: LoadingResultState,
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
    onFiltersCleared,
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

  it('render with results matches snapshot for pre query with filter on', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        {...createResults()}
        isPreQuery
        showFilters
        isBelowTakeoverWidth={false}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(true);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
    expect(wrapper.find(FilterPane).exists()).toBe(false);
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

  it('render with results matches snapshot for post query with filter on', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        {...createResults()}
        isPreQuery={false}
        showFilters
        isBelowTakeoverWidth={false}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('post query with filter on & no results renders correctly', () => {
    const wrapper = shallow(
      <SearchResults
        {...baseProps}
        {...emptyResults}
        isPreQuery={false}
        showFilters
        isBelowTakeoverWidth={false}
      />,
    );

    expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
    expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
    expect(wrapper.find(NoResults).exists()).toBe(true);
  });

  it('render with results matches snapshot for pre query loading', () => {
    const wrapper = shallow(
      <SearchResults {...baseProps} {...loadingProps} isPreQuery />,
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
        <SearchResults {...baseProps} {...loadingProps} isPreQuery={false} />,
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
        items={{
          isLoading: false,
          results: createPageBlogAttachmentResults(1),
        }}
        isPreQuery={false}
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

  describe('on mobile, ', () => {
    beforeAll(() => {
      Object.defineProperty(document.body, 'clientWidth', {
        value: 600,
        writable: true,
      });
    });

    it('render with results matches snapshot for pre query with filter on', () => {
      const wrapper = shallow(
        <SearchResults
          {...baseProps}
          {...createResults()}
          isPreQuery
          showFilters
          isBelowTakeoverWidth={false}
        />,
      );

      expect(wrapper.find(ConfluencePreQuery).exists()).toBe(true);
      expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
      expect(wrapper.find(FilterPane).exists()).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('render with results matches snapshot for post query with filter on', () => {
      const wrapper = shallow(
        <SearchResults
          {...baseProps}
          {...createResults()}
          isPreQuery={false}
          showFilters
          isBelowTakeoverWidth
        />,
      );

      expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
      expect(wrapper.find(ConfluencePostQuery).exists()).toBe(true);
      expect(wrapper.find(FilterPane).exists()).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });

    it('post query with filter on & no results renders correctly', () => {
      const wrapper = shallow(
        <SearchResults
          {...baseProps}
          {...emptyResults}
          isPreQuery={false}
          showFilters
          isBelowTakeoverWidth
        />,
      );

      expect(wrapper.find(ConfluencePreQuery).exists()).toBe(false);
      expect(wrapper.find(ConfluencePostQuery).exists()).toBe(false);
      expect(wrapper.find(NoResults).exists()).toBe(true);
      expect(wrapper.find(FilterPane).exists()).toBe(false);
    });
  });
});
