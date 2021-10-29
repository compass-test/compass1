import { serviceUrl, ENVIRONMENT } from '../../../../src/server/constants';

import type { Status } from '../announce';

const DASHBOARD_URL = serviceUrl(ENVIRONMENT.PROD);
const PF_URL = 'https://product-fabric.atlassian.net/wiki/home';
const DOCS_URL =
  'https://hello.atlassian.net/wiki/spaces/AFP/pages/908932565/Development+-+Daily+Routine#Keeping-builds-green';

/*
You can experiment with the message payload using Slack's
Block Kit Builder here: https://go.atlassian.com/pf-slack-msg
*/
export function getMessagePayload(status: Status) {
  if (status === 'OPERATIONAL') {
    return `:successful: <${PF_URL}|Product Fabric> is *UP TO DATE*!\n
Consult the _Product Fabric Status_ section on the <${DASHBOARD_URL}|Releases Dashboard> for details.\n
> *Release Manager*:\n> Please _inform_ teams that it's *safe* to blitz test again. :raised_hands:`;
  }

  return `:failed: <${PF_URL}|Product Fabric> is *STALE*!\n
Consult the _Product Fabric Status_ section on the <${DASHBOARD_URL}|Releases Dashboard> for details.\n
> *Release Manager*:\n> <${DOCS_URL}|Troubleshoot> the problem and collaborate to resolve the situation. :crytime:\n>
> Please _inform_ teams as they *may wish to postpone* their blitz sessions until it's back up to date. The dashboard's _'Behind by N merged pull requests'_ count, and the deployed commit's _'N days ago'_ can be used to make their decision.`;
}
