import React, { useState } from 'react';

import styled from '@emotion/styled';
import { IntlProvider } from 'react-intl';

import LoadingButton from '@atlaskit/button/loading-button';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { N0, N40A, N50A } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';

import { HelpPointerEditor, HelpPointerList } from '../src';

import {
  createTag,
  linkClickCallback,
  queryTagList,
} from './helpers/example-callbacks';
import { EXAMPLE_HELP_POINTERS } from './helpers/example-data';

const TeamsWrapper = styled.div`
  background-color: ${token('color.background.card', N0)};
  box-shadow: ${token('shadow.card', `0 1px 1px ${N50A}, 0 0 1px 1px ${N40A}`)};
  border-radius: 3px;
  padding: 8px 8px;
  margin: 20px auto 10px auto;
  max-width: 600px;
`;

export default function HelpPointerListExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IntlProvider locale={'en'}>
      <TeamsWrapper>
        <HelpPointerList
          testId="help-pointer-list"
          helpPointers={EXAMPLE_HELP_POINTERS.map((pointer) => ({
            ...pointer,
            editable: true,
          }))}
          emojiProvider={Promise.resolve(getEmojiResource())}
          linkClickCallback={linkClickCallback}
          renderRemoveModal={({ close, target }) => {
            return (
              <Modal onClose={close} width="small">
                <ModalHeader>
                  <ModalTitle appearance="danger">Remove pointer</ModalTitle>
                </ModalHeader>

                <ModalBody>
                  <p>
                    Are you sure you want to remove <b>{target.name}</b>{' '}
                    pointer. This action cannot be undone
                  </p>
                </ModalBody>
                <ModalFooter>
                  {[
                    {
                      text: 'Remove',
                      onClick: () => {
                        setIsLoading(true);

                        console.log('Submitting remove request ...');

                        setTimeout(() => {
                          setIsLoading(false);
                          close();
                        }, 3000);
                      },
                      isLoading: isLoading,
                    },
                    { text: 'Cancel', onClick: close },
                  ]
                    .map((props, index) => (
                      <LoadingButton
                        {...props}
                        autoFocus={index === 0}
                        appearance={
                          index === 0 ? 'danger' || 'primary' : 'subtle'
                        }
                      >
                        {props.text}
                      </LoadingButton>
                    ))
                    .reverse()}
                </ModalFooter>
              </Modal>
            );
          }}
          renderEditModal={({ close, target }) => {
            return (
              <HelpPointerEditor
                targetHelpPointer={target}
                workspaceInfo={{ uuid: 'uuid', cloudId: 'cloud-id' }}
                title="Edit help pointer"
                onClose={close}
                onFormSubmit={(formProps) => {
                  console.log(formProps);
                }}
                emojiProvider={Promise.resolve(getEmojiResource())}
                tagPickerCallbacks={{
                  queryTagList,
                  createTag,
                }}
              />
            );
          }}
        />
      </TeamsWrapper>
    </IntlProvider>
  );
}
