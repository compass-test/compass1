import React from 'react';
import { InjectedIntl } from 'react-intl';
import {
  DefaultExtensionProvider,
  ExtensionAPI,
  ExtensionManifest,
} from '@atlaskit/editor-common/extensions';
import { EditorActions } from '@atlaskit/editor-core';
import { ADFEntity } from '@atlaskit/adf-utils';
import { dataSourceResolver } from '../../src/data-source-resolver';

const tableVisExtensionManifest = (
  intl: InjectedIntl,
  editorActions?: EditorActions,
): ExtensionManifest => {
  return {
    title: 'Chart',
    type: 'com.atlassian.chart',
    key: 'chart',
    icons: {
      '48': () =>
        import(
          /* webpackChunkName: "@atlaskit-internal_icon-graph-bar" */ '@atlaskit/icon/glyph/graph-bar'
        ).then((mod) => mod.default),
    },
    modules: {
      contextualToolbars: [
        {
          context: {
            type: 'node',
            nodeType: 'table',
          },
          toolbarItems: [
            {
              key: 'item-1',
              label: 'Insert chart object',
              display: 'icon',
              tooltip: 'This was added by the extension to the table node',
              icon: () =>
                import(
                  /* webpackChunkName: "@atlaskit-internal_icon-graph-bar" */ '@atlaskit/icon/glyph/graph-bar'
                ).then((mod) => mod.default),
              action: async (adf: ADFEntity, api: ExtensionAPI) => {
                const localId: string = adf.attrs?.localId || '';
                const chartADF: ADFEntity = {
                  type: 'extension',
                  attrs: {
                    extensionType: 'com.atlassian.chart',
                    extensionKey: 'chart',
                  },
                  marks: [
                    {
                      type: 'dataConsumer',
                      attrs: {
                        sources: [localId],
                      },
                    },
                  ],
                };
                api.doc.insertAfter(localId, chartADF);
              },
            },
          ],
        },
      ],
      fields: {
        custom: {
          dataSource: {
            resolver: columnResolver(editorActions),
          },
        },
      },
      nodes: {
        default: {
          type: 'extension',
          render: async () => ({ node, references }) => {
            if (references.length === 0) {
              return (
                <div
                  style={{ border: '1px dashed red', margin: '10px 0' }}
                  title="default"
                >
                  No data!
                </div>
              );
            }
            return (
              <div>
                <p>Reference Node:</p>
                {JSON.stringify(references[0])}
              </div>
            );
          },
        },
      },
    },
  };
};

export const extensionProvider = (
  intl: InjectedIntl,
  editorActions?: EditorActions,
): DefaultExtensionProvider =>
  new DefaultExtensionProvider([
    tableVisExtensionManifest(intl, editorActions),
  ]);

const columnResolver = (editorActions?: EditorActions) => async () => {
  const sourceNode = dataSourceResolver(editorActions) as ADFEntity;
  if (!sourceNode) {
    return [];
  }

  // TODO: implement search

  return getTableColumns(sourceNode);
};

type TableColumnOption = { label: string; value: string };

const getTableColumns = (sourceNode: ADFEntity | null): TableColumnOption[] => {
  if (!sourceNode) {
    return [];
  }

  const sourceNodeData = sourceNode.content?.map((row: any) => {
    return row?.content?.map((cell: any) =>
      cell.content[0]?.content ? cell.content[0]?.content[0]?.text : '',
    );
  });

  return sourceNodeData?.[0].map((column: string) => ({
    label: column,
    value: column,
  }));
};
