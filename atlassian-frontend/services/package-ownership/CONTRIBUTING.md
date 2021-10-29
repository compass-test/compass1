# CONTRIBUTING

## Docker Image

```
$ docker pull docker.atl-paas.net/micros/node-refapp:2.12.3

```

## Local Development

- `yarn start` spins up the docker container so that the required resources (defined in the service descriptor) are available
  - Creates a `nanos-env.json` file for micros environment variables
- `yarn dev` starts the lambda using `lambda-local` at `localhost:8080`
  - Uses `nodemon` for live reloading
- Use `ngrok` to expose your local server for testing it externally

### Environment Variables

If you require additional environment variables (that you would usually define on microscope), create a `secrets.json` file and define them there.

## Authentication

The service requires valid ASAP authentication issued by the service itself. A request to either of the above endpoints that does not have a valid ASAP token will return with `401 Unauthorized`, and a valid token from a different issuer will return with `403 Forbidden`. An existing key that can be used to authenticate requests can be found in the AFP shared Lastpass folder.

Use the [atlas asap cli tool](https://developer.atlassian.com/platform/asap/userguide/tools/atlas-cli/) to generate and save a development key pair.

In the same directory as where the `.asap-config` file was created, run `atlas asap token` to generate a JWT that you can use to authenticate requests.

## Deploying

- `yarn fulldeploy` for changes to the service descriptor and resources (or initial deployment)
- `yarn deploy` for changes made only to the lambda itself
- You can test if the bundling will be successful with `yarn bundle`

### Prod

Must deploy using `sox` credentials from Bitbucket Pipelines: `deploy-package-ownership` custom pipeline.

## Logging

The default logs reported by micros in deploy logs and the `service show` command do not show logging within the lambda function. Remove the `m.type=application` filter and add `@lambda.function!=""` instead.

E.g. `eventtype="micros_package-ownership" (NOT micros_container=platform-*) env=ddev @lambda.function!=""`
