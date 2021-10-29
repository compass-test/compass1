# @atlassian/commerce-payment-flow

## 6.0.15

### Patch Changes

- Updated dependencies

## 6.0.14

### Patch Changes

- Updated dependencies

## 6.0.13

### Patch Changes

- Updated dependencies

## 6.0.12

### Patch Changes

- Updated dependencies

## 6.0.11

### Patch Changes

- Updated dependencies

## 6.0.10

### Patch Changes

- Updated dependencies

## 6.0.9

### Patch Changes

- Updated dependencies

## 6.0.8

### Patch Changes

- Updated dependencies

## 6.0.7

### Patch Changes

- Updated dependencies

## 6.0.6

### Patch Changes

- [`92d0907768f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92d0907768f) - bug fix missing breadcrumb in billing details step

## 6.0.5

### Patch Changes

- Updated dependencies

## 6.0.4

### Patch Changes

- Updated dependencies

## 6.0.3

### Patch Changes

- Updated dependencies

## 6.0.2

### Patch Changes

- Updated dependencies

## 6.0.1

### Patch Changes

- Updated dependencies

## 6.0.0

### Major Changes

- [`e19f1ef2b2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e19f1ef2b2e) - The "source"s in GasV3, "page"s in Metal and "telemetry-breadcrumbs" context in Sentry integrations are now shared across all Commerce packages. This means that, if an event used to have an undefined/unknown/none-value source/page/telemetry-breadcrumb it may now be populated with one if the component is being wrapped in a component from another Commerce package.

### Patch Changes

- Updated dependencies

## 5.6.36

### Patch Changes

- Updated dependencies

## 5.6.35

### Patch Changes

- Updated dependencies

## 5.6.34

### Patch Changes

- Updated dependencies

## 5.6.33

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 5.6.32

### Patch Changes

- Updated dependencies

## 5.6.31

### Patch Changes

- Updated dependencies

## 5.6.30

### Patch Changes

- Updated dependencies

## 5.6.29

### Patch Changes

- [`ae1160a5d4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae1160a5d4b) - [ux] Adds a ButtonGroup to wrap the buttons around payment flow. This fixes the margins and allows design system team to push the fix to DSP-895 where margin:0 needs to be applied to the Button component.
- Updated dependencies

## 5.6.28

### Patch Changes

- Updated dependencies

## 5.6.27

### Patch Changes

- [`32c8553aeff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32c8553aeff) - Exposing extends scenarios for contract testing
- [`134b21476f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/134b21476f2) - Adding contract testing to commerce components
- Updated dependencies

## 5.6.26

### Patch Changes

- Updated dependencies

## 5.6.25

### Patch Changes

- Updated dependencies

## 5.6.24

### Patch Changes

- Updated dependencies

## 5.6.23

### Patch Changes

- Updated dependencies

## 5.6.22

### Patch Changes

- [`50c4b008986`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50c4b008986) - Upgraded @atlassian/commerce-credit-card-base to include a small bug fix around recreating certain callbacks on every rerender
- Updated dependencies

## 5.6.21

### Patch Changes

- Updated dependencies

## 5.6.20

### Patch Changes

- Updated dependencies

## 5.6.19

### Patch Changes

- Updated dependencies

## 5.6.18

### Patch Changes

- Updated dependencies

## 5.6.17

### Patch Changes

- Updated dependencies

## 5.6.16

### Patch Changes

- Updated dependencies

## 5.6.15

### Patch Changes

- Updated dependencies

## 5.6.14

### Patch Changes

- Updated dependencies

## 5.6.13

### Patch Changes

- Updated dependencies

## 5.6.12

### Patch Changes

- Updated dependencies

## 5.6.11

### Patch Changes

- Updated dependencies

## 5.6.10

### Patch Changes

- Updated dependencies

## 5.6.9

### Patch Changes

- Updated dependencies

## 5.6.8

### Patch Changes

- Updated dependencies

## 5.6.7

### Patch Changes

- Updated dependencies

## 5.6.6

### Patch Changes

- Updated dependencies

## 5.6.5

### Patch Changes

- Updated dependencies

## 5.6.4

### Patch Changes

- Updated dependencies

## 5.6.3

### Patch Changes

- [`f918fd47356`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f918fd47356) - Refactoring initialStates to use shared mutable cache
- Updated dependencies

## 5.6.2

### Patch Changes

- [`a3b78c2eb5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3b78c2eb5b) - Tighting types around Payment Flow

