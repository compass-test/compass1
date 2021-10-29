import React from 'react';

import { FormattedMessage } from 'react-intl';

import { ExtensionHandlers, ExtensionParams } from '@atlaskit/editor-common';
import { WithEditorActions } from '@atlaskit/editor-core';
import SectionMessage from '@atlaskit/section-message';

import { FormBuilderReferenceData } from '../models/FormBuilderReferenceData';

import { messages } from './messages';
import { EditorQuestion } from './questiontypes/EditorQuestion';
import { EditorSection } from './questiontypes/EditorSection';

export const formExtensionHandlers = (
  refData: FormBuilderReferenceData,
): ExtensionHandlers => {
  return {
    'com.thinktilt.proforma': {
      render: (ext: ExtensionParams<any>) => {
        switch (ext.extensionKey) {
          case 'question':
            return (
              <WithEditorActions
                render={actions => (
                  <EditorQuestion
                    question={ext.parameters}
                    editorActions={actions}
                    refData={refData}
                  />
                )}
              />
            );
          case 'section':
            return (
              <WithEditorActions
                render={actions => (
                  <EditorSection
                    section={ext.parameters}
                    editorActions={actions}
                  />
                )}
              />
            );
          case 'html':
            return (
              <SectionMessage appearance="warning">
                <FormattedMessage
                  {...messages.htmlQuestionsNoLongerSupported}
                />
              </SectionMessage>
            );
          default:
            return <></>;
        }
      },
      update: async (params: any) => {
        // Update is currently ignored
      },
    },
  };
};
