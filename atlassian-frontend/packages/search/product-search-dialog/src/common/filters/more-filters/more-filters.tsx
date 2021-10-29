import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LinkComponent } from '@atlassian/search-dialog';

import { MoreFiltersLink } from './more-filters.styled';
import { getTrigger, useAnalytics } from '../../analytics';
import { onMoreFiltersSelected, Trigger } from '../../analytics/events';
import { messages } from '../../../messages';
import { useSessionUserInput } from '../../../extensible/user-input-provider';

export interface MoreFiltersProps {
  isLoading: boolean;
  linkComponent?: LinkComponent;
  query: string;
  href: string;
  selectedFiltersCount: number;
}

const MoreFilters: React.FunctionComponent<MoreFiltersProps> = ({
  linkComponent,
  href,
  selectedFiltersCount,
  isLoading,
  ...rest
}) => {
  const { fireAnalyticsEvent } = useAnalytics();
  const { resetSearchSession } = useSessionUserInput();

  const onMoreFiltersClicked = (event: React.MouseEvent<any, MouseEvent>) => {
    resetSearchSession();
    const trigger: Trigger = getTrigger(event);
    fireAnalyticsEvent(
      onMoreFiltersSelected({
        trigger,
        selectedFiltersCount,
      }),
    );
  };

  if (isLoading) {
    return null;
  }

  return (
    <MoreFiltersLink
      {...rest}
      linkComponent={linkComponent}
      href={href}
      onClick={onMoreFiltersClicked}
    >
      <FormattedMessage {...messages.more_filters} />
    </MoreFiltersLink>
  );
};

export default MoreFilters;
