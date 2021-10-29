import { shootAndValidateExample } from '@atlassian/commerce-test-library';

describe('Snapshot Test', () => {
  ['vr-billing-details-inline', 'vr-billing-details-panel'].forEach((example) =>
    it(
      `renders correctly ${example.replace(/\-/gi, ' ')}`,
      shootAndValidateExample('billing-details', example),
    ),
  );
});
