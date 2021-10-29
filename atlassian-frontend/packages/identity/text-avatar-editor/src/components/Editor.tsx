import React, { useCallback, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button';
import { ErrorMessage, Field } from '@atlaskit/form';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';
import { T400, Y400 } from '@atlaskit/theme/colors';

import {
  colorPalette,
  defaultSelectedColorHexValue,
  getColorName,
} from './ColorPaletteUtils';
import ColorPalette from './ColorsPalette';
import { DEFAULT_MAX_LEN_TEXT } from './constants';
import MessageProvider from './MessageProvider';
import messages from './messages';
import Preview from './Preview';
import {
  EditableInputs,
  ErrorMessageWrapper,
  InitialsEditor,
  ModalHeaderWrapper,
} from './styled';
import type { TextAvatarEditorProps } from './types';

const getInitials = (name?: string) => {
  if (!name) {
    return '';
  }

  const names = name.split(' ');

  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0][0];
  }

  const [first] = names;
  const last = names[names.length - 1];

  return `${first[0]}${last[0]}`.toLocaleUpperCase();
};

const CustomMessageAction = ({ href }: { href?: string }) => {
  const editVisibilityLink = !href ? null : (
    <a href={href} target="_blank">
      <FormattedMessage {...messages.editVisibilityLink} />
    </a>
  );
  return (
    <FormattedMessage
      {...messages.visibility}
      values={{ editVisibilityLink }}
    />
  );
};

export const TextAvatarEditor = (props: TextAvatarEditorProps) => {
  const {
    fullName,
    manageProfileLink,
    testId = 'text-avatar-editor-wrapper',
    maxInitialLength = DEFAULT_MAX_LEN_TEXT,
    handleClickCancel,
    handleClickUpload,
  } = props;

  const [text, setText] = useState('');
  const [color, setColor] = useState(defaultSelectedColorHexValue);
  const [isInvalid, setIsInvalid] = useState(false);
  const [imageUri, setImageUri] = useState('');

  const handleChangeInputText = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const inputText = event.currentTarget.value || '';

      if (inputText.length > 0) {
        setIsInvalid(false);
      }

      setText(inputText.toLocaleUpperCase());
    },
    [],
  );

  const handleChangeColour = useCallback(
    (newColorHexValue: string) => setColor(newColorHexValue),
    [],
  );

  const onUpdate = useCallback(() => {
    if (text.length === 0) {
      setIsInvalid(true);
    } else {
      handleClickUpload(imageUri, text, getColorName(color), isInvalid);
    }
  }, [color, handleClickUpload, imageUri, isInvalid, text]);

  const onCancel = useCallback(() => {
    handleClickCancel();
  }, [handleClickCancel]);

  return (
    <ModalDialog autoFocus width="small" onClose={onCancel} testId="modal">
      <ModalHeader>
        <ModalHeaderWrapper>
          <ModalTitle>
            <FormattedMessage {...messages.modalTitle} />
          </ModalTitle>
        </ModalHeaderWrapper>
      </ModalHeader>

      <ModalBody>
        <MessageProvider>
          <div data-testid={testId}>
            <InitialsEditor>
              <Preview
                onChange={setImageUri}
                text={text ? text : getInitials(fullName)}
                whiteText={color !== T400 && color !== Y400}
                color={color}
              />
              <EditableInputs>
                <Field
                  label={<FormattedMessage {...messages.backgroundColor} />}
                  name="color"
                >
                  {() => (
                    <ColorPalette
                      palette={colorPalette}
                      selectedColor={color}
                      onChange={handleChangeColour}
                    />
                  )}
                </Field>

                <FormattedMessage
                  {...messages.placeholderText}
                  values={{ maxInitialLength }}
                >
                  {(placeholderMessage) => (
                    <Field
                      label={<FormattedMessage {...messages.text} />}
                      name="text"
                    >
                      {() => (
                        <>
                          <Textfield
                            maxLength={maxInitialLength}
                            placeholder={placeholderMessage as string}
                            value={text}
                            onChange={handleChangeInputText}
                            testId="input-text"
                            isInvalid={isInvalid}
                            isRequired
                          />
                          {isInvalid && (
                            <ErrorMessageWrapper>
                              <ErrorMessage testId={'text-input-warning'}>
                                <FormattedMessage
                                  {...messages.emptyTextError}
                                />
                              </ErrorMessage>
                            </ErrorMessageWrapper>
                          )}
                        </>
                      )}
                    </Field>
                  )}
                </FormattedMessage>
              </EditableInputs>
            </InitialsEditor>
            <CustomMessageAction href={manageProfileLink} />
          </div>
        </MessageProvider>
      </ModalBody>

      <ModalFooter>
        <Button appearance="subtle" onClick={onCancel} testId="cancel-button">
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          appearance="primary"
          autoFocus
          onClick={onUpdate}
          testId="update-button"
        >
          <FormattedMessage {...messages.update} />
        </Button>
      </ModalFooter>
    </ModalDialog>
  );
};

export default TextAvatarEditor;
