---
title: Atlassian-Frontend
platform: cloud
product: atlassian-frontend
category: devguide
subcategory: index
date: '2021-09-27'
---

# Atlassian Frontend

[![node v12.3.1+](https://img.shields.io/badge/node-v12.3.1%2B-brightgreen.svg)](https://nodejs.org/en/)
[![bolt v0.24.4+](https://img.shields.io/badge/bolt-v0.24.4%2B-brightgreen.svg)](http://boltpkg.com/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://ecosystem.atlassian.net/servicedesk/customer/portal/24)

## Introduction

The [Atlassian Frontend][afp_repo] repository is a monorepo for frontend components, experiences and applications across Atlassian. It is strongly recommended that all shared components and new product frontends are developed in this repository. The repository provides teams with a powerful development and deployment toolchain. Building in the repository eliminates the complexities and toil associated with managing Atlaskit dependencies, since these packages also live in the monorepo.

This site documents the Atlassian Frontend build tooling. If you are looking for documentation for components that live in the repository see [atlassian.design](http://atlassian.design/) for the Design System components or [go/afmaster][afregistry] for all other components.

**This project is bound by a [Code of Conduct][codeofconduct].**

## Getting Started

- If you are trying to set up Atlassian Frontend as a developer see: [Getting started](/cloud/framework/atlassian-frontend/getting-started/00-getting-started/)
- If you are trying to decide whether you should build your component or app in this repo see: [Is the repository right for you?](/cloud/framework/atlassian-frontend/getting-started/02-is-the-repository-right-for-you/)

## Reporting Issues

If you are trying to report an issue with a component developed in the repo please raise this directly with the team that owns the component. Every package in the repo has an `atlassian.team` field in its package.json. You can look up the team name in the [teams.json file][teams] to find the Slack channel and Jira project for the responsible team.

If you need help with the build tooling in the repo ask in the [#atlassian-frontend](https://atlassian.slack.com/archives/cl6hc337z) Slack channel. Please read the [channel guidelines](https://hello.atlassian.net/wiki/spaces/AFP/pages/908933183/Atlassian+Frontend+Channel+Guidelines) and consult these docs before asking a question. We also maintain a [list of known issues](https://hello.atlassian.net/wiki/spaces/AFP/pages/908938847/Build+Pipelines+Known+Issues+Bugs).

If you need to contact the team that manages the Atlassian Frontend monorepo directly you can ask in [#help-afp-monorepo](https://atlassian.slack.com/archives/C01EC8T8B8W). Please note that this channel does not have !disturbed and all build support requests should be raised in [#atlassian-frontend](https://atlassian.slack.com/archives/cl6hc337z).

## License

Atlassian Frontend is a monorepo, which means that different parts of this repository can have different licenses.

The base level of the repository is licensed under [Apache 2.0][license]. There are separate license files for each component that specifies the license restrictions. (For example, [view the Avatar license](https://bitbucket.org/atlassian/design-system-mirror/src/master/design-system/avatar/LICENSE)).

Please note that packages containing styles, assets, and icons are most likely licensed under the [Atlassian Design Guidelines license](https://www.atlassian.design/license). (For example, [view the Icon license](https://bitbucket.org/atlassian/design-system-mirror/src/master/design-system/icon/LICENSE)).

If you fork this repository, you can continue to use Atlassian Design Guidelines licensed components only under the given license restrictions. If you want to redistribute this repository, you will need to replace these Atlassian Design Guidelines licensed components with your own implementation.

Copyright © 2021 Atlassian.

[afp_repo]: https://bitbucket.org/atlassian/atlassian-frontend 'Atlassian Frontend'
[adg]: http://atlassian.design/ 'Atlassian Design Guidelines'
[adg_license]: https://atlassian.design/guidelines/handy/license
[license]: https://bitbucket.org/atlassian/atlassian-frontend/src/master/LICENSE
[afregistry]: http://go.atlassian.com/af-registry 'Atlassian Frontend registry'
[codeofconduct]: https://bitbucket.org/atlassian/atlassian-frontend/src/master/CODE_OF_CONDUCT.md
[teams]: https://bitbucket.org/atlassian/atlassian-frontend/src/master/teams.json
