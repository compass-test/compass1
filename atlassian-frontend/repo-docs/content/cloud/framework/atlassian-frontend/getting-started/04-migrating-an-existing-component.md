---
date: '2021-09-27'
---

# Migrating an existing component

## Requirements

For the most part the repo isn’t particularly strict about how you write your code. However, if you’re migrating an existing component from your own repo you may have to make a few changes.

- **Typescript** - The repo is Typescript only so we don’t support Flow. If your package is written in vanilla JS we would prefer you to migrate to TS, but you can set "allowJS": true in your package’s tsconfig if you want to bring your package in now then rewrite later.
- **Dependencies** - We only have one version of each dependency in the repo, including internal dependencies. If you have any third-party dependencies that are already used in the repo your component will need to be compatible with the version in the repo. If you depend on any packages that live in the repo (e.g. Atlaskit components) your component will need to be compatible with the latest version of these packages.
- **Ownership** - You team must be willing and able to commit to owning and maintaining your components going forward. For things that aren’t changing this is usually a very small amount of work (a few sweeping changes a year sometimes require small changes to get tests/linting passing etc). If a team is disbanded/reshuffled or is unable to continue maintenance they must find a new owner for their packages (this is 100% non-negotiable).

## Migrating your package

Follow the [guide to creating a new component](/cloud/framework/atlassian-frontend/getting-started/03-creating-a-new-component) to generate the boilerplate for your package. If you’re unsure you can also look at a [reference example](https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/reference/) to see how to configure your package.json and structure your package. Ensure that you set the version number to your package’s current version.
