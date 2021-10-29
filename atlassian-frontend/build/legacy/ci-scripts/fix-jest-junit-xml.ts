import { JSDOM } from 'jsdom';
import { promises as fs } from 'fs';

const defaultJunitXmlPath = '../../../test-reports/junit.xml';

/**
 * Jest outputs:
 * <testcase>
 *   <failure>info 1</failure>
 *   <faulure>info 2</failure>
 * </testcase>
 *
 * Bitbucket pipelines refuses to parse this, so a lot of times the test results in our CI will
 * only show 1 failing test (even though there might be 1000s). Having to scan the console output
 * is the current workaround but it kind of sucks.
 *
 * This small script merges the failure elements into:
 * <testcase>
 *   <failure>info 1
 *   info 2</failure>
 * </testcase>
 */
async function main() {
  // Uses the default path in the absense of an argument provided path
  const xmlPath = process.argv[2] || defaultJunitXmlPath;

  try {
    await fs.access(xmlPath);
  } catch (err) {
    console.error(`Could not access path ${xmlPath}`);
    return;
  }

  const xmlString = await fs.readFile(xmlPath);
  const dom = new JSDOM(xmlString, { contentType: 'application/xml' });

  const document = dom.window.document;
  const testcases = document.querySelectorAll('testcase');

  for (let testcase of testcases) {
    const failures: Element[] = Array.from(
      testcase.getElementsByTagName('failure'),
    );

    failures
      .filter((_value, index) => index !== 0)
      .forEach((failure, _index) => {
        const textContent = failure.textContent || '';
        /**
         * Errors with "Expected at least one assertion to be called but received none."
         * come from our jest framework setup. They get triggered because the test has failed
         * before it reached any of the assertions. THis is a nonsensical error when there were different
         * reasons for the case failing, so we just delete those from the junit.xml
         */
        if (
          !textContent.includes(
            'Expected at least one assertion to be called but received none.',
          )
        ) {
          failures[0].textContent += `\n${textContent}`;
        }
        testcase.removeChild(failure);
      });
  }
  const newXmlString = `<?xml version="1.0" encoding="UTF-8"?>\n${document.documentElement.outerHTML}`;
  await fs.writeFile(xmlPath, newXmlString);
}

main().catch(err => {
  console.error(err);
  // We don't want this to ever exit non-zero, as this script is non-essential.
  // It's just a developer quality of life improvement
  process.exit(0);
});
