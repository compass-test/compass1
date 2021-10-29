# UFO - experimental

Web client for UFO - experimental release.
Please do not import directly.

## Contribution

This package is a minimal web client which is used by product components to instrument their experiences.

This package is re-exported by `@atlassian/ufo`, please avoid direct imports from it.

The workflow of contributing changes to web client:
* apply change to this package `@atlassian/ufo-experience`
* raise PR to `master` branch
* wait till merged
* run command `bolt w @atlassian/ufo-experimental run clone` which would copy code to `@atlaskit/ufo`
* raise PR to `develop` branch to enable platform components to consume newest changes
