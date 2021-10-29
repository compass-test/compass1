# react/no-children-properties-access

> Do not access `children` properties as they are not resilient to usage at scale.

## Rationale

Accessing `children` properties might break in some cases and is not resilient to usage at scale. One case is accessing its `children` property as you can see below:

```js
function Component(props) {
  return props.children.map((node) => {
    return <div>{node.children}</div>;
  });
}

function Component2() {
  return <div>World</div>;
}

<Component>
  <Component1>Hello</Component1> //works
  <div>There</div> // works
  <Component2 /> // doesn't work!! Component2 doesn't have "children"!
</Component>
```

## How the rule works

The rule tests `children` properties access which are either destructured or accessed using object notation.
It works only with `children.map` and its inline callback.

The rule does not check for variables if `children` is assigned to them, to allow easier override of the rule in cases where such usages are necessary.

The rule does not have options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/no-children-properties-access: "error" */
import React from 'react';

function Component(props) {
  return props.children.map((node) => {
    if (node.type === 'Component2') {
      return <div>Component2</div>
    }

    return <div>Component</div>;
  });
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/no-children-properties-access: "error" */
import React from 'react';

function Component(props) {
  return props.children.map(({ type }) => {
    if (type === 'Component2') {
      return <div>Component2</div>
    }

    return <div>Component</div>;
  });
}
```

👍 Example of **correct** code for this rule:

```js
import React from 'react';

function Component(props) {
  return props.children.map((node) => <div>{node}</div>);
}
```
