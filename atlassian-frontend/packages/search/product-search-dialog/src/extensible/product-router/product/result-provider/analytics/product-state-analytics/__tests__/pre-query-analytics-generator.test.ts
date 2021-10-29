import { ProductStates } from '../../../../../../product-state-machine';
import { EMPTY_SEARCH_ITEMS } from '../../../result-provider-types';
import { preQueryAnalyticsGenerator } from '../pre-query-analytics-generator';

describe('preQueryAnalyticsGenerator', () => {
  const commonAttributes = {
    isMultiProduct: false,
    activeProduct: 'product',
    isSticky: false,
    isStickyUpdated: false,
  };
  it('should return attributes for PreQueryNoResult if the previous state was PreQueryLoading', () => {
    const result = preQueryAnalyticsGenerator(
      ProductStates.PreQueryNoResult,
      commonAttributes,
      ProductStates.PreQueryLoading,
      EMPTY_SEARCH_ITEMS,
    );
    expect(result).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
      actionSubjectId: 'preQuerySearchResults',
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

  it('should return attributes for PreQuerySuccess if the previous state was PreQueryLoading', () => {
    const result = preQueryAnalyticsGenerator(
      ProductStates.PreQuerySuccess,
      commonAttributes,
      ProductStates.PreQueryLoading,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );

    expect(result).toEqual({
      action: 'shown',
      actionSubject: 'searchResults',
      actionSubjectId: 'preQuerySearchResults',
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

  it('should not return attributes for PreQuerySuccess if the previous state was not PreQueryLoading', () => {
    const result = preQueryAnalyticsGenerator(
      ProductStates.PreQuerySuccess,
      commonAttributes,
      ProductStates.PreQueryError,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );
    expect(result).toEqual(undefined);
  });

  it('should not return attributes for PreQueryError if the previous state was PreQueryLoading', () => {
    const result = preQueryAnalyticsGenerator(
      ProductStates.PreQueryError,
      commonAttributes,
      ProductStates.PreQueryLoading,
      {
        size: 2,
        sections: [{ id: 'some-section', searchResults: [], title: 'title' }],
      },
    );
    expect(result).toEqual(undefined);
  });
});
