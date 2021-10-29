import React, { useCallback } from 'react';

import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { usePathParam, useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button';
import AKModal, {
  ModalTransition as AKModalTransition,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import type { deteleMetricConfirmationModalMutation } from './__generated__/deteleMetricConfirmationModalMutation.graphql';
import type { deteleMetricConfirmationModalQuery } from './__generated__/deteleMetricConfirmationModalQuery.graphql';
import { CustomStyledModalFooter } from './styled';

type Props = {
  closeModal: () => void;
};

const DeleteMetricConfirmationModal = ({ closeModal }: Props) => {
  const [eventKey] = usePathParam('eventKey');
  const { push } = useRouterActions();

  // eslint-disable-next-line relay/generated-flow-types
  const data = useLazyLoadQuery<deteleMetricConfirmationModalQuery>(
    graphql`
      query deteleMetricConfirmationModalQuery($eventKey: String!) {
        metricByEventKey(eventKey: $eventKey) {
          id
          name
        }
      }
    `,
    { eventKey: eventKey! },
  );

  const metric = data.metricByEventKey!;

  const [commitDeleteMutation, isDeleteInFlight] = useMutation<
    deteleMetricConfirmationModalMutation
  >(graphql`
    mutation deteleMetricConfirmationModalMutation($input: DeleteNodeInput!) {
      deleteNode(input: $input) {
        success
        errors {
          message
        }
      }
    }
  `);

  const onConfirmHandler = useCallback(() => {
    commitDeleteMutation({
      variables: { input: { id: metric.id } },
      onCompleted: (response) => {
        const success = response.deleteNode?.success;
        if (success) {
          closeModal();
          push('/catalog');
        }
      },
    });
  }, [closeModal, commitDeleteMutation, metric.id, push]);

  return (
    <AKModalTransition>
      <AKModal onClose={closeModal}>
        <ModalHeader>
          <ModalTitle appearance="danger">Confirm Delete</ModalTitle>
        </ModalHeader>

        <ModalBody>Are you sure you want delete {metric?.name}?</ModalBody>
        <CustomStyledModalFooter>
          <Button
            type="button"
            appearance="danger"
            onClick={onConfirmHandler}
            isDisabled={isDeleteInFlight}
          >
            Confirm
          </Button>
          <Button type="button" appearance="default" onClick={closeModal}>
            Cancel
          </Button>
        </CustomStyledModalFooter>
      </AKModal>
    </AKModalTransition>
  );
};

export default DeleteMetricConfirmationModal;
