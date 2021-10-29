import React, { Fragment, useState } from 'react';

import Button, { LoadingButton } from '@atlaskit/button';
import { EmojiId } from '@atlaskit/emoji';
import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
} from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import { Team } from '@atlaskit/user-picker';
import { SelectTagPicker, TagSelectOptions } from '@atlassian/tc-tag-picker';

import { HelpPointerType } from '../../../index';

import HelpPointerIconPicker from './icon-picker';
import {
  BOOK_EMOJIS,
  CLIPBOARD_EMOJI,
  getRandomBookEmoji,
} from './icon-picker/utils';
import {
  CancelButtonWrapper,
  CreateHelpPointerFormContainer,
  ErrorPlaceholder,
  StyledTopField,
} from './styled';
import HelpPointerTypePicker, { PointerTypeOption } from './type-picker';
import { HelpPointerEditorFormProps, HelpPointerFormData } from './types';
import HelpPointerTeamPicker from './user-picker';
import {
  FieldError,
  getInitialSelectedTeam,
  getInitialSelectedType,
  getInitialTags,
  MAX_CHARS_DESCRIPTION_FIELD,
  MAX_CHARS_LINK_FIELD,
  MAX_CHARS_NAME_FIELD,
  MAX_TAGS_TOPICS_FIELD,
  resolveTypeString,
  validateDescription,
  validateHelpForm,
  validateLink,
  validateName,
  validateTeam,
} from './utils';

