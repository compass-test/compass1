import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import CloudSiteFieldSelectBasic from '../examples/05-cloud-site-field-select-basic';

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

  # CloudSiteFieldSelect

  This component is one of the two migration field select variants, one for **cloud site** and the other one for **Bitbucket workspace**.

  You can also use the underlying composition components if you have different requirements than the built-in two variants.

  ${code`
// Use the ready made component for cloud site
import { CloudSiteFieldSelect } from '@atlassian/mpt-plan-configuration';

// Use the underlying composition components
import {
  MigrationFieldSelect,
  MigrationButtonGroup,
  ChoiceButton,
  TrialButton
} from '@atlassian/mpt-plan-configuration';
  `}

  ${(
    <Example
      title="CloudSiteFieldSelect example"
      packageName="@atlassian/mpt-plan-configuration"
      Component={CloudSiteFieldSelectBasic}
      source={require('!!raw-loader!../examples/05-cloud-site-field-select-basic')}
    />
  )}

  ${(
    <Props
      heading="CloudSiteFieldSelect Props"
      props={require('!!extract-react-types-loader!../extract-react-types/cloud-site-field-select.tsx')}
    />
  )}
`;
