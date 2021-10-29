# @atlassian/commerce-recaptcha-base

## 4.0.2

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

## 3.0.1

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 3.0.0

### Major Changes

- [`3ab75580afc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ab75580afc) - Deprecated useCaptchaChallengeCallback in favour of using useRequestCaptchaChallenge and useCaptchaChallengeEventHandler in @atlassian/commerce-recaptcha-base (and their equivalents in @atlassian/commerce-recaptcha-hams)

### Minor Changes

- [`6b4b597496c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b4b597496c) - Added better function level documentation for reCAPTCHA
- [`1e5d5ae63e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1e5d5ae63e7) - Made Event object generic in useCaptchaChallengeEventHandler and useHAMSCaptchaChallengeEventHandler. Makes onReCaptchaChallengeCallback types slightly more specific.

## 2.1.0

### Minor Changes

- [`c35dde08492`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c35dde08492) - Added a new hook called useHAMSCaptchaChallengeEventHandler that makes it much harder to make it impossible for users to re-trigger a reCAPTCHA when they dismiss it

## 2.0.1

### Patch Changes

- [`eb31b3169f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb31b3169f9) - Fixed reCAPTCHA Enterprise never being able to retrieve a valid reCAPTCHA token.
- [`a82151261b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a82151261b2) - Fixed ServerSideSiteKeySuccessPayload and ServerSideSiteKeyFailurePayload types being the wrong way around

## 2.0.0

### Major Changes

- [`997ea39ea69`](https://bitbucket.org/atlassian/atlassian-frontend/commits/997ea39ea69) - Now supporting and defaulting to reCAPTCHA Enterprise script mounting

## 1.3.1

### Patch Changes

- [`1212bb2958e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1212bb2958e) - Fixed @atlassian/commerce-recapcha-base being unable to import '../src/common/utils/events'

## 1.3.0

### Minor Changes

- [`2b5e35194ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b5e35194ff) - Instrumented reCAPTCHA with Sentry/GasV3/Metal telemetry

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- [`b1d098d99fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1d098d99fd) - Fixed OnReCaptchaChallengeCallback returning any instead of T generic

## 1.2.0

### Minor Changes

- [`9f17e195639`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f17e195639) - Now exposing RawReCaptchaLegalText to avoid raw legal text

## 1.1.1

### Patch Changes

- [`e3ae5723387`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3ae5723387) - The options object in reCAPTCHA hooks are no longer internally used as a direct dependency (i.e. No need to useMemo)

## 1.1.0

### Minor Changes

- [`5264b3a9daf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5264b3a9daf) - Added ReCaptchaLegalText component(s)

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [`5e105f3256c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e105f3256c) - [ux] Added ReCaptcha base package for use in HAMS & CCP products
