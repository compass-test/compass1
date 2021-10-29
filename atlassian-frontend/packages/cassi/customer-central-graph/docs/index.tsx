import React from 'react';

import { code, DevPreviewWarning, md } from '@atlaskit/docs';
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

## Purpose

Provides reusable graph components that have immediate access to the data powered by the Customer Central Graph.

## Prerequisites

To facilitate immediate integration with the Customer Central Graph, your application must:
* if used within the CASSI application (as app or component), you are good to go!
* else:
    * be authenticated via SLAUTH [(go/slauth)](http://go/slauth)
    * have the __\`window.__env__\`__ variable set with the \`micros environment\` (prod, prod-east, production)
    * Currently must be allowlisted for CORS, this *may* change.

## Usage

There are three basic ways to use the Customer Central Graph:
1. \`CustomerCentralProvider\`
2. \`CustomerCentralGraph\`
2. \`CustomerCentralGraphUrl\`


## CustomerCentralProvider

Passthrough to ApolloProvider, allowing consumers to enclose applications or components in a pre-made provider.

${code`
import { CustomerCentralProvider } from '@atlassian/customer-central-graph';

const Application = () => (
  <CustomerCentralProvider>
    // Components that can via Customer Central via whatever preferred Apollo tool
  </CustomerCentralProvider>
);
`}

## CustomerCentralGraphClient

Provides direct access to the graph client if additional configuration needs to be made.

${code`
import { CustomerCentralGraphClient } from '@atlassian/customer-central-graph';

const Application = () => (
    const cache = CustomerCentralGraphClient.cache;
    // update the cache however you want

    <ApolloProvider client={CustomerCentralGraphClient}>
        // Components that can via Customer Central via whatever preferred Apollo tool
    </ApolloProvider>
);
`}

## CustomerCentralGraphUrl

If you prefer not to use Apollo for Graph integration, this package will give applications the url based on conditions being met. If it is a component or application within CASSI, it will return a relative path. Else the library will check your application for a global \`__env__\` variable to determine to use the Staging or Production graph.

${code`
import { CustomerCentralGraphUrl } from '@atlassian/customer-central-graph';

const Application = () => (
    // abstract representation of what you can do
    const results = fetch(CustomerCentralGraphUrl, query);
);
`}

## Support
Feel free to ping !disturbed in the [#help-cassi-dev](https://atlassian.slack.com/archives/C0187TF1JCD) Slack channel.
Any feedback/requests-for-certain features is appreciated.
`;
