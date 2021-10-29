# Feature flag web client

This client is the Atlassian solution for evaluating feature flags from LaunchDarkly.

Behind the scenes, this client can also:

- Integrate with [TAP] to unlock cross product / project feature flag rollout, and
- Fire exposure events to track experimental cohorts.

Checkout the [DAC docs][dac-overview] for more info.

## How to use the client

Our user documentation is available on [DAC javascript api][dac-jsapi].

## Development

This project is:

- Managed by npm,
- Typescript,
- Framework agnsotic, and
- Is full of tests.

When developing in this repo, please keep these things in mind.

### Common commands

```bash
# Install dependencies
npm install

# Build project
npm run build

# Test project
npm run test

# Lint code
npm run lint

# Run storybook example
npm run storybook

# Creating a new release candidate
npm run changeset
```

When adding a new feature, please consider adding a new storybook example to test your feature.

### Builds

We use bitbucket pipelines. Tests and lint are checked on each branch before merge to master.

### Releasing

This project uses [changesets] to manage its versions and release process. To release a new version, run `npm run changeset` before creating your PR.

## Help

Come chat to us in the [#help-measurement] room on slack.

[tap]: http://go.atlassian.com/tap-platform
[dac-overview]: https://developer.atlassian.com/platform/frontend-feature-flags/
[dac-jsapi]: https://developer.atlassian.com/platform/frontend-feature-flags/clients/javascript-api/
[changesets]: https://www.npmjs.com/package/changesets
[#help-measurement]: http://go.atlassian.com/mep-support