export default (props: HelpPointerEditorFormProps) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(
    getInitialSelectedTeam(props.targetHelpPointer?.owner || props.fixedOwner),
  );
  const [selectedPointerType, setSelectedPointerType] = useState<
    PointerTypeOption
  >(getInitialSelectedType(props.targetHelpPointer?.type));
  const [iconColor, setIconColor] = useState(
    props.targetHelpPointer?.icon?.color ?? '#85B8FF',
  );
  const [iconEmoji, setIconEmoji] = useState<Omit<EmojiId, 'fallback'>>(
    props.targetHelpPointer?.icon ?? CLIPBOARD_EMOJI,
  );
  const [tags, setTags] = useState<TagSelectOptions>(
    getInitialTags(props.targetHelpPointer?.tags),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const originalDescriptionSize =
    props.targetHelpPointer?.description?.length || 0;

  const createCompleteFormData = (
    partialFormData: HelpPointerFormData,
  ): HelpPointerFormData => {
    return {
      ...partialFormData,
      name: partialFormData.name?.trim(),
      description: partialFormData.description?.trim(),
      link: partialFormData.link?.trim(),
      helpType: selectedPointerType,
      team: selectedTeam,
      tags: [...tags],
      icon: {
        id: iconEmoji.id,
        shortName: iconEmoji.shortName,
        color: iconColor,
      },
    };
  };

  const onCompleteCallback = (error?: string) => {
    // TODO: Add error message feedback.
    setIsSubmitting(false);
  };

  const validateAndSubmitForm = (partialFormData: HelpPointerFormData) => {
    const completeFormData = createCompleteFormData(partialFormData);
    const errors = validateHelpForm.onSubmit(
      completeFormData,
      originalDescriptionSize,
    );
    if (errors) {
      return errors;
    }

    setIsSubmitting(true);
    props.onFormSubmit(completeFormData, onCompleteCallback);
  };

  const updateSelectedPointerType = (newOption: PointerTypeOption) => {
    if (newOption.value === HelpPointerType.Action) {
      if (
        BOOK_EMOJIS.some(
          (bookEmoji) => bookEmoji.shortName === iconEmoji.shortName,
        )
      ) {
        setIconEmoji(CLIPBOARD_EMOJI);
      }
    } else if (newOption.value === HelpPointerType.Information) {
      if (iconEmoji.shortName === CLIPBOARD_EMOJI.shortName) {
        setIconEmoji(getRandomBookEmoji());
      }
    }
    setSelectedPointerType(newOption);
  };

  return (
    <CreateHelpPointerFormContainer>
      <Form
        onSubmit={(partialFormData) => validateAndSubmitForm(partialFormData)}
        isDisabled={isSubmitting}
      >
        {({ formProps }) => (
          <form {...formProps}>
            <FormHeader title={props.title} />
            <StyledTopField>
              <Field name="helpType" label="What are you linking to?">
                {({ fieldProps }) => (
                  <HelpPointerTypePicker
                    selectedPointerType={selectedPointerType}
                    setSelectedPointerType={updateSelectedPointerType}
                    isDisabled={fieldProps.isDisabled}
                  />
                )}
              </Field>
            </StyledTopField>
            <Field
              name="link"
              defaultValue={
                props.targetHelpPointer?.link.replace(/^\/+|\/+$/g, '') ?? ''
              }
              label="Link"
              validate={validateLink}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField
                    {...fieldProps}
                    placeholder="eg. https://www.atlassian.com"
                  />
                  {!error && <ErrorPlaceholder />}
                  {error === FieldError.REQUIRED && (
                    <ErrorMessage children={'This field is required'} />
                  )}
                  {error === FieldError.TOO_LONG && (
                    <ErrorMessage
                      children={`Must be less than ${MAX_CHARS_LINK_FIELD} characters`}
                    />
                  )}
                  {error === FieldError.INVALID && (
                    <ErrorMessage children={'Must be a valid URL'} />
                  )}
                </Fragment>
              )}
            </Field>
            <Field
              name="name"
              defaultValue={props.targetHelpPointer?.name ?? ''}
              label="Title"
              validate={validateName}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField
                    {...fieldProps}
                    placeholder="eg. Workplace equipment requests"
                  />
                  {!error && <ErrorPlaceholder />}
                  {error === FieldError.REQUIRED && (
                    <ErrorMessage children={'This field is required'} />
                  )}
                  {error === FieldError.TOO_LONG && (
                    <ErrorMessage
                      children={`Must be less than ${MAX_CHARS_NAME_FIELD} characters`}
                    />
                  )}
                </Fragment>
              )}
            </Field>
            <Field
              name="description"
              defaultValue={props.targetHelpPointer?.description ?? ''}
              label="Description"
              validate={(value) =>
                validateDescription(originalDescriptionSize, value)
              }
            >
              {({ fieldProps, error }: any) => (
                <Fragment>
                  <TextArea
                    maxHeight={'56px'}
                    placeholder={`Add a short description to help people find the right ${resolveTypeString(
                      selectedPointerType.value,
                    )}`}
                    {...fieldProps}
                  />
                  {!error && <ErrorPlaceholder />}
                  {error === FieldError.TOO_LONG && (
                    <ErrorMessage
                      children={`Must be less than ${MAX_CHARS_DESCRIPTION_FIELD} characters`}
                    />
                  )}
                </Fragment>
              )}
            </Field>
            {!props.fixedOwner && (
              <Field
                name="teamPicker"
                defaultValue={selectedTeam}
                label={'Which team provides this help?'}
                validate={() => validateTeam(selectedTeam?.id)}
              >
                {({ error }) => (
                  <Fragment>
                    <HelpPointerTeamPicker
                      selectedTeam={selectedTeam}
                      setSelectedTeam={setSelectedTeam}
                      cloudId={props.workspaceInfo.cloudId}
                      workspaceUuid={props.workspaceInfo.uuid}
                    />
                    {!error && <ErrorPlaceholder />}
                    {error === FieldError.REQUIRED && (
                      <ErrorMessage children={'This field is required'} />
                    )}
                  </Fragment>
                )}
              </Field>
            )}
            <Field
              name="icon-picker"
              label={`Select an icon to represent this ${resolveTypeString(
                selectedPointerType.value,
              )}`}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <HelpPointerIconPicker
                    isDisabled={fieldProps.isDisabled}
                    color={iconColor}
                    onChangeColor={(color: string) => setIconColor(color)}
                    iconEmoji={iconEmoji}
                    onChangeEmoji={(emoji: Omit<EmojiId, 'fallback'>) =>
                      setIconEmoji(emoji)
                    }
                    isEmojiPickerOpen={isEmojiPickerOpen}
                    setIsEmojiPickerOpen={(isOpen: boolean) =>
                      setIsEmojiPickerOpen(isOpen)
                    }
                    emojiProvider={props.emojiProvider}
                  />
                  {!error && <ErrorPlaceholder />}
                </Fragment>
              )}
            </Field>
            <Field name="tags" label="Topics">
              {({ fieldProps, error }) => (
                <Fragment>
                  <SelectTagPicker
                    isDisabled={fieldProps.isDisabled}
                    placeholder={`Add #tags to help teams search for your ${
                      selectedPointerType.value === HelpPointerType.Action
                        ? 'request link'
                        : 'article'
                    }`}
                    tags={tags}
                    setTags={setTags}
                    createTag={props.tagPickerCallbacks.createTag}
                    queryTagList={props.tagPickerCallbacks.queryTagList}
                  />
                  {!error && <ErrorPlaceholder />}
                  {error === FieldError.TOO_LONG && (
                    <ErrorMessage
                      children={`Choose ${MAX_TAGS_TOPICS_FIELD} or less #tags`}
                    />
                  )}
                </Fragment>
              )}
            </Field>

            <FormFooter>
              <LoadingButton
                type="submit"
                appearance="primary"
                isLoading={isSubmitting}
              >
                Done
              </LoadingButton>
              <CancelButtonWrapper>
                <Button appearance="subtle" onClick={() => props.onClose()}>
                  Cancel
                </Button>
              </CancelButtonWrapper>
            </FormFooter>
          </form>
        )}
      </Form>
    </CreateHelpPointerFormContainer>
  );
};
