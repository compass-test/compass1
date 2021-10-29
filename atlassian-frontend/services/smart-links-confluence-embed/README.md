# Smart Links Confluence Embed

## Deploying to staging / production

1. go to https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/
2. click `Run pipeline` button on top right
3. in the modal:
   1. choose branch `master`
   2. For staging:
      - choose pipeline `custom: deploy-service-dev`
      - set `SERVICE_PACKAGE` as `@atlassian/smart-links-confluence-embed`
      - set `MICROS_ENV` as `stg-east`
   3. For production:
      - choose pipeline `custom: deploy-service-prod`
      - set `SERVICE_PACKAGE` as `@atlassian/smart-links-confluence-embed`
      - set `MICROS_ENV` as `prod-east`
