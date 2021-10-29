# @atlassiansox/nudge-tooltip

## 5.4.1

### Patch Changes

- Updated dependencies

## 5.4.0

### Minor Changes

- [`4b978e56aba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b978e56aba) - Pass the event for onTargetClick to setHidden to make available to the exposed callback

## 5.3.1

### Patch Changes

- [`5306c393f2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5306c393f2b) - Use sideEffects:false to enable treeshaking

## 5.3.0

### Minor Changes

- [`6d759c0730`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d759c0730) - [ux] Add concealSpotlightOnReferenceHidden prop to NudgeSpotlightV2 so spotlights are concealed when reference element is out of viewport

## 5.2.1

### Patch Changes

- [`3f43ad77d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f43ad77d4) - [ux] Reduce size of border for ExpandingBorderNudge to fit Trello nav bar better

## 5.2.0

### Minor Changes

- [`c264fc7a11`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c264fc7a11) - [ux] Allow for custom nudge components, some fixes and improvements.

## 5.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 5.1.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 5.1.0

### Minor Changes

- [`be08f167c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be08f167c7) - Added unit testing for package nudge-tooltip and some dev dependencies
- [`be08f167c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be08f167c7) - Adds unit testing for nudge-tooltip package

## 5.0.1

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`702c093338`](https://bitbucket.org/atlassian/atlassian-frontend/commits/702c093338) - Refactor nudge spotlight to not use AK Tooltip

## 4.2.0

### Minor Changes

- [`aa370022c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa370022c7) - adding forwardRef to support @atlaskit/Tooltip 17.0.0'

## 4.1.2

### Patch Changes

- Updated dependencies

## 4.1.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 4.1.0

### Minor Changes

- [`2fc070355b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fc070355b) - Add position= prop to NudgeSpotlight

## 4.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 3.0.3

### Patch Changes

- [`b11d508dfa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b11d508dfa) - Fixes exported TS types for props to retain optional props

## 3.0.2

### Patch Changes

- [`9103460374`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9103460374) - Removes pointer event from pseudo element

## 3.0.1

### Patch Changes

- [`bdacd81b72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdacd81b72) - Fixes the global click issue to make nudge-spotlight disappear.

## 3.0.0

### Major Changes

- [`20d1859809`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20d1859809) - Migrate Nudge Tooltip into Atlassian Frontend
