# Overview

This is a 'service' that pushes analytics to the `events-catalog-service` which backs the `Data portal` (https://data-portal.internal.atlassian.com/).

This is deployed when certain packages are changed (see `af:services.deployOnDependencies.dependencies` in `package.json`).

This will deploy to staging on branch builds and prod when merged into master. Note that staging is shared between all the branches so your changes could be overwritten if multiple people are working on the same package.

# Getting started

If you're a team that fires product analytics from your components and want to keep your analytis in data portal in sync with your repo you can use this service.

To get started you will need to define your own `analytics.spec.yaml` file in your package, see `packages/search/product-search-dialog/analytics.spec.yaml` as an example. You can then opt-in by adding your package to the `package.json` for this service so the right builds get triggered when your package changes.

Defining existing analytics in your `analytics.spec.yaml` require additional steps. Please ping @czeng on Slack and he'll manually do this for you.

# Custom pipeline

This service is deployed using the custom pipeline `deploy-analytics-to-data-portal` (see `bitbucket-pipelines.yml`).

This pipeline runs the `build` and `deploy` step in that order. Additional steps that are added will need to include a corresponding step to the custom pipeline.
