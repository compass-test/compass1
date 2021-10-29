import { md, code } from '@atlaskit/docs';

export default md`
# The useExperiment() Hook and Pipeline

## Example

${code`
  const sampleExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginLanguage(),
    usePluginResolver(pipeline => {
      if (!pipeline.language.startsWith('en')) {
        return {
          cohort: 'not-enrolled',
          ineligibilityReasons: ['notEnglish'],
        };
      }
    }),
    usePluginAutoExposureEvent(),
  );
`}


## useExperiment()

The \`useExperiment()\` hook returns an experiment object, often referred to as the pipeline. This object can be used to reperesent our experiment, providing functionalities such as retrieving the feature flag, cohorting, or sending analytics events.

To add these functionalities to the experiment object we pass plugins as arguments to the hook. These plugins can then enrich the experiment extend it with fields, or add some behaviour.

The plugins are applied left to right (or top to bottom). Plugins that are mentioned later can see everything that was added by the preceding plugins. That’s why the callback passed to usePluginResolver sees .language on the pipeline – the language has been provided by the usePluginLanguage() plugin.

## Types support

The framework is built using Typescript and exports the appropriate types via \`@atlassian/experimental-react-experiment-framework-2/types\`. The useExperiment() hook will complain if a plugin requires an attribute that is not present at the time the plugin is called. In the example above, try commenting out \`usePluginAnalytics()\` and \`usePluginAutoExposureEvent()\` should complain for missing attributes.

## Extending the Pipline

It is fairly easy to inject your own attributes to the pipeline via the usePluginExtend() plugin. It accepts both an object, to immediately merge with the pipeline or a function whose return is merged to the pipeline. An async equivalent is also present with usePluginAsyncExtendOnce().

${code`
  const myExperiment = useExperiment(
    usePluginExtend({
      answer: 42,
    }),
    usePluginExtend(pipeline => ({
      doubled: pipeline.answer * 2
    })),
  );

  // myExperiment = {
  //   answer: 42,
  //   doubled: 84,
  // }
`}

More information about plugins
- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)

## Error Handling

By default, errors that occur while plugins are being applied will be rethrown.
It is possible to set an error handler function that will get called if an error is thrown via the usePluginSetErrorHandler() plugin. Similar to other plugins, it is also applied in sequential order, so it is possible to have different error handlers depending on where you are in the pipeline. To add another error handler instead of replacing the existing one you can use usePluginAddErrorHandler(). This can be useful if you want to trigger a callback but also throw the error.

Some plugins will inject error handlers for your convenience. For example, usePluginAnalytics() will fire an analytics event if an error occurs.

## Contents
- [Introduction](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/intro)
- [How to use the framework for your experiment](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/how-to-use)
- [The useExperiment hook and Pipeline](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)
- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)

`;
