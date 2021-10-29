import React, { useCallback, useState } from 'react';

import { MutationUpdaterFn } from '@apollo/client';

import Button, { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  checkCompassMutationSuccess,
  CompassComponentInRelationshipViewFragment,
  CompassRelationshipInRelationshipViewFragment,
  CompassRelationshipType,
  CreateCompassRelationshipInput,
  CreateRelationshipMutation,
  useCreateRelationship,
} from '@atlassian/dragonfruit-graphql';
import { ComponentSearchPicker } from '@atlassian/dragonfruit-services-components';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  convertErrorToMessage,
  // getCreateRelationshipOptimisticResponse,
  useHandleCreateRelationshipError,
  validateNewRelationship,
} from '../../../../../../common/utils/relationships';

import messages from './messages';
import { ButtonSection } from './styled';

type AddRelationshipFormProps = {
  currentComponent: CompassComponentInRelationshipViewFragment;
  existingRelationships: Array<CompassRelationshipInRelationshipViewFragment>;
  relationshipType: CompassRelationshipType;
  onSuccess: () => void;
  onCancel: () => void;
  updateCreateMutation?: MutationUpdaterFn<CreateRelationshipMutation>;
};

type AddRelationshipFormData = {
  selectedComponent: CompassComponentInRelationshipViewFragment;
};

export const AddRelationshipForm = (props: AddRelationshipFormProps) => {
  const {
    currentComponent,
    existingRelationships,
    relationshipType,
    onSuccess,
    onCancel,
    updateCreateMutation,
  } = props;
  const { formatMessage } = useIntl();
  const { handleCreateRelationshipError } = useHandleCreateRelationshipError();

  const [handleMutate] = useCreateRelationship();

  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  const onSubmit = useCallback(
    (formData: AddRelationshipFormData) => {
      const variables: CreateCompassRelationshipInput = {
        endNodeId: formData.selectedComponent.id,
        startNodeId: currentComponent.id,
        type: relationshipType,
      };

      return handleMutate(variables, {
        // use of optimisticResponse will be explored in COMPASS-2992
        // optimisticResponse: getCreateRelationshipOptimisticResponse({
        //   startNode: currentComponent,
        //   type: relationshipType,
        //   endNode: formData.selectedComponent,
        // }),
        update: updateCreateMutation,
      })
        .then((mutationResult) => {
          // Throws if unsuccessful
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.createRelationship,
          );
          onSuccess();
        })
        .catch((error) => {
          handleCreateRelationshipError({
            error,
            componentName: 'AddRelationshipForm',
          });
        });
    },
    [
      currentComponent,
      relationshipType,
      handleCreateRelationshipError,
      handleMutate,
      onSuccess,
      updateCreateMutation,
    ],
  );

  const validateSelectedValue = (
    value: CompassComponentInRelationshipViewFragment | undefined,
  ) => {
    if (!value) {
      setIsSubmitEnabled(false);
      return;
    }

    const validationError = validateNewRelationship(
      currentComponent.id,
      value.id,
      existingRelationships,
    );
    setIsSubmitEnabled(!validationError);

    return validationError;
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting: isSubmitting }) => (
        <form {...formProps}>
          <Field
            name="selectedComponent"
            isRequired
            validate={validateSelectedValue}
          >
            {({ fieldProps, error }: any) => (
              <>
                <ComponentSearchPicker
                  {...fieldProps}
                  validationState={error ? 'error' : 'default'}
                  aria-label={formatMessage(messages.searchForAComponent)}
                  autoFocus
                  isDisabled={isSubmitting}
                />
                {error && (
                  <ErrorMessage>
                    {formatMessage(convertErrorToMessage(error))}
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <ButtonSection>
            <ButtonGroup>
              <Button
                appearance="subtle"
                onClick={() => onCancel()}
                isDisabled={isSubmitting}
              >
                {formatMessage(CommonMessages.cancel)}
              </Button>
              <LoadingButton
                type="submit"
                appearance="primary"
                isDisabled={!isSubmitEnabled}
                isLoading={isSubmitting}
              >
                {formatMessage(CommonMessages.add)}
              </LoadingButton>
            </ButtonGroup>
          </ButtonSection>
        </form>
      )}
    </Form>
  );
};
