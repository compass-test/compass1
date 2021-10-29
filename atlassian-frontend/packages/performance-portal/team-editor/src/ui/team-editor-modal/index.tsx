import React, { useCallback } from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import Form from '@atlaskit/form';
import AKModal, {
  ModalTransition as AKModalTransition,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { useTeamData } from '../../services/team-data';
import { MutationMode } from '../../types';

import { StyledFooter } from './styled';
import TeamFields from './team-editor-fields';

type TeamFormData = {
  'team-id': string;
  'team-name': string;
};

type Props = {
  isOpen: boolean;
  closeModalHandler: () => void;
};

export const TeamEditorModal = ({ isOpen, closeModalHandler }: Props) => {
  const {
    mutationMode,
    teamId,
    setTeamId,
    team,
    createTeam,
    updateTeam,
  } = useTeamData();

  const onFormSubmit = useCallback(
    (formData: TeamFormData) => {
      const id = formData['team-id'];
      const teamName = formData['team-name'];
      if (mutationMode === MutationMode.EDIT) {
        updateTeam({
          id,
          teamName,
        });
        closeModalHandler();
      } else {
        createTeam({
          id,
          teamName,
        });
        closeModalHandler();
      }
    },
    [closeModalHandler, createTeam, updateTeam, mutationMode],
  );

  return (
    <AKModalTransition>
      {isOpen && (
        <AKModal onClose={closeModalHandler}>
          <Form onSubmit={onFormSubmit}>
            {({ formProps }) => (
              <form {...formProps}>
                <ModalHeader>
                  <ModalTitle>Team Editor</ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <TeamFields
                    team={team}
                    teamId={teamId}
                    setTeamId={setTeamId}
                  />
                </ModalBody>
                <StyledFooter>
                  <ButtonGroup>
                    <Button appearance="primary" type="submit">
                      {mutationMode === MutationMode.NEW ? 'Create' : 'Update'}
                    </Button>
                    <Button appearance="subtle" onClick={closeModalHandler}>
                      Close
                    </Button>
                  </ButtonGroup>
                </StyledFooter>
              </form>
            )}
          </Form>
        </AKModal>
      )}
    </AKModalTransition>
  );
};

export default TeamEditorModal;
