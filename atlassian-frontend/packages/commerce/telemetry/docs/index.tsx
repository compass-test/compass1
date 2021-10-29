import React from 'react';

import { Example, md } from '@atlaskit/docs';

import DispatchingAndListeningToTelemetryEventsExample from '../examples/0-dispatch-and-listen-to-telemetry-events';
import UploadingInternalPackageTelemetryExample from '../examples/1-uploading-internal-package-telemetry';
import SafeGuardingAgainstVersionFragmentation from '../examples/2-safe-guarding-against-version-fragmentation';
import EasyConsumerTelemetryIntegration from '../examples/3-easy-consumer-telemetry-integration';

const DispatchingAndListeningToTelemetryEventsExampleSource = require('!!raw-loader!../examples/0-dispatch-and-listen-to-telemetry-events');
const UploadingInternalPackageTelemetryExampleSource = require('!!raw-loader!../examples/1-uploading-internal-package-telemetry');
const SafeGuardingAgainstVersionFragmentationSource = require('!!raw-loader!../examples/2-safe-guarding-against-version-fragmentation');
const EasyConsumerTelemetryIntegrationSource = require('!!raw-loader!../examples/3-easy-consumer-telemetry-integration');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-telemetry" {...props} />
);

export default md`
This package is designed for those who:
- Are Commerce devs looking to integrate with GasV3/Sentry/Metal in their packages/libraries
- Want to see how Commerce implements GasV3/Sentry/Metal integration for packages/libraries

**Note:** This package assumes you have read \`@atlassian/commerce-events-core-react\`

## What is this package?

This package is a set of event channel singletons and associated utilities for telemetry integrations that Commerce uses.
At the time of writing, this includes:
- GasV3
- Sentry
- Metal

It serves the following purposes:
- Send telemetry to health-monitoring/analytics services under the "Commerce libraries" product
- Allow consumers of packages to tap into our telemetry events

## Dispatching and listening to telemetry events

It's the same as \`@atlassian/commerce-events-core-react\` except:
- The channels are created for you already.
- You must wrap your component in \`InternalCommerceTelemetryIntegrations\`

You can access the channel hooks & listeners via specific \`import\` entrypoints.

${(
  <WrappedExample
    Component={DispatchingAndListeningToTelemetryEventsExample}
    title="Dispatching and listening to telemetry events"
    source={DispatchingAndListeningToTelemetryEventsExampleSource}
  />
)}

### Providing it-just-works integration for consumers

Consuming raw listeners can be quite verbose when you just want to send the payloads directly to GasV3/Metal/Sentry with no modification.
To provide a zero-setup/boilerplate experience for consumers, export the \`/integrations\` entryopint of this package as \`/telemetry-integration\` in the package you own.

Consumption of these integrations looks like the following:

${(
  <WrappedExample
    Component={EasyConsumerTelemetryIntegration}
    title="Consuming Commerce telemetry integrations"
    source={EasyConsumerTelemetryIntegrationSource}
  />
)}

### What is \`InternalCommerceTelemetryIntegrations\`

\`InternalCommerceTelemetryIntegrations\` is a package that uploads your telemetry to Commerce's internal telemetry services.

${(
  <WrappedExample
    Component={UploadingInternalPackageTelemetryExample}
    title="Uploading internal package telemetry"
    source={UploadingInternalPackageTelemetryExampleSource}
  />
)}


## The singleton channels are **catching**

What does catching mean? It means that they were created with \`createCatchingEventAPI\`. What this means is, if a
listener catches a dispatched event, **it will not re-dispatch the event to listeners further up the component tree**. You can
still dispatch it manually.

### Why make it catching?

It allows you to wrap packages with \`InternalCommerceTelemetryIntegrations\` multiple times without duplicating events sent to our telemetry services multiple times.

## Singleton version fragmentation problem - How to fix it

Imagine your package has a dependency that uses version \`1.0.0\` of this package but you depend on \`2.0.0\`.

In a typical setup, \`yarn\` and \`npm\` will install two sets of this package which means two sets of event channels.
You now have two sets of listeners and if you don't redispatch your dependency's events manually, the consumer of your package will
never receive the events that were being sent by your dependency's package.

You can use \`ChannelVersionFragmentationSafeGuard\` to protect against this issue. Import the listeners of your child dependencies,
pass them into the component, and wrap your child dependency components with it. The safe guard will listen to their events and
redispatch them on your version of the telemetry singleton channels.

${(
  <WrappedExample
    Component={SafeGuardingAgainstVersionFragmentation}
    title="Safe guarding against version fragmentation"
    source={SafeGuardingAgainstVersionFragmentationSource}
  />
)}

### Some alternatives and why we didn't choose them

Don't use singletons:
- Quite a lot more boilerplate code

Make \`@atlassian/commerce-telemetry\` a peer dependency:
- Forces the consumer to install a package that don't understand
- yarn/npm complains when two packages depend on different major versions

Export all Commerce packages from a mega-package, make consumers use it and then ensure version-compatibility between the mega-packages dependencies.
- We actually do this already: \`@atlassian/commerce-ui\` but relying on this exclusively removes the options mentioned below
- Removes the option to use [yarn resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) safely
- Removes the option to use packages on their own
- *Guarenteeing* version-compatibility in this way requires a lot of trust in the developer when it comes to version bumping without certain CI infrastructure & tests that don't exist at the time of writing. E.g. It's possible to rely on two different versions of a dependency in two different packages in AFP without failing CI, at the time of writing.
`;
