import { Node as PMNode, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { pluginKey, getPluginState } from './plugin-key';
import { DataSourceProvider } from '../data-source-provider';
import { NodeMutationObserver } from '../node-mutation-observer';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { ADFEntity } from '@atlaskit/adf-utils';
import { traverse } from '@atlaskit/adf-utils/traverse';
import {
  EditorPlugin,
  EventDispatcher,
  PortalProviderAPI,
} from '@atlaskit/editor-core';
import {
  EmitterEvents,
  getChangedNodes,
  toJSON,
} from '@atlaskit/editor-core/extensibility';
import ExtensionNode from '../nodeviews/extension';
import { ExternalObserver } from '../types';

const check = (node: PMNode): boolean => {
  try {
    node.check();
    return true;
  } catch (err) {
    return false;
  }
};

const allowedSource = (node: PMNode | ADFEntity, schema: Schema): boolean => {
  const nodeName = typeof node.type === 'string' ? node.type : node.type.name;
  return [schema.nodes.table.name].includes(nodeName) && node.attrs?.localId;
};

function createPlugin(
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  externalObservers: ExternalObserver[],
) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        const dataSourceProvider = new DataSourceProvider();
        const nodeMutationObserver = new NodeMutationObserver(
          dataSourceProvider,
        );
        externalObservers.forEach((externalObserver) =>
          externalObserver.init({
            emit: (localId, data) =>
              dataSourceProvider.createOrUpdate(localId, data),
          }),
        );

        return {
          dataSourceProvider,
          nodeMutationObserver,
          changedSources: new Map(),
        };
      },
      apply(tr, pluginState, state) {
        if (!tr.docChanged) {
          return pluginState;
        }

        const changedSources = new Map(pluginState.changedSources);

        // handle added/updated table node
        const changedNodes = getChangedNodes(tr).filter(
          ({ node }) => allowedSource(node, state.schema) && check(node),
        );

        changedNodes.forEach(({ node: sourceNode }) => {
          const id = sourceNode?.attrs?.localId;
          changedSources.set(id, sourceNode);
        });

        if (changedNodes.length) {
          return { ...pluginState, changedSources };
        }

        return pluginState;
      },
    },
    view: (editorView) => {
      const pluginState = getPluginState(editorView.state);
      if (!pluginState) {
        return {};
      }
      let handleDeleteDataSource: (node: PMNode) => void;
      const dataSourceProvider = pluginState.dataSourceProvider;
      const nodeMutationObserver = pluginState.nodeMutationObserver;

      if (dataSourceProvider) {
        handleDeleteDataSource = (node) => {
          if (node && node.attrs) {
            let tableExistsInDoc = false;
            // ensure the destroyed node is actually not recreated
            traverse(toJSON(editorView.state.doc), {
              any: (docNode: ADFEntity) => {
                if (docNode?.attrs?.localId === node.attrs.localId) {
                  tableExistsInDoc = true;
                }
              },
            });

            if (!tableExistsInDoc) {
              dataSourceProvider.delete(node.attrs.localId);
            }
          }
        };
        eventDispatcher.on(EmitterEvents.TABLE_DELETED, handleDeleteDataSource);
      }

      if (nodeMutationObserver) {
        traverse(toJSON(editorView.state.doc), {
          any: (node: ADFEntity) => {
            if (allowedSource(node, editorView.state.schema)) {
              nodeMutationObserver.emit(node?.attrs?.localId, node);
            }
          },
        });
      }

      return {
        update(view) {
          const pluginState = getPluginState(view.state);
          if (!pluginState) {
            return;
          }
          const { changedSources, nodeMutationObserver } = pluginState;

          changedSources.forEach((node: PMNode, id: string) => {
            nodeMutationObserver.emit(id, toJSON(node));
          });

          changedSources.clear();
        },
        destroy() {
          if (dataSourceProvider) {
            eventDispatcher.off(
              EmitterEvents.TABLE_DELETED,
              handleDeleteDataSource,
            );

            if (dataSourceProvider.clear) {
              dataSourceProvider.clear();
            }
          }
        },
      };
    },
    props: {
      nodeViews: {
        extension: (node, view, getPos) => {
          const pluginState = getPluginState(view.state);
          return new ExtensionNode(
            node,
            view,
            getPos,
            portalProviderAPI,
            eventDispatcher,
            {
              providerFactory,
              extensionHandlers,
              dataSourceProvider: pluginState?.dataSourceProvider,
            },
          ).init();
        },
        bodiedExtension: (node, view, getPos) => {
          const pluginState = getPluginState(view.state);
          return new ExtensionNode(
            node,
            view,
            getPos,
            portalProviderAPI,
            eventDispatcher,
            {
              providerFactory,
              extensionHandlers,
              dataSourceProvider: pluginState?.dataSourceProvider,
            },
          ).init();
        },
        inlineExtension: (node, view, getPos) => {
          const pluginState = getPluginState(view.state);
          return new ExtensionNode(
            node,
            view,
            getPos,
            portalProviderAPI,
            eventDispatcher,
            {
              providerFactory,
              extensionHandlers,
              dataSourceProvider: pluginState?.dataSourceProvider,
            },
          ).init();
        },
      },
    },
  });
}

type Options = {
  extensionHandlers?: ExtensionHandlers;
  externalObservers?: ExternalObserver[];
  allowAutoSave?: boolean;
};

export const referentialityPlugin = (options: Options = {}): EditorPlugin => ({
  name: 'referentiality',

  pmPlugins() {
    return [
      {
        name: 'referentiality',
        plugin: ({
          providerFactory,
          portalProviderAPI,
          eventDispatcher,
        }: {
          providerFactory: ProviderFactory;
          portalProviderAPI: PortalProviderAPI;
          eventDispatcher: EventDispatcher;
        }) => {
          const extensionHandlers = options.extensionHandlers ?? {};
          const externalObservers = options.externalObservers ?? [];

          return createPlugin(
            providerFactory,
            extensionHandlers,
            portalProviderAPI,
            eventDispatcher,
            externalObservers,
          );
        },
      },
    ];
  },
});
