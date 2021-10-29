/* eslint-disable no-template-curly-in-string */
import React from 'react';

import Button from '@atlaskit/button';
import { CodeBlock } from '@atlaskit/code';

import { RUNS_ON_CODE_BLOCK } from '../const';

import CopyButton from './CopyButton';
import {
  ButtonGroupWrapper,
  LabelSection,
  LabelWrapper,
  StepWrapper,
  UseCodeWrapper,
  UseStepCopyButton,
} from './styled';

type Props = {
  onSubmit: () => void;
  onBack: () => void;
  labels: String[];
};

const UseStep: React.FC<Props> = ({ onSubmit, onBack, labels }) => {
  const labelLines = labels.map((label) => `- ${label}`);

  return (
    <StepWrapper>
      <p>
        Copy the labels and add them to{' '}
        <span className="fileName">bitbucket.pipelines.yml</span> in the
        following format:
      </p>
      <UseCodeWrapper>
        <CodeBlock
          showLineNumbers={true}
          text={RUNS_ON_CODE_BLOCK}
          highlight="5"
          language="yaml"
        />
      </UseCodeWrapper>
      <LabelSection>
        <p>Your labels</p>
        <LabelWrapper>
          <UseStepCopyButton>
            <CopyButton
              name="labels"
              content={labelLines.join('\n')}
              analyticEventId={'runnerWizardCopyLabels'}
            />
          </UseStepCopyButton>
          {labelLines.map((label, i) => (
            <p key={`runner-label-${i}`}>{label}</p>
          ))}
        </LabelWrapper>
      </LabelSection>
      <ButtonGroupWrapper>
        <Button className="backButton" appearance="subtle" onClick={onBack}>
          Back
        </Button>
        <Button
          name="finishUse"
          className="forwardButton"
          appearance="primary"
          onClick={onSubmit}
        >
          Finish
        </Button>
      </ButtonGroupWrapper>
    </StepWrapper>
  );
};

export default React.memo(UseStep);
