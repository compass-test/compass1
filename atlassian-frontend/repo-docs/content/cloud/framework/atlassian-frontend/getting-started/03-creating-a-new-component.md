---
date: '2021-09-27'
---

# Creating a new component

We have a package generator script to help you quickly create a new component:

```
bolt generate:package
```

The generator will ask you a few questions then scaffold a package for your component. Here’s an explanation of some of the questions for people who are new to the repo:

- **Which team do you work on?** We have a code ownership system in the repo which ensures that every package is owned by a team. If your team is new to the repo you’ll need to add your details to the teams.json file before you create a new package.
- **Is your package public, restricted or private?**
  - Public packages are published to NPM under the @atlaskit scope. Anyone in the world can install a public package and their docs will be publicly accessible. Select this option if you intend people outside of Atlassian (e.g. ecosystem developers) to use your component.
  - Restricted packages are published to our internal registry under the @atlassian or @atlassiansox scopes. These packages can only be installed by Atlassians. If you’re unsure, this is probably what you want to choose by default.
  - Private packages aren’t published anywhere and are only used inside the repo. Select this option if this component is only used in a service that also lives in the monorepo.

The generator will create a simple component that you can use as a starting-off point. As you proceed to implement your component please refer to the [Component Design](/cloud/framework/atlassian-frontend/development/01-component-design) section for information on our component architecture guidelines.
