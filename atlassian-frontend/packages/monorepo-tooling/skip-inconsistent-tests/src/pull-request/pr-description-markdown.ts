import { getDateString } from '../utils/dates';

export default function getDescription(skippedTestsCount: number) {
  const {
    BITBUCKET_REPO_FULL_NAME,
    BITBUCKET_BUILD_NUMBER,
    SKIP_TESTS_SET_TICKET_DUE_DATE,
  } = process.env;
  const hasDueDate = SKIP_TESTS_SET_TICKET_DUE_DATE === 'true';
  const pipelineUrl = `https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}`;
  const today = getDateString();
  const single = skippedTestsCount === 1;
  const countPrefix = single ? 'One' : 'Some';
  const verb = single ? 'was' : 'were';
  const pronoun = single ? 'it' : 'them';
  return `${countPrefix} of your team's tests ${verb} _**automatically skipped**_ due to failing during a scheduled inconsistent test results [pipeline](${pipelineUrl}) on ${today}.

Visit [go/af-inconsistent-tests-faq](https://go.atlassian.com/af-inconsistent-tests-faq) to learn about this process.

> This PR will attempt to automatically merge to prevent the inconsistent test\(s\) negatively impacting others within the mono-repo. If it fails, please help it to merge.
> 
> Please investigate the test case failure\(s\) to confirm legitimacy. You can then triage and work to restore ${pronoun} at your earliest convenience${
    hasDueDate ? ' before the due date' : ''
  }.`;
}
