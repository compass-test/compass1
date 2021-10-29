import React from 'react';
import { shallow } from 'enzyme';
import { Products } from '../../../product-context';
import { SearchResultsShownHandlerBase } from '../results-shown-handler';
import { nextTickAfterDebouncedFunctionExecution } from '../../../../utils/test-utils';
import {
  ResultsShownActionSubjectId,
  ResultSectionAnalyticData,
} from '../../events';
import 'jest-extended';

describe('ExperimentExposureHandler', () => {
  const searchResultsShown = jest.fn();
  const resultCount = 5;

  const resultsAnalyticData = [
    {
      results: [
        {
          containerId: 'container-id',
          isRecentResult: false,
          resultContentId: 'resultContent-id',
          resultType: 'result-type',
        },
      ],
      sectionId: 'confluence-item',
    } as ResultSectionAnalyticData,
  ];

  const commonProps = {
    searchResultsShown,
    resultCount,
    sectionCount: 3,
    results: resultsAnalyticData,
    isMultiProduct: false,
    activeProduct: Products.confluence,
  };

  const commonPayload = {
    resultCount,
    sectionCount: 3,
    results: resultsAnalyticData,
    isMultiProduct: false,
    activeProduct: Products.confluence,
  };

  beforeEach(() => {
    searchResultsShown.mockReset();
  });

  it('should fire correct event on mount', async () => {
    shallow(
      <SearchResultsShownHandlerBase
        {...commonProps}
        isPreQuery
        isLoading={false}
      />,
    );
    await nextTickAfterDebouncedFunctionExecution();

    expect(searchResultsShown).toHaveBeenCalled();
    expect(searchResultsShown).toHaveBeenCalledWith({
      ...commonPayload,
      actionSubjectId: ResultsShownActionSubjectId.PREQUERY,
      timeToQueryMs: expect.toBeNumber(),
    });
  });

  it('should not fire event on pre-query loading', async () => {
    shallow(
      <SearchResultsShownHandlerBase {...commonProps} isPreQuery isLoading />,
    );
    await nextTickAfterDebouncedFunctionExecution();

    expect(searchResultsShown).not.toHaveBeenCalled();
  });

  it('should fire correct event for faster search', async () => {
    const wrapper = shallow(
      <SearchResultsShownHandlerBase
        {...commonProps}
        isPreQuery
        isLoading={false}
      />,
    );
    await nextTickAfterDebouncedFunctionExecution();

    wrapper.setProps({
      ...commonProps,
      isLoading: true,
      isPreQuery: false,
    });
    wrapper.update();
    await nextTickAfterDebouncedFunctionExecution();

    expect(searchResultsShown).toHaveBeenCalledTimes(2);
    expect(searchResultsShown).toHaveBeenCalledWith({
      ...commonPayload,
      actionSubjectId: ResultsShownActionSubjectId.CACHED,
    });
  });

  it('should fire correct event for post query', async () => {
    const wrapper = shallow(
      <SearchResultsShownHandlerBase
        {...commonProps}
        isPreQuery
        isLoading={false}
      />,
    );
    await nextTickAfterDebouncedFunctionExecution();

    wrapper.setProps({
      ...commonProps,
      isLoading: false,
      isPreQuery: false,
    });
    wrapper.update();
    await nextTickAfterDebouncedFunctionExecution();

    expect(searchResultsShown).toHaveBeenCalledTimes(2);
    expect(searchResultsShown).toHaveBeenCalledWith({
      ...commonPayload,
      actionSubjectId: ResultsShownActionSubjectId.POSTQUERY,
      timeToQueryMs: expect.toBeNumber(),
    });
  });
});
