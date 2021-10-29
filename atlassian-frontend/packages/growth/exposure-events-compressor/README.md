# Exposure Events Compressor

## What is this repository for?

This repository is the source for the `@atlassian/exposure-events-compressor` package. The goal of this package is to implement the `canCompress` and `compressor` methods which will be used by the Analytics Web Client to compress events.

For convienence, this package exports another method `getCompressorForBatchSize` which is the preferred way to use the underlying canCompress and compressor methods.

## Installation

```
npm install @atlassian/exposure-events-compressor
```

## Usage

Refer to the examples provided in the `examples` folder which show how to create an instance of the Analytics Web Client with the `delayQueueCompressors` property set using the methods exported by this library.

## Local Development

See [Atlassian Frontend Docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/)

#### Dependencies

This component depends on `@atlassiansox/analytics-web-client`

#### Deployment instructions

1. Create a changeset and version bump using semver
2. Set target branch as `master`
3. Confirm all branch builds are successful and PR has been approved by Measurement Team (#help-measurement)
4. Land in Landkid. After builds run green, landkid itself will merge to master and release

## Who do I talk to?

- Measurement Team
- Slack: #help-measurement

## Related Links

- [Track All Changes Project](https://hello.atlassian.net/wiki/spaces/MEASURE/pages/775072915/FY21+Project+-+Track+All+Changes)
- [Compressed Events Spec](https://hello.atlassian.net/wiki/spaces/MEASURE/pages/938861811/TAC+-+Jira+FE+-+Compressed+Exposure+Events)
