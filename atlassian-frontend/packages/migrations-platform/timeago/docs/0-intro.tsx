import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

const BasicExample = require('../examples/00-timeago-recent').default;

const timeAgoProps = require('!!extract-react-types-loader!../extract-react-types/timeago.tsx');

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

  ${code`import TimeAgo from '@atlassian/mpt-timeago';`}

  ${(
    <Example
      packageName="@atlaskit/contextual-survey"
      Component={() => <BasicExample height="500px" />}
      title="Basic example"
      source={require('!!raw-loader!../examples/00-timeago-recent')}
    />
  )}

  ${(<Props props={timeAgoProps} />)}
`;
