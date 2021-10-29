import { shootAndValidateExample } from '@atlassian/commerce-test-library';

describe('Package vr test', () => {
  [
    'vr-error-message',
    'vr-narrow-layout',
    'vr-task-action',
    'vr-task-layout',
    'vr-inline-spacing',
    'vr-inset-spacing',
    'vr-stack-spacing',
    'vr-horizontal-stack',
  ].forEach((example) =>
    it(
      `Should shoot and validate ${example}`,
      shootAndValidateExample('layout', example),
    ),
  );
});
