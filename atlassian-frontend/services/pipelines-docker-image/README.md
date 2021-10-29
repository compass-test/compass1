# Pipelines Docker Images

_Note_: Now pushed to docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend and atlassian-frontend-vr (for Visual Regression).

Those docker images are used to set up Atlassian-frontend builds in CI. It's primarily been put in place so that
we aren't reinstalling yarn every single build because it's become quite flakey (returning 520 errors from cloudflare).

We've kept it as light as possible by just extending from the `node:XX-slim` image, just as we used to.

(We are hosting this image on the private Atlassian dockerhub.)

# Updating images

The images are published by the "Deploy CI docker container" custom build as we are following SOX compliance, it can no longer be published locally.
When you've made a non-breaking change to the container. Make sure you add an appropiate changeset to the changes.
Once your PR is landed to master, run the custom build to push the changes to dockerhub.

**Important:** Keep in mind that _after_ running the custom build, it will be the first time for the pipeline to run on the new container.
All the builds on the PR still use the previous version of the container. If you are unsure of your container change, please use the "Risky or Breaking changes" process.

**It is mandatory to put a member of AFP team for any of those changes.**

## Risky or Breaking changes

A risky or breaking changes can be:

- Changes to any libraries included in the pipeline images (normal and VR)
- Changes to node version

When making a breaking or risky change to the docker container, you will have to do it in 2 seperate PRs.

1. Make the breaking change **with a major changeset**
2. Once this is landed update the references to the docker container everywhere to the new major version number, i.e: `latest-v2` -> `latest-v3`
3. Run most of the builds: default, landkid, full-suite to make sure you did not break our pipelines and infrastructure.

# Development workflow

_The images are only publishable from master, this can make development cumbersome_.

This part describes how to test your local change and deployment.

_Note_: You will need to be logged to docker.atl-paas.net and grant yourself packages publishing permissions if you haven't already

```
atlas upgrade
atlas plugin install -n packages
atlas packages permission grant
docker login docker.atl-paas.net
```

- Publish the normal pipeline docker container locally using:

```sh
## NOTE: this should be a unique name to avoid naming clashes with other developers.
MY_TEST_NAME=my-docker-test

docker build -t docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest .
docker push docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest
```

- Publish the VR pipeline docker container locally using:

```sh
## NOTE: this should be a unique name to avoid naming clashes with other developers.
MY_TEST_NAME=my-docker-test-vr

cd visual-regression-image

## We'll use the tag `latest-v0` for convenience with our existing version naming scheme, and to denote a release candidate.
docker build -t docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest-v0 .
docker push docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest-v0
```

Then create a branch where you replace your images with your 'test' docker containers instead of the SOX one for any `visual-regression` build.

- Publish the product integrator pipeline docker container locally using:

```sh
## NOTE: this should be a unique name to avoid naming clashes with other developers.
MY_TEST_NAME=my-docker-test-vr

cd product-integrator

## We'll use the tag `latest-v0` for convenience with our existing version naming scheme, and to denote a release candidate.
docker build -t docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest-v0 .
docker push docker.atl-paas.net/atlassian/${MY_TEST_NAME}:latest-v0
```

Then create a branch where you replace your images with your 'test' docker containers instead of the SOX one for `product-integrator-build`.
