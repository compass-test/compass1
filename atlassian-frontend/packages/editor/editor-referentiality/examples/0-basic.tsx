import React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import { Editor, WithEditorActions } from '@atlaskit/editor-core';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { referentialityPlugin } from '../src';
import { extensionProvider } from '../example-helpers/table-vis-provider';

export const LOCALSTORAGE_defaultDocKey =
  'fabric.editor.example.referentiality';
export const LOCALSTORAGE_defaultTitleKey =
  'fabric.editor.example.referentiality.title';

const EditorWithIntl = injectIntl(({ intl }) => (
  <Editor
    appearance="full-page"
    allowTables={{
      advanced: true,
      allowColumnSorting: true,
      stickyHeaders: true,
      tableCellOptimization: true,
    }}
    allowExtension={{ allowAutoSave: true, allowExtendFloatingToolbars: true }}
    dangerouslyAppendPlugins={{
      __plugins: [referentialityPlugin()],
    }}
    extensionProviders={(editorActions) => [
      extensionProvider(intl, editorActions),
    ]}
    allowExpand={{
      allowInsertion: true,
    }}
    defaultValue={
      (localStorage && localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
      undefined
    }
    primaryToolbarComponents={[
      <WithEditorActions
        key={1}
        render={(actions) => {
          return (
            <ButtonGroup>
              <Button
                tabIndex={-1}
                appearance="primary"
                onClick={async () => {
                  const value = await actions.getValue();
                  localStorage.setItem(
                    LOCALSTORAGE_defaultDocKey,
                    JSON.stringify(value),
                  );
                }}
                testId="save-button"
              >
                Save
              </Button>
              <Button
                tabIndex={-1}
                appearance="subtle"
                onClick={() => {
                  if (!actions) {
                    return;
                  }
                  actions.clear();
                  localStorage.removeItem(LOCALSTORAGE_defaultDocKey);
                  localStorage.removeItem(LOCALSTORAGE_defaultTitleKey);
                }}
              >
                Clear
              </Button>
            </ButtonGroup>
          );
        }}
      />,
    ]}
  />
));

export default () => (
  <IntlProvider locale="en">
    <EditorWithIntl />
  </IntlProvider>
);
