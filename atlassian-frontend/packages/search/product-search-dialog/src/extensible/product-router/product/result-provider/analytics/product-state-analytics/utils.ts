import { ResultSectionAnalyticData } from '../../../../../../common/analytics';
import { SearchItems } from '../../../result-types';

export const transformResults = (
  searchItems: SearchItems,
): ResultSectionAnalyticData[] => {
  return searchItems.sections.map((section) => ({
    sectionId: section.id,
  }));
};
