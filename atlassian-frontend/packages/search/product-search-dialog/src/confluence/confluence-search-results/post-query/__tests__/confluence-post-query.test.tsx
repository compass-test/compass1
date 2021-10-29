import React, { ReactElement } from 'react';
import {
  shallowWithIntl,
  assertSearchResultSectionsHaveTitles,
  getSearchResultSectionTitleText,
} from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createPageBlogAttachmentResults,
  createSpaceResponse,
  createPeopleResults,
  createRecentPages,
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
import ConfluenceSearchResultSectionLink from '../../confluence-search-result-section-link';

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
  const createResults = (num: number = 1) => ({
    items: {
      isLoading: false,
      results: createPageBlogAttachmentResults(num),
    },
    spaces: {
      isLoading: false,
      results: createSpaceResponse(num),
    },
    people: {
      isLoading: false,
      results: createPeopleResults(num),
    },
  });

  const advancedSearchSelected = jest.fn();
  const showMoreClicked = jest.fn();
  const showAllClicked = jest.fn();

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

  it('render with results matches snapshot', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} query="query" {...createResults()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results and siteurl , search people has proper URL', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        siteUrl="TEST_URL"
        {...createResults()}
      />,
    );

    expect(wrapper.find('#people-search-link').first().props().href).toEqual(
      'TEST_URL/wiki/people?q=abcdef!%40%23%24%25%5E',
    );
  });

  it('render the correct result count badge when there are more than 10 results', () => {
    const { items } = createResults(10);
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        items={{ ...items, results: { ...items.results, totalSize: 50 } }}
        spaces={createResults(12).spaces}
        people={createResults(14).people}
      />,
    );

    const sections = wrapper.find(SearchResultSection);
    expect(sections.map((section) => section.prop('totalResults'))).toEqual([
      50,
      undefined,
      undefined,
    ]);
  });

  describe('with 20 results', () => {
    it('renders no more than 10 item results', () => {
      const wrapper = shallow(
        <ConfluencePostQuery {...baseProps} items={createResults(20).items} />,
      );

      expect(wrapper.find(ProductSearchResult)).toHaveLength(10);
    });

    it('fires search results shown with 10 results and 1 section', () => {
      const wrapper = shallow(
        <ConfluencePostQuery {...baseProps} items={createResults(20).items} />,
      );

      expect(wrapper.find(SearchResultsShownHandler).prop('resultCount')).toBe(
        10,
      );
      expect(wrapper.find(SearchResultsShownHandler).prop('sectionCount')).toBe(
        1,
      );
    });
  });

  it('render no more than 3 people results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} people={createResults(20).people} />,
    );
    expect(wrapper.find(ProductSearchResult)).toHaveLength(3);
  });

  it('render no more than 3 space results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} spaces={createResults(20).spaces} />,
    );
    expect(wrapper.find(ProductSearchResult)).toHaveLength(3);
  });

  it('does not render empty space results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        {...createResults()}
        spaces={baseProps.spaces}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.confluence_pages_blogs_attachments_section_heading,
      messages.confluence_people_section_heading,
    ]);
  });

  it('does not render empty item results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        {...createResults()}
        items={baseProps.items}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.confluence_spaces_section_heading,
      messages.confluence_people_section_heading,
    ]);
  });

  it('does not render empty people results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        {...createResults()}
        people={baseProps.people}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.confluence_pages_blogs_attachments_section_heading,
      messages.confluence_spaces_section_heading,
    ]);
  });

  it('renders no results screen if no results at all', () => {
    const wrapper = shallow(<ConfluencePostQuery {...baseProps} />);

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(0);
  });

  it('renders a show more link when there are more than 10 results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} items={createResults(11).items} />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (resultSection) =>
          getSearchResultSectionTitleText(resultSection) ===
          messages.confluence_pages_blogs_attachments_section_heading
            .defaultMessage,
      );

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('renders the right show more link when there are more than 30 results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} items={createResults(35).items} />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (resultSection) =>
          getSearchResultSectionTitleText(resultSection) ===
          messages.confluence_pages_blogs_attachments_section_heading
            .defaultMessage,
      );

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('renders the correct show more link when there are more than 10 results but less than 31 after clicking show more', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} items={createResults(12).items} />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (resultSection) =>
          getSearchResultSectionTitleText(resultSection) ===
          messages.confluence_pages_blogs_attachments_section_heading
            .defaultMessage,
      );

    const t = sectionWrapper
      .find(SearchResultSectionLink)
      .prop('onClick') as React.MouseEventHandler;
    t({} as React.MouseEvent);

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('renders the correct show more link when there are more than 30 results after clicking show more', () => {
    const wrapper = shallow(
      <ConfluencePostQuery {...baseProps} items={createResults(35).items} />,
    );
    const sectionWrapper = wrapper
      .find(SearchResultSection)
      .filterWhere(
        (w) =>
          getSearchResultSectionTitleText(w) ===
          messages.confluence_pages_blogs_attachments_section_heading
            .defaultMessage,
      );

    const t = sectionWrapper
      .find(SearchResultSectionLink)
      .prop('onClick') as React.MouseEventHandler;
    t({} as React.MouseEvent);

    expect(sectionWrapper.find(SearchResultSectionLink).exists()).toBeTruthy();
  });

  it('should render the correct time detail for faster search results', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        items={{
          isLoading: false,
          results: { ...createRecentPages(1), totalSize: 1 },
        }}
      />,
    );

    const timeDetailWrapper = shallowWithIntl(
      wrapper.find(ProductSearchResult).prop('timeDetail') as JSX.Element,
    );

    expect(timeDetailWrapper.text()).toEqual('Recently viewed');
  });

  it('should fire advanced search selected event when show people link is clicked', () => {
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        query="query"
        {...createResults()}
        screenType="postQuerySearchResults"
      />,
    );

    const peopleLink = wrapper
      .find(ConfluenceSearchResultSectionLink)
      .filterWhere((link) => link.prop('id') === 'people-search-link');

    peopleLink.find('span').simulate('click', { screenX: 0 });

    expect(advancedSearchSelected).toBeCalledTimes(1);
  });

  it('should fire show more and show all clicked event when show more / show all is clicked', () => {
    // Setup (show more)
    const wrapper = shallow(
      <ConfluencePostQuery
        {...baseProps}
        query="query"
        {...createResults(30)}
        screenType="postQuerySearchResults"
      />,
    );

    // Execute (show more)
    const showMoreButton = wrapper
      .find(SearchResultSectionLink)
      .filterWhere((button) => button.prop('id') === 'show-more-button');

    showMoreButton.simulate('click', { screenX: 0 });

    // Assert
    expect(showMoreClicked).toBeCalledTimes(1);
    expect(showAllClicked).toBeCalledTimes(0);

    // Setup (show all)
    jest.clearAllMocks();
    wrapper.update();

    // Execute
    const showAllLink = wrapper
      .find(ConfluenceSearchResultSectionLink)
      .filterWhere((link) => link.prop('id') === 'show-all-link');

    showAllLink.simulate('click', { screenX: 0 });

    // Assert
    expect(showMoreClicked).toBeCalledTimes(0);
    expect(showAllClicked).toBeCalledTimes(1);
  });
});
