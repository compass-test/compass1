# react/no-class-components

> Create React components only using function components.

## Rationale

Function components allow for a cleaner way of expressing React components

Benefits of function components over class components include:

- Support for hooks, which has benefits for bundle size 🎁, flattens the react tree, and improves performance
- Doing memoization with function components is often a lot easier, improving interaction response time 🖐
- A Class component takes a fair amount of generated code to work in ES5 environments, where functions take much less
- Function components and hooks are easier to type over class components and HOCs

## How the rule works

The rule tests for the creation of a class that extends `React.Component` and `React.PureComponent`, both when extended directly (`extends Component`) and via an import of React (`extends React.Component`).

The rule does not check for imports of Component and PureComponent, to allow easier override of the rule in cases where such components are necessary.

The rule does not have options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/no-class-components: "error" */

class InvalidComponent extends React.Component {}
```

```js
/*eslint @internal/eslint-plugin-internal/react/no-class-components: "error" */
import { PureComponent } from 'react';
class InvalidComponent extends PureComponent {}
```

👍 Example of **correct** code for this rule:

```js
const ValidComponent = () => {
  //your component code here
};
```
