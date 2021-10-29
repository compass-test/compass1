# CONTRIBUTING

## Getting started

1. You'll need to pull the docker image referenced in your service descriptor under `links.binary`

```
$ docker pull docker.atl-paas.net/micros/node-refapp:2.12.3
```

If you aren't already logged in, you may have to login before that

```
$ docker login docker.atl-paas.net
```

2. Create an empty secrets.json file. You can add any required env vars for local development in here later

## Developing

If your service has other resources besides the lambda, you'll want to run `yarn start` to start the docker container running the service so that those local resources are available.

To run the lambdas themselves, run `yarn dev` and then submit requests to localhost:8080.

## Authentication

To authenticate against ASAP endpoints, use the atlas asap cli tool https://developer.atlassian.com/platform/asap/userguide/tools/atlas-cli/.

To use Postman with ASAP, run the `atlas asap token -a <audience>` command to get your JWT that you can then add to the Authorization header in postman as `Bearer <token>`

## Testing integrations locally

If you want to test your local changes against requests made from an external system like a bamboo build or bitbucket webhook, you can use ngrok to expose your dev server to the internet.

Sign into https://dashboard.ngrok.com/ with SSO and you should then have access to a paid plan. You can then reserve a domain for you to use so that you have a consistent ngrok URL you can reference rather than the default behaviour of a random hash that changes each time.

After that run something like:

```
ngrok http 8080 --host-header=rewrite --subdomain=your-subdomain-name --region=au
```

## Deploying

The following environments we deploy to are ddev, stg-east and prod-east.

### Environments

#### ddev

URL: https://af-product-integration.ap-southeast-2.dev.atl-paas.net

Dev deployments are executed on dev branches via bitbucket pipelines. Browse to the pipelines page of the a/f repo and click 'Run pipeline'. Choose your dev branch and the 'deploy-service-dev' pipeline.

Set `MICROS_ENV` to `ddev`.

#### stg-east

URL: https://af-product-integration.us-east-1.staging.atl-paas.net

Service deployments to staging are now automated on every push.

If you still need to manually deploy the service, browse to the pipelines page of the a/f repo and click 'Run pipeline'. Choose your dev branch and the 'deploy-service-dev' pipeline.

Set `MICROS_ENV` to `stg-east`.

#### prod-east

URL: https://af-product-integration.us-east-1.prod.atl-paas.net

Service deployments to production are now automated upon code merged to master (service needs to have a changeset).
If you still need to manually deploy the service, browse to the pipelines page of the a/f repo and click 'Run pipeline'. Select the master branch and the 'deploy-service-prod' pipeline.

Set `MICROS_ENV` to `prod-east`.

### URLs

The internal (behind the firewall) URLs of the service can be found by executing `atlas micros service show -s af-product-integration`.

The external URLs served by globaledge (for the webhooks endpoint) can be found at https://envoy-controlplane.dev.atl-paas.net/ui/resources/scoped-routes and are of the form:

- https://af-product-integration.dev.services.atlassian.com
- https://af-product-integration.stg.services.atlassian.com
- https://af-product-integration.services.atlassian.com

Note that global edge is setup to only route the /webhooks endpoint through and only for the whitelisted bitbucket cloud IPs.

### Logging

The default logs reported by micros in deploy logs and the `service show` command do not show logging within the lambda function. Remove the `m.type=application` filter and add `@lambda.function!=""` instead.

E.g. `eventtype="micros_af-product-integration" ( NOT micros_container=platform-*) (ddev env=ddev) @lambda.function!=""`
