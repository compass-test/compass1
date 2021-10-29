import React from 'react';

import { code, DevPreviewWarning, Example, md } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

export default md`

${(
  <>
    <div style={{ marginBottom: '0.5rem' }}>
      <SectionMessage
        title="Note: This component is designed for internal Atlassian IT Applications."
        appearance="warning"
      >
        <p>These components are only available to Internal Atlassians.</p>
        <p>Do not use in externally facing product code.</p>
      </SectionMessage>
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <DevPreviewWarning />
    </div>
  </>
)}

Display relevant billing information (Invoice, refund, Quote etc..)

## Prerequisites

To facilitate immediate integration with the CASSI Graph, your application must:
* be authenticated via SLAUTH [(go/slauth)](http://go/slauth)
* have the __\`window.__env__\`__ variable set with the __\`MICROS_ENV\`__
* Currently must be allowlisted for CORS, this *may* change.

## Usage

Basic example for showing the team.

${code`
import BillingDocument from '@atlassian/billing-document';

const Container = ({ domain }) => (
  <BillingDocument id={001-123-123-1234}/>
);
`}

which will look like:

${(
  <Example
    packageName="@atlassian/cassi-salesforce-account-team"
    Component={require('../examples/00-invoice').default}
    title="Basic example"
    source={require('!!raw-loader!../examples/00-invoice')}
  />
)}


## Support

Feel free to ping !disturbed in the [#help-cassi-dev](https://atlassian.slack.com/archives/CFJ904N5C) Slack channel.
Any feedback/requests-for-certain features is appreciated.
`;
