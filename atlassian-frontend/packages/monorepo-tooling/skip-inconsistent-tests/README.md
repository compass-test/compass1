# Skip Inconsistent Tests

This package contains scripts for skipping inconsistent integration and visual regression tests.

Read the announcement blog post [here](https://go.atlassian.com/af-inconsistent-tests-blog), or learn more about the process [here](https://go.atlassian.com/af-inconsistent-tests-faq)

This package is typically run via a custom pipeline, however you can invoke the NPM run scripts locally too.

## Environmental Protection

To combat accidentally skipping many or all tests during an environmental incident, we abort processing if more than **10%** of tests fail.

> _The percentage may change over time._

Additionally, we have certain failure reasons explicitly excluded from processing as they're known to be environmental and outside the control of the test cases. For example, failing to establish a connection to BrowserStack isn't the test's fault, therefore it shouldn't be penalised.


## CI Pipeline

You can run the `custom: skip-inconsistent-tests` pipeline in CI to run the full test suite looking for inconsistent test results.

When manually running the pipeline you can specify optional overrides in the provided environment variable GUI form to expedite your developer feedback loop during debugging.

``` yml
skip-inconsistent-tests:
      - variables:
          # When 'true', performs a 'dry run'.
          # Generated jira tickets use the SKIP project instead of their expected project
          # The pull request avoids assigning reviewers by setting a "WIP" prefix in the PR title.
          # Useful when debugging to avoid spamming developers and jira projects when testing deliberately failing tests.
          - name: DRY_RUN
          # When 'true', ignores the environmental threshold protection to avoid skipping packages that fail more than 10% of their tests.
          # Useful when debugging using a single package with a limited number of test files.
          - name: IGNORE_ENV_THRESHOLD
          # Optional filtering to specific packages or test files to expedite dev feedback loop.
          # Space separated. e.g. "packages/design-system/button" or "path/to/file.ts" or "packages/foo packages/bar packages/baz"
          - name: PACKAGES
          # Optional destination branch override. Defaults to the current branch.
          # Useful when debugging. e.g. "master" or "develop" when you're testing on an unmerged feature branch.
          - name: DESTINATION_BRANCH
```

The pipeline is scheduled to run against mainline branches.

* `master` runs continuous release packages
* `develop` runs scheduled release packages.
* Arbitrary feature branches run unfiltered against all packages.

## Local Use

### Prerequisites

1. You'll need to prebuild the `@atlaskit/codemod-utils` package before running local commands as that package doesn't export a main entry point.
1. You'll need to provide some JUnit report files

### Codemod CLI Prebuild

From the monorepo root, run this the first time you're working in the package `bolt build @atlaskit/codemod-utils` to compile it ready for later usage.

### Report Files

You can either use legitimate reports which you download from a `custom: skip-inconsistent-tests` Pipeline, or you can provide your own mocked ones for local debugging.

Depending on which test type you're targetting, you'll need to supply one or more of these:

**Step ID Files:**

* `test-reports/pipeline-stepid-vr.txt`
* `test-reports/pipeline-stepid-integration.txt`
* `test-reports/pipeline-stepid-mobile.txt`:

They're simple text files containing a Pipeline Step Id. You can make one up or use a real one.

> They're used for generating a link back to the pipeline that created them later in the process
> e.g. `/addon/pipelines/home#!/results/1234/steps/%7B79396781-942b-46d4-9149-668bded0b143%7D/artifacts`

Their contents should resemble this:

```
{79396781-942b-46d4-9149-668bded0b143}
```

**JUnit Reports:**

* `test-reports/VisualRegressionTestsJunit.xml`
* `test-reports/IntegrationTestsJunit.xml`
* `test-reports/MobileIntegrationTestsJunit.xml`

These are JUnit reports generated from running our Jest test suites. Their contents should resemble this:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="jest tests" tests="2" failures="1" errors="0" time="20.000">
  <testsuite name="packages/foo/src/__tests__/visual-regression/test.ts" errors="0" failures="1" skipped="0" tests="2">
    <testcase classname="Describe Label" name="should do a thing" time="16.000">
    </testcase>
    <testcase classname="Describe Label" name="should do another thing" time="4.000">
      <failure>Error: Node is either not visible or not an HTMLElement</failure>
    </testcase>
  </testsuite>
</testsuites>
```
### NPM Scripts

`yarn fetch-failing-tests ./test-reports/` parses the provided XML Junit reports, filters to just the failed tests, and converts them into a JSON representation.

> The report path parameter grabs files relative to the monorepo root (not your `cwd`), so it'll look for `VisualRegressionTestsJunit.xml` etc in the root git ignored `test-reports` folder.

`yarn skip-inconsistent-tests ./test-reports/` reads the generated JSON reports and iterates through the failed tests, skipping them via codemods, and then creating a pull request containing the skipped test(s).

`yarn check-pkgs` outputs the packages which will have their tests run for a particular branch.

> Mainline branches filter the packages based on their release model. `master` for continuous releases, and `develop` for scheduled releases.
> e.g. `BITBUCKET_BRANCH=master && yarn check-pkgs`

### Local testing workaround

When refactoring files in this package, we face a conundrum where it's difficult to validate the changes ahead of merging the PR, due to having to switch branches during the testing process (which discards the changes).

We create a new branch off origin/master which means any changes in the feature branch are lost upon switching.

To avoid this problem, we cherry pick the feature branch's changes into our new branch to ensure they're retained. This has the consequence that the generated pull request will contain not only the skipped tests, but also
the feature branch changes, but that's only a temporary state during active development which disappears once the feature branch is merged.

### Recommended Workflow

You're encouraged to test against a single package locally to expedite the feedback loop.

Pick a package with a small number of tests and deliberately fail a test by changing it's assertion, or add a new test that's destined to fail

> e.g. `expect(true).toBe(false)`.

Chanced are your deliberate failure(s) will exceed the **environmental threshold protection** _(more on this above)_ so you'll want to opt out of that during your debugging by enabled  `IGNORE_ENV_THRESHOLD`.

> e.g. `export IGNORE_ENV_THRESHOLD=true && yarn fetch-failing-tests ./test-reports/`.

See below for the full set of available _environment variables_ which you can prefix ahead of your script invocation to test their differing scenarios.

## Environment Variables

The following environment variables exist in CI to toggle functionality on/off.

* `DRY_RUN`: whether you're performing a dry run for debugging purposes
  * When `true` doesn't assign reviewers to the pull request, and creates Jira tickets in the SKIP project instead of the teams project.
* `SKIP_TESTS_TEST_TYPES`: specifies which test types to run within the pipeline.
  * It's a comma separated list which can contain one or more of these values: `vr`, `integration`, `mobile`.
  * E.g. `vr, integration` would run those two.
* `SKIP_TESTS_SET_TICKET_DUE_DATE`: whether to set a due date on the generated Jira ticket.
  * When `true` sets a due date.
* `SKIP_TESTS_SET_TICKET_ASSIGNEE`: whether to set an assignee on the generated Jira ticket.
  * When `true` sets an assignee.
* `IGNORE_ENV_THRESHOLD`: whether to ignore the environmental protection threshold (10%).
  * When `true` it will continue processing even if more than 10% of tests failed (which we presume is caused by environmental instability).
