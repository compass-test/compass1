import { Node as PMNode } from 'prosemirror-model';
import { ExtensionParams, ReferenceEntity } from '@atlaskit/editor-common';
import { DataSourceProvider } from './data-source-provider';
import { NodeMutationObserver } from './node-mutation-observer';

export interface ReferentialityPluginState {
  dataSourceProvider: DataSourceProvider;
  nodeMutationObserver: NodeMutationObserver;
  changedSources: Map<string, PMNode>;
}

export type ExternalObserver = {
  init: (input: { emit: (localId: string, data: Object) => void }) => void;
  destroy: () => void;
};

export type ExtensionHandlerWithReferenceFn<T> = (
  extensionParams: ExtensionParams<T>,
  fn: (param: { references: ReferenceEntity[] }) => JSX.Element,
) => JSX.Element;
