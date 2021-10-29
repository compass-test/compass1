import React from 'react';

import { Example, md } from '@atlaskit/docs';

import BasicExample from '../examples/0-basic-example';
import MonitoringAndAnalyticsExample from '../examples/1-monitoring-and-analytics-integration';

const BasicExampleSource = require('!!raw-loader!../examples/0-basic-example');
const MonitoringAndAnalyticsExampleSource = require('!!raw-loader!../examples/1-monitoring-and-analytics-integration');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-credit-card-hams" {...props} />
);

export default md`
If you're reading this you are:
- Interested in finding out more about some of the extra features the Commerce's credit card package provides that aren't documented elsewhere.
- A Commerce developer looking to consume this package
- Actually meant to go read documentation for [@atlassian/commerce-credit-card-hams](https://atlaskit.atlassian.com/packages/commerce/commerce-credit-card-hams) or [@atlassian/commerce-credit-card-ccp](https://atlaskit.atlassian.com/packages/commerce/commerce-credit-card-ccp) instead.

## Quick start

${(
  <WrappedExample
    Component={BasicExample}
    title="A basic example of using the CC package"
    source={BasicExampleSource}
  />
)}

## Monitoring and Analytics

We provide listener components that will let you listen to monitoring and analytics events which you can then send via
[@atlassiansox/metal-client](https://developer.atlassian.com/platform/metal/) and [@atlassiansox/analytics-web-client](https://hello.atlassian.net/wiki/spaces/ANALYTICS/pages/780700891/GASv3+Marketing+Analytics+Tracking) respectively.

${(
  <WrappedExample
    Component={MonitoringAndAnalyticsExample}
    title="Adding monitoring and analytics listeners"
    source={MonitoringAndAnalyticsExampleSource}
  />
)}

### SignalFX dashboards

If you submit the monitoring events directly to [@atlassiansox/metal-client](https://developer.atlassian.com/platform/metal/) then you can [mirror](https://docs.signalfx.com/en/latest/dashboards/dashboard-mirrors.html) Commerce's own dashboards for the credit card.
Doing so will provide you with a monitoring dashboard with monitoring for the CC package in your own product that's maintained by Commerce itself (via mirroring).

[Click this link to see view the dashboard](https://atlassian.signalfx.com/#/dashboard/EcNH77MA0AA) and mirror it. Make sure to set the product to your own product.

## Questions/Queries

**I have a question that isn't answered here**

Feel free to ping !disturbed in the [Supernova channel on Slack](https://atlassian.slack.com/archives/CFJ904N5C).
Any feedback/requests-for-certain features is appreciated.

Don't forget to mention that this page took you there!
`;
