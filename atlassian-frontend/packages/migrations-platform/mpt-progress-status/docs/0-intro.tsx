import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import PartiallyCompleteExample from '../examples/02-partially-complete';

export default md`
  ${(
    <>
      <div style={{ marginBottom: '0.5rem' }}>
        <AtlassianInternalWarning />
      </div>
    </>
  )}

  ## Usage

  ${code`import ProgressStatus from '@atlassian/mpt-progress-status';`}

  ${(
    <Example
      packageName="@atlassian/mpt-progress-status"
      Component={() => <PartiallyCompleteExample />}
      title="Partially complete"
      source={require('!!raw-loader!../examples/02-partially-complete')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/mpt-progress-status')}
    />
  )}
`;
