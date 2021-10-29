import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import SelectedContainersCountOneSelectedOfOne from '../examples/02-selected-containers-count-one-selected-of-one';
import SelectedContainersCountMultipleSelectedOfMultiple from '../examples/03-selected-containers-count-multiple-selected-of-multiple';
import SelectedContainersCountNoneSelected from '../examples/04-selected-containers-count-none-selected';

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
  ${code`import { SelectedContainersCount } from '@atlassian/mpt-container-selection';`}

  ## Examples
  ${(
    <Example
      Component={SelectedContainersCountOneSelectedOfOne}
      title="One container selected out of one total"
      packageName="@atlassian/mpt-container-selection"
      source={require('!!raw-loader!../examples/02-selected-containers-count-one-selected-of-one')}
    />
  )}

  ${(
    <Example
      Component={SelectedContainersCountMultipleSelectedOfMultiple}
      title="Multiple containers selected out of multiple total"
      packageName="@atlassian/mpt-container-selection"
      source={require('!!raw-loader!../examples/03-selected-containers-count-multiple-selected-of-multiple')}
    />
  )}
  
  ${(
    <Example
      Component={SelectedContainersCountNoneSelected}
      title="No containers selected"
      packageName="@atlassian/mpt-container-selection"
      source={require('!!raw-loader!../examples/04-selected-containers-count-none-selected')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/selected-containers-count.tsx')}
    />
  )}
  
  `;
