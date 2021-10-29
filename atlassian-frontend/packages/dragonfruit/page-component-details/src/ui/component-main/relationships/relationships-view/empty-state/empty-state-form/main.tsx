import React, { useCallback, useState } from 'react';

import { MutationUpdaterFn } from '@apollo/client';

import { ButtonGroup, LoadingButton } from '@atlaskit/button';
import Form, { ErrorMessage, Field } from '@atlaskit/form';
import {
  checkCompassMutationSuccess,
  CompassComponentInRelationshipViewFragment,
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
import { Footer } from './styled';

export type AddRelationshipFormProps = {
  currentComponent: CompassComponentInRelationshipViewFragment;
  onSuccess?: () => void;
  updateCreateMutation?: MutationUpdaterFn<CreateRelationshipMutation>;
};

type EmptyStateFormData = {
  selectedComponent: CompassComponentInRelationshipViewFragment;
};

export const EmptyStateForm = (props: AddRelationshipFormProps) => {
  const { currentComponent, onSuccess, updateCreateMutation } = props;
  const { formatMessage } = useIntl();
  const { handleCreateRelationshipError } = useHandleCreateRelationshipError();

  const [canSubmit, setCanSubmit] = useState(false);

  const [handleMutate] = useCreateRelationship();

  const onSubmit = useCallback(
    (formData: EmptyStateFormData) => {
      // As of M1 Spec Compass only supports Depends On relationships
      const type = CompassRelationshipType.DEPENDS_ON;

      const variables: CreateCompassRelationshipInput = {
        startNodeId: currentComponent.id,
        endNodeId: formData.selectedComponent.id,
        type,
      };

      return handleMutate(variables, {
        // use of optimisticResponse will be explored in COMPASS-2992
        // optimisticResponse: getCreateRelationshipOptimisticResponse({
        //   startNode: currentComponent,
        //   type,
        //   endNode: formData.selectedComponent,
        // }),
        update: updateCreateMutation,
      })
        .then((mutationResult) => {
          // Throws if unsuccessful
          checkCompassMutationSuccess(
            mutationResult?.data?.compass?.createRelationship,
          );

          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) =>
          handleCreateRelationshipError({
            error,
            componentName: 'EmptyStateForm',
          }),
        );
    },
    [
      currentComponent,
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
      setCanSubmit(false);
      return;
    }

    const validationError = validateNewRelationship(
      currentComponent.id,
      value.id,
      [],
    );
    setCanSubmit(!validationError);

    return validationError;
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting: isSubmitting }) => (
        <form {...formProps}>
          <Field
            label={formatMessage(messages.dependsOn)}
            name="selectedComponent"
            isRequired
            validate={validateSelectedValue}
          >
            {({ fieldProps, error }: any) => (
              <>
                <ComponentSearchPicker
                  {...fieldProps}
                  validationState={error ? 'error' : 'default'}
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

          <Footer>
            <ButtonGroup>
              <LoadingButton
                type="submit"
                appearance="primary"
                isDisabled={!canSubmit}
                isLoading={isSubmitting}
              >
                {formatMessage(messages.submitButton)}
              </LoadingButton>
            </ButtonGroup>
          </Footer>
        </form>
      )}
    </Form>
  );
};
