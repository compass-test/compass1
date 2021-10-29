import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonGroup } from '@atlaskit/button';
import LoadingButton from '@atlaskit/button/loading-button';
import { WithEditorActions } from '@atlaskit/editor-core';
import { AdfForm } from '@atlassian/proforma-form-builder';

import { messages } from './messages';
import { FooterWrapper } from './styled';

interface FooterProps {
  onCancel: () => void;
  onSave: (form: AdfForm) => Promise<void>;
}

export const Footer: React.FC<FooterProps> = ({ onCancel, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveForm = (formPromise: Promise<AdfForm>) => {
    setIsSaving(true);
    formPromise.then(form => onSave(form)).finally(() => setIsSaving(false));
  };

  return (
    <FooterWrapper>
      <WithEditorActions
        render={(actions: any) => (
          <ButtonGroup>
            <Button appearance="subtle" onClick={onCancel}>
              <FormattedMessage {...messages.cancelButtonLabel} />
            </Button>
            <LoadingButton
              appearance="primary"
              isLoading={isSaving}
              onClick={() => saveForm(actions.getValue())}
            >
              <FormattedMessage {...messages.saveChangesButtonLabel} />
            </LoadingButton>
          </ButtonGroup>
        )}
      />
    </FooterWrapper>
  );
};
