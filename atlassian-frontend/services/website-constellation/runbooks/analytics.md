# Analytics

## Adding new Analytics

We use both `@atlaskit/analytics-next` and `@atlassian/analytics-bridge` for declaring our analytics.
We've already defined all the plumbing to fire _any_ type of Analytic event - it's just up to you to declare and fire them.

Read the library documentation to get stared.

- https://atlaskit.atlassian.com/packages/analytics/analytics-next
- https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/data/analytics-bridge

And check out the analytics home page as well:

- http://go/analytics

## Data portal

You can find all analytic events registered here:
https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry?page=1&product=designSystemDocs

There are two types of screen events defined here:

1. Hard coded pages

These include the `home`, `notFound`, `search`and `login` screens.

2. Dynamic pages

These include `index` and `content` screens. All resource home pages (like brand, components) fall under `index`. All content pages (avatar, icon, etc) fall under `content`.

When adding a new CMS page, or adding a new component, we don't need to create a new entry in Data Portal because they all use the same screen names.

To differentiate between them they all have a `name` attribute - that is a unique idenifier for the screen inside Constellation.

## Amplitude

https://analytics.amplitude.com/atlassian/space/ynonedr

Here you will find all the dashboards we've created for Constellation.
