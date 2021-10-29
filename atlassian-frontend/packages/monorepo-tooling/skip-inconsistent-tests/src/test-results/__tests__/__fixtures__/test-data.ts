export const ERROR_STACK_TRACE = `Error: assert.notStrictEqual(received, expected)

        Expected value not be strictly equal to:
        SEVERE
          Received:
        SEVERE

                Message:
          Error : http://bs-local.com:9000/examples.js 47628:8 [WDS] Disconnected!

        Difference:

        Compared values have no visual difference.
            at forEach (/opt/atlassian/pipelines/agent/build/build/test-utils/webdriver-runner/wd-wrapper.ts:552:18)
            at Array.forEach (anonymous)
            at Page._callee25$ (/opt/atlassian/pipelines/agent/build/build/test-utils/webdriver-runner/wd-wrapper.ts:551:14)
            at tryCatch (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:63:40)
            at Generator.invoke [as _invoke] (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:293:22)
            at Generator.next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:118:21)
            at asyncGeneratorStep (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
            at _next (/opt/atlassian/pipelines/agent/build/node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9)
            at runMicrotasks (anonymous)
            at processTicksAndRejections (internal/process/task_queues.js:97:5)
            at Env.fail (/opt/atlassian/pipelines/agent/build/node_modules/jest-jasmine2/build/jasmine/Env.js:722:61)
            at Function.next.fail (/opt/atlassian/pipelines/agent/build/node_modules/jest-jasmine2/build/queueRunner.js:40:22)
            at /opt/atlassian/pipelines/agent/build/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:120:18
            at runMicrotasks (anonymous)
            at processTicksAndRejections (internal/process/task_queues.js:97:5)`;

export const XML_STRING_WITH_FAILURE_TESTS = (
  includeHtmlEntity: boolean,
) => `<testsuites name="jest tests">
<testsuite name="packages/design-system/form/src/__tests__/integration/text-fields.ts" errors="0" failures="1" skipped="0" timestamp="2021-04-29T05:53:40" time="39.467" tests="4">
    <testcase classname="text-fields.ts › Windows 10 chrome 89.0" name="Pressing ctrl + enter in the text area should${
      includeHtmlEntity ? 'n&apos;t' : ''
    } focus on invalid field" time="19.426">
      <failure>${ERROR_STACK_TRACE}</failure>
      </testcase>
    <testcase classname="text-fields.ts › Windows 10 firefox 86.0" name="Pressing ctrl + enter in the text area should focus on invalid field" time="4.7">
    </testcase>
    <testcase classname="text-fields.ts › OS X Big Sur Safari 14.0" name="Pressing ctrl + enter in the text area should focus on invalid field" time="7.486">
    </testcase>
    <testcase classname="text-fields.ts › Windows 10 edge 89.0" name="Pressing ctrl + enter in the text area should focus on invalid field" time="4.583">
    </testcase>
  </testsuite>
  </testsuites>`;

export const XML_STRING_WITHOUT_FAILURE_TESTS = `<testsuites name="jest tests">
  <testsuite name="packages/editor/editor-core/src/plugins/lists-predictable/__tests__/integration/lists.ts" errors="0" failures="0" skipped="0" timestamp="2021-04-14T10:02:04" time="195.059" tests="10">
  <testcase classname="lists.ts Windows 10 chrome 89.0" name="list: shouldn&apos;t change focus on tab if the list is not indentable" time="20.921">
  </testcase>
  <testcase classname="lists.ts Windows 10 firefox 86.0" name="list: shouldn&apos;t change focus on tab if the list is not indentable" time="21.731">
  </testcase>
  <testcase classname="lists.ts OS X Big Sur Safari 14.0" name="list: shouldn&apos;t change focus on tab if the list is not indentable" time="12.306">
  </testcase>
  <testcase classname="lists.ts Windows 10 chrome 89.0" name="list: should be able to insert lists via keyboard shortcut (Windows)" time="5.313">
  </testcase>
  <testcase classname="lists.ts OS X Big Sur Safari 14.0" name="list: should be able to insert lists via keyboard shortcut (Mac)" time="2.709">
  </testcase>
  <testcase classname="lists.ts Windows 10 firefox 86.0" name="list: should be able to navigate lists correctly in firefox" time="6.459">
  </testcase>
  <testcase classname="lists.ts Windows 10 chrome 89.0" name="list: should handle backspace correctly when at the start of a list" time="8.206">
  </testcase>
  <testcase classname="lists.ts Windows 10 chrome 89.0" name="list: should handle delete correctly when at the end of a list" time="7.194">
  </testcase>
  <testcase classname="lists.ts OS X Big Sur Safari 14.0" name="list: ctrl-d shortcut should behave the same as delete key (Mac)" time="1.262">
  </testcase>
  <testcase classname="lists.ts Windows 10 chrome 89.0" name="list: ctrl-d shortcut should not change editable content (Windows)" time="3.299">
  </testcase>
</testsuite>
  </testsuites>`;

export const XML_STRING_WITH_BS_SESSION_TIMEOUT = `<testsuites name="jest tests">
  <testsuite name="packages/editor/renderer/src/__tests__/integration/annotate.ts" errors="0" failures="1" skipped="0" timestamp="2021-05-06T23:46:43" time="37.799" tests="6">
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can&apos;t create an annotation on a text selection that contains inline nodes" time="2.775">
      <failure>Error: Session not started or terminated
    at getErrorFromResponseBody (/opt/atlassian/pipelines/agent/build/node_modules/webdriver/build/utils.js:121:10)
    at WebDriverRequest._request (/opt/atlassian/pipelines/agent/build/node_modules/webdriver/build/request.js:148:56)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at Browser.wrapCommandFn (/opt/atlassian/pipelines/agent/build/node_modules/@wdio/utils/build/shim.js:74:23)
    at Browser.wrapCommandFn (/opt/atlassian/pipelines/agent/build/node_modules/@wdio/utils/build/shim.js:74:23)</failure>
    </testcase>
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can&apos;t create an annotation on a text selection that falls in the middle of an inline node" time="19.462">
    </testcase>
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can create an annotation on a basic text selection" time="2.945">
    </testcase>
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can create an annotation on a text selection over two paragraphs" time="3.131">
    </testcase>
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can create an annotation on a text selection over a decision item" time="3.15">
    </testcase>
    <testcase classname="annotate.ts › Windows 10 chrome 89.0" name="Can create an annotation on a text selection over a task item" time="3.777">
    </testcase>
  </testsuite>
</testsuites>
`;

export const XML_STRING_WITHOUT_TESTS = `<testsuites name="jest tests" tests="0" failures="0" errors="0" time="0.008">
</testsuites>`;
