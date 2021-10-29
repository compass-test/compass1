# Dragonfruit Routes

This package contains helper functions for working with routes and URL parameters.

## Examples

```ts
import { routes } from '@atlassian/dragonfruit-routes';

const [{}, { push }] = useRouter();

// Go to sttings page
push(routes.SETTINGS());

// Go to component homepage
// Component ARI will be automatically encoded for you
push(routes.COMPONENT_DETAILS(component.id));

// Go to component sub-page
push(
  routes.COMPONENT_DETAILS(
    component.id,
    ComponentDetailPageUrlParam.DEPENDENCIES,
  ),
);
```

You can also use this package when defining routes

```ts
const routes = [
  {
    name: 'SETTINGS',
    path: routes.SETTINGS(),
    exact: true,
    component,
  },
  {
    name: 'COMPONENT_DETAILS',
    //  `false` indicates that we don't want the ':componentAri' to be URL encoded
    path: routes.COMPONENT_DETAILS(':componentAri', ':componentPage?', false),
    exact: true,
    component,
  },
];
```

By using this package you could easily and consistently change the URLs throughout the entire app.
