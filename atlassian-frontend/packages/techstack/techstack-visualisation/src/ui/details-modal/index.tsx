import React from 'react';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

import { useSelection } from '../../controllers/use-case-selector';

import { SolutionPanel } from './solution-panel';
import { Container } from './styled';

export const DetailsModal = () => {
  const [selectionState, setSelectionAction] = useSelection();
  let content;
  if (selectionState.useCase && selectionState.solution) {
    content = (
      <SolutionPanel
        useCase={selectionState.useCase}
        solution={selectionState.solution}
      />
    );
  }

  return (
    <ModalTransition>
      {content && (
        <Modal autoFocus={false}>
          <ModalHeader>
            <ModalTitle>Use Case</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Container>{content}</Container>
          </ModalBody>
          <ModalFooter>
            <Button
              appearance={'primary'}
              onClick={() =>
                setSelectionAction.setSelection(undefined, undefined)
              }
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );
};
