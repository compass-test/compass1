import { ProductStates } from '../../../../../../product-state-machine';
import { EMPTY_SEARCH_ITEMS } from '../../../result-provider-types';
import { postQueryAnalyticsGenerator } from '../post-query-analytics-generator';

describe('postQueryAnalyticsGenerator', () => {
  const commonAttributes = {
    isMultiProduct: false,
    activeProduct: 'product',
    isSticky: false,
    isStickyUpdated: false,
  };
  it('should return attributes for PostQueryNoResult if the previous state was PostQueryLoading', () => {
    const result = postQueryAnalyticsGenerator(
      ProductStates.PostQueryNoResult,
      commonAttributes,
      ProductStates.PostQueryLoading,
      EMPTY_SEARCH_ITEMS,
    );
    expect(result).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
      actionSubjectId: 'postQuerySearchResults',
      attributes: {
        activeProduct: 'product',
        isMultiProduct: false,
        isSticky: false,
        isStickyUpdated: false,
        resultCount: 0,
        results: [],
        sectionCount: 0,
        timeToQueryMs: undefined,
      },
      eventType: 'ui',
      source: 'searchDialog',
    });
  });

  it('should return attributes for PostQuerySuccess if the previous state was PostQueryLoading', () => {
    const result = postQueryAnalyticsGenerator(
      ProductStates.PostQuerySuccess,
      commonAttributes,
      ProductStates.PostQueryLoading,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );
    expect(result).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
      actionSubjectId: 'postQuerySearchResults',
      attributes: {
        activeProduct: 'product',
        isMultiProduct: false,
        isSticky: false,
        isStickyUpdated: false,
        resultCount: 2,
        results: [{ sectionId: 'some-section' }],
        sectionCount: 1,
        timeToQueryMs: undefined,
      },
      eventType: 'ui',
      source: 'searchDialog',
    });
  });

  it('should not return attributes for PostQuerySuccess if the previous state was not PostQueryLoading', () => {
    const result = postQueryAnalyticsGenerator(
      ProductStates.PostQuerySuccess,
      commonAttributes,
      ProductStates.PostQueryError,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );
    expect(result).toEqual(undefined);
  });

  it('should not return attributes for PostQueryError if the previous state was PostQueryLoading', () => {
    const result = postQueryAnalyticsGenerator(
      ProductStates.PostQueryError,
      commonAttributes,
      ProductStates.PostQueryLoading,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );
    expect(result).toEqual(undefined);
  });
});
