import React from 'react';

import { code, Example, md, Props } from '@atlaskit/docs';

export default md`

Display component that has quickly copyable text

## Usage

Basic example:

${code`
import CopyableText from '@atlassian/cassi-copyable-text';

const Container = ({ text }) => (
  <CopyableText text={text} />
);
`}

which will look like:

${(
  <Example
    packageName="@atlassian/cassi-copyable-text"
    Component={require('../examples/00-basic').default}
    title="Basic example"
    source={require('!!raw-loader!../examples/00-basic')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/ui/index')}
    heading="<CopyableText /> Props"
  />
)}

## Support

Feel free to ping !disturbed in the [#help-cassi-dev](https://atlassian.slack.com/archives/CFJ904N5C) Slack channel.
Any feedback/requests-for-certain features is appreciated.
`;
