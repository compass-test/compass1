import React, { useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import { Checkbox } from '@atlaskit/checkbox';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

import { WINDOWS_SYSTEM_OPTION } from '../const';

import { CheckboxWrapper } from './styled';

type Props = {
  onCloseModal: (dismissDialogChecked: boolean) => void;
  viewRunStep: (dismissDialogChecked: boolean) => void;
  runnerSystem: string;
};

const RunCommandReminderModal: React.FC<Props> = ({
  onCloseModal,
  viewRunStep,
  runnerSystem,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ModalTransition>
      <ModalDialog onClose={() => onCloseModal(isChecked)}>
        <ModalHeader>
          <ModalTitle appearance="warning">
            {runnerSystem === WINDOWS_SYSTEM_OPTION.value
              ? 'Download the script'
              : 'Copy the command'}
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          {runnerSystem === WINDOWS_SYSTEM_OPTION.value
            ? 'Reminder to download and run the powershell script before closing the wizard as it cannot be retrieved again'
            : 'Reminder to copy the docker command along with the token before closing the wizard as it cannot be retreived again.'}
          <CheckboxWrapper>
            <Checkbox
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              label={`Do not show this message again`}
              value="Controlled Checkbox"
              name="controlled-checkbox"
            />
          </CheckboxWrapper>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onCloseModal(isChecked)} appearance="default">
            Cancel
          </Button>
          <Button
            onClick={() => viewRunStep(isChecked)}
            appearance="warning"
            name="viewCommand"
          >
            {runnerSystem === WINDOWS_SYSTEM_OPTION.value
              ? 'Back to download script'
              : 'View Command'}
          </Button>
        </ModalFooter>
      </ModalDialog>
    </ModalTransition>
  );
};

export default React.memo(RunCommandReminderModal);
