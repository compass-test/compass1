---
date: '2021-09-27'
---

# Is the repository right for you?

## What kind of project are you building?

### Components

A component is your typical React component that renders some piece of UI. It's distributed as an NPM package. A component's state is primarily driven by props and it typically doesn't fetch its own data. The Button is a simple example, but something as complex as the [Editor](https://atlaskit.atlassian.com/packages/editor/editor-core) or [Navigation](https://atlaskit.atlassian.com/packages/navigation/atlassian-navigation) would also be a component.

If you are building a component it's highly recommended that you use the repo. We have guides for both [creating a new component](/cloud/framework/atlassian-frontend/getting-started/03-creating-a-new-component) and [migrating an existing component](/cloud/framework/atlassian-frontend/getting-started/04-migrating-an-existing-component).

### Apps

An app is typically a React application. It's bundled and deployed to something like micros static. It is possible to set up a more complex deployment that uses AFP's SSR platform or progressive rollout service.

We are not ready to migrate existing apps to the repo. However, a number of greenfield apps (including new products) are being built in the repo. If you are considering building a new app in the repo please reach out in [#help-afp-monorepo](https://atlassian.slack.com/archives/C01EC8T8B8W) and we can discuss your situation.

### Experiences

An experience is like a component in that it's distributed as an NPM package and mounted as a React component, but it behaves more like a route that can be embedded in a product. It handles things that a component would typically pass off to the host platform such as network calls and translations. It wants to integrate deeply with the host platform to take advantage of things like prefetching, server-side rendering, loading phases, feature flags, etc. The Embeddable Directory is a good example of an experience.

Since they're essentially a more complex component, the repo is a great place to build experiences. If you are considering building an experience in the repo please reach out to us in [#help-afp-monorepo](https://atlassian.slack.com/archives/C01EC8T8B8W) so that we can understand your requirements.

## Trade-offs associated with building in the monorepo

When you write your code in the Atlassian Frontend repo you're building on a robust development toolchain that makes it easy for you to develop, test and release your code. We take care of the infrastructure so your team can focus on shipping features. The repo is also the home of many platform libraries including Atlaskit, so by building in the repo you avoid the problems associated with keeping platform dependencies in sync. For a full write-up of what the repo offers please see [this page](https://hello.atlassian.net/wiki/spaces/AFP/pages/908938045/Atlassian+Frontend+monorepo+product+offering).

While there are many benefits of building in the repo, there are a number of associated trade-offs that you should be aware of. Build times will be longer than what you'd experience in a single-project repo - somewhere in the range of 20-30 minutes for a typical build. We have a system for landing PRs that prevents master from going red, so you will very rarely be blocked by another team breaking the build. However, on some occasions we are forced to pause merging to resolve an issue or land a large change. You also need to be aware that your dependencies will be shared with the rest of the repo so upgrading third-party libraries will be more complicated. We have a process in place for regularly upgrading important shared libraries such as React and Typescript. As part of this process you will be required to update the packages you own, if necessary. If you put code in the repo your team must commit to owning it and performing maintenance such as this going forward. If your team is disbanded or rearranged you must find a new owner for your packages.