## 5.6.1

### Patch Changes

- Updated dependencies

## 5.6.0

### Minor Changes

- [`4d018248bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d018248bd9) - Exposing Billing Details Flow

## 5.5.12

### Patch Changes

- Updated dependencies

## 5.5.11

### Patch Changes

- [`8f41803d79c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f41803d79c) - Add whitepsace "none" to add payment method button link in the wallet, negative margin no longer needed to correct

## 5.5.10

### Patch Changes

- [`9b2eb934c7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b2eb934c7a) - [ux] Update payment methode spacing using space mixins in payment method panels and wallet layout of payment flow
- Updated dependencies

## 5.5.9

### Patch Changes

- Updated dependencies

## 5.5.8

### Patch Changes

- Updated dependencies

## 5.5.7

### Patch Changes

- Updated dependencies

## 5.5.6

### Patch Changes

- Updated dependencies

## 5.5.5

### Patch Changes

- Updated dependencies

## 5.5.4

### Patch Changes

- [`78e4486914a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78e4486914a) - Update Billing details to consume Commerce Final Form
- Updated dependencies

## 5.5.3

### Patch Changes

- Updated dependencies

## 5.5.2

### Patch Changes

- Updated dependencies

## 5.5.1

### Patch Changes

- Updated dependencies

## 5.5.0

### Minor Changes

- [`8e4e880e81a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e4e880e81a) - Next/cancel/back buttons now send analytics data based on https://docs.google.com/spreadsheets/d/1b8bYMOwuCHIWsXbbL1JAg4jiDzE5jrws/edit?ts=607390c5#gid=774800868

### Patch Changes

- Updated dependencies

## 5.4.8

### Patch Changes

- Updated dependencies

## 5.4.7

### Patch Changes

- Updated dependencies

## 5.4.6

### Patch Changes

- Updated dependencies

## 5.4.5

### Patch Changes

- Updated dependencies

## 5.4.4

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")
- Updated dependencies

## 5.4.3

### Patch Changes

- Updated dependencies

## 5.4.2

### Patch Changes

- Updated dependencies

## 5.4.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 5.4.0

### Minor Changes

- [`a6c0944e5ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6c0944e5ac) - Add payment method polling on payment confirmation

### Patch Changes

- Updated dependencies

## 5.3.0

### Minor Changes

- [`eda30c201f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eda30c201f0) - Upgraded Sentry integration package. "source" will no longer be added as a tag in logs

### Patch Changes

- Updated dependencies

## 5.2.0

### Minor Changes

- [`5f76b6f7320`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f76b6f7320) - Add replace payment method hook

### Patch Changes

- Updated dependencies

## 5.1.1

### Patch Changes

- [`e5c858ab40c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5c858ab40c) - Updating stripe and managing state update
- Updated dependencies

## 5.1.0

### Minor Changes

- [`2270998f617`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2270998f617) - [ux] Modify payment flow to display credit cards payment methods from txa even if no default is set at invoice group level, newly added payment method from add form to be displayed at the wallet payment method list at the top and immediately selected.

### Patch Changes

- Updated dependencies

## 5.0.1

### Patch Changes

- [`e2141d58e05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e2141d58e05) - Ignore flaky test

## 5.0.0

### Major Changes

- [`6c67e600c9e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c67e600c9e) - [ux] Export payment methods wallet from commerce-payment-methods and include visual adjustments, Integrate wallet into commerce payment flow's PaymentStep section

### Patch Changes

- Updated dependencies

## 4.1.5

### Patch Changes

- [`2cdda9b69d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cdda9b69d7) - [ux] Addition of deferred payment method UI

## 4.1.4

### Patch Changes

- [`ae90f6ddd3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae90f6ddd3f) - Refactor examples

## 4.1.3

### Patch Changes

- [`538b6d60f6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/538b6d60f6d) - Add reveal container to layout package

## 4.1.2

### Patch Changes

- [`3fb35670239`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb35670239) - [ux] New logic to select payment method based legal notes + addition of deferred legal note

## 4.1.1

### Patch Changes

- [`e5f6d458737`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5f6d458737) - Introduce commerece layout package

## 4.1.0

### Minor Changes

- [`a57951405dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a57951405dd) - Updated Safeguards to include telemetry integrations entrypoints

### Patch Changes

- Updated dependencies

## 4.0.2

### Patch Changes

- [`d6d66cef699`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6d66cef699) - Fixed Sentry integration payload for CC submission hooks

