# Editor Web Vitals service

This service package is responsible for the Editor Web Vitals service, which allows editor devs to get clear metrics without complex integrations.

Note: MVP tag indicates that the implementation is MVP-specific, or incomplete and likely to change.

## Supported API Routes

| Endpoint              | Method | Description                                                                                                    |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| /healthcheck          | GET    | Returns running status of the API.                                                                             |


## Environments

| Environment | Micros Env  | Service URL                                                                                                                  |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| staging     | `ddev`      | [https://editor-web-vitals.ap-southeast-2.dev.atl-paas.net](https://editor-web-vitals.ap-southeast-2.dev.atl-paas.net) |
| prod        | `dev-west2` | [https://editor-web-vitals.us-west-2.dev.atl-paas.net](https://editor-web-vitals.us-west-2.dev.atl-paas.net)           |

## Service Pipelines

Various Pipelines associrated with this service.

| Custom Pipeline                             | Trigger                                                 | Description                                                        |
| ------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
|                                             |                                                         |                                                                    |

## Features


## Roadmap

| Feature                                              | Status |
| ---------------------------------------------------- | ------ |
| Simple renderer/editor load async with metrics       | Live   |
| Common features editor load async with metrics       | TBC    |
| Dynamic editor load async with metrics               | TBC    |
| Performance check every time PR get merge in develop | TBC    |

## Service components

- **UI**: The React frontend that will render the editor and renderer on demand.
- **Server**: A Node/Express app that serves out and supports the UI. The [SLAuth service sidecar](https://developer.atlassian.com/platform/slauth/sidecar/configuration/) sits in front of this service, so users will need to be authenticated via web browser, and CI builds will need to include the `PIPELINES_JWT_TOKEN` (or alternatively-named build token) in the Authorization header when communicating with the Server.
- **Scripts**: A collection of scripts that we expect to run in CI. Includes:
  

### Environment Variables

_Not environment variables required._

> These can be defined in your bash profile, or used as prefixes before running a command.

## Running Locally

### Local development without docker

This is a little bit more complicated to setup, but includes a live reload.

1. `cd` into `services/editor-web-vitals` for the following commands
2. Run `bolt` to install dependencies
3. Run the UI and Server by using the `yarn dev` command
4. Access the site via http://localhost:8080

## Local development with docker

This is usually a bit quicker to setup, and doesn't require setting up postgres machine. However you won't have live-reload.

1. Run `bolt` to install dependencies
2. `yarn dev:docker-up` will run the UI and Server with docker-compose.
3. Access the site via http://localhost:8080

## Service deployment

### Service deployment by Manual Pipeline

- Go to Bitbucket `Run Pipelines`
- Select Branch: `master` (or your current working branch for a manual branch deploy) and Pipeline: `custom: deploy-service-dev`
- Set SERVICE_PACKAGE variable to `@af/editor-web-vitals` and MICROS_ENV variable to the environment you'd like to deploy to. (Current dev environment options are `dev-west2` and `ddev`. If in doubt, use `ddev` which is our lowest available environment).
- Click Run.
- Note: Deployment means the pipeline will run through the following NPM scripts: [pre-build, build, pre-deploy, deploy, post-deploy] from your specified branch. This should rebuild the entire JS application, upload to our internal Docker registry, and deploy a running application from the uploaded image.

### API Manual Testing

- You will need the Atlas CLI installed to perform the next steps: https://developer.atlassian.com/platform/atlas-cli/users/install/
- Run the command `atlas plugin install -n slauth` to install slauth plugin.
- To test API endpoints in a deployed environment (e.g. ddev or dev-west2) using a local http client (e.g. Postman or Insomnia), you will need an SLAUTH token. Use `atlas slauth token -a editor-web-vitals -e staging -o http --force --mfa-force` to generate a non-prod token . Include this in your client's HTTP Authorization header when making requests e.g. `Authorization: SLAUTH ey982...`. (Further information on the slauth CLI is described here: https://developer.atlassian.com/platform/slauth/cli/commands/token/)


### Service deployment by Automated Pipeline

The service will automatically deploy when a pull request is merged into `master` containing a changeset file for the service.

- The environment it gets auto-deployed to is defined within the `package.json` file.
- By default, it's pointing to `dev-west2` which is our "production" environment.

```
"af:services": {
    "serviceName": "editor-web-vitals",
    "master": {
      "continuous": {
        "env": "dev-west2"
      }
    },
    "slackChannelId": "CNA02D8SJ"
  },
```

### Service Deployment Slack Notifications

Deployment notifications are sent into [#team-twp-editor-ux-quality](https://atlassian.slack.com/archives/CNA02D8SJ) when a new build is published (both success and failure). This is configured by specifying a value within `af:services.slackChannelId` inside the `package.json` file.

For further details and service deployment configuration, see [Atlassian-Frontend Service Support](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/05-service-support).
