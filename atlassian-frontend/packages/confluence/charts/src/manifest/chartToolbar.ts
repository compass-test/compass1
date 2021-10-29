import { InjectedIntl } from 'react-intl';

import { ContextualToolbar } from '@atlaskit/editor-common/extensions';
import { EditorActions } from '@atlaskit/editor-core';

import { i18n } from '../messages';

export const chartToolbar = (
  intl: InjectedIntl,
  editorActions?: EditorActions,
): ContextualToolbar => ({
  context: {
    type: 'extension',
    nodeType: 'extension',
    extensionKey: 'chart:default',
    extensionType: 'com.atlassian.chart',
  },
  toolbarItems: (adf: any, _api: any) => {
    if (!editorActions) {
      return [];
    }

    const { sources = [] } = ((adf.marks || []).find(
      (mark: any) => mark.type === 'dataConsumer',
    )?.attrs || {}) as { sources?: string[] };

    const hasSource = sources.some((source: string) =>
      editorActions.getNodeByLocalId(source),
    );

    return [
      {
        key: 'edit-chart',
        display: 'label',
        label: intl.formatMessage(i18n.chartOptionsLabel),
        tooltip: intl.formatMessage(i18n.chartOptionsTooltip),
        disabled: !hasSource,
        action: async (_adf: any, api: any) => {
          return api.editInContextPanel(
            (parameters: any) => parameters,
            (parameters: any) => Promise.resolve(parameters),
          );
        },
      },
      {
        key: 'edit-source-table',
        display: 'icon-and-label',
        label: 'Edit source',
        disabled: !hasSource,
        tooltip: 'Jump to the source table to edit values',
        // eslint-disable-next-line import/dynamic-import-chunkname
        icon: () => import('@atlaskit/icon/glyph/editor/table'),
        action: async (_adf, api) => {
          if (!hasSource) {
            throw new Error('Table source is not found');
          }
          const localId = sources[0];
          api.doc.scrollTo(localId);
        },
      },
    ];
  },
});
