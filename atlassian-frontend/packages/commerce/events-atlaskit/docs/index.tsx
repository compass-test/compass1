import React from 'react';

import { Example, md } from '@atlaskit/docs';

import AtlaskitToEventChannel from '../examples/0-atlaskit-to-event-channel';
import EventChannelToAnalyticsNext from '../examples/1-event-channel-to-analytics-next';

const AtlaskitToEventChannelSource = require('!!raw-loader!../examples/0-atlaskit-to-event-channel');
const EventChannelToAnalyticsNextSource = require('!!raw-loader!../examples/1-event-channel-to-analytics-next');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-events-atlaskit" {...props} />
);

export default md`
You may want to use this package if:

- You're using Atlaskit components
- You work with \`@atlassian/commerce-events-core-react\` in your own package.

This package let's you convert \`@atlassian/commerce-events-core-react\` events to \`@atlaskit/analytics-next\` events and vice versa.

${(
  <WrappedExample
    Component={AtlaskitToEventChannel}
    title="Sending EventChannel events as Event API as Atlaskit events"
    source={AtlaskitToEventChannelSource}
  />
)}

${(
  <WrappedExample
    Component={EventChannelToAnalyticsNext}
    title="Sending Analytics Next events as Event API events"
    source={EventChannelToAnalyticsNextSource}
  />
)}
`;
