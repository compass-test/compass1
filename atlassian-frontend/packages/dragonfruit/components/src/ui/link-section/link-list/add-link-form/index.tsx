import React, { Fragment, useCallback, useState } from 'react';

import { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Button from '@atlaskit/button/standard-button';
import Form, { ErrorMessage, Field, OnSubmitHandler } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useJiraProjectsDropdown } from '@atlassian/dragonfruit-feature-flags';
import {
  checkCompassMutationSuccess,
  CompassComponent,
  CompassLinkType,
  CompassMutationError,
  CreateComponentLinkHandledErrors,
  MAX_COMPASS_LINK_NAME_LENGTH,
  MAX_COMPASS_LINK_URL_LENGTH,
  useCreateComponentLink,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, validateUrl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../common/constants';
import { useCreateLinkErrorFlags } from '../../../../common/ui/utils/links';

import { ProjectsField } from './add-project-link-form';
import messages from './messages';
import { AddLinkFieldWrapper, AddLinkFormWrapper, Footer } from './styled';

export interface AddLinkFormData {
  linkText: string;
  link: string;
}
export interface Props {
  componentId: CompassComponent['id'];
  linkType: CompassLinkType;
  onCancel: () => void;
  onSuccess: () => void;
}

const INVALID_URL_ERROR = 'INVALID_URL';

export const AddLinkForm = (props: Props) => {
  const { componentId, linkType, onCancel, onSuccess } = props;
  const { formatMessage } = useIntl();
  const {
    showComponentNotFoundErrorFlag,
    showInvalidLinkUrlErrorFlag,
    showLinkLimitReachedFlag,
    showLinkNameTooLongErrorFlag,
    showLinkUrlTooLongErrorFlag,
    showGenericLinkErrorFlag,
  } = useCreateLinkErrorFlags();

  const newProjectsFieldEnabled = useJiraProjectsDropdown();

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [handleMutate] = useCreateComponentLink();

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const getUrl = (value: string | { value: string }): string => {
    return typeof value === 'object' ? value.value : value;
  };

  const onSubmit: OnSubmitHandler<AddLinkFormData> = useCallback(
    (data: AddLinkFormData, form) => {
      return handleMutate({
        componentId: componentId,
        link: {
          name: data.linkText.trim(),
          type: linkType,
          url: getUrl(data.link).trim(),
        },
      })
        .then((mutationResult) => {
          // Throws MutationError if mutation unsuccessful
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.createComponentLink,
          );
          setTimeout(form.reset);
          onSuccess();
        })
        .catch((error) => {
          if (error instanceof CompassMutationError) {
            const errorType = error.getFirstErrorType();
            switch (errorType) {
              case CreateComponentLinkHandledErrors.COMPONENT_LINKS_MAXIMUM_PER_TYPE_REACHED:
                showLinkLimitReachedFlag(linkType);
                onCancel();
                return;
              case CreateComponentLinkHandledErrors.COMPONENT_LINK_URL_NOT_A_VALID_URL:
                showInvalidLinkUrlErrorFlag(linkType);
                return;
              case CreateComponentLinkHandledErrors.COMPONENT_LINK_NAME_TOO_LONG:
                showLinkNameTooLongErrorFlag(linkType);
                return;
              case CreateComponentLinkHandledErrors.COMPONENT_LINK_URL_TOO_LONG:
                showLinkUrlTooLongErrorFlag(linkType);
                return;
              case CreateComponentLinkHandledErrors.COMPONENT_NOT_FOUND:
                showComponentNotFoundErrorFlag(linkType);
                return;
              default:
                fireCompassMutationErrorAnalytics({
                  error,
                  componentName: 'AddLinkForm',
                  packageName: ANALYTICS_PACKAGE_NAME,
                });
            }
          }
          showGenericLinkErrorFlag(linkType);
        });
    },
    [
      handleMutate,
      componentId,
      linkType,
      fireCompassMutationErrorAnalytics,
      showComponentNotFoundErrorFlag,
      showInvalidLinkUrlErrorFlag,
      showLinkLimitReachedFlag,
      showLinkNameTooLongErrorFlag,
      showLinkUrlTooLongErrorFlag,
      showGenericLinkErrorFlag,
      onSuccess,
      onCancel,
    ],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    },
    [onCancel],
  );

  return (
    <Form<AddLinkFormData> onSubmit={onSubmit}>
      {({ formProps, submitting: isSubmitting }) => (
        <form
          {...formProps}
          onKeyDown={onKeyDown}
          aria-label="Form for adding a link"
        >
          <AddLinkFormWrapper>
            <AddLinkFieldWrapper>
              <Field
                label={formatMessage(messages.urlLabel)}
                name="link"
                validate={(value: string | { value: string } | undefined) => {
                  const url = value ? getUrl(value) : undefined;

                  if (url && validateUrl(url)) {
                    setIsSubmitEnabled(true);
                    return undefined;
                  } else {
                    setIsSubmitEnabled(false);
                    return INVALID_URL_ERROR;
                  }
                }}
                defaultValue=""
                isDisabled={isSubmitting}
                isRequired
              >
                {({ fieldProps, error }: any) => (
                  <Fragment>
                    {newProjectsFieldEnabled &&
                    linkType === CompassLinkType.PROJECT ? (
                      <ProjectsField {...fieldProps} />
                    ) : (
                      <Textfield
                        placeholder="https://www.example.com"
                        maxLength={MAX_COMPASS_LINK_URL_LENGTH}
                        autoFocus
                        {...fieldProps}
                      />
                    )}

                    {error === INVALID_URL_ERROR && (
                      <ErrorMessage>
                        {formatMessage(CommonMessages.enterAValidURLFullStop)}
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
            </AddLinkFieldWrapper>
            <AddLinkFieldWrapper>
              <Field
                label={formatMessage(messages.linkTextField)}
                name="linkText"
                defaultValue=""
                isDisabled={isSubmitting}
              >
                {({ fieldProps }: any) => (
                  <Fragment>
                    <Textfield
                      placeholder={formatMessage(messages.linkTextPlaceholder)}
                      maxLength={MAX_COMPASS_LINK_NAME_LENGTH}
                      {...fieldProps}
                    />
                  </Fragment>
                )}
              </Field>
            </AddLinkFieldWrapper>
          </AddLinkFormWrapper>
          <Footer>
            <ButtonGroup>
              <Button
                onClick={onCancel}
                appearance="subtle"
                isDisabled={isSubmitting}
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={isSubmitting}
                isDisabled={!isSubmitEnabled}
              >
                {formatMessage(CommonMessages.add)}
              </LoadingButton>
            </ButtonGroup>
          </Footer>
        </form>
      )}
    </Form>
  );
};
