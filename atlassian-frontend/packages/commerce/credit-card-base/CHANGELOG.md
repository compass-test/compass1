# @atlassian/commerce-credit-card-base

## 5.1.3

### Patch Changes

- Updated dependencies

## 5.1.2

### Patch Changes

- Updated dependencies

## 5.1.1

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`abe6d90172d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abe6d90172d) - Added globalThis.location.href to Stripe payment method metadata. Upgrading to this version of the credit card package should allow you to see the (sanitized) frontend URL that was being used at the time of creating the payment method in the Stripe dashboard. This should help with discovering card testers.

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`896d9fcb836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/896d9fcb836) - SentryBrowserIntegration should now be compatible with substantially more versions of Sentry. Although this likely won't actually cause any major breaking changes for @atlassian/commerce-ui and other consumer packages, it does change the type contracts for SentryBrowserIntegration which might cause a breaking change if you're relying on the current API contract.

### Patch Changes

- Updated dependencies

## 4.0.1

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [`e19f1ef2b2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e19f1ef2b2e) - The "source"s in GasV3, "page"s in Metal and "telemetry-breadcrumbs" context in Sentry integrations are now shared across all Commerce packages. This means that, if an event used to have an undefined/unknown/none-value source/page/telemetry-breadcrumb it may now be populated with one if the component is being wrapped in a component from another Commerce package.

### Patch Changes

- Updated dependencies

## 3.5.2

### Patch Changes

- Updated dependencies

## 3.5.1

### Patch Changes

- Updated dependencies

## 3.5.0

### Minor Changes

- [`fe0ca667260`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe0ca667260) - sentry tags for stripe error data

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 3.4.33

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- Updated dependencies

## 3.4.32

### Patch Changes

- Updated dependencies

## 3.4.31

### Patch Changes

- Updated dependencies

## 3.4.30

### Patch Changes

- Updated dependencies

## 3.4.29

### Patch Changes

- Updated dependencies

## 3.4.28

### Patch Changes

- Updated dependencies

## 3.4.27

### Patch Changes

- Updated dependencies

## 3.4.26

### Patch Changes

- Updated dependencies

## 3.4.25

### Patch Changes

- Updated dependencies

## 3.4.24

### Patch Changes

- [`daeac8ec3b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/daeac8ec3b5) - Fixed a minor bug where the CC name field was being passed a new onChange callback on every rerender
- [`59daac8ea44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59daac8ea44) - Fixed a minor bug where a new ref callback was being used on every rerender of the CC component

## 3.4.23

### Patch Changes

- Updated dependencies

## 3.4.22

### Patch Changes

- Updated dependencies

## 3.4.21

### Patch Changes

- Updated dependencies

## 3.4.20

### Patch Changes

- Updated dependencies

## 3.4.19

### Patch Changes

- [`28343109b71`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28343109b71) - Fixed creditCardErrorMessage GasV3 event always sending if the CreditCardErrorMessage component is being used

## 3.4.18

### Patch Changes

- Updated dependencies

## 3.4.17

### Patch Changes

- Updated dependencies

## 3.4.16

### Patch Changes

- [`d1a0178a828`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1a0178a828) - Refactored result.ts in @atlassian/commerce-credit-card-base to @atlassian/commerce-resultful and http-json.tsin @atlassian/commerce-credit-card-hams to @atlassian/commerce-hams-client

## 3.4.15

### Patch Changes

- Updated dependencies

## 3.4.14

### Patch Changes

- Updated dependencies

## 3.4.13

### Patch Changes

- Updated dependencies

## 3.4.12

### Patch Changes

- Updated dependencies

## 3.4.11

### Patch Changes

- [`bca3aa91540`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bca3aa91540) - Update internal component usage
- Updated dependencies

## 3.4.10

### Patch Changes

- Updated dependencies

## 3.4.9

### Patch Changes

- Updated dependencies

## 3.4.8

### Patch Changes

- Updated dependencies

## 3.4.7

### Patch Changes

- Updated dependencies

## 3.4.6

### Patch Changes

- Updated dependencies

## 3.4.5

### Patch Changes

- [`f09824db0f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f09824db0f1) - [ux] Display user friendly validation message for cardholder field
- Updated dependencies

## 3.4.4

### Patch Changes

- Updated dependencies

## 3.4.3

### Patch Changes

- Updated dependencies

## 3.4.2

### Patch Changes

- Updated dependencies

## 3.4.1

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")
- Updated dependencies

## 3.4.0

### Minor Changes

- [`1f78a988845`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f78a988845) - Now recording certain "success" confirm card states as bugs as per https://atlassian.slack.com/archives/C016U73MTC1/p1617695955289900