## 4.0.1

### Patch Changes

- [`0dd6b097ced`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd6b097ced) - Fixed unreleased dependency being dependended upon

## 4.0.0

### Major Changes

- [`eb0ecf376c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb0ecf376c1) - Moved GasV3/Sentry/Metal bridges to a separate entrypoint called /telemetry-integrations in each package

### Patch Changes

- [`f83126d3b2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83126d3b2b) - Removed old GasV3 screen API
- Updated dependencies

## 3.0.3

### Patch Changes

- [`3e41feef7e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e41feef7e9) - Bump commerce dependencies

## 3.0.2

### Patch Changes

- [`a86c6e333ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a86c6e333ac) - Fix error handling on summary screen

## 3.0.1

### Patch Changes

- [`c55a708044f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c55a708044f) - Refactor flow component

## 3.0.0

### Major Changes

- [`37a174a18f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37a174a18f) - Added billing details Sentry error

### Patch Changes

- Updated dependencies

## 2.2.2

### Patch Changes

- [`4ed36bdb03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed36bdb03) - Add underlaying api docs to services

## 2.2.1

### Patch Changes

- [`e7f806b28e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7f806b28e) - Internal refactoring

## 2.2.0

### Minor Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 2.1.2

### Patch Changes

- [`c7673e3973`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7673e3973) - Fix payment method banel border radius
- Updated dependencies

## 2.1.1

### Patch Changes

- [`cfe131c311`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfe131c311) - Test's for loading errors for the payment-flow

## 2.1.0

### Minor Changes

- [`d29caa2ad9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d29caa2ad9) - [ux] Add ability to update payment method on failure of 3ds challenge and in CONFIRMATION_NOT_REQUIRED status of invoices

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [`50bd23c1a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50bd23c1a9) - [ux] @atlassian/commerce-billing-details now takes a countryStates[] as a prop, @atlassian/commerce-payment-flow will now display the skeleton untill the states are loaded.

## 2.0.0

### Major Changes

- [`b996174339`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b996174339) - Modified action subject of confirmCardSetup and confirmCardPayment metrics to follow telemetry naming conventions better

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

### Patch Changes

- Updated dependencies

## 0.24.2

### Patch Changes

- [`8caa23b869`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8caa23b869) - Fix package import

## 0.24.1

### Patch Changes

- [`3799b2ddec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3799b2ddec) - Fixed first paint metric not uploading to metal

## 0.24.0

### Minor Changes

- [`3a7eee18c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a7eee18c0) - Added histograms for task duration

## 0.23.0

### Minor Changes

- [`260391ba24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/260391ba24) - Update legal notes

### Patch Changes

- Updated dependencies

## 0.22.0

### Minor Changes

- [`2837571221`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2837571221) - [ux] Add invoice item type to Invoice in billing history and update mocks, Also add Invoice summary display at the offsession confirmation ui in payment flow

### Patch Changes

- Updated dependencies

## 0.21.0

### Minor Changes

- [`00fb58e753`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00fb58e753) - Added duration metal metrics for CC and payment flow submissions

## 0.20.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 0.19.0

### Minor Changes

- [`84917ee86d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84917ee86d) - Limited support for deferred payment method

### Patch Changes

- Updated dependencies

## 0.18.0

### Minor Changes

- [`0053d50a07`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0053d50a07) - Added TTI and TTC metrics to payment-flow and CC packages

### Patch Changes

- Updated dependencies

## 0.17.2

### Patch Changes

- [`6cdf532457`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6cdf532457) - [ux] Update 3ds edge cases error message to support statuspage customers until update payment method action is available from 3ds flow

## 0.17.1

### Patch Changes

- [`d7f9195d8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7f9195d8e) - bump billing history dependency

## 0.17.0

### Minor Changes

- [`9610dd8228`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9610dd8228) - Add and integrate telemetry infrastructure into OffsessionConfirmation flow

### Patch Changes

- Updated dependencies

## 0.16.1

### Patch Changes

- [`74a38da5f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74a38da5f3) - Support borderless payment method panel

## 0.16.0

### Minor Changes

- [`6e47e78514`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e47e78514) - Simplify API of payment method panel

### Patch Changes

- Updated dependencies

## 0.15.1

### Patch Changes

- [`8c0b96aba3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c0b96aba3) - Use success illustration of 3ds offsession flow edgecases as a component as opposed to using it as an image

## 0.15.0

### Minor Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 0.14.1

### Patch Changes

- [`9cd81b86f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cd81b86f5) - Correct behaviour of Reveal Container

