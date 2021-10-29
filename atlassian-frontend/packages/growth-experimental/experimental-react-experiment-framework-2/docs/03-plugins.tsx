import { md } from '@atlaskit/docs';

export default md`
# What are Plugins

Plugins are used to enrich the experiment scope object by extending it with fields or add some behaviour.

The plugins are applied in the order that they are passed to the useExperiment() Hook. Plugins that are mentioned later can see everything that was added by the preceeding plugins.

There are two types of plugins; abstract plugins and portable plugins.
Abstract plugins are plugins that depend on a functionality implemented by a product. While Portable plugins provide functionality that can be implemented once and run in all products.

The different plugins can be thought of as different building blocks to provide attributes and functionality to your experiment. You can use a variety of different plugins for example to retrieve the value of a feature flag using \`usePluginMultivariateFlag()\` or get the current language in use via \`usePluginLanguage()\`.

### Implementations

Portable plugins can be imported from:

\`@atlassian/experimental-react-experiment-framework-2/plugins\`

Implementations for abstract plugins can be found in their respective product:

- Confluence: [@confluence/experiment-framework](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/browse/next/packages/experiment-framework)
- Jira: TBA

A list of plugins and their API can be viewed from:

- [Plugins](https://hello.atlassian.net/wiki/spaces/PGT/pages/774997139/RXF+-+Plugins)

## Helpers

Helpers serve as utility functions often used to process the pipeline attributes into a format that
plugins can use. E.g. MarkNotEnrolled() can be used together with the usePluginResolver() to return an object of type ExperimentResolution.

Helpers can be imported from:
\`@atlassian/experimental-react-experiment-framework-2/helpers\`

## Abstract Plugins

Abstract plugins wrap functionality that is product specific in to a defined plugin API in order for the framework to consume them in a similar manner across different products. Type definitions to help implement abstract plugins inside your products are provided by the library. Delegate functions are also present to help share logic across diferent implementations.

Examples implementations for the abstract plugins can be found in \`/examples/_support/mock-product\`.

More references on how to write your own plugins can be found here:

- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)\

## Portable plugins

Portable plugins provide functionality that can be reused across different products without having to be reimplemented. These can range from plugins that extend the experiment scope, such as usePluginExtend(), to plugins that provide side effects, like usePluginAutoExposureEvent(). Some plugins can depend on attributes to be present on the pipeline, these are enforced via Typescript.

More references on how to write your own plugins can be found here:

- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)\

## More information

- [Introduction](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/intro)
- [How to use the framework for your experiment](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/how-to-use)
- [The useExperiment hook and Pipeline](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)
- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)
`;
