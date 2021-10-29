import React from 'react';

import { AtlassianInternalWarning, code, md, Props } from '@atlaskit/docs';

const inferedProps = require('!!extract-react-types-loader!../src/ui');

export default md`
  ${(<AtlassianInternalWarning />)}

  ## About

  Team Work component displays the most recent Jira issues assigned
  to a particular team.

  ## Usage

  TeamWork allows three ways of checking for Jira availability through two
  _mutually exclusive_ props, and two service hooks that work in conjunction
  with \`jiraAvailable\` prop.

  ### Details

  1. If you're sure that Jira is available on your domain simply manually set
     \`jiraAvailable\` prop to true.

     ${code`
<TeamWork teamId={teamId} jiraAvailable />
      `}

  2. Provide \`cloudId\` prop and the component will make the check for you.
     While the easiest way to get started the downside here is that the
     Jira check request will be made on every render.

     ${code`
<TeamWork teamId={teamId} cloudId={cloudId} />
      `}

  3. Use \`useJiraCheckService\` or \`useLazyJiraCheckService\` hooks in your
     App initalisation and then pass the fetched value to \`jiraAvailable\`.

     ${code`
const { isJiraAvailable } = useJiraCheckService(cloudId);

<TeamWork teamId={teamId} jiraAvailable={isJiraAvailable} />
      `}

     This method is preferred for any Apps that need the check made as it can
     be structured so that the Jira check request is made only once on App init.

  ${(<Props heading="Props" props={inferedProps} />)}
`;
