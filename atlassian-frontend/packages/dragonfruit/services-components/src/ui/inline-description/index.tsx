import React, { useCallback } from 'react';

import { FetchResult } from '@apollo/client';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  InlineTextArea,
  InlineTextAreaProps,
  useInlineEdit,
} from '@atlassian/dragonfruit-common-ui';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassMutationError,
  UpdateComponentDescriptionHandledErrors,
  UpdateComponentDescriptionMutation,
  useUpdateComponentDescription,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../common/constants';

import messages from './messages';

type ForwardProps = Omit<
  InlineTextAreaProps,
  'defaultValue' | 'onConfirm' | 'onCancel'
>;

type InlineDescriptionProps = {
  componentId: CompassComponent['id'];
  description: CompassComponent['description'];
  isDisabled?: boolean;
} & ForwardProps;

const MAX_LENGTH = 1000;

function InlineDescription(props: InlineDescriptionProps & InjectedIntlProps) {
  const { intl, componentId, description, isDisabled = false, ...rest } = props;

  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const [handleMutate] = useUpdateComponentDescription();

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showUpdateComponentDescriptionErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        title: formatMessage(messages.errorTitle),
        description: formatMessage(description),
      });
    },
    [formatMessage, showFlag],
  );

  const handleConfirm = useCallback(
    (description: string) => {
      return handleMutate({ id: componentId, description })
        .then(
          (mutationResult: FetchResult<UpdateComponentDescriptionMutation>) => {
            checkCompassMutationSuccess(
              mutationResult?.data?.compass?.updateComponent,
            );
          },
        )
        .catch((error) => {
          if (error instanceof CompassMutationError) {
            const errorType = error.getFirstErrorType();
            switch (errorType) {
              case UpdateComponentDescriptionHandledErrors.COMPONENT_DESCRIPTION_TOO_LONG:
                showUpdateComponentDescriptionErrorFlag(messages.errorTooLong);
                throw error;
              case UpdateComponentDescriptionHandledErrors.COMPONENT_NOT_FOUND:
                showUpdateComponentDescriptionErrorFlag(
                  messages.errorComponentNotFound,
                );
                throw error;
              default:
                fireCompassMutationErrorAnalytics({
                  error,
                  componentName: 'InlineDescription',
                  packageName: ANALYTICS_PACKAGE_NAME,
                });
            }
          }
          showUpdateComponentDescriptionErrorFlag(messages.errorSaving);
          throw error; // Re-throw the error so that useInlineEdit knows it failed
        });
    },
    [
      handleMutate,
      componentId,
      fireCompassMutationErrorAnalytics,
      showUpdateComponentDescriptionErrorFlag,
    ],
  );

  const { isLoading, readValue, editValue, cancel, confirm } = useInlineEdit(
    description ?? '',
    handleConfirm,
  );

  const validate = useCallback(
    (description?: string) => {
      if (typeof description !== 'string') {
        return;
      }

      if (description.length > MAX_LENGTH) {
        return intl.formatMessage(messages.errorTooLong);
      }
    },
    [intl],
  );

  return (
    <InlineTextArea
      {...rest}
      editButtonLabel={intl.formatMessage(messages.editDescription)}
      cancelButtonLabel={formatMessage(CommonMessages.cancel)}
      confirmButtonLabel={formatMessage(CommonMessages.save)}
      defaultValue={editValue}
      readValue={readValue ?? ''}
      onConfirm={confirm}
      onCancel={cancel}
      loading={isLoading}
      validate={validate}
      isDisabled={isDisabled}
      maxLength={MAX_LENGTH}
    />
  );
}

export default injectIntl(InlineDescription);
