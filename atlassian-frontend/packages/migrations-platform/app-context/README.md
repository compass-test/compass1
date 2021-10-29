![Status:deprecated](https://img.shields.io/badge/-deprecated-red)

**This component is deprecated. Its usage is gradually removed from other components**

---
# MPKit App Context

This package contains context configuration for MPKit components. All information/literals might be
included here. MPKit components internally use `AppContext` to retrieve texts, urls, variables that
differ depending on the product.

## Usage

### Set context

#### AppContext

Contains constants which values depend on the product

```jsx
import { AppContext } from '@atlassian/mpt-app-context';

const App = ({ children }) => (
  <AppContext.Provider
    value={{
      cloudName: 'Confluence Cloud',
      cloudEditionNames: {
        free: 'Confluence Cloud Free',
        standard: 'Confluence Cloud Standard',
        premium: 'Confluence Cloud Premium',
      },
      feedbackCollector: {
        embeddableKey: 'XXX-XXX-XXX-XXX-XXXX',
        requestTypeId: '220',
      },
      links: {
        /* ... */
      },
    }}
  >
    <HomePage />
  </AppContext.Provider>
);
```

#### AppProvidersContext

Contains all data access objects that should be injected from each app.

```jsx
import { AppProvidersContext } from '@atlassian/mpt-app-context';
import MyStatsProvider from './StatsProvider';

const App = ({ children }) => (
  <AppProvidersContext.Provider
    value={{
      migrationStats: MyStatsProvider,
    }}
  >
    <HomePage />
  </AppProvidersContext.Provider>
);
```

### Hooks

`@atlassian/mpt-app-context` provides some hooks to accept app info.

### useConstants

```jsx
import { useConstants } from '@atlassian/mpt-app-context';

const CloudEditionName = () => {
  const {
    cloudEditionNames
  } = useConstants(); /* See AppConstants type */
  return <strong>{cloudEditionNames.free}</strong>;
};
```

### useProviders

```js
import useProviders from '@atlassian/mpt-app-context';

const useSomeProviders = () => {
  const [provider1, provider2] = useProviders(['providerKey1', 'providerKey1']);
  return { provider1, provider2 };
};
```
