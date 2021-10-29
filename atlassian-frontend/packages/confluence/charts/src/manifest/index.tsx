import React from 'react';

import { InjectedIntl } from 'react-intl';

import {
  ExtensionManifest,
  ExtensionParams,
  ReferenceEntity,
} from '@atlaskit/editor-common/extensions';
import { EditorActions } from '@atlaskit/editor-core';
import { ExtensionHandlerWithReferenceFn } from '@atlassian/editor-referentiality';

import { i18n } from '../messages';
import { ParseNumber } from '../types';
import { Chart } from '../ui/charts';
import { ChartParameters } from '../ui/charts/types';
import { defaultParseNumber } from '../utils';

import { chartToolbar } from './chartToolbar';
import { uiFields } from './configPanel';
import { tableToolbar } from './tableToolbar';

export const buildManifest = (
  intl: InjectedIntl,
  editorActions?: EditorActions,
  parseNumber?: ParseNumber,
  extensionHandlerWithReference?: ExtensionHandlerWithReferenceFn<
    ChartParameters
  >,
): ExtensionManifest => ({
  title: intl
    ? intl.formatMessage(i18n.extensionTitle)
    : i18n.extensionTitle.defaultMessage,
  type: 'com.atlassian.chart',
  key: 'chart',
  icons: {
    // eslint-disable-next-line import/dynamic-import-chunkname
    '48': () => import('../ui/icons/GlobalChartIcon'),
  },
  modules: {
    contextualToolbars: [
      tableToolbar(intl, parseNumber || defaultParseNumber),
      chartToolbar(intl, editorActions),
    ],

    nodes: {
      default: {
        type: 'extension',
        render: () => {
          const chartComponent = (
            node: ExtensionParams<ChartParameters>,
            references: ReferenceEntity[],
          ) => (
            <Chart
              data={references[0]}
              parseNumber={parseNumber}
              {...node.parameters}
            />
          );

          return Promise.resolve(({ node, references, refNode }) => {
            if (refNode) {
              references = [refNode];
            }

            if (extensionHandlerWithReference) {
              return extensionHandlerWithReference(
                node,
                ({ references: referencesFromHandler }) =>
                  chartComponent(node, referencesFromHandler),
              );
            }

            return chartComponent(node, references);
          });
        },
        getFieldsDefinition: async () => {
          const fields = uiFields(intl, editorActions);
          return (parameters) => fields(parameters);
        },
      },
    },
  },
});
