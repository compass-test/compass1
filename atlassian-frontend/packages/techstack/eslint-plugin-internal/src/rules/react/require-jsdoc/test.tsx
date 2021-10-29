// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-class-components', rule, {
  valid: [
    `
export const ICON_COLOR = N90;
    `,
    `
export const AVATAR_SIZES = {};
        `,
    `
export const getLinkProps = () => {};
        `,
    `
export default function utilFunction() {}

export function anotherFunction() {}
        `,
    `
/**
 * Use hook description.
 */
export function useHook() {}

/**
 * Use hook description.
 */
export default function useAnotherHook() {}
      `,
    `
/**
 * Component description
 */
const ComponentName = () => {}

export default ComponentName;
        `,
    `
/**
 * Component description
 */
export const ComponentName = memo(() => {});
        `,

    {
      code: `
export const AVATAR_SIZES = {};
              `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
export const getLinkProps = () => {};
              `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
export default function utilFunction() {}

export function anotherFunction() {}
            `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
/**
 * Use hook description.
 */
export function useHook() {}
            `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
/**
 * Component description
 */
const ComponentName = () => {}

export default ComponentName;
            `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
/**
 * Component description
 */
export const ComponentName = memo(() => {});
        `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
  invalid: [
    {
      code: `
export function useHook() {}

export function useAnotherHook() {}
          `,
      output: `
// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useHook() {}

// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useAnotherHook() {}
          `,
      errors: [
        {
          messageId: 'missingHookJsdoc',
        },
        {
          messageId: 'missingHookJsdoc',
        },
      ],
    },
    {
      code: `
// An inline comment
export function useHook() {}
          `,
      output: `
// An inline comment
// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useHook() {}
          `,
      errors: [
        {
          messageId: 'missingHookJsdoc',
        },
      ],
    },
    {
      code: `
const ComponentName = () => {}
export default ComponentName;
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
const ComponentName = () => {}
export default ComponentName;
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },
    {
      code: `
const ComponentName = memo(() => {});
export default ComponentName;
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
const ComponentName = memo(() => {});
export default ComponentName;
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },
    {
      code: `
export const ComponentName = memo(() => {});
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
export const ComponentName = memo(() => {});
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },

    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `
export function useHook() {}

export function useAnotherHook() {}
          `,
      output: `
// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useHook() {}

// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useAnotherHook() {}
          `,
      errors: [
        {
          messageId: 'missingHookJsdoc',
        },
        {
          messageId: 'missingHookJsdoc',
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `
// An inline comment
export function useHook() {}
          `,
      output: `
// An inline comment
// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
export function useHook() {}
          `,
      errors: [
        {
          messageId: 'missingHookJsdoc',
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `
const ComponentName = () => {}
export default ComponentName;
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
const ComponentName = () => {}
export default ComponentName;
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `
const ComponentName = memo(() => {});
export default ComponentName;
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
const ComponentName = memo(() => {});
export default ComponentName;
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },
    {
      parser: require.resolve('@typescript-eslint/parser'),
      code: `
export const ComponentName = memo(() => {});
              `,
      output: `
// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __Component name__
 *
 * A component name {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
export const ComponentName = memo(() => {});
              `,
      errors: [
        {
          messageId: 'missingComponentJsdoc',
        },
      ],
    },
  ],
});
