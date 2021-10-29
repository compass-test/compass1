# react/no-clone-element

> Do not use `React.cloneElement` or `cloneElement`. Use render props and React context instead to ensure components are resilient to API changes and differing requirements over time.

## Rationale

Use render props and React context instead of `cloneElement` because `cloneElement`:

- Implicitly pass props: https://reactjs.org/docs/react-api.html#cloneelement.

- Relies on the API of the component not changing.

- Blocks intermediate components from being able to be used without "forwarding" props from them.

## How the rule works

The rule tests for calls to functions with the naming scheme `React.cloneElement` or `cloneElement`.

The rule does not check for imports of `cloneElement`, to allow easier override of the rule in cases where such calls are necessary.

The rule does not have options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/no-clone-element: "error" */
import React from 'react';

function InvalidComponent(props) {
  return React.cloneElement(props.editView, { ref: {}, focus: true });
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/no-clone-element: "error" */
import React, { cloneElement } from 'react';

function InvalidComponent(props) {
  return cloneElement(props.editView, { ref: {}, focus: true });
}
```

👍 Example of **correct** code for this rule:

```js
import React from 'react';

function ValidComponent(props) {
  return props.view({ ref: {}, focus: true });
}
```
