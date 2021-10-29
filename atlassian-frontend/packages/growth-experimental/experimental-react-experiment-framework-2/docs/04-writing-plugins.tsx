import { md, code } from '@atlaskit/docs';

export default md`
# How to write plugins

## Basic Plugin Example

Below is example of a simple plugin that adds the passed parameter as \`foo\` to the experiment scope object.

${code`
  import { ExperimentCore } from '@atlassian/experimental-react-experiment-framework-2/types';

  type ReturnType = {
    foo: string
  };

  export const usePluginExample = <
    Upstream extends ExperimentCore,
  >(
    newFooValue: string
  ) =>
    function useExample(pipeline: Upstream): Upstream & ReturnType {
      return {
        ...pipeline,
        foo: newFooValue
      };
    };

  // this can be used in useExperient like:
  // usePluginExample(42)
  // and will return an expiriment scope equivalent to
  // { foo: 42 }
`}

  At its simplest form, plugins are functions that return a function that accept a pipeline object. This inner function returns a new object to be merged with the existing pipeline.

  Plugins follow the convention of React hooks and are prefixed with the \`use\` keyword.

## Implementing abstract plugins

Example implemtation for analytics plugin. Here we are assuming getAnalyticsClient() returns the client's analytics client object.

${code`
import { ExperimentCore } from '@atlassian/experimental-react-experiment-framework-2/types';

export const usePluginAnalytics = <Upstream extends ExperimentCore>() =>
  function useAnalytics(pipeline: Upstream) {
    const productImplementation = {
      sendScreenEvent: (event: AnalyticsScreenEvent) =>
        getAnalyticsClient().sendScreenEvent(event),
      sendUIEvent: (event: AnalyticsEvent) =>
        getAnalyticsClient().sendUIEvent(event),
      sendTrackEvent: (event: AnalyticsEvent) =>
        getAnalyticsClient().sendTrackEvent(event),
      sendOperationalEvent: (event: AnalyticsEvent) =>
        getAnalyticsClient().sendOperationalEvent(event),
    };

    // call useDelegateAnalytics here and pass our product specific implementations
    // useDelegateAnalytics will inject fireExperimentError for us
    return useDelegateAnalytics(productImplementation)(pipeline);
  };
`}

  Type definitions are provided by the library in \`/abstract\` which defines the shape that the framework expects for the plugins.
  Delegate functions are also provided that will create the plugin functions in the share required for you.

  More Examples implementations for the abstract plugins can be found in \`/examples/_support/mock-product\`

## Portable Plugins

  Consider opening a pull request to include your plugin to the library if you think your plugin can be useful in other projects or experiments.

  ## More information

  - [Introduction](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/intro)
  - [How to use the framework for your experiment](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/how-to-use)
  - [The useExperiment hook and Pipeline](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)
  - [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
  - [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)
`;
