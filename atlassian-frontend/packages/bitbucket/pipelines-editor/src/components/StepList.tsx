import React, { useCallback, useState } from 'react';

import Code from '@atlaskit/code/inline';

import { Step } from '../types';

import DeployStepLogo from './assets/DeployStepLogo';
import ManualStepLogo from './assets/ManualStepLogo';
import ParallelStepLogo from './assets/ParallelStepLogo';
import CopyYml from './CopyYml';
import PipeDetailModal from './PipeDetailModal';
import {
  DeploymentStepCopyWrapper,
  PipeDescription,
  PipeIcon,
  PipeItem,
  PipeListWrapper,
  PipeText,
  PipeTitle,
} from './styled';

export const steps = [
  {
    name: 'Deployment Step',
    description: 'Deploy your repository to an environment.',
    logo: <DeployStepLogo />,
    yml: `- step:
    name: Deploy to test
    deployment: test
    # trigger: manual  # Uncomment to make this a manual deployment.
    script:
      - echo "Deploying to test environment"`,
  },
  {
    name: 'Manual Step',
    description: 'Optionally run this step in your pipeline.',
    logo: <ManualStepLogo />,
    yml: `- step:
    name: Manual step
    trigger: manual
    script:
      - echo "This step runs once you click the 'Run' button"`,
  },
  {
    name: 'Parallel Step',
    description: 'Runs multiple steps simultaneously.',
    logo: <ParallelStepLogo />,
    yml: `- parallel:
  - step:
      name: Test group 1
      script:
        - echo "Running test group 1"
  - step:
      name: Test group 2
      script:
        - echo "Running test group 2"`,
  },
];

type Props = {
  onOpenDetail?: (step: Step) => void;
};

const StepList: React.FC<Props> = ({ onOpenDetail }) => {
  const [step, setStep] = useState<Step>();

  const onPipeClick = useCallback(
    (step: Step) => {
      if (onOpenDetail) {
        onOpenDetail(step);
      } else {
        setStep(step);
      }
    },
    [onOpenDetail],
  );

  return (
    <PipeListWrapper>
      {steps.map((step, i) => {
        return (
          <PipeItem key={`step_${i}`}>
            <PipeIcon>{step.logo}</PipeIcon>
            <PipeText onClick={() => onPipeClick(step)}>
              <PipeTitle>
                <h4>{step.name}</h4>
              </PipeTitle>
              <PipeDescription>{step.description}</PipeDescription>
            </PipeText>
            <CopyYml
              yml={step.yml}
              oneClickCopy={true}
              isPipe={false}
              name={step.name}
            />
          </PipeItem>
        );
      })}
      {step && (
        <PipeDetailModal pipe={step} onCloseDialog={() => setStep(undefined)} />
      )}
      <DeploymentStepCopyWrapper>
        <h4>How to use deployment step</h4>
        <p>
          Add <Code>deployment: (test|staging|production)</Code> to the
          deployment step in this bitbucket-pipelines.yml file.
        </p>
      </DeploymentStepCopyWrapper>
    </PipeListWrapper>
  );
};

export default React.memo(StepList);
