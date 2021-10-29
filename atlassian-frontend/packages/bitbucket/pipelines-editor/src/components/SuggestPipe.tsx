import React, { useCallback, useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/standard-button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import TextArea from '@atlaskit/textarea';
import Textfield from '@atlaskit/textfield';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import { SuggestPipeInlineWrapper, SuggestPipeWrapper } from './styled';

type Props = {
  isInline?: boolean;
};

const SuggestPipe: React.FC<Props> = ({ isInline }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [pipeName, setPipeName] = useState('');
  const [flags, setFlags] = useState<any[]>([]);
  const [flagIndex, setFlagIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addFlag = useCallback(() => {
    setFlagIndex(flagIndex + 1);
    return {
      title: 'Thanks! We will look into including that.',
      index: flagIndex,
      key: flagIndex,
    };
  }, [flagIndex]);

  const closeFlag = useCallback(() => {
    setFlags(flags.slice(1));
    setFlagIndex(flagIndex - 1);
  }, [flags, flagIndex]);

  const suggestPipe = useCallback(() => {
    const newFlags: any[] = flags.slice();
    newFlags.unshift(addFlag());
    setFlags(newFlags);
    setIsDialogOpen(false);
    createAnalyticsEvent({
      action: 'suggested',
      actionSubject: 'pipe',
      actionSubjectId: 'discoverPipesModal',
      attributes: { pipe: pipeName },
    }).fire();
  }, [flags, addFlag, createAnalyticsEvent, pipeName]);

  return (
    <SuggestPipeWrapper>
      {isInline ? (
        <SuggestPipeInlineWrapper>
          <Textfield
            aria-label="suggest-a-pipe"
            isCompact
            max={1000}
            placeholder="Suggest a pipe"
            value={pipeName}
            onChange={(evt: any) => setPipeName(evt.target.value)}
          />
          <Button
            appearance="primary"
            onClick={suggestPipe}
            isDisabled={!pipeName}
          >
            Send
          </Button>
        </SuggestPipeInlineWrapper>
      ) : (
        <>
          <Button onClick={() => setIsDialogOpen(true)}>Suggest a pipe</Button>
          {isDialogOpen && (
            <ModalDialog
              onClose={() => setIsDialogOpen(false)}
              shouldCloseOnOverlayClick
            >
              <ModalHeader>
                <ModalTitle>Suggest a pipe</ModalTitle>
              </ModalHeader>

              <ModalBody>
                <TextArea
                  aria-label="suggest-a-pipe"
                  placeholder=""
                  minimumRows={5}
                  value={pipeName}
                  onChange={(evt: any) => setPipeName(evt.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  appearance="subtle"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  autoFocus
                  onClick={suggestPipe}
                  isDisabled={!pipeName}
                >
                  Suggest a pipe
                </Button>
              </ModalFooter>
            </ModalDialog>
          )}
        </>
      )}
      <FlagGroup onDismissed={closeFlag}>
        {flags.map((flag) => (
          <AutoDismissFlag
            icon={<EditorSuccessIcon primaryColor={colors.G300} label="Info" />}
            {...flag}
          />
        ))}
      </FlagGroup>
    </SuggestPipeWrapper>
  );
};

export default React.memo(SuggestPipe);
