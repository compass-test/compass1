import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

export default md`
${(
  <>
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <DevPreviewWarning />
    </div>
  </>
)}

## Intro

The Invite Component ensures a consistent, minimum friction invite experience for customers.

Behind the scenes, the Invite Component relies on identity's [Invite](https://id-public-api-facade.staging.atl-paas.net/api-explorer/#/default/post_invitations_invite) and [Invitation Capabilities](https://id-public-api-facade.staging.atl-paas.net/api-explorer/#/default/get_invitations_capabilities). If the user and the instance access settings allow, an invite will be sent to the new user, otherwise a request access will be created.

## Dashboards

- [Amplitude](https://analytics.amplitude.com/atlassian/dashboard/dbmm36r)
- [Splunk](https://splunk.paas-inf.net/en-GB/app/search/invite_people_component)
- [SLO for the core experience](https://tome.prod.atl-paas.net/slo/49d022e0-1744-4097-986d-c592beb25aab)

## Contribution guide

If you're looking intro integrating the invite component in a new touchpoint or if you are interested in contribute with it, please check our [Guide for teams](https://hello.atlassian.net/wiki/spaces/PGT/pages/1020658529/User%2BCollab%2BDesign%2BCore%2BInvites%2BGuide%2Bfor%2Bteams).

## Experimental features

Since it’s rollout there have been a fair few experiments/productionsations which have happened and heaps more in the pipeline. Please, make sure to check the [Core Invites: Engineering Guild](https://hello.atlassian.net/wiki/spaces/PGT/pages/1050906304/Core+Invites+Engineering+Guild) to know more about current features.

## Usage

Usage examples can be found at \`examples/storybook\` directory. Please, check the \`src/types.ts\` for a list of props the InvitePeople expects/accepts.


  ${code`import InvitePeople from '@atlassian/invite-people;`}

  ${(
    <Example
      packageName="@atlassian/invite-people"
      Component={require('../examples/00-default').default}
      title="Example"
      source={require('!!raw-loader!../examples/00-default')}
    />
  )}

  ${(
    <Props
      heading="Component Props"
      props={require('!!extract-react-types-loader!../src/components/InvitePeople/InvitePeople')}
    />
  )}

`;