## 0.14.0

### Minor Changes

- [`41aefba380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41aefba380) - [ux] Add edge case handling scenarios for off-session 3ds confirmation challenge

### Patch Changes

- Updated dependencies

## 0.13.3

### Patch Changes

- [`1a4bf685dc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a4bf685dc) - Mend analytics events and reset scroll between pages

## 0.13.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.13.1

### Patch Changes

- [`43ae90d6d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43ae90d6d0) - Atlaskit event repackager now accepts an event API

## 0.13.0

### Minor Changes

- [`333577781e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/333577781e) - The breadcrumb mounted event API now uses the breadcrumed payload shape

## 0.12.7

### Patch Changes

- Updated dependencies

## 0.12.6

### Patch Changes

- [`23b022e118`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23b022e118) - Decoupled event API connectors from bridges

## 0.12.5

### Patch Changes

- [`5b063b836a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b063b836a) - [ux] Adds correct commerce legal note to offsession 3ds confirmation component and implements basic error messages on errors both stripe and CCP related
- Updated dependencies

## 0.12.4

### Patch Changes

- [`fcdec16fb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcdec16fb3) - Separated @atlassiansox/analytics-web-client types into its own package

## 0.12.3

### Patch Changes

- [`2769fd2e79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2769fd2e79) - Renamed connector->to and eventAPI->from in the bridge APIs

## 0.12.2

### Patch Changes

- [`0cb0d50267`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cb0d50267) - Renamed createTransparentListener->withRedispatch and createFilteredListener->withFilter

## 0.12.1

### Patch Changes

- [`e3ca144c7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3ca144c7a) - Payment details flow now sends track event as a real track event (not a UI event)

## 0.12.0

### Minor Changes

- [`859641f1ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/859641f1ee) - [ux] Add support for off session payment 3ds confirmation of specific invoices

### Patch Changes

- [`a3db48eac4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3db48eac4) - Now using @atlassian/commerce-events-telemetry-react internally
- Updated dependencies

## 0.11.0

### Minor Changes

- [`6c4b46f8b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c4b46f8b2) - [ux] CCP credit card package and payment flow now supports 3DS challenges at payment review steps

### Patch Changes

- Updated dependencies

## 0.10.2

### Patch Changes

- [`2dae2fa7f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2dae2fa7f8) - Added first-paint metal metric for payment flow

## 0.10.1

### Patch Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events
- Updated dependencies

## 0.10.0

### Minor Changes

- [`e46c2eedc6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e46c2eedc6) - Dispatch track events at the summary step, Add screen event in display payment method step, Rename export of payment flow event listener

## 0.9.6

### Patch Changes

- Updated dependencies

## 0.9.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.9.4

### Patch Changes

- [`f2f230070e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2f230070e) - Tests id's added

## 0.9.3

### Patch Changes

- [`178b070eab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/178b070eab) - Bump payment method component

## 0.9.2

### Patch Changes

- [`070c05190c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/070c05190c) - Modified how slow stors states internally to display updated state when comming back

## 0.9.1

### Patch Changes

- Updated dependencies

## 0.9.0

### Minor Changes

- [`e1fca2c1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1fca2c1bb) - New analytics API for Commerce packages
- [`398935396a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/398935396a) - Added new analytics API for Commerce packages

### Patch Changes

- Updated dependencies

## 0.8.2

### Patch Changes

- Updated dependencies

## 0.8.1

### Patch Changes

- Updated dependencies

## 0.8.0

### Minor Changes

- [`7a7ff83ee8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a7ff83ee8) - Added analytics instrumentation

### Patch Changes

- Updated dependencies

## 0.7.4

### Patch Changes

- [`73dddc1608`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73dddc1608) - Update button label

## 0.7.3

### Patch Changes

- [`180a60d480`](https://bitbucket.org/atlassian/atlassian-frontend/commits/180a60d480) - [ux] Add variant of the flow for cassi
- Updated dependencies

## 0.7.2

### Patch Changes

- [`e79fff533b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e79fff533b) - Dependancy update

## 0.7.1

### Patch Changes

