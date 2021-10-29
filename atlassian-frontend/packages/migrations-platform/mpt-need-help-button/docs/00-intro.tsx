import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import WithDocumentationLink from '../examples/02-with-documentation-link';

export default md`
  ${(
    <>
      <div style={{ marginBottom: '0.5rem' }}>
        <AtlassianInternalWarning />
      </div>
    </>
  )}

  ## Usage

  ${code`import NeedHelpButton from '@atlassian/mpt-need-help-button';`}

  ${(
    <Example
      packageName="@atlassian/mpt-need-help-button"
      Component={() => <WithDocumentationLink />}
      title="With Documentation Link"
      source={require('!!raw-loader!../examples/02-with-documentation-link')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../extract-react-types/mpt-need-help-button')}
    />
  )}
`;
