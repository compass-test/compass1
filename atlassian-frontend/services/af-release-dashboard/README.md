# Atlassian Frontend Release Dashboard service

This service package is responsible for the Release Dashboard service, which allows users (primarily Release Managers) to view and perform actions on pull requests associated with scheduled atlassian-frontend releases.

Note: MVP tag indicates that the implementation is MVP-specific, or incomplete and likely to change.

## Supported API Routes

| Endpoint              | Method | Description                                                                                                    |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| /healthcheck          | GET    | Returns running status of the API.                                                                             |
| /api/v1/releases      | GET    | Returns all releases and their associated pull requests (automatically ordered by the pull request merge date) |
| /api/v1/pull_requests | POST   | Creates a new pull request and associates it with the user-specified release (if that release exists)          |
| /api/v1/deployment    | POST   | Creates a new deployment history.                                                                              |
| /api/v1/deployment    | GET    | Gets recent deployment info.                                                                                   |

## Environments

| Environment | Micros Env  | Service URL                                                                                                                  |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| staging     | `ddev`      | [https://af-release-dashboard.ap-southeast-2.dev.atl-paas.net](https://af-release-dashboard.ap-southeast-2.dev.atl-paas.net) |
| prod        | `dev-west2` | [https://af-release-dashboard.us-west-2.dev.atl-paas.net](https://af-release-dashboard.us-west-2.dev.atl-paas.net)           |

## Service Pipelines

Various Pipelines associrated with this service.

| Custom Pipeline                             | Trigger                                                 | Description                                                        |
| ------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| `release-dashboard-pull-request-update`     | _Scheduled:_ Hourly                                     | Synchronises pull requests from Bitbucket into our database.       |
| `release-dashboard-release-timeline-update` | _Webhook:_ On FABDODGEM ticket update or creation       | Synchronises FABDODGEM tickets from Jira into our database.        |
| `release-dashboard-branch-deploy-update`    | _Scheduled:_ Every 20 mins between 6am-9pm Mon-Fri AEST | Synchronises deployments from Confluence Bamboo into our database. |

## Features

### 🐾 Product Fabric Dogfooding:

- The status indicator on the dashboard homepage shows whether the "branch deploy" on [Product Fabric](https://product-fabric.atlassian.net/wiki/home) is "Up to date" or "Stale".
- A pipeline periodically checks for new branch-deploys within confluence-frontend. This information is used for calculating whether it's up to date.
- _Slack notifications_ 🚨 occur for status changes between "Up to date" and "Stale" (or vice versa) within [#twp-release-managers](https://atlassian.slack.com/archives/C012AG16T1A) to let teams know that their blitz testing needs to be delayed or can resume.

### ℹ️ Metrics & Metadata:

- The metrics on the dashboard homepage show the phase averages of the release cycle (e.g. development & production adotion).
- The release details page(s) show the list of pull requests included in the release, and metrics about the release phase durations and product adoption for the given release.

### 🔍 Pull Requests per Release:

- The homepage shows the latest 3 releases. This includes the in-development, as well as the pending release candidate, and the previous release which is undergoing product adoption.
- Each release lists the merged pull requests that went into it.

## Roadmap

| Feature                                            | Status |
| -------------------------------------------------- | ------ |
| View pull requests associated with a release       | Live   |
| Single-click revert pull requests                  | TBC    |
| View branch deploys associated with a pull request | Live   |
| Bisect Release Branch Deploys                      | TBC    |

## Service components

- **UI**: The React frontend that will render the releases data in a dashboard to the user
- **Server**: A Node/Express app that serves out and supports the UI. The [SLAuth service sidecar](https://developer.atlassian.com/platform/slauth/sidecar/configuration/) sits in front of this service, so users will need to be authenticated via web browser, and CI builds will need to include the `PIPELINES_JWT_TOKEN` (or alternatively-named build token) in the Authorization header when communicating with the Server.
  - The Server also exposes an API to support receiving new pull request data from landkid/CI agents on develop branch merges.
- **Database**:
  - This service relies on being able to connect to a running PostgreSQL database for our data layer, and uses TypeORM to connect, map and manage our data entities in the database.
    - In development, we recommend using the `yarn dev:docker` flow, which will provision a docker-compose managed Postgres container, without requiring you to setup any real local Postgres instances on your machine.
    - In real service environments, we will have access to databases on RDS instances, in line with our resource requirements described in the service-descriptor yaml.
- **Scripts**: A collection of scripts that we expect to run in CI. Includes:
  - Service deployment scripts:
    - `set-env-variables.sh`: Sets some required environment variables, with safe fallbacks for local development.
    - `build.sh`: Compiles the server and UI application components, and builds the docker image.
    - `deploy.sh`: Pushes the docker image to Atlassian's docker registry and then deploys that image to Micros.
  - Pull request data builder and collector scripts
    - `buildReleasesWithPrs.ts`: Builds the initial dataset of releases and associated pull requests.
    - `registerNewPrToRelease.ts`: Determines the pull request and release associated with a commit that is being merged into the develop branch, and publishes that data to the release dashboard API. [MVP]
    - `uploadReleases.ts.ts`: Publishes the built releases dataset to Statlas. [MVP]

### Environment Variables

_You don't need all of these up front._

- `BITBUCKET_USER`is your username prefix e.g. `jdoe`
- `BITBUCKET_PASSWORD` is a generated [App Password](https://bitbucket.org/account/settings/app-passwords/) with **read** permissions for _Repositories_ and _Pull requests_.
- `JIRA_USER` is your email address e.g. `jdoe@atlassian.com`
- `JIRA_PASSWORD` is a generated [API Token](https://id.atlassian.com/manage-profile/security/api-tokens).
- `STASH_USER_BOT` is your stash.atlassian.com username. Typically this is your email address prefix e.g. `jdoe`.
- `STASH_TOKEN_BOT` is a generated [Personal Access Token](https://confluence.atlassian.com/display/BITBUCKETSERVER0712/Personal+access+tokens) with **read** permissions for _Project_ and _Repository_.
- `CONFLUENCE_BAMBOO_TOKEN` is a generated [Personal Access Token](https://confluence.atlassian.com/display/BAMBOO0702/Personal+access+tokens) with **read** permissions.
- `PF_BRANCH_BUILD_BAMBOO_KEY` is the Confluence Bamboo plan & branch key that's responsible for building & deploying the SPA.
  - E.g. [CONFMICRO-CFCPB14350-BUILDBRANCH](https://confluence-cloud-bamboo.internal.atlassian.com/browse/CONFMICRO-CFCPB14350-BUILDBRANCH) is the value of their default "Classic - Branch Build and Test" plan's build step for the `atlaskit-branch-deploy-develop` branch.
  - Currently we're using our own plan: [CONFMICRO-AFCBS5-BUILDBRANCH](https://confluence-cloud-bamboo.internal.atlassian.com/browse/CONFMICRO-AFCBS5-BUILDBRANCH). _Use this value_.
- `PF_BRANCH_DEPLOY_VERSION_FILE` is the filename of the product integrator's version file.
  - This is currently [.atlassian-frontend-version](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/browse/.atlassian-frontend-version?at=refs%2Fheads%2Fatlaskit-branch-deploy-develop). _Use this value_.
- `RELEASE_DASHBOARD_TOKEN` can be set to anything for local development (e.g. 'Test'), but for production API calls you'll need to generate a SLAUTH token. _See the "API Manual Testing" section below to learn how to generate one._


> These can be defined in your bash profile, or used as prefixes before running a command.

## Running Locally

### Local development without docker

This is a little bit more complicated to setup, but includes a live reload.

1. Make sure you have postgres already installed on your computer, if you don't https://postgresapp.com/ is an easy way to get it that allows you to disable or enable it via the menubar
2. `cd` into `services/af-release-dashboard` for the following commands
3. Run `bolt` to install dependencies
4. Run the UI and Server by using the `yarn dev` command
5. Seed database (refer to Seeding database below)
6. Sync with Jira for history e.g `RELEASE_DASHBOARD_TOKEN=test JIRA_USER=USER JIRA_PASSWORD='PASSWORD' yarn update-timelines --from hartebeest --to cockatoo --url http://localhost:8080`
7. Grab the Product-Fabric latest deployment info via `RELEASE_DASHBOARD_URL=http://localhost:8080 yarn update-deployment-info`
8. Access the site via http://localhost:8080

## Local development with docker

This is usually a bit quicker to setup, and doesn't require setting up postgres machine. However you won't have live-reload.

1. If you have postgres installed makes sure that it's not running with `lsof -i :5432`, the docker-compose will spin up it's own docker instance and will fail if there's another running
2. Run `bolt` to install dependencies
3. `yarn dev:docker-up` will run the UI and Server with docker-compose.
4. Seed database (refer to Seeding database below)
5. Sync with Jira for history e.g. `RELEASE_DASHBOARD_TOKEN=test JIRA_USER=USER JIRA_PASSWORD='PASSWORD' yarn update-timelines --from hartebeest --to cockatoo --url http://localhost:8080`
6. Access the site via http://localhost:8080

## Seeding the local database

In order to have data in your database you'll have to seed it with information.

1. Run `bolt` to install any dependencies
2. You'll need a BITBUCKET*USER and BITBUCKET_PASSWORD environment variables. You can find your username under \_Bitbucker profile settings* at https://bitbucket.org/account/settings. For your password you'll have to generate a token at https://bitbucket.org/account/settings/app-passwords, You need to give it read permissions to bitbucket services.
3. Run `yarn create:db-seed --from <RELEASE_NAME> --to <RELEASE_NAME>`, where you replace `RELEASE_NAME` with the names of releases you want to get data between. For example if you wanted to get all information between `hartebeest` and `cockatoo` you would run `yarn create:db-seed --from hartebeest --to cockatoo`. This will create a bunch of seed files in `services/af-release-dashboard/src/db/seeds`
4. In order to actually load the seed data into your database you run `RELEASE_DASHBOARD_TOKEN='test' yarn db:load-seed --url http://localhost:8080`. Note that when running locally `RELEASE_DASHBOARD_TOKEN` can be anything also you will have to have the service running before running this command (refer to **Running locally** above).

## Running DB Migrations

**Important Note:** Database migrations are checked into version control under `src/db/migrations`.

### Automatic Migrations

Whenever you run the application it will automatically run all the migrations it can find under `src/db/migrations`. This is the case for `yarn dev` as well as docker start. They will also automatically run on staging and production environments when a new build is deployed.

### Running migrations manually

1. Run `source ./scripts/set-env-variables.sh` to setup environment variables

2. Check that there are migraions to run with `yarn show:migrations`, you should get something like

   ```bash
   yarn run v1.22.0
   $ yarn typeorm:cli migration:show
   $ MIGRATIONS=true ts-node -P tsconfig.migrations.json ./node_modules/typeorm/cli.js -f src/db/config.ts migration:show
   query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'migrations'
   query: CREATE TABLE "migrations" ("id" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id"))
   query: SELECT * FROM "migrations" "migrations"  ORDER BY "id" DESC
    [ ] Initial1607404663147
    [ ] removeBranchNameField1607923890759
    [ ] addCreatedDateFieldToRelease1608256298282
    [ ] releaseExtraInfo1612075789863
    [ ] AddDeploymentHistoryTable1613553760995
   error Command failed with exit code 1.
   info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
   error Command failed with exit code 1.
   info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
   ```

   (Don't worry about the command failing, it fails with code 1 if migrations haven't been run)

   The `[ ] Initial1607404663147` indicates that a migration with name `Initial1607404663147` hasn't been run yet.

3. Run migrations with `yarn run:migrations`

4. Check that migraions were successful with `yarn show:migrations`, you should get output similar to

   ```bash
   yarn run v1.22.0
   $ yarn typeorm:cli migration:show
   $ MIGRATIONS=true ts-node -P tsconfig.migrations.json ./node_modules/typeorm/cli.js -f src/db/config.ts migration:show
   query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'migrations'
   query: SELECT * FROM "migrations" "migrations"  ORDER BY "id" DESC
    [X] Initial1607404663147
    [X] removeBranchNameField1607923890759
    [X] addCreatedDateFieldToRelease1608256298282
    [X] releaseExtraInfo1612075789863
    [X] AddDeploymentHistoryTable1613553760995
   ✨  Done in 2.00s.
   ```

## Generating migrations

Migrations can be automatically created from changes to your /src/db entity files.

To create a migration run `MIGRATION_NAME=<NEW_MIGRAITION_NAME> yarn generate:migrations`, and check the new file into version control

### Running migrations on non-pro non-local environments

For non-prod migrations that will target a real, deployed service environment (e.g. dev-west2):

- You can run the following shell script to output service environment-specific variables to a local .yaml file, e.g. dev-west2 would be: `MICROS_ENV=dev-west2 ./scripts/fetch-env-variables.sh`. A yaml file will be generated at `services/af-release-dashboard/afrd-dev-west2.yaml` and you need to set these enviromental variables to point to dev environment `PG_AF_RELEASE_DASHBOARD_HOST`, `PG_AF_RELEASE_DASHBOARD_PORT`, `PG_AF_RELEASE_DASHBOARD_SCHEMA`, `PG_AF_RELEASE_DASHBOARD_ROLE`, `PG_AF_RELEASE_DASHBOARD_PASSWORD`.
- After running migrations for non local dev environment make sure you reset these environmenal variables to local dev environment and remove the file `services/af-release-dashboard/afrd-dev-west2.yaml`.

## Service deployment

### Service deployment by Manual Pipeline

- Go to Bitbucket `Run Pipelines`
- Select Branch: `master` (or your current working branch for a manual branch deploy) and Pipeline: `custom: deploy-service-dev`
- Set SERVICE_PACKAGE variable to `@af/af-release-dashboard` and MICROS_ENV variable to the environment you'd like to deploy to. (Current dev environment options are `dev-west2` and `ddev`. If in doubt, use `ddev` which is our lowest available environment).
- Click Run.
- Note: Deployment means the pipeline will run through the following NPM scripts: [pre-build, build, pre-deploy, deploy, post-deploy] from your specified branch. This should rebuild the entire JS application, upload to our internal Docker registry, and deploy a running application from the uploaded image.

### API Manual Testing

- You will need the Atlas CLI installed to perform the next steps: https://developer.atlassian.com/platform/atlas-cli/users/install/
- Run the command `atlas plugin install -n slauth` to install slauth plugin.
- To test API endpoints in a deployed environment (e.g. ddev or dev-west2) using a local http client (e.g. Postman or Insomnia), you will need an SLAUTH token. Use `atlas slauth token -a af-release-dashboard -e staging -o http --force --mfa-force` to generate a non-prod token . Include this in your client's HTTP Authorization header when making requests e.g. `Authorization: SLAUTH ey982...`. (Further information on the slauth CLI is described here: https://developer.atlassian.com/platform/slauth/cli/commands/token/)
- Use `af-release-dashboard.postman_collection.json` file to test endpoints using Postman Tool.

#### If you need to connect to the remote databases to manually edit table rows:

> **WARNING:** Don't do this unless you absolutely need to!
> If you _EDIT_ or _DELETE_ data there's no way to undo it (_with the exception of rerunning the scripts that populated the data in the first place_).

- You will need the Atlas CLI installed to perform the next steps: https://developer.atlassian.com/platform/atlas-cli/users/install/
- Install the Micros plugin via `atlas plugin install -n micros`.
- Authenticate using `atlas micros login`.
- Run the command `MICROS_ENV=dev-west2 scripts/fetch-env-variables.sh` (_specifying your desired environment_)
- Open the generated YAML file that gets added to the service root. e.g. `afrd-dev-west2.yaml`.
- It contains various environment variables. Find `PG_AF_RELEASE_DASHBOARD_URL`.
  - Note: there are other similar variables containing a postgres URI, but this is the one with read/write access.
- Use a tool such as [Postico](https://eggerapps.at/postico/) to create a connection to the remote database.
- The value of `PG_AF_RELEASE_DASHBOARD_URL` will be a progres URI. It contains the username, password, host, port, and database values.
- e.g. `postgres\://{username}\:{password}\@{host}\:{port}/{database}`
- Copy & paste the properties into Postico or your alternate tool of choice to connect to the database.

### Service deployment by Automated Pipeline

The service will automatically deploy when a pull request is merged into `master` containing a changeset file for the service.

- The environment it gets auto-deployed to is defined within the `package.json` file.
- By default, it's pointing to `dev-west2` which is our "production" environment.

```
"af:services": {
    "serviceName": "af-release-dashboard",
    "master": {
      "continuous": {
        "env": "dev-west2"
      }
    },
    "slackChannelId": "CPRKU0UJJ"
  },
```

### Service Deployment Slack Notifications

Deployment notifications are sent into [#proj-twp-scheduled-releases](https://app.slack.com/client/TFCUTJ0G5/CPRKU0UJJ) when a new build is published (both success and failure). This is configured by specifying a value within `af:services.slackChannelId` inside the `package.json` file.

For further details and service deployment configuration, see [Atlassian-Frontend Service Support](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/05-service-support).
