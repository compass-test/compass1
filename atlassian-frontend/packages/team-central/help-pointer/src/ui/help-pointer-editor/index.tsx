import React from 'react';

import ModalDialog from '@atlaskit/modal-dialog';

import HelpPointerEditorForm from './editor-form';
import { HelpPointerEditorFormProps } from './editor-form/types';

const HelpPointerEditorDialog = (props: HelpPointerEditorFormProps) => {
  return (
    <ModalDialog
      width="504px"
      shouldScrollInViewport
      onClose={props.onClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEscapePress={true}
    >
      <HelpPointerEditorForm
        title={props.title}
        workspaceInfo={props.workspaceInfo}
        onClose={props.onClose}
        onFormSubmit={props.onFormSubmit}
        targetHelpPointer={props.targetHelpPointer}
        emojiProvider={props.emojiProvider}
        tagPickerCallbacks={props.tagPickerCallbacks}
        fixedOwner={props.fixedOwner}
      />
    </ModalDialog>
  );
};

export default React.memo(HelpPointerEditorDialog, () => true);
