# Team Central

Super duper quick start guide for Team Central developers

## Pre-req

* Read [go.atlassian.com/af-docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/) and setup your local dev environment
* You will need `install brew install git-lfs`
* You will need `npm install eslint`

## Local dev loop

* Open just the `team-central` package (`packages/team-central`) in IntelliJ IDEA
    * IDEA often struggles to index the entire AFP repo (even with the infinite loop fixes)
    * Other IDE (like Visual Studio Code) doesn't have this problem
* Run `bolt start:team-central` to spin up the docs / examples locally
* Open [http://localhost:9000](http://localhost:9000)

## Adding / removing dependencies

* `cd packages/team-central/help-pointer`
* `bolt add package-name`
* `bolt remove package-name`

## Linting & Typechecking

Pre-commit hook will automatically run linting and perform fixes wherever possible.

If you're using IntelliJ IDEA, it should also pick up eslint + TS config automatically and perform these checks as you write your code.

You could also invoke linting & typechecking manually: 

* `cd packages/team-central/help-pointer`
* `yarn lint`
* `yarn typecheck`
    
## Testing

* `cd packages/team-central/help-pointer`
* `yarn test`

To run webdriver tests

* Change directory to AFP root folder
* `yarn test:webdriver @atlassian/help-pointer`

## Versioning

In order to consume this package in other codebase, we need to version our changes, so it can be picked up by LandKid and deployed to our npm repository.

Yes, do this before raising a PR. We're simplying 'tagging' the release here. LandKid will do the rest.

* `bolt changeset`

For more details, see the AFP docs on [versioning](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/07-versioning/)

## Pull request merging

* Raise a PR and ensure you target `master`
    * `master` is for packages using the "Continuous" release process. This is us.
    * `develop` is for packages using the "Scheduled" release process

* Add Team Central front-enders to the PR, such as these fine people: Oscar Wallhult, Andrew Hammond, Nathan Flew

## Releasing

That's it. LandKid will handle the rest. 

For more info on LandKid, checkout [this doc page](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/06-landkid/) and [LandKid status page](https://atlassian-frontend-landkid.services.atlassian.com/current-state/) for current status.

If you need help with the build, release or LandKid, the fine folks at `#atlassian-frontend` room can help you

## Creating new package / component

* `bolt generate:package`

For more info, [check out this docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/getting-started/03-creating-a-new-component/). 
