# react/consistent-types-definitions

Type name convention - avoid naming types `Props` or the name ends with `Type(s)`

## Rule Details

This rule forces type name to not end with `Type(s)` or to just be `Props`, in order to improve type naming consistency.

👍 Examples of **correct** code for this rule:

```js
// type name not end with `Type(s)`
type Size = 'small' | 'medium' | 'large';

// don't name type `Props`
type ButtonProps = { appearance?: Appearance; autoFocus?: boolean; className?: string; };
```

👎 Examples of **incorrect** code for this rule:

```js
// type name not end with `Type(s)`
type SizeType = 'small' | 'medium' | 'large';

// don't name type `Props`
type Props = { appearance?: Appearance; autoFocus?: boolean; className?: string; };
```

🔧 Automatically fix

no-type-suffix: _Use `eslint [options] [file|dir|glob] --fix` command to automatically fix_  
no-props-name: _No automatically fix offered, just use a more specific name for your type, e.g. use `ButtonProps` instead of only `Props`_

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
