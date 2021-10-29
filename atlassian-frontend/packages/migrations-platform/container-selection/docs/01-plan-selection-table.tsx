import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import PlanSelectionTableUnselected from '../examples/00-plan-selection-table-unselected';

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

  Display plan selection table

  ## Usage
  ${code`import { PlanSelectionTable } from '@atlassian/mpt-container-selection';`}

  ## Examples
  ${(
    <Example
      Component={PlanSelectionTableUnselected}
      title="Plan selection table unselected"
      packageName="@atlassian/mpt-container-selection"
      source={require('!!raw-loader!../examples/00-plan-selection-table-unselected')}
    />
  )}
  
  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/plan-selection-table.tsx')}
    />
  )}
  
  `;
