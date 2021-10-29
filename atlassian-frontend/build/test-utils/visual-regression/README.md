# ⚙️ Puppeteer Visual Regression Testing

Visual regression testing is performed within a Docker image running headless Chrome browser. In production we are [SOX Compliant](https://www.varonis.com/blog/sox-compliance/).

## 📸 How to upgrade Puppeteer?

To upgrade [Puppeteer](https://github.com/puppeteer/puppeteer) you need to update the dependency (_inside the Docker image and the repo dependencies_), then build and publish a new VR docker image for use in CI, and fix or adapt any tests which are impacted.

**This is a multi-step process!**

1. 🐳 Stage 1: [Making a Release Candidate VR Docker Image](#F09F90B3-stage-13A-making-a-release-candidate-vr-docker-image)
1. 🏁 Stage 2: [Validating the new Release Candidate VR Docker Image](#F09F8F81-stage-23A-validating-the-new-release-candidate-vr-docker-image)
1. 🛡️ Stage 3: [Promoting the RC Docker Image to SOX Comliancy](#F09F9BA1EFB88F-stage-33A-promoting-the-rc-docker-image-to-sox-comliancy)
1. 🐎 Stage 4: [Revalidating the Stability with the SOX Compliant Image](#F09F908E-stage-43A-revalidating-the-stability-with-the-sox-compliant-image)

During an upgrade, a non-SOX compliant VR Docker image is used to test the stability of the VR test suite. Later on, after the stability has been proven, the final SOX compliant Docker images are published and deployed.

- Testing the stability of the upgrade

for testing stability, ahead of publishing and deploying the final SOX compliant Docker image once stability is validated.

**Upgrading Chromium _can_ and likely _will_ cause VR image diff failures.**

> _Always manually review the image diffs to see whether they're desirable or regressions!_

Known sources of diffs after Chromium upgrades are:

- Changed system element styles. e.g. [updates to form controls and focus](https://blog.chromium.org/2020/03/updates-to-form-controls-and-focus.html)
  - This type of change causes _expected_ diffs to should be adapted to (_regenerate your images_).
- Changed runtime characteristics may surface race conditions or content shifts.
  - These type of changes cause _unexpected_ diffs. **Review them carefully!**

### 🆕 Bumping Puppeteer

Pick the desired [`puppeteer`](https://github.com/puppeteer/puppeteer/releases) version for the upgrade. It is also worth updating [`@types/puppeteer`](https://www.npmjs.com/package/@types/puppeteer) accordingly.

> **NOTE:** _the tool and types versions often don't align in version number, but work fine together_. e.g.

```
$ npm show puppeteer .version
5.1.0
$ npm show @types/puppeteer .version
3.0.1
```

**Consult the release notes if you're bumping major versions to learn about any breaking changes.**

## 🐳 Stage 1: Making a Release Candidate VR Docker Image

We're going to make a **non-SOX compliant image** as our _proof of concept_ for the upgrade.

> **Publishing the SOX compliant production image is trigged via a CI Pipeline `deploy-docker-ci-container` [_after_](#F09F9BA1EFB88F-stage-33A-promoting-the-rc-docker-image-to-sox-comliancy) we validate our changes work as intended and after the DockerFile updates are merged into `master`.**

Open `services/pipelines-docker-image/visual-regression-image/Dockerfile`.

Find the below snippet and reverse the commented out lines so that it's pointing at `docker.atl-paas.net`.

> The `docker-proxy.services.atlassian.com` proxy url used in production won't work from your local machine.

```yaml
# Production (CI)
# FROM docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend:latest
# Local (use this one when validating new images during an upgrade)
FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend:latest
```

> The base URL changed from **docker-proxy.services.atlassian.com** to _**docker.atl-paas.net**_.

Find the code that _resembles_ the below snippet:

```yaml
# Every time, Puppeteer is bumped, we need to update the chrome-revision-version `local-chromium`.
RUN yarn global add puppeteer@0.0.0
RUN ln -sf /usr/local/share/.config/yarn/global/node_modules/puppeteer/.local-chromium/linux-000000  /usr/local/local-chromium-version
```

1. Replace the Puppeteer `@version` with your desired version number.
   - e.g. `add puppeteer@0.0.0` => `add puppeteer@5.1.0`.
1. Find the Chromium revision number that matches your release (_details on this below_) and set it.
   - e.g. `.local-chromium/linux-000000` => `.local-chromium/linux-768783`.

#### 💻 How to find the Chromium Revision

> **_If_** the version of Chromium has changed between your existing Puppeteer version, and the new one you're wishing to adopt, you'll need to update the _chromium version_ to match.

_Sometimes_ the revision number is included in the Puppeteer [changelog release notes](https://github.com/puppeteer/puppeteer/releases). If available, copy the number (without the letter R) for use in the docker file above. e.g. `- feat(chromium): roll Chromium to r768783`

If it's not readily available in the release notes you can determine the revision by comparing the diff between your release range. You can do this on Github. e.g. https://github.com/puppeteer/puppeteer/compare/v1.18.1...v1.20.0

View the file diff and perform a keyword search for `"chromium_revision"` or `PUPPETEER_REVISIONS`.

Versions of Puppeteer prior to 5.1 have the revision inside `package.json`. e.g.

```json
{
  "puppeteer": {
    "chromium_revision": "737027",
    "firefox_revision": "latest"
  }
}
```

From Puppeteer 5.1+ the revision number is inside `src/revisions.ts`. e.g.

```typescript
export const PUPPETEER_REVISIONS: Revisions = {
  chromium: '756035',
  firefox: 'latest',
};
```

#### 🔔 Publishing the Release Candidate

Consult the _Development workflow_ docs in `/services/pipelines-docker-image/` [here](../../../services/pipelines-docker-image/README.md) to learn about how to publish a new copy for **_local testing & validation_**. _If you're only touching the VR image you can skip the step about the base image._

> **Promoting an RC image is trigged via a CI Pipeline `deploy-docker-ci-container` _after_ we validate our changes work as intended and after the DockerFile updates are merged into `master`.**

With your RC image published in a non-SOX compliant way it's time to restore the production URL so that it works when invoked within CI at a later stage.

Open `services/pipelines-docker-image/visual-regression-image/Dockerfile` again and restore the production URL.

```yaml
# Production (CI)
FROM docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend:latest
# Local (use this one when validating new images during an upgrade)
# FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend:latest
```

> The base URL changed _back_ from **docker.atl-paas.net** to _**docker-proxy.services.atlassian.com**_.

1. Fork a new branch off `master` and commit your changes to the DockerFile.
1. You can open a pull request for this now pre-emptively, or later. See [example](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2329).
   - If opening now, use the `[WIP]` prefix in the PR title to avoid reviewers being assigned.
1. Generate a changeset with a `major` for `@atlaskit/pipelines-docker-image` to describe your version bump changes.

> **This PR won't merge until Stage 3, after you've validated the upgraded puppeteer image in Stages 2.**

## 🏁 Stage 2: Validating the new Release Candidate VR Docker Image

Fork another new branch off your previous one. You'll use this to test the RC's stability and update any tests that need to.

### ⬆️ Updating the DockerFile to use the RC Image

In the same `services/pipelines-docker-image/visual-regression-image/Dockerfile` as earlier, you'll want to **temporarily** re-apply the base image url to work locally.

```yaml
# Production (CI)
# FROM docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend:latest
# Local (use this one when validating new images during an upgrade)
FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend:latest
```

> The base URL changed from **docker-proxy.services.atlassian.com** to _**docker.atl-paas.net**_ again.

Now open `build/test-utils/visual-regression/Dockerfile` and update the base image to point at your new release candiate:

```
#FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend-vr:latest-v99
FROM docker.atl-paas.net/atlassian/my-docker-test-vr:latest-v0 # The value you chose for ${MY_TEST_NAME} with a -v0 suffix.
```

> The **sox/** part of the path was removed, and the image **name and tag** were replaced.

Open `build/test-utils/visual-regression/docker-helper.js` and change this line to point to your release candidate:

```javascript
// Set this when you're attemting to update the VR docker image
const VR_IMAGE_NAME = 'my-docker-test-vr'; // The value you chose for ${MY_TEST_NAME}
// const VR_IMAGE_NAME = 'atlassian-frontend-vr';
```

> The **sox** part of the path was removed, and the image **name and tag** were replaced.

### ⬆️ Updating the Puppeteer repository dependency

Using the same version you chose earlier for use in the DockerFile, its now time to update the dependency within the repository's package.json files.

> **NOTE:** We want to lock it down to a specific version so we deliberately don't use a caret `^` in the version string.
> _This avoids the potential for breakage or inconsistent results between versions._

In your IDE of choice, perform a global _find & replace_ for the dependency.

e.g. `"puppeteer": "5.0.0"` => `"puppeteer": "5.1.0"`.

_Be careful to omit the trailing comma, just in case one dependency has it listed last_.

This will update all the `package.json` files to use the new version.

1. Run `bolt` to install the latest version locally.
1. Commit the updated package.json and yarn.lock files.

### 💻 Running the RC Docker image locally

**With that updated, you can now run and test your file locally**. For the purpose of validation, it is recommended to run a single test file to save time.

`yarn test:vr path/to/your/test.ts`.

> Picking a light weight component will reduce your compilation and test time.
> `packages/design-system/button/src/components/__tests__/visual-regression/buttonSnapshotTest.ts` is a good choice.

If it succeeds, you're fine to continue. If it fails, reach out for help in [`#atlassian-frontend`](https://atlassian.slack.com/archives/CL6HC337Z) on Slack.

**Commit these changes so they're separate from further changes.**

### ☁️ Running the RC Docker image in CI

Next, we'll validate that it's working correctly in CI too.

1. To validate your updated VR image you'll need to edit a VR test in order to run one in CI from the default pipeline.
   - Make a _temporary_, inconsequential change like changing a line comment, or adding a console log.
   - Commit this change in its own commit (_without touching other files_) so that you can easily revert it later.
1. Push your new branch to `origin` and await the default CI pipeline build.
1. Inspect the `Visual Regression Tests` step to ensure it correctly built and had access to your new Docker image.

With that proven under a single, simple test, now it's time to run the full VR test suite to see what impact the updated puppeteer version is having.

Next, you'll need to run the full suite of VR tests to see how many fail (if any) under this new version.

### 🤞 Running the full VR suite to check for failures

You can run the full suite locally and/or remotely.

- To run locally simply run `yarn test:vr` which will run the VR tests for all packages in the repository.
- To run remotely you run a custom pipeline from your pushed branch in Bitbucket: `custom: build-visual-regression`.

If there are any failures, you'll soon find out.

#### 🔥 Adapting to Puppeteer API changes

Consult the puppeteer release notes for breaking changes and update API references in our codebase to adapt.

#### 💪 Adapting failing tests

**Pay attention to failing tests (and the generated image diff snapshots) to see what's happened.**

Are they expected? Or are they regressions? Do the snapshots seem premature?

If the changes are expected, you can rerun those tests using the `-u` flag to update image snapshots.

If the changes seem unexpected, you'll need to validate the cause. If the snapshots appear to be taken prematurely then you may need to enhance the wait conditions in those tests. Feel free to reach out to the teams who own these tests for assistance.

#### How to view the image diff snapshots from failed tests

In CI, navigate to the _Visual Regression_ step and select the _Artifacts_ tab. Click the download (cloud icon) button to get the ZIP file containing the image diffs. You'll see the failed tests in the _Tests_ tab.

Locally, you'll find the images near your test file at `packages/**/src/__tests__/visual-regression/**/__image-snapshots__/`.

Then nested within:

- `__diff_output__` which contains the image diff for test that has visually changed.
  - These images show a visual diff between the expected baseline and the actual result.
- `__errors__` which contains the image for a test that threw a runtime exception and didn't complete.
  - These images show the visual state at the time of the error to allow you see what went wrong. Sometimes they look identical to the expected visual state, so you need to investigate why the error is being thrown.

#### 📸 Updating image snapshots

Depending on the number of tests which need updating you can choose to do them individually or all together. The latter takes much longer obviously.

```sh
# Upate a single test
yarn test:vr path/to/test.ts -u

# Update a few tests
yarn test:vr path/to/test1.ts path/to/test2.ts -u

# Update any/all tests that need updating.
yarn test:vr path/to/test.ts -u
```

Commit the updated image snapshots and push to CI to await confirmation.

Have a look at the visual diff in Bitbucket to see whether the updated images appear to be correct.

> If you're unsure about the changes, reach out to the teams who own the test for confirmation.

### ❄️ Validating the stability (checking for flakiness)

**Run the `custom: build-visual-regression` pipeline 10 times in CI to stress test the upgrade.**

Keep an eye our for flaky tests and adapt any that seem consistently flaky. Commit any further changes you make.

**Once you're happy with the stability of the upgrade, you can request AFP to merge your original docker image upgrade PR.**

## 🛡️ Stage 3: Promoting the RC Docker Image to SOX Comliancy

Now that you've proven the stability of the updated puppeteer version (and your Docker image), now is the time to promote the release candidate.

1. Remove the `[WIP]` prefix from your original docker image pull request.
1. In the PR description, link to your other branch which houses all the VR test file updates (if any) and paste your 10 latest green VR pipeline urls as proof of stability.
1. Once merged, request someone from AFP to run the `deploy-docker-ci-container` pipeline in CI.

> **The `deploy-docker-ci-container` pipeline will deploy a SOX compliant image.**

> The script **synchronises** the Docker images (both `sox/atlassian/atlassian-frontend` and `sox/atlassian/atlassian-frontend-vr`) so even though you didn't change the base image, they will both receive the same version number increment.

## 🐎 Stage 4: Revalidating the Stability with the SOX Compliant Image

With that now merged, and once the custom pipeline has published the new SOX compliant docker image, jump back into your other branch to use it instead of the release candidate.

1. Generate a changeset for `@atlaskit/visual-regression` as a `patch` describing the upgraded Puppeteer version.
1. Open `bitbucket-pipelines.yml` and perform a _find_ for the VR image `name: docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend-vr:latest-v` and update the version number to your newly published version (_n+1_).
1. Now _find_ the base image `name: docker-proxy.services.atlassian.com/sox/atlassian/atlassian-frontend:latest-` and update the version number to the same increment (_n+1_) for all matches.
1. Open `build/test-utils/visual-regression/Dockerfile` and make the same change. Update the `FROM docker.atl-paas.net/sox/atlassian/atlassian-frontend-vr:latest-v` to the new number (_n+1_) for all matches.
1. Open `build/test-utils/visual-regression/docker-helper.js` and restore `const VR_IMAGE_NAME = 'atlassian-frontend-vr';` instead of pointing to the RC image.
1. You can see an example of these changes in this [commit](https://bitbucket.org/atlassian/atlassian-frontend/commits/431faced6ad7bfa1ae4da375c87d7a1058c4ba31) from a previous upgrade.
1. Push those changes to CI and re-run the `custom: build-visual-regression` to ensure everything is still working as expected.

You can see an example of an previous upgrade pull request [here](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2338).

**Run the `custom: build-visual-regression` pipeline _another_ 10 times in CI to gain confidence in the stability of the VR pipeline based on this upgraded Puppeteer version.**

If there are any extra test failures or flakiness results, adapt as needed. Then, once you're happy:

1. Remove the `[WIP]` prefix from this second PR and open it up for review.
1. _Assign someone from AFP as a reviewer._
1. The repo bot will assign reviewers for any packages with altered tests or image snapshots automatically.

## 👏 Well done! 🍰
