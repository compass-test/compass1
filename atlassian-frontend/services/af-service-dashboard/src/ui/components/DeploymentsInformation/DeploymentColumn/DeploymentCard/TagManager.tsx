/** @jsx jsx */
import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { useResource } from 'react-resource-router';
import { jsx } from '@emotion/core';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';

import Modal, {
  ModalTransition,
  ModalBody,
  ModalTitle,
  ModalHeader,
  ModalFooter,
} from '@atlaskit/modal-dialog';

import Tooltip from '@atlaskit/tooltip';
import Spinner from '@atlaskit/spinner';
import Form, { Field, HelperMessage, ErrorMessage } from '@atlaskit/form';
import { CreatableSelect, ValueType, OptionType } from '@atlaskit/select';
import EditIcon from '@atlaskit/icon/glyph/edit';
import { editButton, buttonPrimaryColor, spinner } from './styles';

import request from '../../../../utils/request';
import { deploymentTagsResource } from '../../../../resources/deployment-tags';

type TagManagerProps = {
  deploymentStateId: string;
  pipelineUuid: string;
  tags: string[];
  updateDisplayedTags: (tags: string[]) => any;
};

type DeploymentTagsPayload = {
  id: string;
  tags: string[];
};

type FormData = {
  selectValues: ValueType<OptionType>;
};

type ButtonPropsAndText = { text: string } & ButtonProps;

type ModalState = 'edit' | 'error' | 'loading';

const validateTags = (input?: OptionType | readonly OptionType[]) => {
  if (!input) {
    return undefined;
  }

  const regex = /^[-A-Za-z0-9\s!#$%&'*+./=?_]+$/;

  if (Array.isArray(input)) {
    for (let value of input) {
      if (!regex.test(value.value as string)) {
        return 'ILLEGAL_CHARS';
      }
    }
  } else {
    if (!regex.test((input as OptionType).value as string)) {
      return 'ILLEGAL_CHARS';
    }
  }

  return undefined;
};

export const TagManager = ({
  deploymentStateId,
  pipelineUuid,
  tags,
  updateDisplayedTags,
}: TagManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('loading');

  const { loading, error, data, refresh } = useResource(deploymentTagsResource);

  const openTagModal = () => {
    refresh();
    setIsOpen(true);
  };

  const closeTagModal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (loading) {
      return setModalState('loading');
    }

    if (error || !data?.tagOptions) {
      console.log(error);
      return setModalState('error');
    }

    return setModalState('edit');
  }, [isOpen, loading, error, data]);

  const appearance = modalState === 'error' ? 'danger' : undefined;

  const closeAction: ButtonPropsAndText = {
    text: 'Close',
    onClick: closeTagModal,
    appearance: 'subtle',
  };

  const updateAction: ButtonPropsAndText = {
    text: 'Update',
    type: 'submit',
    appearance: appearance || 'primary',
    autoFocus: true,
  };

  let actions = [];
  switch (modalState) {
    case 'edit':
      actions = [closeAction, updateAction];
      break;
    case 'loading':
    case 'error':
    default:
      actions = [closeAction];
      break;
  }

  const FormContainer = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <Form
          onSubmit={(data: FormData) => {
            const { selectValues } = data;
            if (selectValues === undefined) {
              closeTagModal();
              return;
            }

            let newTags: string[] = [];
            if (Array.isArray(selectValues)) {
              newTags = selectValues.map(value => value.value as string);
            } else if (selectValues !== null) {
              newTags = [selectValues.value as string];
            }

            request
              .post<DeploymentTagsPayload>(
                '/api/action/update-deployment-tags',
                {
                  id: deploymentStateId,
                  tags: newTags,
                },
              )
              .then(data => {
                updateDisplayedTags(data.tags);
              })
              .catch(err => {
                alert(err);
              });

            closeTagModal();
          }}
        >
          {({ formProps }) => <form {...formProps}>{children}</form>}
        </Form>
      );
    },
    [deploymentStateId, updateDisplayedTags],
  );

  const renderEditTagsField = () => {
    return (
      <Field<readonly OptionType[]>
        id="selectValues"
        name="selectValues"
        validate={validateTags}
      >
        {({ fieldProps, error, valid }) => {
          const { id, onChange, ...rest } = fieldProps;
          return (
            <React.Fragment>
              <CreatableSelect
                {...rest}
                inputId={id}
                onChange={onChange}
                validationState={error ? 'error' : 'default'}
                menuPortalTarget={document.body}
                className="multi-select"
                classNamePrefix="react-select"
                options={data?.tagOptions.map(tag => ({
                  label: tag,
                  value: tag,
                }))}
                defaultValue={tags.map(tag => ({
                  label: tag,
                  value: tag,
                }))}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 }),
                }}
                isMulti
                placeholder="Choose or create a tag"
              />
              {valid && (
                <HelperMessage>
                  You can use letters, numbers, spaces, and the following
                  symbols: !#$%&'*+-./=?_
                </HelperMessage>
              )}
              {!valid && (
                <ErrorMessage>
                  Invalid tag, use only letters, numbers, spaces, and the
                  following symbols: !#$%&'*+-./=?_
                </ErrorMessage>
              )}
            </React.Fragment>
          );
        }}
      </Field>
    );
  };

  return (
    <React.Fragment>
      <Tooltip content="Edit Tags" position="right">
        <div css={editButton} onClick={openTagModal}>
          <EditIcon
            label="edit"
            primaryColor={buttonPrimaryColor}
            size="medium"
          />
        </div>
      </Tooltip>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeTagModal}>
            <FormContainer>
              <ModalHeader>
                <ModalTitle
                  appearance={appearance}
                >{`Edit Tags for Deployment #${pipelineUuid}`}</ModalTitle>
              </ModalHeader>

              <ModalBody>
                {modalState === 'loading' && (
                  <div css={spinner}>
                    <Spinner />
                  </div>
                )}
                {modalState === 'error' && (
                  <p>
                    {error?.message ||
                      `An error occured while fetching tags for Deployment #${pipelineUuid}.`}
                  </p>
                )}
                {modalState === 'edit' && renderEditTagsField()}
              </ModalBody>

              <ModalFooter>
                {actions.map(({ text, ...props }) => (
                  <Button key={text} {...props}>
                    {text}
                  </Button>
                ))}
              </ModalFooter>
            </FormContainer>
          </Modal>
        )}
      </ModalTransition>
    </React.Fragment>
  );
};
