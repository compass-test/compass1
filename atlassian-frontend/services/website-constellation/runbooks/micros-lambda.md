# micros lambda

Links:

- https://stash.atlassian.com/projects/MICROS/repos/lambda-examples/browse/lambdas/lambda-alb.sd.yaml
- https://hello.atlassian.net/wiki/spaces/MICROS/pages/505840672/Lambda+Resource+Type
- https://hello.atlassian.net/wiki/spaces/MICROS/pages/167214467/HOWTO+Access+the+AWS+console
- https://splunk.paas-inf.net/en-US/app/search/search?q=search%20eventtype%3Dmicros_design-system-docs-lambda%20source%3D1c2b3521-8ac4-498c-ae71-5c27c7b8b64a%20%40lambda.function!%3D%22%22&earliest=-15m&latest=now&display.page.search.mode=smart&dispatch.sample_ratio=1&sid=1585718013.694368_B6F76F89-3785-4C5E-9985-2061ACCE9F3F
- https://hello.atlassian.net/wiki/spaces/MICROS/blog/2020/03/03/653826038/Atlas+CLI+now+supports+interpolation+of+environment+variables+in+service+descriptors
- https://hello.atlassian.net/wiki/spaces/MICROS/pages/167212650/Runtime+configuration+environment+variables+and+adding+secrets#Runtimeconfiguration,environmentvariables,andaddingsecrets-AddingsecretsviaMicroscopeorAtlasCLI

## Upload lambda

```
atlas micros cli service:lambda:upload design-system-docs-lambda dist/hello-world.js.zip -- -e stg-east
```

## Deploy service

Anytime we update environment variables we need to deploy.
This includes updating via CLI, service descriptor, or the microscrope stash UI.

```
atlas micros service deploy --file=design-system-docs-lambda.sd.yml --service=design-system-docs-lambda --env=stg-east
```

```
atlas micros service undeploy --service=design-system-docs-lambda --env=stg-east
```

## Deploy lambda

Only deploys the lambda and not the ensuing EC2 instance - it doesn't seem to do anything else (like update the `handler` field in our service).

`service:resources:set` will provision and/or update all resources for the given environment to match the state of your service descriptor. This means if you've made other resource-related changes, those changes will all be applied along with your lambda when you run service:resources:set.

```
atlas micros resource set --file=design-system-docs-lambda.sd.yml --service=design-system-docs-lambda --env=stg-east
```

## Get information about a service

```
atlas micros service show --service=design-system-docs-lambda
```

## Get access to AWS console

```
atlas micros service assume --service design-system-docs-lambda --env stg-east --console
```

## Scale instances to zero

Due to current limitations in Micros Lambda support deploying a lambda also creates a EC2 instance. Because we don’t need the EC2 instance we can save money by scaling the EC2 instance down to 0. Need to scale down every deployment, see: https://hello.atlassian.net/wiki/spaces/MICROS/pages/167213240/Service+descriptor+reference#schedule +Can use schedules to take it back down.

```
atlas micros compute scale -s design-system-docs-lambda -c 0 --min 0 --max 0
```

## Zip function

```
zip dist/api-$(npx hash-files -f '["./functions/auth.js"]').zip functions/auth.js
```

## Environment variables

- Add them here for every environment https://microscope.prod.atl-paas.net/services/design-system-docs-lambda/stash-keys
- Read up on accessing here https://hello.atlassian.net/wiki/spaces/MICROS/pages/167212650/Runtime+configuration+environment+variables+and+adding+secrets#Runtimeconfiguration,environmentvariables,andaddingsecrets-AddingsecretsviaMicroscopeorAtlasCLI
- tldr use `@atlassian/micros-serverless-platform`

  ```
  const {Secrets} = require('@atlassian/micros-serverless-platform');

  const value = await Secrets.get('key');
  ```

```
atlas micros stash set --service=design-system-docs-lambda --env=stg-east --file=secrets.json
```
