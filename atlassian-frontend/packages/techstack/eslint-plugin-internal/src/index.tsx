import { join } from 'path';

// @ts-expect-error
import { getRules } from '@atlassian/eslint-utils';

export const rules = getRules(join(__dirname, 'rules'));

export const configs = {};
