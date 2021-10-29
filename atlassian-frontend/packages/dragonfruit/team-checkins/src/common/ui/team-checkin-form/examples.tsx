import React from 'react';

import styled from '@emotion/styled';
import { number, radios, text } from '@storybook/addon-knobs';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCheckinForm } from './index';

const StoryWrapper = styled.div`
  max-width: 500px;
`;

export const TeamCheckinFormExample = () => {
  const mode = radios(
    'Form mode',
    {
      Create: 'create',
      Edit: 'edit',
    },
    'create',
  );
  const submissionLatency = number('Submission latency (ms)', 1000);
  const testId = text('testId', 'sampleTestId');

  return (
    <TeamCheckinForm
      onCancel={() => {}}
      onSubmit={() =>
        new Promise(resolve => setTimeout(resolve, submissionLatency))
      }
      mode={mode}
      testId={testId}
    />
  );
};

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>
        <StoryWrapper>{storyFn()}</StoryWrapper>
      </CompassTestProvider>
    ),
  ],
};
