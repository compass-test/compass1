import React, { useRef } from 'react';

import Spinner from '@atlaskit/spinner/spinner';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  Description,
  Heading,
  MainWrapper,
  SpinnerWrapper,
} from '../../../../../common/ui/wizard/styled';
import { ImportingStep as ImportingStepState } from '../../../../../services/csv-import-reducer/types';

import messages from './messages';
import { ImportLogsHeading, LogsTextArea } from './styled';

type ImportStepProps = { state: ImportingStepState };

export const importStepTestId = 'dragonfruit-csv-import-import-step';

export const ImportStep = ({ state }: ImportStepProps) => {
  const { formatMessage } = useIntl();

  const endOfLogs = useRef<HTMLDivElement>(null);

  const importComponents = Object.values(state.importComponents);

  const numTotalImports = importComponents.length;
  const importsCompleted = importComponents.filter(
    importComponent =>
      importComponent.importState.state !== 'PENDING' &&
      importComponent.importState.state !== 'IN_PROGRESS',
  );
  const numImportsCompleted = importsCompleted.length;

  const { logs } = state;
  const logsText = logs.join('\n');

  /*
  TODO: Make the log autoscroll
  TODO: Stop/resume autoscroll when user interacts with the textbox
   */
  return (
    <MainWrapper data-testid={importStepTestId}>
      <Heading>{formatMessage(messages.heading)}</Heading>
      <Description>
        {formatMessage(messages.description, {
          numImportsCompleted,
          numTotalImports,
        })}
      </Description>
      <SpinnerWrapper>
        <Spinner size="large" />
      </SpinnerWrapper>
      <br />
      <ImportLogsHeading>
        {formatMessage(messages.logTextFieldHeading)}
      </ImportLogsHeading>
      <LogsTextArea>
        {logsText}
        <div ref={endOfLogs} />
      </LogsTextArea>
    </MainWrapper>
  );
};
