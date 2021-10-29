# AF Product Integration Lambda

https://microscope.prod.atl-paas.net/services/product-integration  
https://product-integration.services.atlassian.com/

## How it works

There are two main functions, initiated by two different endpoints: `integrator-status` and `pr-created`.

### Function 1: Integrator status

POST /integrator-status

Body - See `RequestBody` type in routes/integrator-status.ts

Stores the result of an branch deploy product integrator build in the DB and posts/updates a comment on a matching PR, if one exists.
A PR matches if the branch and commit of the integrator build matches the source branch and latest commit of the PR.

### Function 2: PR created

POST /webhooks

This function should be called by a PR created webook from a/f.

Checks if the PR matches any existing integrator build statuses stored in the DB, and posts a comment on the PR if so.

### Authentication

There are two forms of authentication used in this service.

ASAP authentication - Used for all standard endpoints (/integrator-status)
API KEY query param (shared secret) - Used for /webhooks requests as bitbucket cloud webhooks does cannot support other forms of authentication

### Environment variables

The following environment variables are required in addition to the ones provided by micros:

- \$BITBUCKET_USER - Used to auth requests against bitbucket cloud's REST API
- \$BITBUCKET_PASSWORD - Used to auth requests against bitbucket cloud's REST API
- \$WEBHOOK_API_KEY - Used to authenticate incoming webhook REST API requests
