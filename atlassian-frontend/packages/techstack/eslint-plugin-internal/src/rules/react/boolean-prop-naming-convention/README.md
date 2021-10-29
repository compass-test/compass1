# react/boolean-prop-naming-convention

Ensures `boolean` props found in any interface or type that ends in `Props`, and are not `kebab-case`, are consistently named.

## Limitations

If you define your props inside a custom type such as `type MyBooleanType = boolean` this rule will not know about it.

## Examples

👎 Example of **incorrect** code for this rule:

```js
interface ButtonProps {
  disabled: boolean | undefined | null;
  ^^^^^^^^ error: should be prefixed with is/has/should
}
```

👍 Example of **correct** code for this rule:

```js
interface ButtonProps {
  isDisabled: boolean;
}
```

```js
interface ButtonProps {
  'aria-hidden': boolean;
}
```
