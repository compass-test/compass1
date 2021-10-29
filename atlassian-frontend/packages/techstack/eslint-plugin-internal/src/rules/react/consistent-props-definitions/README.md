# react/consistent-props-definitions

Ensure consistency for all defined props to improve usability when consuming the components.

## Rationale

Using components that have similar but different props results in a confusing experience.

## How the rule works

This rule uses the `@eslint-typescript` parser to get the types of a component to then make checks against.
This works with all interfaces and types.

### Blocking props

👎 Example of **incorrect** code for this rule:

```js
{
  blockList: [
    {
      name: 'theme',
    },
  ],
}
```

```tsx
interface MyComponentProps {
  theme: boolean;
  ^--- error: Use of the "theme" prop is not allowed.
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```

👍 Example of **correct** code for this rule:

```tsx
interface MyComponentProps {
  isEnabled: boolean;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```

## Ensuring props are optional

👎 Example of **incorrect** code for this rule:

```js
{
  ensureOptional: [
    {
      name: 'testId',
    },
  ],
}
```

```tsx
interface MyComponentProps {
  testId: string;
  ^--- error: The "testId" prop should be marked as optional.
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```

👍 Example of **correct** code for this rule:

```tsx
interface MyComponentProps {
  testId?: string;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```

## Ensuring props are required

👎 Example of **incorrect** code for this rule:

```js
{
  ensureRequired: [
    {
      name: 'label',
    },
  ],
}
```

```tsx
interface MyComponentProps {
  label?: string;
  ^--- error: The "label" prop should be marked as required.
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```

👍 Example of **correct** code for this rule:

```tsx
interface MyComponentProps {
  label?: string;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
```
