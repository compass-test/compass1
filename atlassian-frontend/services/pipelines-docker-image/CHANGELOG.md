# @atlaskit/pipelines-docker-image

## 7.0.0

### Major Changes

- [`3af3d85d9ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3af3d85d9ae) - Upgrade bolt version to ^0.24.10

## 6.0.0

### Major Changes

- [`e81dc1c163e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e81dc1c163e) - DSP-632 Upgrade Puppeteer from 3.0.4 to 10.1.0 (Chromium 92.0.4512.0) within Docker VR Image.

## 5.0.4

### Patch Changes

- [`3a312e6df32`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3a312e6df32) - Install latest version of python to avoid node_gyp issues in CI.

## 5.0.3

### Patch Changes

- [`a1475d15aea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1475d15aea) - Add procps package (browserstack transitive dependency) to pipelines docker image.

## 5.0.2

### Patch Changes

- [`89393a54d61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89393a54d61) - Deploy the new product integrator image to sox.

## 5.0.1

### Patch Changes

- [`ef1cdb726c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef1cdb726c9) - Add the new product integrator image with python install inside.

## 5.0.0

### Major Changes

- [`5b5b04f4175`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b5b04f4175) - Bump yarn from 1.22.0 to 1.22.5 and bolt from 0.24.4 to 0.24.8

## 4.0.2

### Patch Changes

- [`a7a30ac5827`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7a30ac5827) - Adds s3cmd and liblz4-tool dependencies to base image

## 4.0.1

### Patch Changes

- [`092aa77e8e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/092aa77e8e4) - Adding the capability to run product integrator from bitbucket pipeline.

## 4.0.0

### Major Changes

- [`5b0c48fd92`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b0c48fd92) - AFP-1621 Upgrade Puppeteer from 1.17.0 to 3.0.4 (Chrome 81) within Docker VR Image

## 3.0.1

### Patch Changes

- [patch][bbabeda1c4](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbabeda1c4):

  Bump the docker image used in CI to use yarn 1.22.0 as well

## 3.0.0

### Major Changes

- [major][43ae6a9359](https://bitbucket.org/atlassian/atlassian-frontend/commits/43ae6a9359):

  AFP-1494: Do not remove curl from the docker container

## 2.0.0

- [major][2b0c4c499e](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b0c4c499e):

  The new pipeline images are now on node 12.

## 1.0.20

### Patch Changes

- [patch][11f202fcb7](https://bitbucket.org/atlassian/atlassian-frontend/commits/11f202fcb7):

  Add missing latest push for docker container

## 1.0.19

### Patch Changes

- [patch][f8a5d6bcdb](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8a5d6bcdb):

  Pipelines docker container is now SOX compliant

## 1.0.15

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports.

## 1.0.14

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x.
