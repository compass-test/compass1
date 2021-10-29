import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import PlanCreationFormBasic from '../examples/07-plan-creation-form-basic';

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

  ## Overview

  Plan creation form for configuring migration name and destination

  ## Usage
  ${code`import { PlanCreationForm } from '@atlassian/mpt-plan-configuration';`}

  ## Examples
  ${(
    <Example
      title="Basic example"
      packageName="@atlassian/mpt-plan-configuration"
      Component={PlanCreationFormBasic}
      source={require('!!raw-loader!../examples/07-plan-creation-form-basic')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/plan-creation-form.tsx')}
    />
  )}
`;
