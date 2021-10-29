import React from 'react';

import { IntlProvider } from 'react-intl';

import { ExampleTable } from '../example-helpers/example-table';
import {
  Chart,
  ChartTypes,
  UserLegendPosition as LegendPosition,
  Orientation,
} from '../src';

export default function Basic() {
  return (
    <IntlProvider locale="en">
      <div style={{ width: 1200 }}>
        <section>
          <h1>Legend positioning</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Chart
                testId="charts"
                data={ExampleTable}
                animated={false}
                chartGroup={{
                  dataTab: {
                    aggregateData: false,
                    xAxisIdxField: '0',
                    yAxisIdxField: ['1', '2', '3'],
                  },
                  customizeTab: {
                    styleField: {
                      height: 350,
                      smooth: false,
                      showPoints: false,
                      orientation: Orientation.HORIZONTAL,
                    },
                    titlesField: {
                      chartTitle: 'Example title',
                      yLabel: 'With a Y axis',
                    },
                    legendField: {
                      legendPosition: LegendPosition.LEFT,
                      showLegend: true,
                    },
                  },
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Chart
                testId="charts"
                data={ExampleTable}
                animated={false}
                chartGroup={{
                  dataTab: {
                    aggregateData: false,
                    xAxisIdxField: '0',
                    yAxisIdxField: ['1', '2', '3'],
                  },
                  customizeTab: {
                    styleField: {
                      height: 350,
                      smooth: false,
                      showPoints: false,
                      orientation: Orientation.HORIZONTAL,
                    },
                    titlesField: {
                      chartTitle: 'Example title',
                      yLabel: 'With a Y axis',
                    },
                    legendField: {
                      legendPosition: LegendPosition.RIGHT,
                      showLegend: true,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Chart
                testId="charts"
                data={ExampleTable}
                animated={false}
                chartGroup={{
                  dataTab: {
                    aggregateData: true,
                    xAxisIdxField: '0',
                    yAxisIdxField: ['1', '2', '3'],
                  },
                  customizeTab: {
                    styleField: {
                      height: 350,
                      smooth: false,
                      showPoints: false,
                      orientation: Orientation.VERTICAL,
                    },
                    titlesField: { chartTitle: 'An example title', yLabel: '' },
                    legendField: {
                      legendPosition: LegendPosition.TOP,
                      showLegend: true,
                    },
                  },
                }}
                chartType={ChartTypes.BAR}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Chart
                testId="charts"
                data={ExampleTable}
                animated={false}
                chartGroup={{
                  dataTab: {
                    aggregateData: true,
                    xAxisIdxField: '0',
                    yAxisIdxField: ['1', '2', '3'],
                  },
                  customizeTab: {
                    styleField: {
                      height: 350,
                      smooth: false,
                      showPoints: false,
                      orientation: Orientation.VERTICAL,
                    },
                    titlesField: { chartTitle: 'An example title', yLabel: '' },
                    legendField: {
                      legendPosition: LegendPosition.BOTTOM,
                      showLegend: true,
                    },
                  },
                }}
                chartType={ChartTypes.BAR}
              />
            </div>
          </div>
        </section>
        <section>
          <h1>Select single data series from table</h1>
          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: ['1'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                  orientation: Orientation.HORIZONTAL,
                },
                titlesField: { chartTitle: '', yLabel: 'With a Y axis' },
                legendField: {
                  legendPosition: LegendPosition.BOTTOM,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.BAR}
          />
        </section>
        <section>
          <h1>Orientation</h1>
          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: ['1', '2', '3'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                  orientation: Orientation.HORIZONTAL,
                },
                titlesField: { chartTitle: '', yLabel: 'With a Y axis' },
                legendField: {
                  legendPosition: LegendPosition.BOTTOM,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.BAR}
          />
          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: ['1', '2', '3'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                  orientation: Orientation.HORIZONTAL,
                },
                titlesField: { chartTitle: '', yLabel: 'With a Y axis' },
                legendField: {
                  legendPosition: LegendPosition.BOTTOM,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.LINE}
          />

          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: ['1', '2', '3'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                  orientation: Orientation.VERTICAL,
                },
                titlesField: { chartTitle: '', yLabel: 'With a Y axis' },
                legendField: {
                  legendPosition: LegendPosition.BOTTOM,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.BAR}
          />

          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: ['1', '2', '3'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                  orientation: Orientation.VERTICAL,
                },
                titlesField: {
                  chartTitle: 'Example title',
                  yLabel: 'With a Y axis',
                },
                legendField: {
                  legendPosition: LegendPosition.BOTTOM,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.BAR}
          />
        </section>
      </div>
    </IntlProvider>
  );
}
