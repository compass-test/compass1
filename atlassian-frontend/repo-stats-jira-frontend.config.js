const path = require('path');
const fs = require('fs');

const teams = async (cwd) => {
  const teamsPath = path.join(cwd, 'teams.json');
  const teamsFile = fs.readFileSync(teamsPath);
  return Object.keys(JSON.parse(teamsFile)).length;
};

module.exports = {
  product: 'jira',
  // send analytics to prod or staging servers, default false
  prod: process.env.NODE_ENV === 'production',
  repository: 'https://stash.atlassian.com/scm/jiracloud/jira-frontend.git',
  workspaces: true,
  extras: {
    teams,
  },
};
