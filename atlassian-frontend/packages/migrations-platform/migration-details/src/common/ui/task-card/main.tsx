import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';
import { B400, N400, R400 } from '@atlaskit/theme/colors';

import commonMessages from '../../messages';

import messages from './messages';
import {
  LozengeWrapper,
  SpinnerWrapper,
  StatusIcon,
  TaskCardButtonsWrapper,
  TaskName,
  TitleWrapper,
  Wrapper,
} from './styled';
import TaskCardDescription, { Selection } from './task-card-description';
import { TaskCardNotSelectedButtons } from './task-card-not-selected-buttons';
import { TaskCardSelectedButtons } from './task-card-selected-buttons';

export type Props = {
  taskName: string;
  selections: Selection[];
  noSelectionDescription: string;
  onSelect: () => void;
  onSkip?: () => void;
  shouldAllowSkip?: boolean;
  // Skip button text override. This defaults to using the taskName
  skipButtonText?: string;
  isDisabled?: boolean;
  disabledDescription?: string;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isSkipLoading?: boolean;
  isError?: boolean;
  onFixError?: () => void;
  fixErrorButtonText?: string;
  // Props to identify it the card is a beta feature or not
  isBeta?: boolean;
};

const TaskCard: FC<Props & InjectedIntlProps> = ({
  taskName,
  noSelectionDescription,
  selections,
  intl,
  onSelect,
  onSkip,
  isDisabled,
  disabledDescription,
  shouldAllowSkip,
  isSelectLoading,
  isSkipLoading,
  isLoading,
  skipButtonText,
  isError,
  fixErrorButtonText,
  onFixError,
  isBeta,
}) => {
  // Disabled state (without errors) overrides any selections, to display as unselected + disabled
  const selectedStatus = selections.length > 0 && (isError || !isDisabled);

  return (
    <Wrapper>
      <TitleWrapper>
        <StatusIcon>
          {isError ? (
            <ErrorIcon
              primaryColor={R400}
              label={intl.formatMessage(
                commonMessages.statusIndicatorErrorIconLabel,
              )}
            />
          ) : (
            <CheckCircleIcon
              primaryColor={selectedStatus ? B400 : N400}
              label={
                selectedStatus
                  ? intl.formatMessage(
                      messages.statusIndicatorSelectedIconLabel,
                    )
                  : intl.formatMessage(
                      messages.statusIndicatorNotSelectedIconLabel,
                    )
              }
            />
          )}
        </StatusIcon>
        <TaskName>
          {taskName}
          {isBeta && (
            <LozengeWrapper>
              <Lozenge appearance="new" isBold>
                Beta
              </Lozenge>
            </LozengeWrapper>
          )}
        </TaskName>
      </TitleWrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <TaskCardDescription
            noSelectionDescription={noSelectionDescription}
            selections={selections}
            isDisabled={isDisabled}
            disabledDescription={disabledDescription}
            isError={isError}
          />
          <TaskCardButtonsWrapper>
            {selectedStatus ? (
              <TaskCardSelectedButtons
                onSelect={onSelect}
                isError={isError}
                fixErrorButtonText={fixErrorButtonText}
                onFixError={onFixError}
              />
            ) : (
              <TaskCardNotSelectedButtons
                taskName={taskName}
                onSelect={onSelect}
                onSkip={onSkip}
                skipButtonText={skipButtonText}
                isDisabled={isDisabled}
                isSkipLoading={isSkipLoading}
                isSelectLoading={isSelectLoading}
                shouldAllowSkip={shouldAllowSkip}
              />
            )}
          </TaskCardButtonsWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default injectIntl(TaskCard);
