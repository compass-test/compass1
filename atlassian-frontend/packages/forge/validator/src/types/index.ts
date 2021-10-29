import { ForgeDoc } from '@atlassian/forge-ui-types';

export type Maybe<T> = T | null | undefined;

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export type Rule = (
  element: ForgeDoc,
  path: string[],
  moduleType?: string,
  entryPoint?: Maybe<string>,
) => ValidationResult;
