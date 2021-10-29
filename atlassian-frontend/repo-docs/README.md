# Atlassian Frontend developer documentation

This repository contains the developer documentation for Atlassian Frontend. Documentation is written
in Markdown and published to the Atlassian npm repository.

## What's inside

Inside this directory you will find the content and navigation structure for your docs. These will
be published at developer.atlassian.com (DAC):

<https://developer.atlassian.com/cloud/framework/atlassian-frontend/>

## Preview your documentation locally

See the [Getting started](https://developer.atlassian.com/platform/writing-toolkit/getting-started/) guide for step-by-step setup instructions on setting up live preview.
Alternatively, if you have already installed the **DAC** plugin, you can use this [page](https://developer.atlassian.com/platform/writing-toolkit/viewing-your-docs-locally/).

```
cd repo-docs && atlas dac watch
```
or 

```
cd repo-docs && yarn preview
```

## Organize your documentation

Our docs are mostly **Guides** for now.

See the [organize your docs](https://developer.atlassian.com/platform/writing-toolkit/organizing-your-docs/)
section of the _Writing toolkit_ for guidance on organizing your content and page templates.

## Publishing your documentation

Queueing your content for publication to DAC involves the following steps:

- Add your content to the `atlassian-frontend-repo-docs` package, located in `repo-docs` in the monorepo
- For every new page(s) added, create a new entry for it in `repo-docs/data/atlassian-frontend.json`
- Run `yarn dac:prepack` to set the _Last Updated_ dates
- Run `yarn changeset` from the monorepo root and follow the prompts
- After the latest version of this package is released (this should happen shortly after your changes are merged), DAC will automatically pull from it

**Note that your documentation will only be published with the next release of DAC. A DAC release is deployed to production at least twice a day during Sydney business hours; usually once in the morning, and once in the afternoon.**

## Metadata

Certain [metadata](https://developer.atlassian.com/platform/writing-toolkit/metadata/) (YAML
frontmatter) is required in order for the navigation and other page elements, such as the
page title and last published date, to work properly.

## License

Copyright (c) 2016-2018 Atlassian and others.
Apache 2.0 licensed, see [LICENSE.txt](LICENSE.txt) file.
