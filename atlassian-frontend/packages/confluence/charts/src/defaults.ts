import { InjectedIntl } from 'react-intl';

import { i18n } from './messages';
import { ADFNode, ParseNumber } from './types';
import { ChartTypes, Orientation, UserLegendPosition } from './ui/charts/types';
import { createColumnNames } from './ui/charts/utilities';
import { parseTable } from './utils';

export const DEFAULT_CHART_TYPE = ChartTypes.BAR;
export const DEFAULT_CHART_HEIGHT = 350;
export const DEFAULT_CHART_ORIENTATION = Orientation.VERTICAL;
export const DEFAULT_LEGEND_POSITION = UserLegendPosition.AUTO;

export const defaultParameters = (
  adf: ADFNode | null,
  intl: InjectedIntl,
  parseNumber: ParseNumber,
) => {
  const table = adf ? parseTable(adf) : [[]];
  const seriesOptions = createColumnNames(table, intl);
  // CEMS-2210: blocked on CEMS-2227, use instead for yAxisIdxField's source
  // const validSeriesSelections = seriesOptions.filter((opt, idx) => {
  //   return columnHasNumbers(table, parseNumber, idx);
  // });

  const xAxisIdxField = (seriesOptions[0] || { value: undefined }).value;
  const yAxisIdxField = seriesOptions
    .filter((opt) => opt.value !== '0')
    .map((opt) => opt.value);

  return {
    chartType: DEFAULT_CHART_TYPE,
    chartGroup: {
      dataTab: {
        aggregateData: false,
        xAxisIdxField,
        yAxisIdxField,
      },
      customizeTab: {
        styleField: {
          height: DEFAULT_CHART_HEIGHT,
          showPoints: false,
          smooth: false,
          orientation: DEFAULT_CHART_ORIENTATION,
        },
        titlesField: {
          chartTitle: intl.formatMessage(i18n.defaultTitle),
          yLabel: intl.formatMessage(i18n.defaultYLabel),
        },
        legendField: {
          legendPosition: UserLegendPosition.AUTO as const,
          showLegend: true,
        },
      },
    },
    /* Lozenge.tsx in editor-core will end up capitalising the first letter */
    extensionTitle: intl.formatMessage(i18n.extensionTitle),
  };
};
