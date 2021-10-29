import React from 'react';

import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';

import { HelpPointer, HelpPointerEditor } from '../../src';

import { createTag, queryTagList } from './example-callbacks';

export type Props = {
  close: () => void;
  target: HelpPointer | undefined;
};

const EditModal = (props: Props) => {
  return (
    <HelpPointerEditor
      targetHelpPointer={props.target}
      workspaceInfo={{ uuid: 'uuid', cloudId: 'cloud-id' }}
      title="Edit help link"
      onClose={props.close}
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
};

export default EditModal;
