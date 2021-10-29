import React from 'react';

import { Example, md } from '@atlaskit/docs';

import HAMSExample from '../examples/0-minimal-implementation';

const HAMSExampleSource = require('!!raw-loader!../examples/0-minimal-implementation');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-credit-card-hams" {...props} />
);

export default md`
## Why would you want to use this?
- You have a credit card (CC) form
- You have **existing** integration with [HAMS](https://microscope.prod.atl-paas.net/hams)
- You want to use integrate with [Stripe](https://stripe.com/au)

## Quick start

This example demonstrates the most important and minimal-integration with the CC component.

${(
  <WrappedExample
    Component={HAMSExample}
    title="A minimal implementation for HAMS"
    source={HAMSExampleSource}
  />
)}

## Integrating with HAMS

We provide try to provide as much integration with HAMS as possible.

However, once you get a result back from \`useHAMSOneTimePaymentConfirm\` and/or \`useHAMSRenewablePaymentConfirm\` , it's up to you to figure out what you want to do with it. See [HAMS's Stripe payment API documentation for more help](https://hello.atlassian.net/wiki/spaces/COMMERCE/pages/673337638/Tech+Solution)

## Wait! There's more documentation worth reading elsewhere!
To avoid documentation duplication, we document everything else you can do with the Commerce's HAMS CC package in the [@atlassian/commerce-credit-card-base](https://atlaskit.atlassian.com/packages/commerce/commerce-credit-card-base) package
which is a lower level CC package that doesn't integrate with any specific service.

## Questions/Queries

**I want to integrate with CCP, not HAMS**

We have a package for that too. See [@atlassian/commerce-credit-card-ccp](https://atlaskit.atlassian.com/packages/commerce/commerce-credit-card-ccp)

**I have a question that isn't answered here**

Feel free to ping !disturbed in the [Supernova channel on Slack](https://atlassian.slack.com/archives/CFJ904N5C).
Any feedback/requests-for-certain features is appreciated.

Don't forget to mention that this page took you there!

**Do you have examples of this package being used in a real service?**
Sure, here's a few links to code examples that might help you get started:
- [Shopping Cart (SC)](https://stash.atlassian.com/projects/PUR/repos/shopping-cart/browse/new-cart/src/modules/stripe/index.tsx)
- [AdminHub billing pages (BUX)](https://bitbucket.org/atlassian/pf-site-admin-ui/src/master/src/apps/billing/bux/components/ak/stripe/)
These services are owned by Commerce itself so usage of this package should be relatively up to do and well informed.
`;