- [`84100fd7d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84100fd7d7) - [ux] Content updates

## 0.7.0

### Minor Changes

- [`d10f544d56`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d10f544d56) - Update commerce-billing-details to latest version

## 0.6.4

### Patch Changes

- [`35e6d6d740`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35e6d6d740) - VR tests added

## 0.6.3

### Patch Changes

- Updated dependencies

## 0.6.2

### Patch Changes

- [`d6c5786645`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c5786645) - Animation optimizations

## 0.6.1

### Patch Changes

- [`bc4189d731`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc4189d731) - Check for isEqual before update

## 0.6.0

### Minor Changes

- [`9f11d7c28c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f11d7c28c) - [ux] Added suport for onCancel callback

## 0.5.7

### Patch Changes

- [`94c79d4279`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94c79d4279) - Fix case where default payment method is null

## 0.5.6

### Patch Changes

- Updated dependencies

## 0.5.5

### Patch Changes

- [`31e2a98648`](https://bitbucket.org/atlassian/atlassian-frontend/commits/31e2a98648) - [ux] Disable entering animation on first step the firs time the flow is invoked

## 0.5.4

### Patch Changes

- [`54b236692e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54b236692e) - Integrate error messages and copy at billing details step, sumary step and global failure loading the flow's resources

## 0.5.3

### Patch Changes

- [`9b3d607c71`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b3d607c71) - Pre fetch flow data

## 0.5.2

### Patch Changes

- [`e15b179a5e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e15b179a5e) - Refactor flow transitions, use correct prop for atlaskit button on summary step

## 0.5.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.5.0

### Minor Changes

- [`e58371649b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e58371649b) - Exports form skeleton from billing details, adds motion for transitions between steps, adds reveal animation when displaying content with loading states

### Patch Changes

- Updated dependencies

## 0.4.10

### Patch Changes

- Updated dependencies

## 0.4.9

### Patch Changes

- [`24dbaf547d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24dbaf547d) - Replace context API by Sweet-State

## 0.4.8

### Patch Changes

- Updated dependencies

## 0.4.7

### Patch Changes

- [`e991742fec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e991742fec) - Fixed a bug where the version of @atlassian/commerce-environment being used was out-of-sync

## 0.4.6

### Patch Changes

- Updated dependencies

## 0.4.5

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- Updated dependencies

## 0.4.3

### Patch Changes

- [`b32831fcf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b32831fcf9) - billing-details-version-bump to @^0.7.6

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`08667be0ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08667be0ca) - Modify flow for CC updates and addjus it for new CC mocks

## 0.3.9

### Patch Changes

- Updated dependencies

## 0.3.8

### Patch Changes

- Updated dependencies

## 0.3.7

### Patch Changes

- Updated dependencies

## 0.3.6

### Patch Changes

- Updated dependencies

## 0.3.5

### Patch Changes

- Updated dependencies

## 0.3.4

### Patch Changes

- [`8f5e38ae43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f5e38ae43) - Expose more specific to CCP CC submit action
- Updated dependencies

## 0.3.3

### Patch Changes

- Updated dependencies

## 0.3.2

### Patch Changes

- Updated dependencies

## 0.3.1

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.2.13

### Patch Changes

- [`3ef25752f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ef25752f9) - Expose payment flow

## 0.2.12

### Patch Changes

- [`f4b27a4935`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4b27a4935) - E2E flow for Commerce Payment Flow component
- Updated dependencies

## 0.2.11

### Patch Changes

- Updated dependencies

## 0.2.10

### Patch Changes

- [`3021e67bd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3021e67bd9) - Updated @atlassian/commerce-credit-card-ccp
- Updated dependencies

## 0.2.9

### Patch Changes

- [`6f819cc2d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f819cc2d0) - Refactoring credit-card error states
- Updated dependencies

## 0.2.8

### Patch Changes

- Updated dependencies

## 0.2.7

### Patch Changes

- Updated dependencies

## 0.2.6

### Patch Changes

- Updated dependencies

## 0.2.5

### Patch Changes

- Updated dependencies

## 0.2.4

### Patch Changes

- Updated dependencies

## 0.2.3

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- [`2f78f60d85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f78f60d85) - Add billing details mocks
- Updated dependencies

## 0.2.1

### Patch Changes

- [`cd0baa2ed1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd0baa2ed1) - update cc mocks

## 0.2.0

### Minor Changes

- [`4ea3471ea5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ea3471ea5) - Update billing details form dependency

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`a156b1bc54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a156b1bc54) - Refining payment flow

### Patch Changes

- Updated dependencies

## 0.0.4

### Patch Changes

- Updated dependencies

## 0.0.3

### Patch Changes

- [`192edc2f22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/192edc2f22) - Introducing commerce payment flow
- Updated dependencies
