export const jiraTransitionMap = {
  PLANNED: '11',
  DEVELOPMENT: '21',
  STABILISING: '41',
  RELEASED_TO_NPM: '51',
  ADOPTED_BY_ONE_PRODUCT: '61',
  ADOPTED_BY_ALL_PRODUCTS: '31',
};
export type JiraTransitionMap = keyof typeof jiraTransitionMap;

export const jiraCustomFieldMap = {
  RELEASE_RC_CUT_DATE: 'customfield_12301',
  // TODO: add back when other Jira transitions added.
  // RELEASE_RC_START_DATE: undefined,
  // RELEASE_RC_DUE_DATE: undefined,
  // RELEASE_RC_DATE_RELEASED: undefined,
};
export type JiraCustomFieldMap = keyof typeof jiraCustomFieldMap;

export const JIRA_INSTANCE_URL = 'https://product-fabric.atlassian.net';
export const JIRA_API_URL = `${JIRA_INSTANCE_URL}/rest/api/3`;
