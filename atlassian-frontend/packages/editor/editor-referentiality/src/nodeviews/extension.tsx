import React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import {
  ExtensionNode,
  ExtensionNodeWrapper,
} from '@atlaskit/editor-core/extensibility';
import ExtensionWithDataSource from '../ui/Extension';
import { DataSourceProvider } from '../data-source-provider';

export type ForwardRef = (node: HTMLElement | null) => void;

/**
 * @description This class extends editor-core ExtensionNode passing dataSourceProvider
 * and rendering ExtensionWithDataSource component
 */
export default class ExtensionNodeWithDataSource extends ExtensionNode {
  render(
    props: {
      providerFactory: ProviderFactory;
      extensionHandlers: ExtensionHandlers;
      dataSourceProvider?: DataSourceProvider;
    },
    forwardRef: ForwardRef,
  ) {
    return (
      <ExtensionNodeWrapper nodeType={this.node.type.name}>
        <ExtensionWithDataSource
          editorView={this.view as EditorView}
          node={this.node}
          providerFactory={props.providerFactory}
          handleContentDOMRef={forwardRef}
          extensionHandlers={props.extensionHandlers}
          dataSourceProvider={props.dataSourceProvider}
        />
      </ExtensionNodeWrapper>
    );
  }
}
