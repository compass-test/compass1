export type SearchStats = {
  /** Content to be shown on the top of tooltip. */
  label: string;
  /** Metric to be shown on the top of tooltip. */
  value: number;
};

export type SearchStatsData = SearchStats[];

export type LinearChartProps = {
  /** Height of the chart. Defaults to 300 unless otherwise specified.*/
  height?: number;
  /** Width of the chart. Defaults to 300 unless otherwise specified.*/
  width?: number;
  /** Data passed in to be represented on the chart. */
  data: SearchStatsData;
};
