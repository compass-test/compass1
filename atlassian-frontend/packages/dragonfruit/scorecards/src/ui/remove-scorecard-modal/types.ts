import { ModalDialogProps } from '@atlaskit/modal-dialog';

export type RemoveScorecardModalProps = {
  testId?: string;
  onCancel: () => void;
  onClose: () => void;
  componentId: string;
  scorecardId: string;
  scorecardName: string;
} & ModalDialogProps;
