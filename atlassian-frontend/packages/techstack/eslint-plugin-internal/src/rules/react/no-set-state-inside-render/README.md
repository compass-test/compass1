# react/no-set-state-inside-render

> Do not call setState inside of React class component render function.

## Rationale

Calling setState inside of the render function of a React class component can cause double renders and reduced performance

## How the rule works

The rule tests for calls to setState inside of the render function of a class component, ignoring calls to setState inside of the return statement.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/no-set-state-inside-render: "error" */

class InvalidComponent extends React.Component {
  // ...

  render() {
    this.setState({ state: true });
  }
}
```

👍 Example of **correct** code for this rule:

```js
class ValidComponent extends React.Component {
  // ...

  render() {
    return (
      <button
        onClick={() => {
          this.setState({ state: true });
        }}
      />
    );
  }
}
```
