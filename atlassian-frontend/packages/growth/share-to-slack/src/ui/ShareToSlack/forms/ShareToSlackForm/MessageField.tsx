import React, { useRef } from 'react';

import { Field } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';

import { useSlackMessageClickedEvent } from '../../../../common/analytics';
import useFormattedMessage from '../../../../common/useFormattedMessage';
import useNativeEventHandler from '../../../../common/useNativeEventHandler';

const MAX_LENGTH = 500;

type Props = {
  canShare: boolean;
  message?: string;
  onChangeMessage: (message: string) => void;
};

export default function MessageField({
  canShare,
  message,
  onChangeMessage,
}: Props) {
  const messagePlaceholder = useFormattedMessage('messagePlaceholder');
  const fireMessageFieldClicked = useSlackMessageClickedEvent();

  const ref = useRef<HTMLTextAreaElement>(null);

  // Tracks focus state to suppress duplicate click events when already focused.
  const alreadyFocusedRef = useRef(false);

  useNativeEventHandler(ref, 'blur', () => {
    alreadyFocusedRef.current = false;
  });

  // TextArea doesn’t have an onClick prop!
  useNativeEventHandler(ref, 'click', (event: MouseEvent) => {
    // Register an analytics click event if the field isn’t already focused.
    if (!alreadyFocusedRef.current) {
      alreadyFocusedRef.current = true;
      fireMessageFieldClicked();
    }
  });

  return (
    <Field<string> name="message" defaultValue={message}>
      {({ fieldProps }) => (
        <TextArea
          {...fieldProps}
          ref={ref}
          placeholder={messagePlaceholder}
          minimumRows={3}
          isDisabled={!canShare}
          value={message}
          onChange={(event) => {
            const message = (event.target as HTMLTextAreaElement).value.substr(
              0,
              MAX_LENGTH,
            );

            fieldProps.onChange(message);
            onChangeMessage(message);
          }}
        />
      )}
    </Field>
  );
}
