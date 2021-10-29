# Performance Portal

## Developing with Authentication on

to simulate authenticated user

```
curl http://localhost:3090/saml?user=you
```

for more options go to [SlAuth mock admin page](http://localhost:3090/)

## Running dev server
```
yarn dev
```

## Developing with Local GQL server
to run Perf Portal frontend to connect to local GQL server run:
```
yarn dev:localGql
```

if GQL backend has changes that want to be picked up
```
# update schema from production gql
yarn gqlSchema:update 

# update schema from local gql
yarn gqlSchema:update:local
```

## Deploying to staging / production

1. go to https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/
2. click `Run pipeline` button on top right
3. in the modal:
   1. choose branch `master`
   2. For staging:
      - choose pipeline `custom: deploy-service-dev`
      - set `SERVICE_PACKAGE` as `@atlassian/performance-portal`
      - set `MICROS_ENV` as `stg-east`
   3. For production:
      - choose pipeline `custom: deploy-service-prod`
      - set `SERVICE_PACKAGE` as `@atlassian/performance-portal`
      - set `MICROS_ENV` as `prod-east`