## 3.3.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 3.3.0

### Minor Changes

- [`eda30c201f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eda30c201f0) - Upgraded Sentry integration package. "source" will no longer be added as a tag in logs

## 3.2.2

### Patch Changes

- [`e5c858ab40c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5c858ab40c) - Updating stripe and managing state update

## 3.2.1

### Patch Changes

- [`ae90f6ddd3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae90f6ddd3f) - Refactor examples

## 3.2.0

### Minor Changes

- [`e5912da5cc9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5912da5cc9) - More specific CC submission task IDs and now logging considerably more Sentry information

### Patch Changes

- Updated dependencies

## 3.1.0

### Minor Changes

- [`a57951405dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a57951405dd) - Updated Safeguards to include telemetry integrations entrypoints

### Patch Changes

- Updated dependencies

## 3.0.2

### Patch Changes

- [`d6d66cef699`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6d66cef699) - Fixed Sentry integration payload for CC submission hooks

## 3.0.1

### Patch Changes

- [`0dd6b097ced`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd6b097ced) - Fixed unreleased dependency being dependended upon

## 3.0.0

### Major Changes

- [`eb0ecf376c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb0ecf376c1) - Moved GasV3/Sentry/Metal bridges to a separate entrypoint called /telemetry-integrations in each package
- [`f83126d3b2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83126d3b2b) - Removed old GasV3 screen API

### Patch Changes

- Updated dependencies

## 2.2.0

### Minor Changes

- [`df457b9e258`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df457b9e258) - Added i18n support for japanese

## 2.1.2

### Patch Changes

- [`3e41feef7e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e41feef7e9) - Bump commerce dependencies

## 2.1.1

### Patch Changes

- [`a86c6e333ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a86c6e333ac) - Fix error handling on summary screen

## 2.1.0

### Minor Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`b996174339`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b996174339) - Modified action subject of confirmCardSetup and confirmCardPayment metrics to follow telemetry naming conventions better

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

### Patch Changes

- Updated dependencies

## 0.46.1

### Patch Changes

- [`cdf0b362fe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cdf0b362fe) - Fixed TTI being null in the CC form

## 0.46.0

### Minor Changes

- [`3a7eee18c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a7eee18c0) - Added histograms for task duration

## 0.45.1

### Patch Changes

- Updated dependencies

## 0.45.0

### Minor Changes

- [`001bcc8380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/001bcc8380) - Partial removal of createTransformer

## 0.44.0

### Minor Changes

- [`00fb58e753`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00fb58e753) - Added duration metal metrics for CC and payment flow submissions

## 0.43.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 0.42.0

### Minor Changes

- [`ec5a38f695`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec5a38f695) - Removed timing information from CC submission event payloads

## 0.41.0

### Minor Changes

- [`0053d50a07`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0053d50a07) - Added TTI and TTC metrics to payment-flow and CC packages

### Patch Changes

- Updated dependencies

## 0.40.0

### Minor Changes

- [`9610dd8228`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9610dd8228) - Add and integrate telemetry infrastructure into OffsessionConfirmation flow

## 0.39.0

### Minor Changes

- [`84b78d9dbe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84b78d9dbe) - Added error message and loading component screen event

## 0.38.0

### Minor Changes

- [`0227501fa3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0227501fa3) - Added field error analytics events for CC package

## 0.37.1

### Patch Changes

- [`68919efeb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68919efeb9) - Fixed @atlassian/commerce-credit-card-base not sending all metal & gasv3 track events

## 0.37.0

### Minor Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 0.36.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.36.0

### Minor Changes

- [`088a45f5b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/088a45f5b0) - Added histogram metric for metal

## 0.35.7

### Patch Changes

- Updated dependencies

## 0.35.6

### Patch Changes

- [`23b022e118`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23b022e118) - Decoupled event API connectors from bridges

## 0.35.5

### Patch Changes

- [`fcdec16fb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcdec16fb3) - Separated @atlassiansox/analytics-web-client types into its own package

## 0.35.4

### Patch Changes

- [`2769fd2e79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2769fd2e79) - Renamed connector->to and eventAPI->from in the bridge APIs

## 0.35.3

### Patch Changes

- [`0cb0d50267`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cb0d50267) - Renamed createTransparentListener->withRedispatch and createFilteredListener->withFilter

## 0.35.2

### Patch Changes

- [`e3ca144c7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3ca144c7a) - Payment details flow now sends track event as a real track event (not a UI event)

## 0.35.1

### Patch Changes

- [`1f109b7d08`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f109b7d08) - Now using @atlassian/commerce-events-telemetry-react

## 0.35.0

### Minor Changes

- [`6c4b46f8b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c4b46f8b2) - [ux] CCP credit card package and payment flow now supports 3DS challenges at payment review steps

