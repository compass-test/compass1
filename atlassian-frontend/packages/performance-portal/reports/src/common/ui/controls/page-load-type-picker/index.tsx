import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { RadioSelect } from '@atlaskit/select';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { PageLoadType } from '@atlassian/performance-portal-common';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useFilters } from '../../../../services/filters';
import { selectStyles } from '../../../utils/select-styles';

import { Width } from './styled';

type Option = { label: string; value: PageLoadType };

const options: Option[] = [
  { label: 'initial load', value: PageLoadType.INITIAL },
  { label: 'transition', value: PageLoadType.TRANSITION },
  { label: 'combined', value: PageLoadType.COMBINED },
];

export const PageLoadTypePicker = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const setValue = useCallback(
    ({ value }) => {
      actions.setPageLoadType(value);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'pageLoadTypePicker',
        source: 'reports',
        attributes: {
          pageLoadType: value,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const value = options.find(({ value }) => value === state.pageLoadType);

  return (
    <Width>
      <RadioSelect
        options={options}
        placeholder="page load type"
        spacing={'compact'}
        isSearchable={false}
        onChange={setValue}
        styles={selectStyles}
        value={value}
      />
    </Width>
  );
};
