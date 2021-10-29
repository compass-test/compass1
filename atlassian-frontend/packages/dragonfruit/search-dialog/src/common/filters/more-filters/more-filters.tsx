import React from 'react';
import { MoreFiltersLink } from './more-filters.styled';
import { getTrigger, useAnalytics } from '../../analytics';
import { onMoreFiltersSelected, Trigger } from '../../analytics/events';
import { LinkComponent } from '@atlassian/search-dialog';
import { messages } from '../../../messages';
import { FormattedMessage } from 'react-intl';

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

  const onMoreFiltersClicked = (event: React.MouseEvent<any, MouseEvent>) => {
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
