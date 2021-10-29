import React from 'react';

import { shallow } from 'enzyme';

import MetricsTooltip from '../../MetricsTooltip';

describe('MetricsTooltip component', () => {
  it('should render formatted tooltip', () => {
    const component = shallow(
      <MetricsTooltip
        chartType="Memory"
        unit="MB"
        limits={{
          build: 200,
          docker: 100,
        }}
        visibleMetrics={{
          build: true,
          docker: true,
        }}
        payload={[
          {
            payload: {
              timestamp: '2020-06-03T00:59:57Z',
              values: {
                docker: 0.1,
                build: 0.2,
              },
            },
          },
        ]}
        active
      />,
    );
    expect(component.html()).toEqual(
      expect.stringMatching(
        /limit: 300 MB(.*)docker:(.*)10\/100 MB(.*)build:(.*)40\/200 MB/,
      ),
    );
  });

  it('should not render formatted tooltip values for NaN', () => {
    const component = shallow(
      <MetricsTooltip
        chartType="Memory"
        unit="MB"
        limits={{
          build: 200,
          docker: 100,
          sql: 100,
        }}
        visibleMetrics={{
          build: true,
          docker: true,
          sql: true,
        }}
        payload={[
          {
            payload: {
              timestamp: '2020-06-03T00:59:57Z',
              values: {
                docker: 0.1,
                build: 0.2,
                sql: NaN,
              },
            },
          },
        ]}
        active
      />,
    );
    expect(component.html()).toEqual(
      expect.stringMatching(
        /limit: 400 MB(.*)docker:(.*)10\/100 MB(.*)build:(.*)40\/200 MB/,
      ),
    );
  });
});
