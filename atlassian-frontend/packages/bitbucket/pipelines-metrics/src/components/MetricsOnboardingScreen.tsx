import React from 'react';

import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button/button-group';
import ModalDialog, { ModalBody } from '@atlaskit/modal-dialog';

import OnboardingIllustration from './assets/OnboardingIllustration';
import {
  MetricsOnboardingButtons,
  MetricsOnboardingHeader,
  MetricsOnboardingMessage,
  MetricsOnboardingWrapper,
} from './styled';

type Props = {
  onShowMetrics: () => void;
  onClose: () => void;
};

const MetricsOnboarding: React.FC<Props> = ({ onShowMetrics, onClose }) => {
  return (
    <ModalDialog onClose={onClose} width={600} height={510} isBlanketHidden>
      <ModalBody>
        <MetricsOnboardingWrapper data-testid="metrics-onboarding-screen">
          <MetricsOnboardingHeader>
            <OnboardingIllustration />
          </MetricsOnboardingHeader>
          <MetricsOnboardingMessage>
            <h3>Get visibility into your build's CPU and memory usage</h3>
            <p>
              Select the Metrics tab on each build step in the pipeline to view
              the memory and CPU usage. Step metrics also provide you with
              memory usage warnings on the steps.{' '}
              <Button
                appearance="link"
                spacing="none"
                href="http://support.atlassian.com/bitbucket-cloud/docs/step-metrics/"
                target="_blank"
                rel="nofollow"
              >
                Learn more
              </Button>
            </p>
          </MetricsOnboardingMessage>
          <MetricsOnboardingButtons>
            <ButtonGroup>
              <Button
                appearance="primary"
                onClick={onShowMetrics}
                testId="metrics-button"
              >
                Show me metrics
              </Button>
              <Button appearance="subtle" onClick={onClose}>
                Not now
              </Button>
            </ButtonGroup>
          </MetricsOnboardingButtons>
        </MetricsOnboardingWrapper>
      </ModalBody>
    </ModalDialog>
  );
};

export default React.memo(MetricsOnboarding);
