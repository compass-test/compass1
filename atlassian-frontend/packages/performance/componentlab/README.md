# ComponentLab

## About

---

ComponentLab is a Node CLI that collects performance metrics. By adding it to your project, you can measure progress and prevent regression of your components through ITI.

ITI, or instructions to interactive, is a measure of how many instructions it takes for a user to be able to interact with your component. This measurement is the sum of parse, compile, and mean execution instructions, collected over some number of samples.

## Installing ComponentLab

---

To install ComponentLab from npm, run:

```
yarn global add @atlassian/componentlab
```

Verify the installation is successful by running:

```
componentlab
```

```
Options:
  --help             Show help                                         [boolean]
  --version          Show version number                               [boolean]
  --launch           Launch a local version of Chromium. Required if
                     browser-ws-uri is not set                         [boolean]
  --launch-headless  Launch a local version of Chromium in headless mode.
                     Requires launch to be set                         [boolean]
  --launch-sandbox   Launch a local version of Chromium with a sandbox. Requires
                     launch to be set                  [boolean] [default: true]
  --browser-ws-uri   Websocket uri for a remote browser. Required if launch is
                     not set                                            [string]
  --log-level      [choices: "debug", "info", "warn", "error"] [default: "info"]
```

## Usage

---

In order to use ComponentLab, you must create a `__perf__` folder and tests that export the component you would like to profile. The folder and tests may be anywhere in your project, but we suggest colocating it with the UI component you wish to test.

**Example Test:**

```
export default () => <Button>Basic Button Example</Button>;
```

**Note:** Only one export is currently supported per file in **perf**

To run ComponentLab, select the **custom:component-lab** pipeline in Bitbucket. Enter the following information and submit. It will take time to complete depending on the number of tests.

**Branch:** Should be set to your current branch.

**Pipeline:** This should be set to **custom: run-componentlab**

**PERF_TEST_PATH:** This is the path to your `__perf__` folder.

**CHANGES_BRANCH:** This is the name of the branch expected to have improved your component.

**BASELINE_BRANCH:** This is the name of the branch you’d like to compare your changes to.

**RUN_CL_FROM_SOURCE:** This field toggles whether ComponentLab is run from npm or from source. Simply leave it blank.

**Note:** If you do not have two separate branches yet, you may run the **custom:component-lab-single-branch** which will not include the changes branch.

## Understanding Your Results

---

A successful ComponentLab execution should display what files were written:

These are the trace example for each test, and the ITI results. [More information on ChromeTraceEvents.](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview)

ComponentLab displays ITI for both branches, the ITI percent difference, and whether or not this difference is significant.

| Suite Path    | ITI Baseline | ITI Changes | ITI % difference | Significant Difference |
| ------------- | ------------ | ----------- | ---------------- | ---------------------- |
| path/to/suite | 15000000     | 14070000    | -6.20            | No                     |

**Significant Difference:** The significance is determined by a **Z-test**. We conducted our studies with a 95% confidence level, so no significant difference means that the difference between the averages of instruction was not large enough to be an outlier (in the top or bottom 5% of a normal distribution curve). A yes for significant difference means that the two averages are difference enough that you can confirm the difference is not due to random chance.

You may also download your results through the Bitbucket artifacts tab. Artifacts expire after 14 days.
