import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import TextField from '@atlaskit/textfield';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { useFilters } from '../../../../services/filters';

import { ProductFilter } from './filters/product';
import { ControlsGroup, TextFieldWrapper } from './styled';

export const SearchBar = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const filterHandler = useCallback(
    (e) => {
      const filterValue = (e.target.value || '').toLocaleLowerCase();
      actions.setText(filterValue);
    },
    [actions],
  );

  const onFocus = useCallback(() => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'focused',
      actionSubject: 'search',
      source: 'catalog',
    });
    sendUIEvent(analyticsEvent);
  }, [createAnalyticsEvent]);

  return (
    <ControlsGroup>
      <TextFieldWrapper>
        <TextField
          placeholder={'search...'}
          onChange={filterHandler}
          value={state.text}
          onFocus={onFocus}
        />
      </TextFieldWrapper>
      <ProductFilter />
    </ControlsGroup>
  );
};
