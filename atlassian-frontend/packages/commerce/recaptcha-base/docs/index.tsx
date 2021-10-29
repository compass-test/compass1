import React from 'react';

import { Example, md } from '@atlaskit/docs';

import GettingStartedExample from '../examples/0-getting-started';
import SkipReCaptchaExample from '../examples/1-skip-recaptcha';
import FailReCaptchaExample from '../examples/2-fail-recaptcha';
import FreeTierReCaptchaExample from '../examples/3-free-tier-recaptcha';
import CustomEventReCaptchaExample from '../examples/4-custom-event-recaptcha-challenge';
import UseRequestCaptchaChallengeExample from '../examples/5-use-request-captcha-challenge';

const GettingStartedExampleSource = require('!!raw-loader!../examples/0-getting-started');
const SkipReCaptchaExampleSource = require('!!raw-loader!../examples/1-skip-recaptcha');
const FailReCaptchaExampleSource = require('!!raw-loader!../examples/2-fail-recaptcha');
const FreeTierReCaptchaExampleSource = require('!!raw-loader!../examples/3-free-tier-recaptcha');
const CustomEventReCaptchaExampleSource = require('!!raw-loader!../examples/4-custom-event-recaptcha-challenge');
const UseRequestCaptchaChallengeExampleSource = require('!!raw-loader!../examples/5-use-request-captcha-challenge');

const WrappedExample = (props: any) => (
  <Example packageName="@atlassian/commerce-recaptcha-base" {...props} />
);

