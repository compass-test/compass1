# Compass

Historically was called `dragonfruit`.

Any questions on how to work with anything related to Compass?
You can find the [knowledge base // technical guides here](https://hello.atlassian.net/wiki/spaces/ServiceMatrix/pages/1010252001/Knowledge+base+technical+guides).

## How to set up your local dev environment

You can find instructions on how to set up Compass locally at https://hello.atlassian.net/wiki/spaces/ServiceMatrix/pages/951803147/Engineering+Tools.

## Deploying to staging / production

1. go to https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/
2. click `Run pipeline` button on top right
3. in the modal:
   1. choose branch `master`
   2. For staging:
      - choose pipeline `custom: deploy-service-dev`
      - set `SERVICE_PACKAGE` as `@atlassian/dragonfruit`
      - set `MICROS_ENV` as `stg-east`
   3. For production:
      - choose pipeline `custom: deploy-service-prod`
      - set `SERVICE_PACKAGE` as `@atlassian/dragonfruit`
      - set `MICROS_ENV` as `prod-east

## Build info

The following build information is added to the build and can be accessed in the browser console when accessing the frontend.

`COMPASS_BUILD_KEY` - Bitbucket pipelines build number
`COMPASS_BUILD_VERSION` - commit hash

## Development

For Development guidelines and tips on branching, i18n, changesets, please refer to https://hello.atlassian.net/wiki/spaces/ServiceMatrix/pages/987029907/Compass+Development+Guidelines+and+tips.

### GraphQL Codegen

The most common need when using type systems with GraphQL is to type the results of an operation.
Given that a GraphQL server's schema is strongly typed, we can even generate TypeScript definitions automatically using the Apollo CLI.

You can automatically generate these types by running the following:

```shell
$ yarn graphql
$ yarn graphql:watch # Watch for changes and regenerate definitions
```

`graphql:watch` is automatically run as part of the build process

### Storybooks

React Storybook allows individual components to be implemented and viewed in isolation. You can integrate storybooks with mock responses, allowing you to test your component. Most storybook files are named as `examples.tsx` and are co-located with the component they use. If there are multiple components being used in a storybook, the examples will be located in an `examples` folder, under the root folder of the package.

To view your storybook files from the root `atlassian-frontend` directory, run:

```
yarn storybook <package-name>
```

You can find the package name in the corresponding `package.json` file.

## Testing

To view the general approach to testing in the Dragonfruit FE, go to
https://hello.atlassian.net/wiki/spaces/ServiceMatrix/pages/984975103/CTAG-11+Compass+Frontend+Testing+Strategy

Unit and integration tests are usually kept under the `<package-name>/src/__tests__` folder. Otherwise, they will be a `test.tsx` that is co-located with the component that it is testing.

To view more on how to run your tests, as well as which framework to use, go to [Testing in Atlassian Frontend](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/04-testing/).
