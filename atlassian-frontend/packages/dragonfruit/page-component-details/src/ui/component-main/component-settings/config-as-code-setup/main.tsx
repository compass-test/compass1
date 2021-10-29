import React from 'react';

import { Code } from '@atlaskit/code';
import { GeneratedConfigCode } from '@atlassian/dragonfruit-external-component-management';
import {
  CONFIG_AS_CODE_DAC_LINK,
  CONFIG_AS_CODE_FILE_NAME,
} from '@atlassian/dragonfruit-external-component-management/constants';
import { CompassComponentDetailViewFragment } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { StepHeading, StepNumber } from './styled';

interface Props {
  component: CompassComponentDetailViewFragment;
}

export default function ConfigAsCodeSetup({ component }: Props) {
  const { formatMessage } = useIntl();

  return (
    <>
      <p>
        {formatMessage(messages.description)}{' '}
        <a href={CONFIG_AS_CODE_DAC_LINK} target="_blank" rel="noopener">
          {formatMessage(messages.learnMore)}
        </a>
      </p>
      <StepHeading>
        <StepNumber>1</StepNumber>
        {formatMessage(messages.firstStepHeading)}
      </StepHeading>
      <GeneratedConfigCode component={component} />
      <StepHeading>
        <StepNumber>2</StepNumber>
        {formatMessage(messages.secondStepHeading)}
      </StepHeading>
      <ul>
        <li>
          {formatMessage(messages.addToRepositoryStep1)}{' '}
          <Code>{CONFIG_AS_CODE_FILE_NAME}</Code>
          {'.'}
        </li>
        <li>{formatMessage(messages.addToRepositoryStep2)}</li>
        <li>{formatMessage(messages.addToRepositoryStep3)}</li>
        <li>{formatMessage(messages.addToRepositoryStep4)}</li>
      </ul>
    </>
  );
}
