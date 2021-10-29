import { ProductStates } from '../../../../..';
import { onSearchResultsShown } from '../../../../../../common/analytics';
import { ResultsShownActionSubjectId } from '../../../../../../common/analytics/events';
import { SearchItems } from '../../../result-types';
import { CommonAttributes } from './product-state-analytics-types';
import { transformResults } from './utils';

export const postQueryAnalyticsGenerator = (
  productState: ProductStates,
  commonAttributes: CommonAttributes,
  previousState: ProductStates,
  postQueryItems: SearchItems,
) => {
  if (previousState !== ProductStates.PostQueryLoading) {
    return;
  }
  const results = transformResults(postQueryItems);
  switch (productState) {
    case ProductStates.PostQueryNoResult:
    case ProductStates.PostQuerySuccess:
      return onSearchResultsShown({
        actionSubjectId: ResultsShownActionSubjectId.POSTQUERY,
        resultCount: postQueryItems.size || 0,
        sectionCount: postQueryItems.sections.length,
        results,
        ...commonAttributes,
      });
    default:
      break;
  }
};
