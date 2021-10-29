import React from 'react';

import { IntlProvider } from 'react-intl';

import { ExampleTable } from '../example-helpers/example-table';
import { Chart } from '../src';

export default function Basic() {
  return (
    <IntlProvider locale="en">
      <div>
        <section>
          <h1>Missing data</h1>
          <Chart testId="charts" data={null} />
        </section>
        <section>
          <h1>Unsupported data</h1>
          <Chart
            testId="charts"
            data={ExampleTable}
            animated={false}
            chartGroup={{
              dataTab: {
                aggregateData: false,
                xAxisIdxField: '0',
                yAxisIdxField: ['0', '1', '2', '3'],
              },
              customizeTab: {
                styleField: {
                  height: 350,
                  smooth: false,
                  showPoints: false,
                },
                titlesField: {
                  chartTitle: 'Example title',
                  yLabel: 'With a Y axis',
                },
                legendField: {
                  showLegend: true,
                },
              },
            }}
          />
        </section>
      </div>
    </IntlProvider>
  );
}
