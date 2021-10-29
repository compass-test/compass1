import React from 'react';

import { InjectedIntl } from 'react-intl';

import {
  ColorField,
  FieldDefinition,
  NestedFieldDefinition,
} from '@atlaskit/editor-common/extensions';
import { EditorActions } from '@atlaskit/editor-core';
import { dataSourceResolver } from '@atlassian/editor-referentiality';

import { colorSequence } from '../colors';
import { DEFAULT_CHART_TYPE, DEFAULT_LEGEND_POSITION } from '../defaults';
import { i18n } from '../messages';
import { ADFNode } from '../types';
import {
  ChartParameters,
  ChartTypes,
  UserLegendPosition,
} from '../ui/charts/types';
import {
  createColumnNames,
  getColData,
  normaliseYSeriesNames,
} from '../ui/charts/utilities';
import BarChartIcon from '../ui/icons/BarChartIcon';
import LineChartIcon from '../ui/icons/LineChartIcon';
import PieChartIcon from '../ui/icons/PieChartIcon';
import { parseTable } from '../utils';

const getTableViaEditor = (editorActions?: EditorActions) => {
  const sourceAdf = dataSourceResolver(editorActions);
  if (!sourceAdf) {
    return [];
  }

  return parseTable(sourceAdf as ADFNode);
};

const getColorSeries = (
  parameters: ChartParameters,
  intl: InjectedIntl,
  actions?: EditorActions,
): NestedFieldDefinition[] => {
  const table = getTableViaEditor(actions);
  const seriesOptions = createColumnNames(table, intl);

  const ySeriesNames = normaliseYSeriesNames(
    parameters.chartGroup?.dataTab?.yAxisIdxField,
  );

  const ySeriesOptions = seriesOptions.filter(
    (opt) => ySeriesNames.indexOf(opt.value) > -1,
  );

  const isPieChart = parameters.chartType === ChartTypes.PIE;
  const colData = getColData(
    table,
    Number(parameters.chartGroup?.dataTab?.xAxisIdxField || '0'),
  );

  const colDataOptions = colData.map((colDataString, idx) => ({
    value: String(idx),
    label: colDataString,
  }));

  const generateColorOption = (pieChart: boolean) => (
    {
      label,
      value,
    }: {
      label: string;
      value: string;
    },
    idx: number,
  ) =>
    ({
      type: 'color',
      label,
      name: `color-${pieChart ? 'pie' : 'linear'}-${value}`,
      defaultValue: colorSequence[idx],
      // isHidden: pieChart,
    } as ColorField);

  return (isPieChart ? colDataOptions : ySeriesOptions).map(
    generateColorOption(isPieChart),
  );
};

const dataSourceFields = (
  parameters: ChartParameters,
  intl: InjectedIntl,
  actions?: EditorActions,
): NestedFieldDefinition[] => {
  const table = getTableViaEditor(actions);
  const seriesOptions = createColumnNames(table, intl);

  // config panel doesn't like values being removed from under it
  // repro: use pie, cycle category until you get one that ovelaps with data series
  // it's missing in the data but the UI will show the old data
  // const dataSeriesWithoutXAxis = dataSeriesFromTable.filter(opt => opt.value !== parameters.chartGroup?.dataTab.xAxisIdxField)

  const isPieChart = parameters.chartType === ChartTypes.PIE;

  return [
    {
      name: 'xAxisIdxField',
      type: 'enum',
      style: 'select',
      isMultiple: false,
      defaultValue: '0', // number as string
      items: seriesOptions,
      label: isPieChart
        ? intl.formatMessage(i18n.categoryName)
        : intl.formatMessage(i18n.xAxisSeriesName),
    },
    {
      name: 'yAxisIdxField',
      type: 'enum',
      style: 'select',
      isMultiple: !isPieChart,
      label: intl.formatMessage(i18n.seriesNames),
      items: seriesOptions,
    },
  ];
};

