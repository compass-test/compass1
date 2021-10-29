import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import InlineEdit, { InlineEditProps } from '@atlaskit/inline-edit';
import TextField from '@atlaskit/textfield';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  BaseErrorFlagProps,
  InlineReadView,
  InlineWrapper,
  useInlineEdit,
} from '@atlassian/dragonfruit-common-ui';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassMutationError,
  UpdateComponentNameHandledErrors,
  useUpdateComponentName,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../common/constants';

import messages from './messages';
import { editViewCss } from './styled';

type ForwardProps = Omit<
  InlineEditProps<string>,
  'defaultValue' | 'onConfirm' | 'onCancel' | 'editView' | 'readView'
>;

type InlineNameProps = {
  componentId: CompassComponent['id'];
  componentName: CompassComponent['name'];
  isDisabled?: boolean;
} & ForwardProps;

const MAX_LENGTH = 100; // TODO find real limit

export function InlineName(props: InlineNameProps) {
  const { componentId, componentName, isDisabled = false, ...rest } = props;

  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();

  const [handleMutate] = useUpdateComponentName();

  const isEditing = isDisabled ? false : undefined;

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showUpdateComponentNameErrorFlag = useCallback(
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
    (name: string) => {
      return handleMutate({ id: componentId, name })
        .then((mutationResult) => {
          // Throws if unsuccessful
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.updateComponent,
          );
        })
        .catch((error) => {
          if (error instanceof CompassMutationError) {
            const errorType = error.getFirstErrorType();
            switch (errorType) {
              case UpdateComponentNameHandledErrors.COMPONENT_NAME_BLANK:
                showUpdateComponentNameErrorFlag(
                  messages.createComponentNameBlank,
                );
                throw error;
              case UpdateComponentNameHandledErrors.COMPONENT_NAME_TOO_LONG:
                showUpdateComponentNameErrorFlag(messages.errorTooLong);
                throw error;
              case UpdateComponentNameHandledErrors.COMPONENT_NOT_FOUND:
                showUpdateComponentNameErrorFlag(
                  messages.errorComponentNotFound,
                );
                throw error;
              default:
                fireCompassMutationErrorAnalytics({
                  error,
                  componentName: 'InlineName',
                  packageName: ANALYTICS_PACKAGE_NAME,
                });
            }
          }
          showUpdateComponentNameErrorFlag(messages.errorSaving);
          throw error; // Re-throw the error so that useInlineEdit knows it failed
        });
    },
    [
      componentId,
      fireCompassMutationErrorAnalytics,
      handleMutate,
      showUpdateComponentNameErrorFlag,
    ],
  );

  const { readValue, editValue, cancel, confirm } = useInlineEdit(
    componentName,
    handleConfirm,
  );

  const validate = useCallback(
    (description?: string) => {
      if (typeof description !== 'string') {
        return;
      }

      if (description.length > MAX_LENGTH) {
        return formatMessage(messages.errorTooLong);
      }
    },
    [formatMessage],
  );

  const editView = useCallback((fieldProps, ref) => {
    return (
      <TextField
        {...fieldProps}
        autoFocus
        css={editViewCss}
        isCompact={true}
        ref={ref}
        maxLength={MAX_LENGTH}
      />
    );
  }, []);

  const readView = useCallback(() => {
    return <InlineReadView truncate>{readValue}</InlineReadView>;
  }, [readValue]);

  return (
    <InlineWrapper alignText={true}>
      <InlineEdit
        {...rest}
        editButtonLabel={formatMessage(messages.editName)}
        cancelButtonLabel={formatMessage(CommonMessages.cancel)}
        confirmButtonLabel={formatMessage(CommonMessages.save)}
        defaultValue={editValue}
        editView={editView}
        readView={readView}
        onConfirm={confirm}
        onCancel={cancel}
        isEditing={isEditing}
        validate={validate}
        keepEditViewOpenOnBlur
      />
    </InlineWrapper>
  );
}