export default md`
# Why would you want to use this?

- You want to protect your app from bots using reCAPTCHA
- You use React
- You want to integrate reCAPTCHA with GasV3, Sentry and/or Metal

This package is an abstraction layer over the real reCAPTCHA API to provide better support for Atlassian's tech stack.

# You may want to use one of our higher-level packages

- If you need to protect a HAMS endpoint from bots, see [@atlassian/commerce-recaptcha-hams](https://statlas.prod.atl-paas.net/atlassian-frontend/master#/packages/commerce/recaptcha-hams)
- If you need to protect a CCP endpoint from bots, see [@atlassian/commerce-recaptcha-ccp (WIP](https://statlas.prod.atl-paas.net/atlassian-frontend/master#/packages/commerce/recaptcha-ccp)

# Integrating

First you will need to create a reCAPTCHA enterprise or reCAPTCHA free project. See:
- For free: [The reCAPTCHA free introduction](https://developers.google.com/recaptcha/intro)
- For enterprise: Your team will need a GCP project and a budget for reCAPTCHA Enterprise. See [#cloud-engineering](https://atlassian.slack.com/archives/CFHT88SCF) for creating a GCP project if you do not already have one.

You should then obtain a reCAPTCHA secret (should be private/secret) and a reCAPTCHA site key (can be publically exposed). We recommend
passing the site key down from a backend service. This makes it so that site keys are easier to cycle through and also means that you can manage
whether to use reCAPTCHA entirely from the backend.

In both reCAPTCHA v2 and reCAPTCHA v3 you will need to expose a means of validating the reCAPTCHA tokens produced by this package in a backend service somewhere. See:
- [Verification in reCAPTCHA free](https://developers.google.com/recaptcha/docs/verify)
- [Verification in reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-assessment)


## reCAPTCHA v2

We provide support for [Invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/invisible). This means that reCAPTCHA is totally invisible to the
user unless reCAPTCHA is suspicious of the usre being a bot. If this happens, reCAPTCHA will show a CAPTCHA challenge modal anchored to the modal to a specified element.


Once you obtained a site key, you can use the following example as a reference for integrating with this package:

${(
  <WrappedExample
    Component={GettingStartedExample}
    title="Getting started with reCAPTCHA"
    source={GettingStartedExampleSource}
  />
)}

You can also pass \`null\` to as the site key and this package will interpret this value as not needing to perform reCAPTCHA:

${(
  <WrappedExample
    Component={SkipReCaptchaExample}
    title="Skipping reCAPTCHA reCAPTCHA"
    source={SkipReCaptchaExampleSource}
  />
)}

You can also specify that you failed to retrieve the site key, and this package will attempt to re-retrieve the site key each time the reCAPTCHA callback is triggered:

${(
  <WrappedExample
    Component={FailReCaptchaExample}
    title="Signalling that site key retrieval failed"
    source={FailReCaptchaExampleSource}
  />
)}

By default the reCAPTCHA triggers when the specified element's \`click\` is triggered. See the following example for how you can change this bevhaviour:

${(
  <WrappedExample
    Component={CustomEventReCaptchaExample}
    title="Triggering reCAPTCHA on non-click events"
    source={CustomEventReCaptchaExampleSource}
  />
)}

If you want more control over when reCAPTCHA is triggered you can use our lower level hook:

${(
  <WrappedExample
    Component={UseRequestCaptchaChallengeExample}
    title="Having more control over reCAPTCHA"
    source={UseRequestCaptchaChallengeExampleSource}
  />
)}

We recommend you also make use of our telemetry integrations.
You can import them via the \`@atlassian/commerce-recaptcha-base/telemetry-integrations\` entrypoint.
We currently don't have an example for telemetry for this package but it follows the same pattern as in [@atlassian/commerce-credit-card-base](https://statlas.prod.atl-paas.net/atlassian-frontend/master#packages/commerce/credit-card-base/example/monitoring-and-analytics-integration)

## reCAPTCHA v3

We currently don't provide any support for reCAPTCHA v3

# PDV and E2E testing

**In staging:** You can use a testing site key. If you are using the free tier of reCAPTCHA you can use the site key specified in the [reCAPTCHA free tier FAQ](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do).
In reCAPTCHA v2, these site keys will never trigger a reCAPTCHA challenge, in reCAPTCHA v3, you can make them always return a specific score.
This will ensure that you run all the reCAPTCHA endpoint logic you normally would. The only thing that goes untested is the CAPTCHA challenge itself, which only appears when using production keys, which brins us too...

**In production:** This is more complicated and we do not recommend doing so. Since reCAPTCHA is designed to prevent bots from using your site it isn't feasible to test reCAPTCHA using production (which uses a production site key).
If you absolutely *must* test the flow that's protected by reCAPTCHA, one way you circumvent this issue is by using a testing site key and adding a special token or HTTP header to your E2E-test/PDV's browser
session when making calls to the protected endpoint. This special token would signal to your backend not to ignore the response from the Google reCAPTCHA validation.

# reCAPTCHA Enterprise vs reCAPTCHA free

**Note:** reCAPTCHA Enterprise currently can't be used due to issues with using invisible reCAPTCHA.
We believe this is a bug with reCAPTCHA Enterprise and are checking with Google to resolve the issue. You watch [this ticket](https://hello.atlassian.net/browse/TNTEXP-941) follow the status of this issue.

This package defaults to using [reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise). If you want to use a free tier reCAPTCHA site key you, then see the following example's source code:

${(
  <WrappedExample
    Component={FreeTierReCaptchaExample}
    title="Using free tier reCAPTCHA"
    source={FreeTierReCaptchaExampleSource}
  />
)}

There are a few reasons for using the Enterprise version of reCAPTCHA:
- If you exceed the reCAPTCHA free [quota limit](https://developers.google.com/recaptcha/docs/faq#are-there-any-qps-or-daily-limits-on-my-use-of-recaptcha)
- It's better designed for managing multiple site keys

# See also:
- [Google's reCAPTCHA free FAQ](https://developers.google.com/recaptcha/docs/faq) and [Google's reCAPTCHA Enterprise FAQ](https://cloud.google.com/recaptcha-enterprise/docs/faq). Both contain a lot of useful information about reCAPTCHA.

# Supplementary links

- [The reCAPTCHA Enterprise evaluation channel](https://atlassian.slack.com/archives/C01AB050JF5). Contains conversations about using reCAPTCHA Enterprise, how to set it up, etc.
- [The initial reCAPTCHA spike](https://hello.atlassian.net/wiki/spaces/~pshaw/pages/1115547408/ReCaptcha+Spike). Explains the certain design and technical decisions made in this package along with some high level overviews of how reCAPTCHA works and is implemented internally in this package.
- [reCAPTCHA design discussions](https://hello.atlassian.net/wiki/spaces/tintin/pages/1103531169/ReCAPTCHA+implementation+-+Design+page)
`;
