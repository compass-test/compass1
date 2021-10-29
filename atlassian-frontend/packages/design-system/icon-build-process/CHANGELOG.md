# @atlaskit/icon-build-process

## 0.3.0

### Minor Changes

- [`594dda17f88`](https://bitbucket.org/atlassian/atlassian-frontend/commits/594dda17f88) - Build process now no longer adds the role attribute in build step, templates have been updated to match correct icon types.

### Patch Changes

- [`d5a3dfbdc59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5a3dfbdc59) - Adds ability to remove color props from the icon glyph output with the `isColorsDisabled` config.
- [`d98f1bb1169`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d98f1bb1169) - Local build tooling improvements.
- [`861b8cc83f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/861b8cc83f3) - Icon build process has been converted to TypeScript and renamed to `@af/icon-build-process`.

## 0.2.3

### Patch Changes

- [`fb19df15dc9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb19df15dc9) - When utilising a base icon entrypoint and building with a hardcoded icon size the glyphs will now exclude the size prop.
- [`a0ebd469b56`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0ebd469b56) - Icon build has been updated to no longer attach `focusable` attribute.

## 0.2.2

### Patch Changes

- [`5f46faeaa90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f46faeaa90) - Icon glyph templates have been adjusted to reflect newer Icon API.

## 0.2.1

### Patch Changes

- [`8290707df1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8290707df1) - Bump svgo version to fix js-yaml vulnerability

## 0.2.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.1.3

### Patch Changes

- [patch][f3461e03aa](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3461e03aa):

  Remove Flow libraries

## 0.1.2

### Patch Changes

- [patch][f9b5e24662](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9b5e24662):

  @atlaskit/icon-file-type and @atlaskit/icon-object have been converted to TypeScript to provide static typing. Flow types are no longer provided. No API or bahavioural changes.

## 0.1.1

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.1.0

- [minor][b29bec1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b29bec1):

  - Change the format for the docs file to be focused on metadata only

## 0.0.1

- [patch] Update to use babel-7 for build processes [e7bb74d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7bb74d)
