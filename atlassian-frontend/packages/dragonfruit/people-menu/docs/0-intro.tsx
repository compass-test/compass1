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

## Usage
This \`PeopleMenu\` is used to render inside Navigation 3 (\`@atlaskit/atlassian-navigation\`).
\`PeopleMenu\` is backed by some service hooks \`useCollaboratorsService\` and \`useTeamsOfService\` from other package \`@atlassian/dragonfruit-people-teams\` to fetch collaborators and my-teams from services (Collaboration Graph and Legion).

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
