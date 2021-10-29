import { defineMessages } from 'react-intl';

export const i18n = defineMessages({
  styleExpand: {
    id: 'extension.charts.style',
    defaultMessage: 'Style',
    description: 'The title of style expand inside Customize tab.',
  },
  titleExpand: {
    id: 'extension.charts.title',
    defaultMessage: 'Title',
    description: 'The title of "title" expand inside Customize tab.',
  },
  legendExpand: {
    id: 'extension.charts.legend',
    defaultMessage: 'Legend',
    description: 'The title of legend expand inside Customize tab.',
  },
  dataTabTitle: {
    id: 'extension.charts.dataTab',
    defaultMessage: 'Data',
    description:
      'The title of data tab. It appears as a heading of the Data tab in the configuration panel.',
  },
  customizeTabTitle: {
    id: 'extension.charts.customizeTab',
    defaultMessage: 'Customize',
    description:
      'The title of customize tab. It appears as a heading of the Customize tab in the configuration panel.',
  },
  aggregateData: {
    id: 'extension.charts.aggregateData',
    defaultMessage: 'Aggregate data',
    description:
      'The title of Aggregate data toggle. It appears on a toggle when switched on will aggregate data for the categories with the same name.',
  },
  aggregateDataDescription: {
    id: 'extension.charts.aggregateDataDescription',
    defaultMessage:
      'Combine values into a single data point when multiple rows have the same value.',
    description:
      'The description of Aggregate data toggle. It appears on a toggle when switched on will aggregate data for the categories with the same name.',
  },
  orientationLabel: {
    id: 'extension.charts.orientation.label',
    defaultMessage: 'Orientation',
    description:
      'Name of the dropdown that allows the user to change the orientation of a chart',
  },
  verticalOrientation: {
    id: 'extension.charts.vertical.orientation.label',
    defaultMessage: 'Vertical',
    description:
      'Name of the option that allows the user to change the orientation of a chart to vertical',
  },
  horizontalOrientation: {
    id: 'extension.charts.horizontal.orientation.label',
    defaultMessage: 'Horizontal',
    description:
      'Name of the option that allows the user to change the orientation of a chart to horizontal',
  },
  extensionTitle: {
    id: 'extension.charts.extensionTitle',
    defaultMessage: 'Chart',
    description:
      'The title of this extension. It appears as a heading in the configuration panel.',
  },

  insertChartTooltip: {
    id: 'extension.charts.insert.tooltip',
    defaultMessage: 'Insert chart',
    description:
      'Tooltip that appears while hovering a button that will insert a chart',
  },

  chartOptionsLabel: {
    id: 'extension.charts.options.label',
    defaultMessage: 'Chart options',
    description: 'Text button that lets you change settings for a chart',
  },

  chartOptionsTooltip: {
    id: 'extension.charts.options.tooltip',
    defaultMessage: 'Change chart options',
    description:
      'Tooltip that appears while hovering a button that lets you change settings for a chart',
  },

  chartTypeBar: {
    id: 'extension.charts.type.bar',
    defaultMessage: 'Bar',
    description: 'Bar type of chart',
  },

  chartTypeLine: {
    id: 'extension.charts.type.line',
    defaultMessage: 'Line',
    description: 'Line type of chart',
  },

  chartTypePie: {
    id: 'extension.charts.type.pie',
    defaultMessage: 'Pie',
    description: 'Pie type of chart',
  },

  chartTypeField: {
    id: 'extension.charts.type.fieldDescription',
    defaultMessage: 'Chart type',
    description: 'Name for the dropdown that lets you choose the chart type',
  },

  heightField: {
    id: 'extension.charts.height',
    defaultMessage: 'Plot area height',
    description: 'Field that controls the height of the chart',
  },

  showLegend: {
    id: 'extension.charts.legend.show',
    defaultMessage: 'Show legend',
    description:
      'Toggle button that controls showing and hiding a chart legend',
  },
  legendPosition: {
    id: 'extension.charts.legend.position',
    defaultMessage: 'Legend Position',
    description:
      'Name for the dropdown that lets you choose the legend position',
  },

  legendAuto: {
    id: 'extension.charts.legend.auto',
    defaultMessage: 'Auto',
    description: 'Place the legend in the best automatically given free space',
  },

  legendTop: {
    id: 'extension.charts.legend.top',
    defaultMessage: 'Top',
    description: 'Place the legend above the chart',
  },

  legendLeft: {
    id: 'extension.charts.legend.left',
    defaultMessage: 'Left',
    description: 'Place the legend to the left of the chart',
  },

  legendRight: {
    id: 'extension.charts.legend.right',
    defaultMessage: 'Right',
    description: 'Place the legend to the right of the chart',
  },

  legendBottom: {
    id: 'extension.charts.legend.bottom',
    defaultMessage: 'Bottom',
    description: 'Place the legend below the chart',
  },

  showPoints: {
    id: 'extension.charts.showPoints',
    defaultMessage: 'Show data points',
    description: 'Show the data points on the chart on top of the line',
  },

  smoothLines: {
    id: 'extension.charts.smoothLines',
    defaultMessage: 'Smooth lines',
    description: 'Smooth lines on the chart',
  },

  chartTitle: {
    id: 'extension.charts.userTitle',
    defaultMessage: 'Title',
    description: 'Title of the chart that the user can define',
  },

  yLabel: {
    id: 'extension.charts.yLabel',
    defaultMessage: 'Y-axis label',
    description: 'Text to display along the Y-axis',
  },

  xAxisSeriesName: {
    id: 'extension.charts.xAxis',
    defaultMessage: 'X-axis',
    description:
      'Select field where users choose which column represents the X-axis',
  },

  categoryName: {
    id: 'extension.charts.category',
    defaultMessage: 'Category',
    description:
      'Select field where users choose which column represents the Category for a Pie Chart',
  },

  seriesNames: {
    id: 'extension.charts.seriesNames',
    defaultMessage: 'Data series',
    description:
      'Multi-select field where users choose which data series to include in the chart',
  },

  defaultTitle: {
    id: 'extension.charts.defaultTitle',
    defaultMessage: 'Untitled chart',
    description: 'Default title for a new chart',
  },

  defaultYLabel: {
    id: 'extension.charts.defaultYLabel',
    defaultMessage: 'Untitled axis',
    description: "Default title for a new chart's Y axis label",
  },

  defaultColumnName: {
    id: 'extension.charts.defaultColumnName',
    defaultMessage: 'Column {0}',
    description: 'Default name for a column if none is specified in the table',
  },

  dataMissingTitle: {
    id: 'extension.charts.dataMissing.title',
    defaultMessage: 'No data to display',
    description:
      'Heading shown as an error to the user when the source data and the chart become disconnected/unable to be found.',
  },

  dataMissingDetails: {
    id: 'extension.charts.dataMissing.details',
    defaultMessage: 'We can’t find this chart’s source table on the page.',
    description:
      'Additional help text shown to the user when the source data and the chart become disconnected/unable to be found.',
  },

  small: {
    id: 'extension.charts.height.small',
    defaultMessage: 'Shorter',
    description: 'Short chart height',
  },

  medium: {
    id: 'extension.charts.height.medium',
    defaultMessage: 'Default',
    description: 'Medium, default, chart height',
  },

  large: {
    id: 'extension.charts.height.large',
    defaultMessage: 'Taller',
    description: 'Large chart height',
  },
});
