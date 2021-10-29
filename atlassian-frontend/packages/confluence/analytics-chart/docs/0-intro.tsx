import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

This chart component is designed to represent data over a duration of time.

## Usage

${code`import { AnalyticsChart } from '@atlaskit/analytics-chart';`}


${(
  <Example
    packageName="@atlaskit/analytics-chart"
    Component={require('../examples/00-linear-chart').default}
    title="Basic Linear Chart"
    source={require('!!raw-loader!../examples/00-linear-chart')}
  />
)}

When there is only one value in the data, it is represented as a single point.

${(
  <Example
    packageName="@atlaskit/analytics-chart"
    Component={require('../examples/01-linear-chart-one-value').default}
    title="Single Value Chart"
    source={require('!!raw-loader!../examples/01-linear-chart-one-value')}
  />
)}

The max value of the data is what determines the y-axis. In this case, zero is
the max as represented in the graph below.

${(
  <Example
    packageName="@atlaskit/analytics-chart"
    Component={require('../examples/02-linear-chart-all-zeros').default}
    title="All Zeros Chart"
    source={require('!!raw-loader!../examples/02-linear-chart-all-zeros')}
  />
)}

${(
  <Props
    heading="Analytics Chart Props"
    props={require('!!extract-react-types-loader!../src/ui/analytics-chart/index')}
  />
)}

`;
