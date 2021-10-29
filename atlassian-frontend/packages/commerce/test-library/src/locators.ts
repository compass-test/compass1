/* eslint-disable import/no-extraneous-dependencies */
import { BoundFunctions, NormalizerFn, queries } from '@testing-library/dom';

interface FindByOptions {
  exact?: boolean;
}

interface FindByTextOptions extends FindByOptions {
  selector?: string;
  normalizer?: NormalizerFn;
}

interface RoleOptions {
  exact?: boolean;
  hidden?: boolean;
  name?: string | RegExp;
  selected?: boolean;
  checked?: boolean;
  pressed?: boolean;
  expanded?: boolean;
  level?: number;
}

interface byRole {
  role: string | RegExp;
  options: RoleOptions;
}

type Locator = 'text' | 'testId' | 'labelText' | 'role';

export type Scope = HTMLElement | BoundFunctions<typeof queries>;

export type FindBy = {
  by: Locator;
  value: string | RegExp;
  options?: FindByTextOptions | RoleOptions | FindByOptions;
};

export const byText = (
  text: string | RegExp,
  options: FindByTextOptions = { selector: '*', exact: true },
): FindBy => ({
  by: 'text',
  value: text,
  options: options,
});

export const byRole = (
  text: string | RegExp,
  options?: RoleOptions,
): FindBy => ({
  by: 'role',
  value: text,
  options: options,
});

export const byLabelText = (
  text: string | RegExp,
  options: FindByTextOptions = { selector: '*', exact: true },
): FindBy => ({
  by: 'labelText',
  value: text,
  options: options,
});

export const byTestId = (
  text: string | RegExp,
  options: FindByOptions = { exact: true },
): FindBy => ({
  by: 'testId',
  value: text,
  options: options,
});
