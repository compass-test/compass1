import { InjectedIntl } from 'react-intl';

import { ContextualToolbar } from '@atlaskit/editor-common/extensions';

import { defaultParameters } from '../defaults';
import { i18n } from '../messages';
import { ParseNumber } from '../types';

export const tableToolbar = (
  intl: InjectedIntl,
  parseNumber: ParseNumber,
): ContextualToolbar => {
  return {
    context: {
      type: 'node',
      nodeType: 'table',
    },
    toolbarItems: (adf: any, _api: any) => {
      // CEMS-2157: waiting on CEMS-2226 and CEMS-2227
      // const disabled = !tableHasNumbers(adf, parseNumber);
      const disabled = false;

      return [
        {
          key: 'insert-chart',
          display: 'icon',
          disabled,

          // eslint-disable-next-line import/dynamic-import-chunkname
          icon: () => import('../ui/icons/GlobalChartIcon'),

          label: intl.formatMessage(i18n.insertChartTooltip),
          tooltip: intl.formatMessage(i18n.insertChartTooltip),

          action: async (adf: any, api: any) => {
            const localId: string = adf.attrs?.localId || '';
            const chartADF = {
              type: 'extension',
              attrs: {
                extensionType: 'com.atlassian.chart',
                extensionKey: 'chart:default',
                parameters: defaultParameters(adf, intl, parseNumber),
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
      ];
    },
  };
};
