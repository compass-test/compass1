import { onSearchResultsShown } from '../../../../../../common/analytics';
import { ResultsShownActionSubjectId } from '../../../../../../common/analytics/events';
import { ProductStates } from '../../../../../product-state-machine';
import { SearchItems } from '../../../result-types';
import { CommonAttributes } from './product-state-analytics-types';
import { transformResults } from './utils';

export const preQueryAnalyticsGenerator = (
  productState: ProductStates,
  commonAttributes: CommonAttributes,
  previousState: ProductStates,
  preQueryItems: SearchItems,
) => {
  if (previousState !== ProductStates.PreQueryLoading) {
    return;
  }
  const results = transformResults(preQueryItems);
  const attributes = onSearchResultsShown({
    actionSubjectId: ResultsShownActionSubjectId.PREQUERY,
    resultCount: preQueryItems.size || 0,
    sectionCount: preQueryItems.sections.length,
    results,
    ...commonAttributes,
  });
  switch (productState) {
    case ProductStates.PreQueryNoResult:
      return attributes;
    case ProductStates.PreQuerySuccess:
      if (results.length > 0) {
        return attributes;
      }
      break;
    default:
      break;
  }
};
