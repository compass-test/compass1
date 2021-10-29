# CrossFlowIntegration

This component aims to simplify the use of Cross Flow SPA in the hosts (i.e. Jira, Confluence, etc.). The idea is that from the consumer's point of view the Cross FLow SPA is just a React component which offers an API to interact with. The whole complexity of interacting with an iframe via messages is encapsulated and hidden from the consumer. The component enforces, via TypeScript, the signatures of its methods and routes. A working example can be found in the examples folder via Storybook.

This component is designed to be used with cross-flow-frontend only, and not provide a backwards compatible API for xflow-ui.

## Storybook

`yarn storybook` in the local package folder will spin up the storybook server, and a static file server that enables us to load in the `iframe.html?id=crossflowspa--site-scoped` page from a public folder to use as our `src` attribute.

### Example of use

```javascript
import CrossFlowIntegration from '@atlassiansox/cross-flow-react';

<CrossFlowIntegration
  src="/gpa-cross-flow"
  locale="en_US"
  sourceComponent="atlassian-switcher"
  sourceContext="discover-more"
  suggestedSiteNames={['hello', 'example']}
  edition={Editions.FREE}
  targetProduct={ProductKeys.CONFLUENCE}
  originProduct={CrossFlowOriginProduct.TRELLO}
  onAnalyticsEvent={e => console.log('Analytic event:', e)}
  onError={(...e) => console.log('An error happened:', e)}
/>;
```

## Notes

In Storybook's example, the Cross Flow SPA address is provided via `src` attribute. It will not be necessary in a real case scenario when the component will default to `/gpa-cross-flow/` which is the relative path to the real Cross Flow SPA.
