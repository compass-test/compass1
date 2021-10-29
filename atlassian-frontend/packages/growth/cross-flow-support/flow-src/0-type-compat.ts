/* eslint-disable */
/* prettier-ignore */

// original TypeScript implementation
import JiraProvider from '../src/jira';

// converted from Flow declarations
import flow_JiraProvider from './generated-jira';

// let tsc check compatibility in both directions TS <-> Flow
export const assertJiraProvider: typeof JiraProvider = {} as flow_JiraProvider;
export const assertJiraProvider_rev: flow_JiraProvider = JiraProvider;