## 0.34.2

### Patch Changes

- [`bd6cd51bec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd6cd51bec) - Add necessary elements to support 3ds challenge in off session flows

## 0.34.1

### Patch Changes

- [`163a6df769`](https://bitbucket.org/atlassian/atlassian-frontend/commits/163a6df769) - Fix OnlyFailingResultsListener by inspecting result object instead of payload attribute of result which would be undefined

## 0.34.0

### Minor Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events

## 0.33.2

### Patch Changes

- [`afe7a8c536`](https://bitbucket.org/atlassian/atlassian-frontend/commits/afe7a8c536) - Now tracking 3DS failures + Improvements to metric tracking

## 0.33.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.33.0

### Minor Changes

- [`77ea5953aa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77ea5953aa) - Allow Frame Embedding Mitigation" control

## 0.32.0

### Minor Changes

- [`755c82c36e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/755c82c36e) - Export inferred types from package root to avoid deep path references in ts declaration files

### Patch Changes

- Updated dependencies

## 0.31.0

### Minor Changes

- [`b9ee1504d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9ee1504d3) - Dependency fixes

## 0.30.0

### Minor Changes

- [`e1fca2c1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1fca2c1bb) - New analytics API for Commerce packages
- [`398935396a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/398935396a) - Added new analytics API for Commerce packages

## 0.29.0

### Minor Changes

- [`a38aea5719`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a38aea5719) - MonitoringListener and AnalyticsListener are now prefixed with CreditCard

### Patch Changes

- Updated dependencies

## 0.28.4

### Patch Changes

- [`84100fd7d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84100fd7d7) - [ux] Content updates

## 0.28.3

### Patch Changes

- [`a2d27c77f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2d27c77f9) - [ux] CC package now supports performing payment method creation and card confirmation separately

## 0.28.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.28.1

### Patch Changes

- Updated dependencies

## 0.28.0

### Minor Changes

- [`f9dabf2307`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9dabf2307) - Now showing more meaningful errors + A means of controlling error placement according to Commerce ADG

## 0.27.3

### Patch Changes

- [`e991742fec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e991742fec) - Fixed a bug where the version of @atlassian/commerce-environment being used was out-of-sync

## 0.27.2

### Patch Changes

- [`5d9aaff1e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d9aaff1e3) - Documentation updates

## 0.27.1

### Patch Changes

- [`6b39319ba7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b39319ba7) - Remove pixel shift after stripe loads

## 0.27.0

### Minor Changes

- [`93b61ef7d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/93b61ef7d7) - Tweaks to metal monitoring for CC packages

## 0.26.3

### Patch Changes

- [`e9dba8351c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9dba8351c) - Documentation updates

## 0.26.2

### Patch Changes

- [`1dd8b54315`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1dd8b54315) - Added documentation for HAMS and base CC package

## 0.26.1

### Patch Changes

- [`48082ceba9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/48082ceba9) - Exported AnalyticsListener and MonitoringListener from CCP and HAMS packages

## 0.26.0

### Minor Changes

- [`71f0b243ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71f0b243ec) - Separated HAMS and CCP logic into separate logic

## 0.25.0

### Minor Changes

- [`211b4452e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/211b4452e9) - Error banner no longer shows for Stripe submission validation errors

## 0.24.2

### Patch Changes

- [`d728fdd22d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d728fdd22d) - correct testid display state

## 0.24.1

### Patch Changes

- [`08667be0ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08667be0ca) - Modify flow for CC updates and addjus it for new CC mocks

## 0.24.0

### Minor Changes

- [`7d48ea3250`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d48ea3250) - Better error handling for those trying to use 3DS authentication

## 0.23.0

### Minor Changes

- [`cb0e2ff2df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb0e2ff2df) - CreditCardErrorMessage now has autoscroll option

## 0.22.2

### Patch Changes

- [`f644aaa451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f644aaa451) - Fix override without mock provider

## 0.22.1

### Patch Changes

- [`2da3e6ab9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2da3e6ab9a) - Adding StripeJS mock
- Updated dependencies

## 0.22.0

### Minor Changes

- [`b71b685ca0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b71b685ca0) - Completely seperate submission logic for HAMS and CCP

## 0.21.0

### Minor Changes

- [`be729e38d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be729e38d1) - More information is now provided in the submission error payload

## 0.20.1

### Patch Changes

- [`68efcd98e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68efcd98e5) - Added missing field error mappings to Stripe CC

## 0.20.0

### Minor Changes

- [`8f5e38ae43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f5e38ae43) - Expose more specific to CCP CC submit action

## 0.19.0

### Minor Changes

- [`2b7d6056a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b7d6056a9) - Added isUserInitiatedError - Useful for deciding whether to upload an error to Sentry

