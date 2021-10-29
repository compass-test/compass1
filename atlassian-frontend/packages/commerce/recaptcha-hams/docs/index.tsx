import React from 'react';

import { Example, md } from '@atlaskit/docs';

import GettingStartedExample from '../examples/0-getting-started';

const GettingStartedExampleSource = require('!!raw-loader!../examples/0-getting-started');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-recaptcha-hams" {...props} />
);

export default md`
# Why would you want to use this?

- You have issues with bots attacking your web page
- You don't have a backend for frontend
- Your app talks directly to HAMS (or HAMS exposes the vulnrable endpoint publically).
If this is not the case, you may want to look at the [base](https://statlas.prod.atl-paas.net/atlassian-frontend/master#/packages/commerce/recaptcha-base)
or the [CCP (WIP)](https://statlas.prod.atl-paas.net/atlassian-frontend/master#/packages/commerce/recaptcha-ccp) package

# Prerequisites

It's worth reading documentation from the [base package](https://statlas.prod.atl-paas.net/atlassian-frontend/master#/packages/commerce/recaptcha-base) first.

# Do you really need to use this package?

This package is designed for webapps where the backend that **needs** to do reCAPTCHA is HAMS.

This is only the case when the endpoints in HAMS are exposed publicly.
If this is not the case, handling reCAPTCHA in a edge/backend-for-frontend service instead.

# Integration

You will need to commuicate with the [HAMS core team](https://atlassian.slack.com/archives/CQALT63LP) about the endpoint you would like to protect against bots.

If they agree to add reCATPCHA validation to the endpoint, they'll make a new endpoint for the "operation" your endpoint performs. The name of this operation is something you will need to agree with with the HAMS core team as well.
The operation name is important because it is a parameter for the reCAPTCHA hooks provided by this package.

See the following example:

${(
  <WrappedExample
    Component={GettingStartedExample}
    title="Getting started with reCAPTCHA"
    source={GettingStartedExampleSource}
  />
)}

The operation used in this example is used for the \`/processOrderWithCreditCard\` endpoint used by Shopping Cart.

# Supplementary links

The following links may be useful if you are interested in how reCAPTCHA has been implemented for products in the past:
- [The initial credit card Shopping Cart HAMS reCATPCHA tech overview page](https://hello.atlassian.net/wiki/spaces/~261604415/pages/1169536418/Hams+Captcha+Tech+Implementation+Overview)
- [Discussions for implementing reCAPTCHA in BUX](https://hello.atlassian.net/wiki/spaces/ASachdev/pages/1263678951/Recaptcha+implementation+in+BUX?focusedCommentId=1265267595#comment-1265267595)
- [https://atlassian.slack.com/archives/C0209LFLLPK](#captcha-implementation). A channel that was used for integration reCAPTCHA for Shopping Cart and Bitbucket Cloud.
`;
