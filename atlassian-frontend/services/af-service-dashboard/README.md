# Atlassian Frontend Service Dashboard

This service package is responsible for the Service Dashboard, which allows users to view service deployments within the Atlassian Frontend monorepo and rollback to previous deployment versions.

## Functions

Allow developers and service owners to:

- Easily view information about a service's deployment history, status, and metadata.
- Quickly roll back a deployment, to minimise service downtime.
- Pause/unpause deployments for services, to prevent overriding a rolled back service.

## Architecture

- **UI**: TypeScript/React frontend that will render the services and corresponding deployment information in a dashboard to the user.
  - Prod: The frontend files are served by the backend.
  - Local dev: The frontend is served as a webpack dev server (port 3000) and proxies requests to the backend (hosted at port 8080).
- **Server**: Express backend.
- **Database**: Postgres database supported by TypeORM.
- **Authentication**:
  - Micros SLAuth sidecar with SAML and build for authentication.
  - Micros Poco plugin for implementing authorisation policies.
- **APIs**:
  - Bitbucket
  - Pipelines
  - Slack

## Directory Structure

```
src
├── server
│   ├── clients         # business logic
│   ├── db
│   │   ├── entities    # TypeORM entities
│   │   ├── migrations  # generated with yarn migrations:generate
│   │   └── config.ts   # DB connection config
│   ├── routes          # router creators
│   ├── utils           # common utils (logger, environment variables, etc.)
│   └── index.ts
└── ui
    ├── components      # components used by pages (can have nested components)
    ├── resources       # resources consumed by routes
    ├── routes          # pages of the app (consume components)
    │   ├── home
    │   ├── service
    │   └── index.ts
    ├── styles          # common emotion definitions
    ├── utils           # common utils (http requests, etc.)
    ├── App.tsx         # sets up router and header
    └── index.tsx
```

## API Specification

**/api** - GET Requests

- `/services`: Returns a list of all service names.
- `/service-information`: Returns the service's information.
- `/deployments`: Returns the service's deployments
- `/service-state-lock`: Returns whether deployments are paused or not for the service.
- `/deployment-tags`: Returns a unique list of tags from deployments of the service.

**/api/action** - POST Requests

- `/create-deployment`: Adds an in-progress deployment (and the service if not already stored).
- `/update-deployment`: Updates the deployment's entry once the deployment pipeline is finished running.
- `/update-deployment-tags`: Updates the tags on a deployment.
- `/trigger-rollback`: Triggers the rollback pipeline for a deployment.
- `/service-deployment-lock`: Sets the lock state of a service's deployments.

## Local Development

`bolt`: Install root dependencies. (This does not need to be run again in the service directory.)

The following commands are to be run in parallel inside the service directory to ensure the service will run locally:

`docker-compose up`: Runs the Postgres database. View tables/manage database through PG Admin 4 using host: localhost, port: 5433.

Create local environment variables at `./scripts/setup-local-variables.sh`:

```sh
cp scripts/_setup-local-variables.sh scripts/setup-local-variables.sh
```

`yarn dev`: Runs the app. Client available at http://localhost:3000 and server available at http://localhost:8080.

## Deployment Process

Environment: ddev | Service URL: https://af-service-dashboard.dev.atl-paas.net/

For further deployment details, see [Manual deployments from branches](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/05-service-support/#manual-deployments-from-branches)

### Generate SLAuth Token to test webhook

To test the deployment webhook in the dev deployment, generate one using the [atlas slauth CLI](https://developer.atlassian.com/platform/slauth/cli/install/):

```
atlas slauth token -u <staff-id> -m -e dev -a af-service-dashboard -o http
```

The output should look like `SLAUTH [random letters...]`. Copy this and use it as the Authorization header of your requests to the webhook.

## On Call Links

TBC
