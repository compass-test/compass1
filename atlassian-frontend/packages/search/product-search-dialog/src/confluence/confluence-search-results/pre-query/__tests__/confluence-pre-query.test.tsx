import React from 'react';
import { shallow } from 'enzyme';
import { assertSearchResultSectionsHaveTitles } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createPageBlogAttachmentResults,
  createSpaceResponse,
  createPeopleResults,
  enableDeterministicResponses,
} from '../../../../__tests__/__fixtures__/mock-search-results';
import { ConfluencePreQuery } from '../confluence-pre-query';
import { SearchResultSection } from '@atlassian/search-dialog';
import { messages } from '../../../../messages';
import { ProductSearchResult } from '../../../../common/product-search-result';
import { SearchResultsShownHandler } from '../../../../common/analytics';

jest.mock('@atlassian/search-dialog', () => ({
  SearchResultSection: (props: any) => <div {...props} />,
  SearchResult: () => <div />,
  SearchResultSectionLink: () => <div />,
}));

jest.mock('../../../confluence-features', () => ({
  useFeatures: () => {},
}));

jest.mock('../../../../common/product-search-result', () => ({
  ProductSearchResult: () => <div />,
}));

describe('<ConfluencePreQuery />', () => {
  const createResults = () => ({
    items: {
      isLoading: false,
      results: createPageBlogAttachmentResults(3),
    },
    spaces: {
      isLoading: false,
      results: createSpaceResponse(3),
    },
    people: {
      isLoading: false,
      results: createPeopleResults(3),
    },
  });

  const advancedSearchSelected = jest.fn();
  const searchSessionId = 'testSearchSessionId';

  const baseProps = {
    advancedSearchSelected,
    searchSessionId,
    isLoading: false,
  };

  const emptyProps = {
    items: {
      isLoading: false,
      results: {
        items: [],
        totalSize: 0,
        timings: 0,
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
  };

  beforeAll(() => {
    enableDeterministicResponses();
  });

  it('render with results matches snapshot', () => {
    const wrapper = shallow(
      <ConfluencePreQuery {...baseProps} {...createResults()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with results and siteurl , search people has proper URL', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        siteUrl="TEST_URL"
        {...createResults()}
      />,
    );

    expect(wrapper.find('#people-search-link').first().props().href).toEqual(
      'TEST_URL/wiki/people',
    );
  });

  describe('with 20 results', () => {
    it('render no more than 10 item results', () => {
      const wrapper = shallow(
        <ConfluencePreQuery
          {...baseProps}
          {...emptyProps}
          items={{
            isLoading: false,
            results: createPageBlogAttachmentResults(20),
          }}
        />,
      );

      expect(wrapper.find(ProductSearchResult)).toHaveLength(10);
    });

    it('fires search results shown with 10 results and 1 section', () => {
      const wrapper = shallow(
        <ConfluencePreQuery
          {...baseProps}
          {...emptyProps}
          items={{
            isLoading: false,
            results: createPageBlogAttachmentResults(20),
          }}
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

  it('render no more than 3 people results', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        {...emptyProps}
        people={{ isLoading: false, results: createPeopleResults(20) }}
      />,
    );
    expect(wrapper.find(ProductSearchResult)).toHaveLength(3);
  });

  it('render no more than 3 space results', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        {...emptyProps}
        spaces={{ isLoading: false, results: createSpaceResponse(20) }}
      />,
    );
    expect(wrapper.find(ProductSearchResult)).toHaveLength(3);
  });

  it('does not render empty space results', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        {...createResults()}
        spaces={{ isLoading: false, results: { items: [], timings: 0 } }}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.common_recently_viewed_section_heading,
      messages.common_recently_worked_with_section_heading,
    ]);
  });

  it('does not render empty item results', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        {...createResults()}
        items={{
          isLoading: false,
          results: { items: [], totalSize: 0, timings: 0 },
        }}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.common_recently_spaces_section_heading,
      messages.common_recently_worked_with_section_heading,
    ]);
  });

  it('does not render empty people results', () => {
    const wrapper = shallow(
      <ConfluencePreQuery
        {...baseProps}
        {...createResults()}
        people={{ isLoading: false, results: { items: [], timings: 0 } }}
      />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(2);
    assertSearchResultSectionsHaveTitles(sections, [
      messages.common_recently_viewed_section_heading,
      messages.common_recently_spaces_section_heading,
    ]);
  });

  it('renders no results screen if no results at all', () => {
    const wrapper = shallow(
      <ConfluencePreQuery {...baseProps} {...emptyProps} />,
    );

    const sections = wrapper.find(SearchResultSection);

    expect(sections).toHaveLength(0);
  });

  it('fires analytics event on people search selected without modifiers', () => {
    const wrapper = shallow(
      <ConfluencePreQuery {...baseProps} {...createResults()} />,
    );

    const peopleSearchLink = wrapper.find('#people-search-link').find('span');
    peopleSearchLink.simulate('click', { screenX: 30 });

    expect(advancedSearchSelected).toHaveBeenCalledWith({
      trigger: 'click',
      actionSubjectId: 'confluencePeopleSearchLink',
      isLoading: false,
      newTab: false,
    });
  });

  ['ctrlKey', 'shiftKey', 'metaKey'].forEach((modifier) => {
    it(`fires analytics event on people search selected with ${modifier}`, () => {
      const wrapper = shallow(
        <ConfluencePreQuery {...baseProps} {...createResults()} />,
      );
      const peopleSearchLink = wrapper.find('#people-search-link').find('span');

      peopleSearchLink.simulate('click', { screenX: 30, [modifier]: true });

      expect(advancedSearchSelected).toHaveBeenCalledWith({
        trigger: 'click',
        actionSubjectId: 'confluencePeopleSearchLink',
        isLoading: false,
        newTab: true,
      });
    });
  });
});
