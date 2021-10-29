import React from 'react';

import { IntlProvider } from 'react-intl';

import { getEmojiResource } from '@atlaskit/util-data-test/get-emoji-resource';

import { HelpPointerEditor } from '../src';

import { createTag, queryTagList } from './helpers/example-callbacks';

export default function HelpPointerCreateExample() {
  return (
    <IntlProvider locale={'en'}>
      <HelpPointerEditor
        workspaceInfo={{ uuid: 'uuid', cloudId: 'cloud-id' }}
        title="Add a help link"
        onClose={() => {}}
        onFormSubmit={(formProps, completeCallback) => {
          console.log(formProps);
          setTimeout(completeCallback, 1000);
        }}
        emojiProvider={Promise.resolve(getEmojiResource())}
        tagPickerCallbacks={{
          queryTagList,
          createTag,
        }}
      />
    </IntlProvider>
  );
}
