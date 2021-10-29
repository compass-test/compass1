---
date: '2021-09-27'
---

# Landkid

**_tl;dr_** 🤖 In Atlassian Frontend, we use Landkid, our merge service tool 🐐

## What is Landkid?

Landkid is our solution to the issues caused by a significant number of pull requests merging into master at any one time. Landkid manages a queue of PRs, triggers a `Landkid` build which rebases your branch onto master and runs some additional checks, and merges each PR one at a time.

## What does it mean for new Atlassian Frontend developers?

Nobody in the AF repo has a merge button on their PR, but instead will have a `Landkid Queue` panel. If you are authorized to merge (and your PR has passed all the requisite checks) you will have a shiny blue `land` button.

For now, you can request access in #atlassian-frontend, see [Getting Landkid Access](https://developer.atlassian.com/cloud/framework/atlassian-frontend/getting-started/00-getting-started/#landkid-access).

## Concurrency

When starting a build, Landkid will pass the commits of all currently running builds through to the Landkid pipeline using custom variables, which are used by the pipeline to rebase the build on top of the target branch and those commits. We are framing this relationship between land requests as dependencies, where a land request is dependent on builds that started before it and haven’t successfully merged yet.

[Read more about concurrency in our release blog.](https://hello.atlassian.net/wiki/spaces/~904291390/blog/2019/12/12/605934811/If+Landkid+is+so+good+why+isn+t+there+a+Landkid+2)

_Currently, the concurrency is set to 2_.

## What kind of steps does Landkid run?

Please consult this [page](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/08-continuous-integration/) for further details on the Landkid custom build step.

## Where do I see my Landkid build?

Please visit this [url](https://atlassian-frontend-landkid.services.atlassian.com/current-state/) to check the state of your pull-request and your build.
You can see your pull request represented by a card that looks like:

![landrequest example](/cloud/framework/atlassian-frontend/images/landrequest-example.png)

### Relevant sources:

- [Landkid is landing!](https://hello.atlassian.net/wiki/spaces/AtlasKit/pages/136114043/Landkid+is+landing)
- [If Landkid is so good, why isn't there a Landkid 2?](https://hello.atlassian.net/wiki/spaces/~904291390/blog/2019/12/12/605934811/If+Landkid+is+so+good+why+isn+t+there+a+Landkid+2)
- [Landkid site](https://atlassian-frontend-landkid.services.atlassian.com/current-state/)
- [Landkid pipelines](https://bitbucket.org/atlassian/atlassian-frontend/src/head/bitbucket-pipelines.yml#lines-1310)
