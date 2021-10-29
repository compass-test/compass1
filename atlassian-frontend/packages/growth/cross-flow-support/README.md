# `@atlassiansox/cross-flow-support`

Component to expose the CrossFlow api via a provider in product.

- If you are looking to implement cross-flow in a package external to product, please look at `@atlassiansox/cross-flow-external-support` (TBD).
- If you are interested in utilising this package, please reach out to Growth via slack [#cross-flow-essentials](https://atlassian.slack.com/archives/CPDQ16K9D)

## ⚠️ Important note on versioning

`@atlassiansox/cross-flow-api-internals` is an integral part of Cross Flow Support library.
Changes made to it should _almost always_ lead to a dependency update in `@atlassiansox/cross-flow-support` and as a result a patch-bump of the latter.
To do this please select `@atlassiansox/cross-flow-support` for a patch (or higher) release when running `bolt changeset`

## Usage

```js
import CrossFlowProvider from "@atlassiansox/cross-flow-support/confluence";

// In the high level of the tree render the provider
const AppBase = () => {
    ...

    return (
        <OtherProviders>
            <CrossFlowProvider
                cloudId={cloudId}
                analyticsClient={analyticsWebClient}
                locale={locale}
            >
                <RestOfApp />
            </CrossFlowProvider>
        </OtherProviders>
    );
}
```

### Usage for Interactive Touchpoints

For touchpoints activated through direct user interaction, such as clicks on menu items or buttons, the imperative API
should be used to check if crossFlow is enabled and open the cross flow journey.

```js
import {
  useCrossFlow,
  Journeys,
  Targets,
} from '@atlassiansox/cross-flow-support';

const TouchpointButton = () => {
  const crossflow = useCrossFlow();
  return (
    // Mandatory to check if is enabled otherwise api property is undefined
    crossflow.isEnabled ? (
      <Button
        onClick={async () => {
          const { success } = await crossflow.api.open({
            targetProduct: Targets.JIRA_SOFTWARE,
            sourceComponent: 'touchpointSpecialPage', // unique indentifier for touchpoint
            sourceContext: 'confluence',
            journey: Journeys.GET_STARTED,
          });
          console.log(success); // Handle completion status
        }}
      >
        Try now!
      </Button>
    ) : null
  );
};
```

### Usage for Non-Interactive Loading

For non-interactive usage where the cross flow journey should open without direct user interaction, the `CrossFlowConsumer`
component will ensure crossFlow is enabled and open the cross flow journey immediately after rendering. The props are identical to the options supported by imperative API, with the addition of optional `onComplete` and `onError` callbacks.

The `onComplete` callback is called with the same completion status that the imperative API would have resolved with.

The `onError` callback is called with any value that the imperative API would have rejected with.

If crossFlow is not enabled, this component does nothing and no callbacks are invoked.

```js
import {
  CrossFlowConsumer,
  Journeys,
  Targets,
} from '@atlassiansox/cross-flow-support';

<CrossFlowConsumer
  targetProduct={Targets.JIRA_SOFTWARE},
  sourceComponent='touchpointSpecialPage',
  sourceContext='confluence',
  journey={Journeys.GET_STARTED}

  onComplete={status => {
    // Handle completion status
  }}

  onError={(error) => {
    // Handle error
  }}
/>
```

## Flow support

Flow type declarations live in `flow-src` and to be **maintained manually**, please update them and respective tests to
sync with original TS sources.

### How we ensure Flow <-> TS compatibility

By converting Flow into TS using `@khanacademy/flow-to-ts` converter then letting `tsc` check types compatibility. This
sets few restrictions to what TS features we can use and how.

Known restrictions:

1. Don't use - `Enums`, use `object as const` notation instead, they are not supported by Flow, so no way to make a
   deterministic conversion.

## Local development

To test your changes in this package locally on products code base such as Jira Frontend, refer to [this example on Hello](https://hello.atlassian.net/wiki/spaces/PGT/pages/841297643/Improvement+on+Pages+-+Dev+loop#Local-link-with-products).

There are several methods for doing this, check out the [Atlassian Frontend docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/build/02-local-linking-with-products/) for the latest instruction. However, the first example was proven to be working.
