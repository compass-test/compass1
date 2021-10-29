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

Currently, \`@atlassian/people-menu\` is used by top main navigation in Confluence and Jira products. It is used to render inside Navigation 3 (\`@atlaskit/atlassian-navigation\`).
It is a dropdown menu UI showing current user's collaborators and teams.

About a technical aspect, the People dropdown menu in products can have a little different HTML structure comparing to other menus in products
because it is implemented inside \`atlassian-frontend\` repo and do not share the same source code of other menus in products.
About user experience, it should match with other menus in products.

People Menu is a place for users to create a new team and invite new users into site/product.

People Menu requires a cloud-id/site-id so it is not ready to use by siteless products and org-base products

Currently, all feature flags related to People Menu in products (Confluence and Jira) are cleaned/removed.

Please look at examples/storybook of this package to see more interactive UI and take a look \`src/types.ts\` file to see props interface which you can pass to PeopleMenu component.


## Services

\`@atlassian/people-menu\` uses 2 services to fetch data

- Collaboration Graph (Slack room \`#smrt-experiences\`) is used to fetch collaborators data.
- Legion (Slack room \`#team-twp-people-teams\`) is used to fetch list of teams of current user.

In client-side we catch collaborators data in 1 minute and teams data in 5 minutes to avoid loading state and fetching services in a short time.


# Dashboards

- [Amplitude](https://analytics.amplitude.com/atlassian/dashboard/rf1mtf2)
- SLO
    + https://tome.prod.atl-paas.net/capability/e6c5e848-6dc1-4f54-9507-72aeb015e298?search=*
    + https://tome.prod.atl-paas.net/capability/96fe6506-ba64-4d87-8cbe-609851dcb6da?search=*

## Usage


${code`
import React from 'react';

import {
  AtlassianNavigation,
  PrimaryButton,
  ProductHome,
} from '@atlaskit/atlassian-navigation';
import PeopleMenu from '@atlassian/people-menu';

export function AtlassianNavExample() {
  return (
    <AtlassianNavigation
      label="people-menu-example"
      primaryItems={[
        <PrimaryButton>Issues</PrimaryButton>,
        <PeopleMenu
          product="confluence"
          cloudId="test-cloud-id"
          userId="test-user-id"
        />
      ]}
    />
  );
}
`}

 ${(
   <Example
     packageName="@atlassian/people-menu"
     Component={require('../examples/02-default-with-mocked-data').default}
     title="Basic props with mocked data"
     source={require('!!raw-loader!../examples/02-default-with-mocked-data')}
   />
 )}

${(
  <Props
    heading="Component Props"
    props={require('!!extract-react-types-loader!../src/components/PeopleMenu/PeopleMenu')}
  />
)}

`;
