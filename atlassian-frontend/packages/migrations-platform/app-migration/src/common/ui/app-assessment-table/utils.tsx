import React from 'react';

import { FormattedMessage, InjectedIntl } from 'react-intl';

import type { HeadCellType, RowCellType } from '@atlaskit/dynamic-table/types';

import type { AssessmentApp } from '../../../common/types';
import HeadLabel from '../head-label';

import AppUsageValue, { getAppUsageSortKey } from './app-usage-value';
import messages from './messages';

export const getUsageTableHeads = (
  intl: InjectedIntl,
  isUsageLoading: boolean,
): HeadCellType[] => {
  return [
    {
      key: 'pages',
      isSortable: !isUsageLoading,
      width: 9,
      content: (
        <HeadLabel
          property="pages"
          title={intl.formatMessage(messages.headDescriptionPages)}
        >
          <FormattedMessage {...messages.headLabelPages} />
        </HeadLabel>
      ),
    },
    {
      key: 'users',
      isSortable: !isUsageLoading,
      width: 9,
      content: (
        <HeadLabel
          property="users"
          title={intl.formatMessage(messages.headDescriptionUsers)}
        >
          <FormattedMessage {...messages.headLabelUsers} />
        </HeadLabel>
      ),
    },
  ];
};

export const getUsageTableRows = ({
  hasMacros,
  isEnabled,
  pages,
  status,
  users,
}: AssessmentApp): RowCellType[] => {
  return [
    {
      key: getAppUsageSortKey({
        hasMacros,
        isEnabled,
        status,
        value: pages,
      }),
      content: (
        <AppUsageValue
          hasMacros={hasMacros}
          isEnabled={isEnabled}
          status={status}
          unit="page"
          value={pages}
        />
      ),
    },
    {
      key: getAppUsageSortKey({
        hasMacros,
        isEnabled,
        status,
        value: users,
      }),
      content: (
        <AppUsageValue
          hasMacros={hasMacros}
          isEnabled={isEnabled}
          status={status}
          unit="user"
          value={users}
        />
      ),
    },
  ];
};
