import { getIssueLinkText } from './index';

it('builds the full key issue key properly', async () => {
  const SAMPLE_PROJECT_KEY = 'PROJ';
  const SAMPLE_ISSUE_KEY = 6789;
  expect(getIssueLinkText(undefined, undefined)).toBe('');
  expect(getIssueLinkText(SAMPLE_PROJECT_KEY, undefined)).toBe('PROJ');
  expect(getIssueLinkText(undefined, SAMPLE_ISSUE_KEY)).toBe('6789');
  expect(getIssueLinkText(SAMPLE_PROJECT_KEY, SAMPLE_ISSUE_KEY)).toBe(
    'PROJ-6789',
  );
});
