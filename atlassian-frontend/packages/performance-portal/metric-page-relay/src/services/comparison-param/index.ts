import { decodeString, encodeString } from 'serialize-query-params';

import { UTCDateParam } from '@atlassian/performance-portal-query-param';

import { ComparisonType } from '../../common/types';

export interface SelectedComparison {
  comparisonType: ComparisonType;
  selectedFixedDate?: Date;
}

export const ComparisonParam = {
  encode: (
    comparison: SelectedComparison | null | undefined,
  ): string | null | undefined => {
    if (!comparison) {
      return comparison;
    }
    if (comparison.comparisonType === ComparisonType.Fixed) {
      return UTCDateParam.encode(comparison.selectedFixedDate);
    }
    return encodeString(comparison.comparisonType);
  },
  decode: (
    comparisonStr: string | (string | null)[] | null | undefined,
  ): SelectedComparison | null | undefined => {
    const decodedStr = decodeString(comparisonStr);
    if (
      decodedStr === ComparisonType.DoD ||
      decodedStr === ComparisonType.WoW
    ) {
      return { comparisonType: decodedStr };
    }
    const decodedDate = UTCDateParam.decode(comparisonStr);
    if (!decodedDate) {
      return decodedDate;
    }
    return {
      comparisonType: ComparisonType.Fixed,
      selectedFixedDate: decodedDate,
    };
  },
};
