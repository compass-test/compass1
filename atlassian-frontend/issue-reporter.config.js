const {
  DefaultAtlassianPackageData,
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require('@atlassian/code-evolution-issue-reporter');
const path = require('path');

const teamsPath = path.join(__dirname, 'teams.json');
const packageData = new DefaultAtlassianPackageData(teamsPath);

module.exports = {
  jira: {
    host: 'https://jdog.jira-dev.com/',
    projectKey: 'ENGHEALTH',
    issueType: 'Task',
  },
  getAssigneeForFile(filePath) {
    return packageData.getAssigneeForPath(filePath);
  },
  getPackageDataForFile(filePath) {
    return packageData.getPackageDataForPath(filePath);
  },
  rules: [
    {
      ruleName: 'react-redux',
      title: 'Deprecate react-redux',
      type: 'regex',
      description:
        'Redux is deprecated in atlassian-frontend and needs to be replaced',
      fileGlob: './packages/**package.json',
      match: ['react-redux'],
      helpLink:
        'https://hello.atlassian.net/wiki/spaces/JFP/pages/1037416263/How+to+replace+react+redux',
    },
    {
      ruleName: 'react/prefer-stateless-function',
      title: 'Replace class components with functional components',
      type: 'eslint',
      description: 'Replace class components with functional components',
      helpLink:
        'https://hello.atlassian.net/wiki/spaces/JFP/pages/1037416263/How+to+rewrite+classes+to+functions',
    },
  ],
};
