import React from 'react';

import { Example, md } from '@atlaskit/docs';

import CreateEventChannelExample from '../examples/0-create-event-channel';
import CreateTransformerChannelExample from '../examples/1-create-transformer-event-channel';
import CombiningListenersExample from '../examples/2-combining-listeners';
import TransformingMultipleChannelsExample from '../examples/3-transforming-multiple-channels';

const CreateEventChannelExampleSource = require('!!raw-loader!../examples/0-create-event-channel');
const CreateTransformerChannelExampleSource = require('!!raw-loader!../examples/1-create-transformer-event-channel');
const CombiningListenersExampleSource = require('!!raw-loader!../examples/2-combining-listeners');
const TransformingMultipleChannelsExampleSource = require('!!raw-loader!../examples/3-transforming-multiple-channels');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-events-core-react" {...props} />
);

export default md`
This package is designed for those who:
- Want a light weight API for bubbling events up the React component tree
- Want good TypeScript definitions for those bubbled events

## Dispatching and listening to events

The most basic use case is to dispatch and then listen to events.
You can do this by creating a \`useEventDispatch\`-\`Listener\` pair. We call this pair an "event channel".

${(
  <WrappedExample
    Component={CreateEventChannelExample}
    title="Create event channel"
    source={CreateEventChannelExampleSource}
  />
)}

The \`Listener\` will only listen to events fired by the \`useEventDispatch\` hook from the same event channel.

We may provide utility functions to do this easily. Ping the package owners if you're interested.

From here on onward, we describe utility methods - You can technically do everything listed below what's returned from \`createEventChannel\` which is what they use internally.

## Transforming events

You can transform events too:

${(
  <WrappedExample
    Component={CreateTransformerChannelExample}
    title="Create transformer event channel"
    source={CreateTransformerChannelExampleSource}
  />
)}

Transforming the event in this way will dispatch a the transformed event using the dispatch hook you pass into \`createTransformer\`.
If you're changing the shape of the paylload, we recommend dispatching to a new event channel as it prevents the risk of transformed events breaking the [Liskov substition principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
in the original event channel's listeners.

## Combining listeners

\`combineListeners\` let's you combine multiple listeners for convinience:

${(
  <WrappedExample
    Component={CombiningListenersExample}
    title="Combining listeners"
    source={CombiningListenersExampleSource}
  />
)}

## Transforming multiple event channels at once

You can transform multiple listeners at once if need you need to:

${(
  <WrappedExample
    Component={TransformingMultipleChannelsExample}
    title="Transforming multiple APIs"
    source={TransformingMultipleChannelsExampleSource}
  />
)}
`;