export const uiFields = (intl: InjectedIntl, actions?: EditorActions) => (
  parameters: any,
): FieldDefinition[] => {
  const dataFields = dataSourceFields(parameters, intl, actions);

  // absolutely broken
  // should also not depend on recalculating the same shit
  const colorFields = getColorSeries(parameters, intl, actions);

  return [
    {
      name: 'chartType',
      type: 'enum',
      style: 'select',
      isMultiple: false,
      defaultValue: DEFAULT_CHART_TYPE,
      items: [
        {
          label: intl.formatMessage(i18n.chartTypeBar),
          value: ChartTypes.BAR,
          icon: <BarChartIcon />,
        },
        {
          label: intl.formatMessage(i18n.chartTypeLine),
          value: ChartTypes.LINE,
          icon: <LineChartIcon />,
        },
        {
          label: intl.formatMessage(i18n.chartTypePie),
          value: ChartTypes.PIE,
          icon: <PieChartIcon />,
        },
      ],

      label: intl.formatMessage(i18n.chartTypeField),
    },
    {
      type: 'tab-group',
      label: '',
      name: 'chartGroup',
      defaultTab: intl.formatMessage(i18n.dataTabTitle),
      fields: [
        {
          type: 'tab',
          name: 'dataTab',
          label: intl.formatMessage(i18n.dataTabTitle),
          fields: [
            ...dataFields,
            {
              name: 'aggregateData',
              type: 'boolean',
              defaultValue: parameters.chartGroup?.dataTab?.aggregateData,
              label: intl.formatMessage(i18n.aggregateData),
              style: 'toggle',
              description: intl.formatMessage(i18n.aggregateDataDescription),
            },
          ],
        },
        {
          type: 'tab',
          name: 'customizeTab',
          label: intl.formatMessage(i18n.customizeTabTitle),
          fields: [
            {
              name: 'styleField',
              type: 'expand',
              label: intl.formatMessage(i18n.styleExpand),
              fields: [
                {
                  name: 'height',
                  type: 'enum',
                  label: intl.formatMessage(i18n.heightField),
                  style: 'select',
                  defaultValue: '350',
                  items: [
                    {
                      value: '150',
                      label: intl.formatMessage(i18n.small),
                    },
                    {
                      value: '350',
                      label: intl.formatMessage(i18n.medium),
                    },
                    {
                      value: '550',
                      label: intl.formatMessage(i18n.large),
                    },
                  ],
                },

                ...colorFields,

                {
                  name: 'showPoints',
                  type: 'boolean',
                  label: intl.formatMessage(i18n.showPoints),
                  style: 'toggle',
                  isHidden: parameters.chartType !== ChartTypes.LINE,
                },
                {
                  name: 'smooth',
                  type: 'boolean',
                  label: intl.formatMessage(i18n.smoothLines),
                  style: 'toggle',
                  isHidden: parameters.chartType !== ChartTypes.LINE,
                },

                {
                  name: 'orientation',
                  type: 'enum',
                  label: intl.formatMessage(i18n.orientationLabel),
                  style: 'select',
                  defaultValue: 'vertical',
                  isHidden: parameters.chartType === ChartTypes.PIE,

                  items: [
                    {
                      label: intl.formatMessage(i18n.verticalOrientation),
                      value: 'vertical',
                    },
                    {
                      label: intl.formatMessage(i18n.horizontalOrientation),
                      value: 'horizontal',
                    },
                  ],
                },
              ],
            },

            {
              name: 'titlesField',
              type: 'expand',
              label: intl.formatMessage(i18n.titleExpand),
              fields: [
                {
                  name: 'chartTitle',
                  type: 'string',
                  placeholder:
                    parameters.chartGroup?.customizeTab?.titlesField
                      ?.chartTitle,
                  label: intl.formatMessage(i18n.chartTitle),
                },
                {
                  name: 'yLabel',
                  type: 'string',
                  placeholder:
                    parameters.chartGroup?.customizeTab?.titlesField?.yLabel,
                  label: intl.formatMessage(i18n.yLabel),
                  isHidden: parameters.chartType === ChartTypes.PIE,
                },
              ],
            },

            {
              name: 'legendField',
              type: 'expand',
              label: intl.formatMessage(i18n.legendExpand),
              fields: [
                {
                  name: 'showLegend',
                  type: 'boolean',
                  label: intl.formatMessage(i18n.showLegend),
                  style: 'toggle',
                },

                {
                  name: 'legendPosition',
                  type: 'enum',
                  style: 'select',
                  isMultiple: false,
                  defaultValue: DEFAULT_LEGEND_POSITION,
                  items: [
                    {
                      label: intl.formatMessage(i18n.legendAuto),
                      value: UserLegendPosition.AUTO,
                    },
                    {
                      label: intl.formatMessage(i18n.legendTop),
                      value: UserLegendPosition.TOP,
                    },
                    {
                      label: intl.formatMessage(i18n.legendLeft),
                      value: UserLegendPosition.LEFT,
                    },
                    {
                      label: intl.formatMessage(i18n.legendRight),
                      value: UserLegendPosition.RIGHT,
                    },
                    {
                      label: intl.formatMessage(i18n.legendBottom),
                      value: UserLegendPosition.BOTTOM,
                    },
                  ],
                  label: intl.formatMessage(i18n.legendPosition),
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};
