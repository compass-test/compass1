import React from 'react';

import { NodeSelection } from 'prosemirror-state';
import { isNodeSelection } from 'prosemirror-utils';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { EditorActions } from '@atlaskit/editor-core';
import { N200, N60 } from '@atlaskit/theme/colors';

import { SectionParameters } from '../../models/SectionParameters';
import {
  FormBuilderMessage,
  IntlFormBuilderMessages,
} from '../JiraAdfFormBuilderMessages.intl';

import { DragHandle } from './DragHandle';

interface EditorSectionProps {
  section: SectionParameters;
  editorActions: EditorActions;
}

function isSectionSelected(
  editorActions: EditorActions,
  sectionId: number,
): boolean {
  const editorView = editorActions._privateGetEditorView();

  if (!editorView) {
    return false;
  }

  const { selection } = editorView.state;
  if (!isNodeSelection(selection)) {
    return false;
  }

  const nodeSelection = selection as NodeSelection;

  return (
    nodeSelection.node &&
    nodeSelection.node.attrs &&
    nodeSelection.node.attrs.parameters &&
    nodeSelection.node.attrs.parameters.id === sectionId &&
    nodeSelection.node.attrs.extensionKey === 'section'
  );
}

/**
 * A question rendered in the form builder editor. Intended to look like the real questions, but does not share
 * code with question components from the form system because they require MobX which isn't available in the editor.
 */
export const EditorSection: React.FunctionComponent<EditorSectionProps> = ({
  section,
  editorActions,
}) => {
  const isSelected = isSectionSelected(editorActions, section.id);

  return (
    <SectionDiv>
      {isSelected && (
        <DragHandle
          tooltipMsg={
            <FormattedMessage
              {...IntlFormBuilderMessages[
                FormBuilderMessage.DragHandleSectionTooltip
              ]}
            />
          }
        />
      )}
      <SectionTextDiv>
        <FormattedMessage
          {...IntlFormBuilderMessages[FormBuilderMessage.SectionEnd]}
        />
      </SectionTextDiv>
      <SectionHorizontalRule />
      <SectionTextDiv>
        {section.name ? (
          <>
            <FormattedMessage
              {...IntlFormBuilderMessages[FormBuilderMessage.SectionStart]}
            />
            : <SectionName>{section.name}</SectionName>
          </>
        ) : (
          <FormattedMessage
            {...IntlFormBuilderMessages[FormBuilderMessage.SectionStart]}
          />
        )}
      </SectionTextDiv>
    </SectionDiv>
  );
};

const SectionDiv = styled.div``;

const SectionHorizontalRule = styled.hr`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
`;

const SectionTextDiv = styled.div`
  margin: 0 50px;
  color: ${N60};
  font-size: 12px;
  font-weight: 600;
`;

const SectionName = styled.strong`
  color: ${N200};
`;
