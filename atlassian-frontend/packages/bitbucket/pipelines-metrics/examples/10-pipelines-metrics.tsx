import React from 'react';

import * as colors from '@atlaskit/theme/colors';

import PipelinesMetrics from '../src';
import { cpuMetrics, memoryMetrics } from '../src/common/metrics-mock';

export default () => (
  <div
    style={{
      width: 'calc(100% - 60px)',
      height: '100vh',
      background: colors.N800,
      padding: '20px',
    }}
    data-testid="metrics"
  >
    <PipelinesMetrics
      metrics={memoryMetrics}
      chartType="Memory"
      limits={{
        build: 1024,
        docker: 4096,
        mysql: 3072,
      }}
      containerStates={{
        build: 'error' as any,
        docker: 'warning' as any,
      }}
    />
    <br />
    <PipelinesMetrics
      metrics={cpuMetrics}
      chartType="CPU"
      limits={{
        build: 1000,
        docker: 1000,
        mysql: 1000,
        nginx: 1000,
      }}
      containerStates={{
        mysql: 'error' as any,
        nginx: 'warning' as any,
      }}
    />
  </div>
);
