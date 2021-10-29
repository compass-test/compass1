import { PickD3Scale } from '@visx/scale';

import { ParseNumber } from '../../types';

export enum UserLegendPosition {
  AUTO = 'auto',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export type LegendPosition = 'top' | 'left' | 'bottom' | 'right' | 'flyout';

export enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

// Will need to change this back to flat after an update from TWP
export type ChartParameters = {
  chartType?: ChartTypes;
  chartGroup?: {
    dataTab: {
      aggregateData: string | boolean;
      /** pie chart flattens this to a single series **/
      yAxisIdxField?: string[] | string;
      xAxisIdxField?: string;
    };
    customizeTab: {
      styleField: {
        height?: string | number;
        showPoints?: string | boolean;
        smooth?: string | boolean;
        orientation?: Orientation;
      };
      titlesField: {
        chartTitle?: string;
        yLabel?: string;
      };
      legendField: {
        legendPosition?: UserLegendPosition;
        showLegend?: string | boolean;
      };
    };
  };
  /* from Lozenge.tsx */
  extensionTitle?: string;
};

export type ChartsProps = ChartParameters & {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  data: any;
  animated?: boolean;
  parseNumber?: ParseNumber;
};

export type ChartData = Record<string, number | string | undefined>;

export type ChartComponentProps = {
  xSeriesName: string;
  ySeriesNames: string[];
  tableData: ChartData[];

  height: number;
  width: number;
  animated: boolean;
  orientation?: Orientation;
  legendPosition: LegendPosition;
  aggregateData?: boolean;
  showLegend?: boolean;
  smooth?: boolean;
  showPoints?: boolean;
  parseNumber: ParseNumber;
  yLabel?: string;
  xLabel?: string;
  testId?: string;
  data: any;
  chartType: ChartTypes;

  chartScale?: PickD3Scale<'ordinal', any, any>;
  colorSequence?: string[];

  onLayout?: (layoutOK: boolean) => void;
};

export enum ChartTypes {
  PIE = 'PIE',
  BAR = 'BAR',
  LINE = 'LINE',
}
