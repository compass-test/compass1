import React, { memo } from 'react';

import { Slice } from 'prosemirror-model';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import {
  EditorProps,
  MacroAttributes,
  MacroProvider,
} from '@atlaskit/editor-core';
import { FormQuestionType } from '@atlassian/proforma-common-core/form-system-models';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';
import { formExtensionHandlers } from '../formExtensionHandlers';

import { ExtendedEditor } from './ExtendedEditor';
import { ExtensionSelection, MediaSingleSelection } from './ExtensionSelection';
import { FormNameInput } from './FormNameInput';
import { quickInsertProviderFactory } from './quickInsertProviderFactory';

interface ProFormaEditorProps extends EditorProps {
  onExtensionSelected?: (selected: ExtensionSelection) => void;
  onExtensionDeselected?: () => void;
  onImageSelected?: (selected: MediaSingleSelection) => void;
  onImageDeselected?: () => void;
  onPaste?: (slice: Slice) => Slice;
  onDrop?: (slice: Slice, dropPosition: number) => boolean;
  onQuestionDeleted?: (questionId: number, type: FormQuestionType) => void;
  onQuestionTypeChanged?: (
    questionId: number,
    prevType: FormQuestionType,
    newType: FormQuestionType,
  ) => void;
  extraProps?: boolean;
  maxIdRef: React.MutableRefObject<number>;
  updateMaxId: (newMaxId: number) => void;
  placeholder?: string;
  refData: FormBuilderReferenceData;
  formName?: string;
  updateFormName: (updatedFormName: string) => void;
}

/**
 * The Atlassian Editor requires a MacroProvider to be implemented, otherwise it won't display the contents of extensions.
 * Our implementation isn't used and so doesn't do anything — other than allow our extensions to be displayed.
 */
const noopMacroProvider: MacroProvider = {
  config: {},
  autoConvert(link: string): MacroAttributes | null {
    return null;
  },
  openMacroBrowser(macroNode?: any): Promise<MacroAttributes> {
    return Promise.reject('ProForma does not have a macro browser');
  },
};

/**
 * The editor part of the form builder, which loads an Atlassian Editor with our extensions.
 */
export const ProFormaEditor = injectIntl(
  memo((props: ProFormaEditorProps & InjectedIntlProps) => {
    const quickInsertProvider = quickInsertProviderFactory(
      props.maxIdRef,
      props.updateMaxId,
      props.intl,
    );

    return (
      <ExtendedEditor
        {...props}
        // Default configuration of the Editor for ProForma
        extensionHandlers={formExtensionHandlers(props.refData)}
        appearance="full-page"
        contentComponents={
          <FormNameInput
            value={props.formName}
            onChange={props.updateFormName}
          />
        }
        allowDate={false}
        allowExtension={{
          allowBreakout: true,
        }}
        allowIndentation={true}
        allowLayouts={{
          allowBreakout: true,
          UNSAFE_addSidebarLayouts: true,
        }}
        media={{
          allowMediaSingle: {
            disableLayout: true,
          },
          allowResizing: false,
          allowResizingInTables: false,
          allowAnnotation: false,
          allowLinking: false,
        }}
        allowPanel={true}
        allowRule={true}
        allowStatus={true}
        allowTables={{
          advanced: true,
          permittedLayouts: ['default'],
          allowColumnResizing: true,
        }}
        allowTextAlignment={true}
        allowTextColor={true}
        allowTemplatePlaceholders={{
          allowInserting: false,
        }}
        quickInsert={{ provider: Promise.resolve(quickInsertProvider) }}
        macroProvider={Promise.resolve(noopMacroProvider)}
        onExtensionSelected={(selected: ExtensionSelection) => {
          if (props.onExtensionSelected) {
            props.onExtensionSelected(selected);
          }
        }}
        onExtensionDeselected={() => {
          if (props.onExtensionDeselected) {
            props.onExtensionDeselected();
          }
        }}
        onImageSelected={(selected: MediaSingleSelection) => {
          if (props.onImageSelected) {
            props.onImageSelected(selected);
          }
        }}
        onImageDeselected={() => {
          if (props.onImageDeselected) {
            props.onImageDeselected();
          }
        }}
        onPaste={props.onPaste}
        onDrop={props.onDrop}
        onQuestionDeleted={props.onQuestionDeleted}
        onQuestionTypeChanged={props.onQuestionTypeChanged}
      />
    );
  }),
);