## 0.18.1

### Patch Changes

- [`8aa68dca01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8aa68dca01) - Now exposing useStripeService

## 0.18.0

### Minor Changes

- [`a05b04738d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a05b04738d) - Added metal instrumentation to CC component

### Patch Changes

- Updated dependencies

## 0.17.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.16.3

### Patch Changes

- [`1f85f364c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f85f364c6) - Introduce examples with backend integration over stargate

## 0.16.2

### Patch Changes

- Updated dependencies

## 0.16.1

### Patch Changes

- [`f94b2050f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f94b2050f3) - Fix CC card error validation
- [`fac0c774b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fac0c774b9) - Fix CC field validations

## 0.16.0

### Minor Changes

- [`bce9af2db4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bce9af2db4) - Added one-time payment support

## 0.15.0

### Minor Changes

- [`6c036dd11f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c036dd11f) - Separated HAMS and CCP CreditCardFormState providers

## 0.14.1

### Patch Changes

- [`19d0ce1026`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d0ce1026) - Accepted brands error message is now more consistent with existing TNS valiation error

## 0.14.0

### Minor Changes

- [`6f819cc2d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f819cc2d0) - Refactoring credit-card error states

## 0.13.1

### Patch Changes

- Updated dependencies

## 0.13.0

### Minor Changes

- [`1e5b768cb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1e5b768cb8) - Ensure Stripe Elements component is passed a promise that resolves to a Stripe object

## 0.12.0

### Minor Changes

- [`d9903d4c33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d9903d4c33) - Validation errors are now shown immediately in the CC form

## 0.11.0

### Minor Changes

- [`6e8e691f14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e8e691f14) - Enabled a way of obtaining the HAMS payment gateway for CC component

## 0.10.0

### Minor Changes

- [`044f1461a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/044f1461a6) - CC component now has multi-currency support for HAMS

## 0.9.2

### Patch Changes

- [`2f78f60d85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f78f60d85) - Add billing details mocks
- Updated dependencies

## 0.9.1

### Patch Changes

- [`cd0baa2ed1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd0baa2ed1) - update cc mocks
- Updated dependencies

## 0.9.0

### Minor Changes

- [`a156b1bc54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a156b1bc54) - Refining payment flow

## 0.8.1

### Patch Changes

- [`576f22172b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/576f22172b) - Fixed CC name test ID

## 0.8.0

### Minor Changes

- [`732ecb1b78`](https://bitbucket.org/atlassian/atlassian-frontend/commits/732ecb1b78) - Added testId functionality to @atlassian/commerce-credit-card-base

## 0.7.2

### Patch Changes

- [`991a4859a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/991a4859a1) - update typings
- Updated dependencies

## 0.7.1

### Patch Changes

- [`137a1102ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/137a1102ca) - useCardCreditConfirm's callback will now return an exception rather than throw one

## 0.7.0

### Minor Changes

- [`8218878278`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8218878278) - Replaced useTokenService with useCommerceService. Also added brand validation for HAMS.

## 0.6.1

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.6.0

### Minor Changes

- [`bed50bf678`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bed50bf678) - Integrate with CPP

## 0.5.2

### Patch Changes

- [`86e56e4dd2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/86e56e4dd2) - Added Analytics Listener to Commerce credit card

## 0.5.1

### Patch Changes

- [`e46c83f2c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e46c83f2c6) - fixing: CreditCard forms dies after 10s

## 0.5.0

### Minor Changes

- [`9e93ca38c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e93ca38c6) - Added submission hooks compatible with HAMS

## 0.4.0

### Minor Changes

- [`7901c0b99b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7901c0b99b) - Add error cases including Frame Breaker for insecure environments

## 0.3.2

### Patch Changes

- [`46aa495486`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46aa495486) - Adding Loading state skeleton

## 0.3.1

### Patch Changes

- [`97a37f02f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97a37f02f6) - CC form token hook now complies with the new HAMS client secret payload

## 0.3.0

### Minor Changes

- [minor][fe8d2f551b](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe8d2f551b):

  update FormState props naming convention

## 0.2.0

### Minor Changes

- [minor][442f4b2d94](https://bitbucket.org/atlassian/atlassian-frontend/commits/442f4b2d94):

  Adds HAMS token hook

## 0.0.3

### Patch Changes

- [patch][ae7fcb0719](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae7fcb0719):

  Component pre-release

## 0.0.2

### Patch Changes

- [patch][43f99c10e9](https://bitbucket.org/atlassian/atlassian-frontend/commits/43f99c10e9):

  Minor refactoring to comply with Tangerine code structure
