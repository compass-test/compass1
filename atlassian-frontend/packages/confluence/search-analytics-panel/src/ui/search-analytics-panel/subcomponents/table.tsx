import React, { FC } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import { AnalyticsRowContainer, AnalyticsRows } from '@atlassian/analytics-row';

import { Container, StyledFormattedMessage, Title } from './styled';
import { SearchAnalyticsSubtableType } from './types';

const i18n = defineMessages({
  noData: {
    id: 'confluence-analytics-search-panel-table.no-data.message',
    defaultMessage: "Users didn't click on anything during this time",
    description: 'A message to share that there is nothing to be displayed.',
  },
  noPermission: {
    id: 'confluence-analytics-search-panel-table.no-permissions.message',
    defaultMessage: "You don't have permission to view anything.",
    description:
      'A message to share the user does not have permissions to access.',
  },
  error: {
    id: 'confluence-analytics-search-panel-table.error.message',
    defaultMessage: 'Unable to retrieve this data at this time.',
    description: 'An error message.',
  },
  graphError: {
    id: 'confluence-analytics-search-panel-table-graph.error.message',
    defaultMessage: 'Unable to render this data at this time.',
    description: 'An error message.',
  },
});

const Subtable: FC<SearchAnalyticsSubtableType> = ({
  title,
  testId,
  children,
}) => {
  return (
    <Container data-testId={testId}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export const SubtableBody: FC<AnalyticsRowContainer> = ({
  content,
  maxRows,
  analyticsIconOnHoverDetails,
}) => {
  if (content) {
    <AnalyticsRows
      content={content}
      maxRows={maxRows}
      showIcon={true}
      avatarSize={'small'}
      analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
    />;
  }
  return (
    <StyledFormattedMessage>
      <FormattedMessage {...i18n.noData} />
    </StyledFormattedMessage>
  );
};

export default Subtable;
