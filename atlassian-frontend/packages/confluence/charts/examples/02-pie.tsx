import React from 'react';

import { IntlProvider } from 'react-intl';

import { ReactRenderer as Renderer } from '@atlaskit/renderer';

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
          <h1>Raw table</h1>
          <Renderer
            document={{
              type: 'doc',
              version: 1,
              content: [ExampleTable],
            }}
          />
        </section>
        <section>
          <h1>Pie</h1>
          <h3>Default with auto labels</h3>
          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: true,
                xAxisIdxField: '0',
                yAxisIdxField: '1',
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
                  legendPosition: LegendPosition.AUTO,
                  showLegend: true,
                },
              },
            }}
            chartType={ChartTypes.PIE}
          />

          <h3>Constrained with auto labels</h3>
          <div style={{ width: 500 }}>
            <Chart
              testId="charts"
              data={ExampleTable}
              animated={false}
              chartGroup={{
                dataTab: {
                  aggregateData: true,
                  xAxisIdxField: '0',
                  yAxisIdxField: '1',
                },
                customizeTab: {
                  styleField: {
                    height: 500,
                    smooth: false,
                    showPoints: false,
                    orientation: Orientation.HORIZONTAL,
                  },
                  titlesField: { chartTitle: '', yLabel: 'With a Y axis' },
                  legendField: {
                    legendPosition: LegendPosition.AUTO,
                    showLegend: true,
                  },
                },
              }}
              chartType={ChartTypes.PIE}
            />

            <h3>Constrained with top labels</h3>
            <div style={{ width: 500 }}>
              <Chart
                testId="charts"
                data={ExampleTable}
                animated={false}
                chartGroup={{
                  dataTab: {
                    aggregateData: true,
                    xAxisIdxField: '0',
                    yAxisIdxField: '1',
                  },
                  customizeTab: {
                    styleField: {
                      height: 500,
                      smooth: false,
                      showPoints: false,
                      orientation: Orientation.HORIZONTAL,
                    },
                    titlesField: {
                      chartTitle: 'Example title',
                      yLabel: 'With a Y axis',
                    },
                    legendField: {
                      legendPosition: LegendPosition.TOP,
                      showLegend: true,
                    },
                  },
                }}
                chartType={ChartTypes.PIE}
              />
            </div>
          </div>
        </section>
      </div>
    </IntlProvider>
  );
}
