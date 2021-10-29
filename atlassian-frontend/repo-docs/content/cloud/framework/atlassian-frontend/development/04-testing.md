---
date: '2021-09-29'
---

# Testing in Atlassian Frontend 🃏

We encourage adding tests for all components in Atlassian Frontend (AF). We support **_unit_**, **_integration_**, and **_visual regression_** testing.
You can learn about the merits of different test types [here](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests).

[**Jest**](https://jestjs.io/) is the testing framework used for _all three_ test types. This means [snapshot testing](https://jestjs.io/docs/en/snapshot-testing) is available for any test type.

Be mindful when [testing asynchronous code](https://jestjs.io/docs/en/tutorial-async#asyncawait) to ensure your test doesn't prematurely finish before your async event has happened.

> _**Note:** on CI, tests are typically only run against changed packages!
> This speeds up test suite execution time, saving system resources for other developers._

**Tooling documentation:**

> _These URLs contain the documentation for the most recent version of each tool, but we may not be using the latest version!_ > _Use the documentation's version switcher to ensure you're reading accurate documenation for the version we use._

- [Jest API Docs](https://jestjs.io/docs/en/api)
- [Webdriver IO API](https://webdriver.io/docs/selectors.html)

> _Additional documentation are available on *Hello* to assist you writing 🦾 Automation tests in Atlassian Frontend._

- [Write Automation Tests in Atlassian Frontend](https://hello.atlassian.net/wiki/spaces/AF/pages/871446959/Write+Automation+Tests+in+Atlassian+Frontend)
- [Best Practices](https://hello.atlassian.net/wiki/spaces/AF/pages/911900779/Write+healthier+and+stronger+tests+in+Atlassian+Frontend)

### 🕵️ Watch mode

_Watch mode_ is available for some of the test types. It will re-run your test(s) whenever a change is made to your test(s) or the mounted code (e.g. _your components, application, test helpers, or data fixtures_).

> _Re-runs are faster than the initial run since the foundations are already stored in memory._

## 🚧 Unit Tests

**Unit tests run against a virtual headless browser ([JSDom](https://enzymejs.github.io/enzyme/docs/guides/jsdom.html)).**

**They are useful for testing components in isolation, without needing to instantiate the wider application.**

> "Verify that individual, isolated parts work as expected."

_These are typically the fastest to run, since they're testing less scope._

> We currently use both `Enzyme` and `@testing-library/react`.
>
> _There is no preferred library but the recommendation is:_
>
> - if testing the component details (children, state, props), use `Enzyme`.
> - if testing the end to end user perspective and for example `data-attributes`, use `@testing-library/react`.

Write unit tests for components using [Jest test framework](https://jestjs.io/docs/en/api).

Tests for each package should be structured under `<pkg>/src/__tests__/unit` or `<pkg>/__tests__/unit`, or alongside their counterpart files using the convention `filename.test.extension`.

- To run all unit tests: `yarn test`.
- To run all tests in watch mode: `yarn test --watch`.
- To run tests for changed packages: `yarn test:changed`.
- To run a single test: `yarn test <path_to_test_file>`.
- To run tests under certain directories: `yarn test <path_to_directory>`.
- To update all snapshot artifacts: `yarn test --updateSnapshot` or `yarn test -u`.
- To update all snapshot artifacts under a directory:
  - `yarn test <path_to_directory> --updateSnapshot` or,
  - `yarn test <path_to_directory> -u`.
- to update one snapshot artifact:
  - `yarn test <path_to_file> --updateSnapshot` or,
  - `yarn test <path_to_file> -u`.

## 👷 Integration Tests

**Integration tests run in a real browser, powered by [WebDriver](https://www.selenium.dev/documentation/en/webdriver/).**

**They are useful for testing how your component(s) work when integrated with wider parts of the application based on _user interaction_.**

> "Verify that several units work together in harmony."

When run in CI, these run against several different browsers, across windows and MacOS, via [BrowserStack](https://www.browserstack.com/).
When run locally, you can choose to send the tests via BrowserStack, or for quicker feedback, you can use your system's Chrome browser.

You can request access to BrowserStack via Service Desk [here](https://hello.atlassian.net/servicedesk/customer/portal/605).

Write integration tests using the [WebDriver I/O automaton testing framework](https://webdriver.io/). They use Jest as the test runner.

Tests for each package should be structured under a `<pkg>/src/__tests__/integration` folder.

For further details or a test template, please consult this [link](https://hello.atlassian.net/wiki/spaces/Atlaskit/pages/136112313/How+to+add+webdriver+browser+tests+for+components+in+Atlaskit).

### Local Chrome

> _By default Chrome runs in headless mode 👤 (invisibly in the background)._

- To run all integration tests: `yarn test:webdriver`
- To run all tests under a package: `yarn test:webdriver <pkg>`.
- To run all tests under certain directories: `yarn test:webdriver <path_to_directory>`.
- To run a single test `yarn test:webdriver <path_to_file>`.

> You can achieve the same commands in **watch mode** by using `test:webdriver:watch` instead. 🕵️
> When using **watch mode**, you would need to start the server in another terminal by doing `yarn start <pkg>`. 🏁
> **To visually see Chrome 👨‍💻 _opt out_ of headless mode via `test:webdriver:watch:chrome`.** 🔎

- If you use `DEVTOOLS=true` with `test:webdriver:watch:chrome`, it will automatically open up the devtools panel.

### Local BrowserStack

Add your BrowserStack credentials to your bash profile.

> _Request access if needed via [service desk](https://hello.atlassian.net/servicedesk/customer/portal/605)_.

```
export BROWSERSTACK_USERNAME=username
export BROWSERSTACK_KEY=aBCdEFg12HiJK3lm4PQ
```

> The same file, path, and directory options from above still work...

- To run all integration tests via BrowserStack: `yarn test:webdriver:browserstack`.

### Mobile Hybrid-Web Integration Testing

**Mobile Integration tests run on a real device, powered by [WebDriver](https://www.selenium.dev/documentation/en/webdriver/) on [App Automate](https://app-automate.browserstack.com/)**

Similar to the desktop web integration tests mentioned above, these leverage [Appium](http://appium.io/) to allow running tests within a WebView within a native iOS or Android application.

These tests run exclusively on [BrowserStack](https://www.browserstack.com/) via the App Automate device farm. This applies to when you run them on your local machine, or when they're run in CI.

> _Request access if needed via [service desk](https://hello.atlassian.net/servicedesk/customer/portal/605)_.
> Consult the above 'Local BrowserStack' section for instructions on setting up your env variables.

- To run all hybrid web integration tests: `yarn test:webdriver:browserstack:mobile`
- To run all tests under a package `yarn test:webdriver:browserstack:mobile <pkg>`
- To run all tests under certain directories `yarn test:webdriver:browserstack:mobile <path_to_directory>`
- To run a single test `yarn test:webdriver:browserstack:mobile <path_to_file>`

> The `@atlaskit/editor-mobile-bridge` is the first package to use this. Reach out to AFP or the TWP Editor team for assistance if you wish to add support for your package(s).

#### Known Browserstack issues

You may face issues when testing with Browserstack. We've put together a [page](https://hello.atlassian.net/wiki/spaces/AF/pages/971139617/Browserstack+known+issues) to view and document known issues.

## 💻 Visual regression tests

Visual regression tests are used to identify visual differences on **UI components** with or without **user interactions**.

> Due to inconsistencies between platforms _(e.g. font rendering, text selection, scrollbars)_ VR snapshots should always be generated from the Docker image.

#### Prerequisite for Visual regression tests

- install docker as it is used to run tests both locally and in CI
- install git lfs through `brew install git-lfs`,
- once latest master is checked out,
- run `git lfs pull` to pull lfs assets
- **troubleshooting:**

  - if you get the error `Skipping object checkout, Git LFS is not installed.` try running `git lfs install` and then `git lfs update --force` to recreate your hooks.
  - if Docker login fails with a message like `Cannot perform an interactive login from a non TTY device`, make sure the version of Docker is up-to-date.
  - if you don’t have docker or having issues with running visual regression tests with docker, we provided a solution to run tests and generate snapshots using a custom build in Bitbucket pipelines. If you need to do so, please follow those steps below:

    - go to your latest commit -> run pipeline -> select `build-visual-regression-generate-snapshots`.
    - provide any package or test file in this format `packages/editor/editor-core`.
    - once the build is finished, go to artifacts in the pipeline tab and downloads the artifacts. You will see 2 files, a `generate_snapshots.txt` file that lists all the new generated images, and the folder with all the new images that you can copy and replace in their respective folders.
    - after adding / replacing the files, in `git` you should view that those files are untracked. Add, commit and push them to your branch - make sure you have `git lfs` installed.
    - in your pull request, you should now see the images differences and that those files are tracked with `git lfs`.

- use **Jest runner** for running the visual regression tests.
- _visual regression tests_ for packages should be structured under `<pkg>/src/__tests__/visual-regression`.
- _visual regression tests_ run using docker, jest-image-snapshot, puppeteer and chromium both on local and CI.
- to run all _visual regression tests_ on local `yarn test:vr`.
- to run all tests under a package on local `yarn test:vr <pkg>`.
- to run all tests under certain directories on local `yarn test:vr <path_to_directory>`.
- to run a single test on local `yarn test:vr <path_to_file>`.
- to run a single test on local using _watch mode_ :
  - you will need to start the server in another terminal with this command `VISUAL_REGRESSION=true yarn start <pkg>`.
  - `yarn test:vr <path_to_file> --watch` will run watch mode headlessly.
  - `yarn test:vr <path_to_file> --debug` will run watch mode only on Chrome browser.
- to update all images snapshots for the entire repository `yarn test:vr -u` or `yarn test:vr --updateSnapshot`.
- to update all image snapshots for the package `yarn test:vr <pkg> --updateSnapshot` or `yarn test:vr <pkg> -u`.
- to update image snapshots for a single test `yarn test:vr <path_to_file> --updateSnapshot` or `yarn test:vr <path_to_file> -u` will update the snapshot if there is a change.

**Notes:**

- you can still use the `--watch` and `--debug` flags with `<pkg>`, `<path_to_directory>` and for all tests but it is not recommended.
- Updating image snapshots isn't possible when the `--debug` flag is used. This ensures committed snapshot images are deterministic when run in CI.

For further details or a test template, please consult this [link](https://hello.atlassian.net/wiki/spaces/Atlaskit/pages/136113035/How+to+add+visual+regression+tests+in+Atlaskit).

## Mocking with jest

Jest provides the ability to mock javascript modules to help isolate the unit under test. Now that we are moving from ts-jest to babel-jest to transform our test code, there are two important differences to call out that relate to mocking.

1. References to out of scope variables in jest.mock functions are now restricted to variables beginning with mock.
2. All imports are hoisted to the top of the file as per spec before any variable declarations/initialisations. This can cause issues with mock functions referencing out of scope variables.

An example,

```js
const mockSomething = jest.fn(() => 5);

jest.mock('foo', () => {
  something: mockSomething;
});

import bar from 'bar';
```

This then gets compiled to:

```js
jest.mock('foo', () => {
  something: mockSomething;
});
import bar from 'bar';

var mockSomething = jest.fn(() => 5);
```

which means that if the `bar` module imports `something` from `foo`, the value will be `undefined`. Previously ts-jest would not hoist the import and so `something` would reference the mock function.

Some helpful guidelines to avoid this problem and others are listed below.

### Prefer inlining mocks rather than assigning to an out of scope variable

Using out of scope mock variables in your `jest.mock` calls is _not_ recommended because the mock variables are not initialised until _after_ all imports of a file are processed. This means
the mock implementation will be undefined if any of the other imports in your test file rely on the module being mocked.

Instead, you should inline the mock definition and can refer to the mock afterwards by using a normal import of the module.

Do:

```js
  jest.mock('my-module', () => ({ sum: jest.fn() }));

  import { sum } from ('my-module');

  beforeEach(() => {
    (sum as jest.Mock).mockImplementation(() => ...);
  })
```

Don't:

```js
  const mockSum = jest.fn();

  jest.mock('my-module', () => ({ sum: mockSum }));

  beforeEach(() => {
    mockSum.mockImplementation(() => ...);
  }
```

### You can require modules within a jest.mock function

Due to the `mock` out-of-scope variable restriction and the fact that `jest.mock` calls are hoisted, you will find yourself unable to reference modules imported at the top of your test file. You can instead manually require them within the `jest.mock` function itself:

jest.mock('my-module', () => {
const React = require('react');

return { ... };
});

### Use separate `.mock` files when using mock variables

If you can't inline your mock definition and need to store a reference to something not directly exposed by the module, you can use mock variables. This can be done as follows:

```js
  const mockThing = jest.fn();

  jest.mock('my-module', () => ({ doStuff: mockThing }));

  it('does stuff', () => {
    ...
    expect(mockThing).toHaveBeenCalled();
  });

```

Care must be taken though because `jest.mock` calls are [hoisted](https://jestjs.io/docs/en/es6-class-mocks#calling-jestmockdocsenjest-objectjestmockmodulename-factory-options-with-the-module-factory-parameter) to the top of the file _as well as all other imports_. This means that the mock variables referenced in the `jest.mock` call will not be initialised until after the `jest.mock` and all other imports are processed. This can result in your mock resolving to `undefined` if other imports in the file reference the mocked module in question.
To safeguard against this, we recommend creating a separate `<test>.mock.ts` file that houses all of your `jest.mock` calls that is then imported as the first import in your test file. E.g.

```js
// @file my-test.mock.ts
  export const mockThing = jest.fn();

  jest.mock('my-module', () => ({ doStuff: mockThing }));

// @file my-test.ts

  import * as mocks from './my-test.mock.ts';

  it('does stuff', () => {
    ...
    expect(mocks.mockThing).toHaveBeenCalled();
  });
```

Defining the mocks in a separate file and importing as the first import in your test file ensures that the mocked modules are not used before the mock variables are initialised. This is required because Babel (and the es6 spec) hoists import statements before anything else.

### You can partially mock out a file using `jest.requireActual`

If you only want to mock out one export of a module, you can use `jest.requireActual` inside the mock definition

```js
jest.mock('foo', () => {
  return {
    ...jest.requireActual('foo'),
    bar: jest.fn(),
  };
});
```

### Getting an undefined related error when mocking can be caused by circular file dependencies

Even if you have moved your mocks to a separate file to ensure mock variables are instantiated before other imports, you still may get errors where imports aren't defined.

This can be caused by circular file dependencies within your package that are preventing mocking from working. To fix this you must remove the circular dependencies related to the place
where the error occurs.

To identify and lint against circular file dependencies you can enable the circular dependencies tech stack rule by adding the following to your package.json:

```
"techstack": {
  "@atlassian/frontend": {
    "circular-dependencies": [
      "file-level"
    ]
  }
}
```

References:

- https://jestjs.io/docs/en/mock-function-api
- https://jestjs.io/docs/en/es6-class-mocks
- https://jestjs.io/docs/en/bypassing-module-mocks

## 🧯 Test Inconsistency

Test inconsistency (or flakiness) is a common problem in our industry.

> Tests merged into a mainline branch such as `master` or `develop` should be stable.
> They’ve already passed peer review, and have already run the stability gauntlet in CI ahead of merging into those branches.

In atlassian-frontend we attempt to combat it in CI in several ways:

- Rerunning failed tests allows us to gracefully recover from inconsistencies by rerunning a subset of failures.
- Tests are typically only run for _changed packages_ (those modified within a branch).
  - Reducing the surface area for flakiness by only running tests which are appropriate and applicable to the changes within a branch.
- [Test Caching](https://hello.atlassian.net/wiki/spaces/AF/blog/2021/08/31/1306752750/Speeding+up+tests+in+CI) is used to avoid the need to run tests which haven't been impacted by the changes in a branch.
- [Inconsistent Test Skipping](https://hello.atlassian.net/wiki/spaces/AFP/pages/1297911414/Inconsistent+Test+Skipping) is a nightly pipeline (for `master` and `develop`) which runs our test suites looking for failures.
  - Any tests which fail on their first attempt, are considered inconsistent, and get automatically skipped to remove their burden from others in the repository.
