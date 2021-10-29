# react/lifecycle-method-arg-naming

> Enforces parameter names of React lifecycle methods to be consistent with official documentation.

Enforces that parameters of React lifecycle methods are given the correct names, as per official
documentation.

The following lifecycle method arguments are enforced:

- `componentDidUpdate(prevProps, prevState, snapshot)`
- `getSnapshotBeforeUpdate(prevProps, prevState)`
- `shouldComponentUpdate(nextProps, nextState)`

## Rationale

This is important as some lifecycle methods compare props and state from the past, or the immediate
future, and the parameter name describes which situation we are in (for example 'nextProps',
'prevProps').

Enforcing consistent naming prevents bugs caused by arguments being used incorrectly due to a wrong
name, e.g. `prevProps` instead of `nextProps`.

## Options

This rule has no options.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
/* eslint tangerine/react/lifecycle-method-arg-naming: "error" */

class MyComp extends Component {
  componentDidUpdate(prevState, prevProps) {}
}
```

```js
/* eslint tangerine/react/lifecycle-method-arg-naming: "error" */

class MyComp extends Component {
  shouldComponentUpdate(p, s) {}
}
```

👍 Examples of **correct** code for this rule:

```js
/* eslint tangerine/react/lifecycle-method-arg-naming: "error" */

class MyComp extends Component {
  componentDidUpdate(prevProps, prevState) {}
}
```

```js
/* eslint tangerine/react/lifecycle-method-arg-naming: "error" */

class MyComp extends Component {
  shouldComponentUpdate(nextProps, nextState) {}
}
```
