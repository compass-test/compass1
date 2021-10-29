# react/no-state-change-inside-use-effect

> Do not call a state setter inside of useEffect.

## Rationale

Calling the state setters of a function component inside of useEffect can cause double renders and reduced performance.

## How the rule works

The rule tests for calls to functions with the naming scheme 'set\[A-Z\].\*' inside of a useEffect call.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/component/no-state-change-inside-use-effect: "error" */
import React, { useState, useEffect } from 'react';

InvalidComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count++);
  });
};
```

👍 Example of **correct** code for this rule:

```js
import React, { useState, useEffect } from 'react';

ValidComponent = () => {
  const [count, setCount] = useState(0);

  const someOtherFunction = () => {
    setCount(count++);
  };

  useEffect(() => {});
};
```
