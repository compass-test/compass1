import React from 'react';
import {
  md,
  code,
  AtlassianInternalWarning,
  DevPreviewWarning,
  Example,
} from '@atlaskit/docs';

export default md`
${(
  <>
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <DevPreviewWarning />
    </div>
  </>
)}

# React Experiment Framework

This framework helps to build React experiments by providing the \`useExperiment()\`
hook to build a single object called **experiment scope**.

You build the contents of the scope by passing plugins as arguments to \`useExperiment()\`.
Plugins can enrich the scope with things like:
- methods to fire analytics (provided by \`usePluginAnalytics()\`),
- feature flag information (\`usePluginMultivariateFeatureFlag()\`),
- special cohorting logic (\`usePluginResolver()\`),
- behavior (e.g. \`usePluginAutoExposureEvent()\`).

Plugins form a **pipeline**. The result of each plugin is merged with results
of plugins that are "upstream": are passed as preceding arguments to \`useExperiment()\`.
Plugins that are passed as subsequent arguments ("downstream") see everything
that was added to the pipeline up to that point. Treat plugins like hooks —
no fancy conditionals around them.

Once built, experiment scope can be used in any product component, as a set
of helpers for your experiment.

## General Architecture
This version of the React Experiment Framework uses a Microkernel Architecture.
\`useExperiment()\` forms most of the relatively small core.

Most of the functionality is provided by the plugins. Some plugins can be
portable: written once, they work in all products.
Other plugins cannot be implemented portably: feature flags or analytics
are done differently across products. The framework can still define
this functionality with what we call **abstract plugins**.

Abstract plugins define portable TypeScript APIs and can include helpers
useful for implementing the APIs (we call these helpers **delegates**),
but in the end, abstract plugins have to be implemented in each product separately.

Plugins can depend on other plugins. Such dependencies are defined in
and guarded by TypeScript types, so TypeScript support is crucial for
safe development using the framework.
Relying on TypeScript interfaces makes it possible for portable plugins
to even depend on abstract plugins.

## Contents
- [Introduction](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/intro)
- [How to use the framework for your experiment](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/how-to-use)
- [The useExperiment hook and Pipeline](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)
- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)

## Usage

In the example below we conditionally replace a component based on a feature flag, as well as provide
a way to send analytics events for the experiment.

${code`
// inside product
import { usePluginAnalytics, usePluginMultiVariateFlag } from '@confluence/experiment-framework';

export const ToolbarWithExperiment = () => {
  // this is how we can define an experiment
  const sampleExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(
      'product.invite-experiment',
      ['experiment', 'control', 'not-enrolled'],
      'not-enrolled',
    ),
  );

  const onClick = () => {
    // .analytics is provided by useAnalytics() plugin
    sampleExperiment.analytics.sendUIEvent({
      actionSubjectId: 'inviteButton',
      actionSubject: 'button',
      action: 'clicked',
    });
  };

  return (
    // .cohort is provided by useFeatureFlag plugin
    sampleExperiment.cohort === 'experiment' ?
      <ExperimentComponent onClick={onClick} /> :
      <OriginalComponent />
  );
};
`}

In our example, we used \`sampleExperiment.analytics\` to send analytcs events, this is injected to our scope by
our \`usePluginAnalytics()\` plugin on line \`7\`. Similarly we used \`sampleExperiment.cohort\` to retrieve the value
of our feature flag, this is provided by the \`usePluginMultivariateFeatureFlag()\` plugin passed to \`useExperiment()\`
on line \`8\`.

Every plugin will provide different props, some of them will also provide different effect.
Such as \`usePluginAutoFireExposureEvent()\`, which will trigger feature exposed events depending on the \`.cohort\` provided by \`.usePluginMultivariateFeatureFlag()\`

${(
  <Example
    packageName="@atlassian/experimental-react-experiment-framework-2"
    Component={require('../examples/00-basic').default}
    title="Basic Example"
    source={require('!!raw-loader!../examples/00-basic')}
  />
)}

## Concepts

### The \`useExperiment()\` Hook

The \`useExperiment()\` hook is used to create an experiment object by going through all the plugins
passed as parameters one after the other, passing the current state of the scope from each plugin to the next.
The object passed between the plugins, representing the transient value of the scope, can be referred to as the pipeline.
The resulting pipeline created by the last plugin, is then returned by \`useExperiment()\`,
which we now refer to as the experiment scope.

Some plugins may depend on other plugins or for attributes to be present on the pipeline.
For example, \`usePluginEnglishOnly()\` depends on the \`.language\` attribute injected
by \`usePluginLanguage\`. The framework has support for types to allow for flagging this during compile time.

\`useExperiment()\` can also accept functions instead of plugins. The pipeline is passed as a parameter to this
function and any object returned by the function is merged to the pipeline object to be passed to the next plugin
or returned as the experiment scope.

${code`
const myExperiment = useExperiment(
  usePluginLanguage(), // adds '.language' attribute to the pipeline
  pipeline => ({
    isAustralianEnglish: pipeline.language === 'en-AU',
    foo: 42,
  }),
);

// myExperiment = {
//   language: 'en-AU',
//   isAustralianEnglish: true,
//   foo: 42,
// }
`}

More information about \`useExperiment()\` can be found here:
- [The useExperiment() hook](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)

### Plugins

Plugins are meant to see and extend the experiment pipeline or in some cases perform actions
based on the pipeline's state (e.g. \`usePluginAutoExposureEvent()\`).

The different plugins can be thought of as different building blocks to provide attributes and
functionality to your experiment. You can use a variety of different plugins for example to
retrieve the value of a feature flag using \`usePluginMultivariateFlag()\` or get the current
language in use via \`usePluginLanguage()\`.

More information about plugins can be found here:
- [What are Plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)

`;
