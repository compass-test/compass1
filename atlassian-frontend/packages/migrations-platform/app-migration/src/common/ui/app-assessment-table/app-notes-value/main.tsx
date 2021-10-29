import React, { FC, useCallback } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Spinner from '@atlaskit/spinner';
import TextField from '@atlaskit/textfield';
import { useCreateUIEvent } from '@atlassian/mpt-analytics';

import { useLoadingDebounce } from '../../../utils';

import messages from './messages';
import { Wrapper } from './styled';

export type Props = {
  appKey: string;
  defaultMigrationNotes?: string;
  onChange: (appKey: string, notes: string) => Promise<void>;
};

const AppNotesValue: FC<Props & InjectedIntlProps> = ({
  appKey,
  defaultMigrationNotes,
  onChange,
  intl,
}) => {
  const createUIEvent = useCreateUIEvent();
  const saveNewNotes = useCallback(
    async (newNotes: string) => {
      // Save
      await onChange(appKey, newNotes);

      // Send event
      createUIEvent({
        subject: 'TextInput',
        action: 'Changed',
        id: 'appMigrationNotesTextInput',
        attributes: { appKey },
      });
    },
    [appKey, createUIEvent, onChange],
  );
  const [isSaving, setNewNotes] = useLoadingDebounce(saveNewNotes);

  return (
    <TextField
      defaultValue={defaultMigrationNotes}
      elemAfterInput={
        isSaving && (
          <Wrapper>
            <Spinner size="small" />
          </Wrapper>
        )
      }
      maxLength={450} // Limited to 450 chars in back-end.
      name={`migration-notes-${appKey}`}
      onChange={(event) => {
        const newNotes = event.currentTarget.value;

        // Noop if same text as default
        if (newNotes === defaultMigrationNotes) {
          return;
        }
        setNewNotes(newNotes);
      }}
      placeholder={intl.formatMessage(messages.placeholder)}
      testId="appAssessmentNotesField"
    />
  );
};

export default injectIntl(AppNotesValue);
