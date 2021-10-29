// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

const kebabRuleOption = {
  test: '.*',
  shouldMatch: '^[a-z0-9-./]+$',
  message: 'Expect file name to be kebab-case',
};

const tsRuleOption = {
  test: '^.*\\.ts$',
  shouldMatch: '^.*\\.tsx$',
  message: 'Expect ts files to be tsx',
};

const makeTestCase = (filename: string, option: any, isValid: boolean) => ({
  code: '',
  options: [[option]],
  filename,
  ...(isValid
    ? {}
    : {
        errors: [
          {
            message: option.message,
          },
        ],
      }),
});

ruleTester.run('fs/filename-pattern-match', rule, {
  valid: [
    makeTestCase('kebab-case.ts', kebabRuleOption, true),
    makeTestCase('__test__/server-side-hydrate.tsx', kebabRuleOption, true),
    makeTestCase('kebab-case.tsx', tsRuleOption, true),
  ],
  invalid: [
    makeTestCase('CamelCase.ts', kebabRuleOption, false),
    makeTestCase('CamelCase.ts', tsRuleOption, false),
  ],
});
