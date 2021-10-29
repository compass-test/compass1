import React from 'react';

import Button from '@atlaskit/button';
import CheckCircleIconGlyph from '@atlaskit/icon/glyph/check-circle';
import ErrorIconGlyph from '@atlaskit/icon/glyph/error';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  Body,
  Description,
  ErrorIconWrapper,
  Heading,
  MainWrapper,
  SuccessIconWrapper,
} from '../../../../../common/ui/wizard/styled';
import { CompleteStep as CompleteStepState } from '../../../../../services/csv-import-reducer/types';

import { ServiceSuccessIcon } from './assets';
import { LogDownloadLink } from './log-download-link';
import messages from './messages';
import { ButtonContainer, FinishedList, ImageWrapper } from './styled';

type FinishedStepProps = { state: CompleteStepState };

const ErrorIcon = () => (
  <ErrorIconWrapper>
    <ErrorIconGlyph label={'Error'} size={'small'} />
  </ErrorIconWrapper>
);

const SuccessIcon = () => (
  <SuccessIconWrapper>
    <CheckCircleIconGlyph label={'Success'} size={'small'} />
  </SuccessIconWrapper>
);

export const completeStepTestId = 'dragonfruit-csv-import-complete-step';

export const FinishedStep = ({ state }: FinishedStepProps) => {
  const { formatMessage } = useIntl();

  let componentsCreated = 0;
  let componentsFailed = 0;
  let componentsUpdated = 0;
  let componentsSkipped = 0;

  for (const key in state.importComponents) {
    const componentState = state.importComponents[key].importState;
    if (componentState.state === 'SUCCESS') {
      if (componentState.action === 'CREATE') {
        componentsCreated += 1;
      } else if (componentState.action === 'UPDATE') {
        componentsUpdated += 1;
      }
    } else if (componentState.state === 'FAILURE') {
      componentsFailed += 1;
    } else if (componentState.state === 'SKIP') {
      componentsSkipped += 1;
    }
  }

  const componentsImported = componentsCreated + componentsUpdated;

  const { logs } = state;
  const logsText = logs.join('\n');

  return (
    <MainWrapper data-testid={completeStepTestId}>
      <Heading>{formatMessage(messages.heading)}</Heading>
      <Description>
        {formatMessage(messages.description, { componentsImported })}
      </Description>

      <ImageWrapper>
        <img src={ServiceSuccessIcon} alt="service success icon" />
      </ImageWrapper>

      <Body>
        <FinishedList>
          {componentsCreated !== 0 && (
            <p>
              <SuccessIcon /> <strong>{componentsCreated}</strong>{' '}
              {formatMessage(messages.componentsCreated, {
                count: componentsCreated,
              })}
            </p>
          )}

          {componentsUpdated !== 0 && (
            <p>
              <SuccessIcon /> <strong>{componentsUpdated}</strong>{' '}
              {formatMessage(messages.componentsUpdated, {
                count: componentsUpdated,
              })}
            </p>
          )}

          {componentsSkipped !== 0 && (
            <p>
              <SuccessIcon /> <strong>{componentsSkipped}</strong>{' '}
              {formatMessage(messages.componentsSkipped, {
                count: componentsSkipped,
              })}
            </p>
          )}

          {componentsFailed !== 0 && (
            <p>
              <ErrorIcon /> <strong>{componentsFailed}</strong>{' '}
              {formatMessage(messages.componentsFailed, {
                count: componentsFailed,
              })}
            </p>
          )}
        </FinishedList>
      </Body>

      <LogDownloadLink fileContent={logsText} filename="compass_import.log">
        {formatMessage(messages.downloadImportLogs)}
      </LogDownloadLink>

      <ButtonContainer>
        <Button
          testId={'csv-import-finished-next-button'}
          appearance="primary"
          href={routes.COMPONENTS()}
        >
          {formatMessage(messages.backButton)}
        </Button>
      </ButtonContainer>
    </MainWrapper>
  );
};
