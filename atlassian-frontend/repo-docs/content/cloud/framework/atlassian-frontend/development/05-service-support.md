---
date: '2021-10-11'
---

# Service Support in Atlassian Frontend

See [Services Support](https://hello.atlassian.net/wiki/spaces/AF/pages/707673810/Services+support) for the latest on what we offer, and [Micros: Getting Started](https://hello.atlassian.net/wiki/spaces/MICROS/pages/169253831/Getting+Started) for the official documentation on creating and developing your service.

Services must be placed under the `services/` directory, preferably following these naming conventions:

```
service-name/
├── __tests__/
├── src/
├── service-name.sd.yml
├── package.json
├── README.md
└── tsconfig.json
```

**Deployment features currently provided to services in the repo:**

- Manual and automatic deployments from `master`
- Manual and automatic non-prod deployments from any branch
- Branch deploying micros static apps to Statlas (_with limitations_)
- Rollbacks for micros static apps

Support for services will continue to grow with many planned features.

To allow our pipelines to deploy your service, you need to add a `deploytoken` for our repo to your service. An atlas CLI command exists for this purpose:

```
atlas micros service deploytoken add --service="<YOUR-SERVICE-NAME>" --build-principal="pipelinesBuild:{c8e2f021-38d2-46d0-9b7a-b3f7b428f724}" --name="Deployments from atlassian-frontend"
```

## Service Config Schema

Opting-in to the features listed above requires adding the `af:services` config to your service's `package.json` file. Here is the schema with each option explained:

```typescript
type DeploymentOpts = {
  // Any micros environment(s), but production environments can only be deployed to from master
  env: string | string[];
};

type ServiceConfig = {
  // The name of your service as it appears in microscope
  serviceName: string;
  master: {
    // Automatic deployments from master
    continuous: DeploymentOpts;
  };
  // Automatics deployments from your branch, this has a few different variations explained below
  branch: DeploymentOpts;
  // See "Triggering Deployment" for infomation
  deployOnDependencies?:
    | { type: 'direct' }
    | { type: 'transitive'; depth?: number }
    | { type: 'explicit'; dependencies: Array<string> };
  // See "Slack Notifications"
  slackChannelId?: string;
};
```

An example implementation of this would be:

```json
"af:services": {
  "serviceName": "service-name",
  "master": {
    "continuous": {
      "env": "prod-east"
    }
  },
  "branch": {
    "env": "ddev"
  }
}
```

## Triggering Deployment

Changes that require deployment are tracked using changesets. For example, if continuous master deployments are configured, then your service will be deployed to the declared environment when a changeset for that service is merged into master. Similarly, branch deployments will be triggered if there is a changeset on the branch.

The `deployOnDependencies` option allows for more advanced configuration of your service deployment conditions, with three choices:

**Direct Dependencies**

```json
"deployOnDependencies": {
  "type": "direct"
}
```

This will trigger deployment when a changeset for a package defined in your service's `dependencies` field exists.

**Transitive Dependencies**

```json
"deployOnDependencies": {
  "type": "transitive",
  "depth": 3
}
```

Same as direct but detects detects changesets for transitive dependencies as well, depth can be configured or is unlimited by default (1 is the same as direct, 2 will look at the dependencies of those dependencies, etc.).

**Explicit Dependencies**

```json
"deployOnDependencies": {
  "type": "explicit",
  "dependencies": ["@atlaskit/button", "@atlaskit/another-package"]
}
```

Explicitly define what changesets you want to trigger a deployment (the service itself will be included by default).

## The Deployment Pipeline

The deployment pipeline executes a series of steps:

1. If deploying to a production environment from master, it pulls the sox image for compliancy purposes
2. A full `bolt install`
3. Exposes certain environment variables

| Variable          | Value                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `MICROS_TOKEN`    | `sox:$PIPELINES_JWT_TOKEN` for prod deployments, otherwise set to a token for the service (contact AFP to set this up) |
| `MICROS_URL`      | **prod only** `wss://micros-proxy.services.atlassian.com`                                                              |
| `MICROS_ENV`      | Set to the environment declared in the config `master.continuous.env`                                                  |
| `SERVICE_PACKAGE` | Name of the service's package (usually `@af/service-name`), used to run commands inside the package directory          |
| `SERVICE_NAME`    | Name of the service declared in the config `serviceName`                                                               |

1. Installs the Atlas CLI with Micros plugin
2. Executes 5 scripts inside the service package using `bolt w` (so the `cwd` is the directory of your service) **YOU DON'T NEED TO HAVE ALL OF THEM**.
   For more steps you can use the NPM `pre` and `post` notation (e.g. `postbuild`)

| Command       | Example Use Case           |
| ------------- | -------------------------- |
| `pre-build`   | Testing, linting, etc.     |
| `build`       | Build the service          |
| `pre-deploy`  | Provision static service   |
| `deploy`      | Deploy the service         |
| `post-deploy` | Send service URL somewhere |

## Manual Deployments from Branches

You can deploy a service in the repo to any non-prod environment from any branch by manually running the custom pipeline `deploy-service-dev`. The easiest way to do this is on the [Pipelines home page](https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home), click "Run Pipeline" in the top right, select the branch and pipeline (`deploy-service-dev`), and enter the required variables:

- `SERVICE_PACKAGE`: the name of the service's package, usually `@atlassian/service-name`, check the service's `package.json` to ensure you enter the correct name
- `MICROS_ENV`: the micros environment to deploy to, cannot be a production environment (e.g. `ddev`, `stg-east`)

The pipeline also exposes `MICROS_TOKEN` and `SERVICE_NAME` (see "The Deployment Pipeline" section for more information), but you need to contact AFP at **#atlassian-frontend** for the token to be correctly set for your service.

The pipeline executes the same 5 commands outlined in the section above.

## Automatic Deployments From Branches

**Note:** _Each deployment will override the previous one unless you have a built-in way of version management (e.g. deploying to a path that starts with the build's commit hash). The pipeline just deploys to the specified environment, for a different solution see the section below._

We recommend using our Build Status creation CLI in the `post-deploy` step send the service URL to your commit/PR, the tooling doesn't do this automatically because there's no way for us to know what the URL is for every service. You can use it like so:

```
cd ../../build/legacy/ci-scripts && yarn ts-node upload-build-status.ts --name="<service-name> URL" --state="SUCCESSFUL" --URL="<service-url>"
```

## Static Service Rollbacks

Each successful deployment of a static service from master will also upload your built service as a Statlas artefact (using the `static.content` field in the service descriptor).

### From the dashboard - _recommended_

This artefact can then be used to rollback to that deployment using the **Rollback** button located on the deployment card.

1. Head on to the [service dashboard](https://af-service-dashboard.prod.atl-paas.net/).
2. Select your service from the top dropdown
3. Open the deployment card for the environment and the version you want to roll back
4. Click the **Rollback** button

</br>
<img alt="Card deployment example" src="/cloud/framework/atlassian-frontend/images/service_rollback.png" width="300">

### From Bitbucket pipelines

To rollback to a previous version of a static service:

1. Go to [Pipelines home page](https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home), click "Run Pipeline" in the top right.
2. Select the branch: `master` and pipeline: `rollback-static-service`, and enter the service package and version you want to rollback to (e.g. `1.1.0`).

When performing a rollback, the pipeline does the following:

1. Checks out into the version commit.
2. Downloads the previously uploaded artefact (built service) from Statlas for that version.
3. Runs the service's `pre-deploy`, `deploy` and `post-deploy` scripts.

_Notes_:

- Service versioning is tied to the `package.json` version.
- ⚠️ **Rollbacks are only available for static services** ⚠️.

## Static Service Branch Deploys

🚧 **EXPERIMENTAL** 🚧  
_This is a feature with significant limitations, ensure you fully understand what it does before opting-in._

We offer branch deploying (a unique deployment for a commit with a permalink for you to test changes with) for static services, this is done by building the site, compressing the output, and uploading it to a unique Statlas URL:

```
https://statlas.prod.atl-paas.net/atlassian-frontend-services/<SERVICE_NAME>/<BITBUCKET_COMMIT>/
```

The deployment reads the service descriptor to get the name of the directory that static content is built into, and assumes that the file takes the form of `<service-name>.sd.yml` or `<service-name>.sd.yaml`.

However, because the site is served at a subdirectory, this usually breaks most forms of routing (including using `@atlaskit/router` or `react-resource-router`). As a temporary workaround, we expose an environment variable `BASENAME` that contains the subdirectory which can be used in your webpack config and/or route configurations. We are investigating potential solutions that will work out of the box but this is low priority.

The pipeline that is triggered runs the `pre-build` and `build` commands inside your service directory, but doesn't deploy anything to Micros.

Enable this feature with:

```json
"af:services": {
  "serviceName": "service-name",
  "branch": {
    "env": "statlas"
  }
}
```

## Slack Notifications

You can receive simple Slack notifications when the deployment pipelines for your service fail or succeed.

1. Define `af:services.slackChannelId`
   - You can get this from the link to the Slack channel
   - In the Slack app, right click on the channel name in the sidebar and select "Copy Link"
   - The channel ID is the last part of the link (e.g. `CL6HC337Z` from `https://atlassian.slack.com/archives/CL6HC337Z`)
2. Add the `AFP Repo Bot` to your channel

Any deployment using the `deploy-service-prod` or `deploy-service-dev` pipelines (either automatic or manual) will send a notification.
