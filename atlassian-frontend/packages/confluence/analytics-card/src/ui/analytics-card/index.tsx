import React, { FC } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import Button from '@atlaskit/button/custom-theme-button';
import { AnalyticsRows } from '@atlassian/analytics-row';

import {
  Container,
  fullWidthTheme,
  StyledFooter,
  StyledFormattedMessage,
  StyledNoDataMessage,
  Title,
} from './styled';
import {
  AnalyticsCardBodyType,
  AnalyticsCardType,
  AnalyticsFooterLinkType,
} from './types';

export const i18n = defineMessages({
  viewAll: {
    id: 'confluence-analytics-card.view-all.button',
    defaultMessage: 'View all',
    description: 'A label on a button to view more analytics.',
  },
  noData: {
    id: 'confluence-analytics-card.row.no-data.message',
    defaultMessage: 'No {noun} {verb} within the selected time frame',
    description: 'A message to share that there is nothing to be displayed.',
  },
});

const AnalyticsCard: FC<AnalyticsCardType> = ({
  title,
  href,
  onClick,
  children,
}) => {
  return (
    <Container data-testid={'analytics-card'}>
      <div>
        <Title>{title}</Title>
        {children}
      </div>
      <StyledFooter>
        <AnalyticsLink href={href} onClick={onClick} />
      </StyledFooter>
    </Container>
  );
};

export const AvatarCardBody: FC<AnalyticsCardBodyType> = ({
  content,
  noDataDetails,
  avatarSize,
}) => {
  return (
    <AnalyticsCardBody
      content={content}
      noDataDetails={noDataDetails}
      isReadOnly={false}
      showIcon={false}
      avatarSize={avatarSize}
    />
  );
};

export const ReadOnlyAvatarCardBody: FC<AnalyticsCardBodyType> = ({
  content,
  noDataDetails,
  avatarSize,
}) => {
  return (
    <AnalyticsCardBody
      content={content}
      noDataDetails={noDataDetails}
      isReadOnly={true}
      showIcon={false}
      avatarSize={avatarSize}
    />
  );
};

export const IconCardBody: FC<AnalyticsCardBodyType> = ({
  content,
  analyticsIconOnHoverDetails,
  noDataDetails,
  avatarSize,
}) => {
  return (
    <AnalyticsCardBody
      content={content}
      noDataDetails={noDataDetails}
      isReadOnly={false}
      showIcon={true}
      analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
      avatarSize={avatarSize}
    />
  );
};

export const ReadOnlyIconCardBody: FC<AnalyticsCardBodyType> = ({
  content,
  noDataDetails,
  avatarSize,
}) => {
  return (
    <AnalyticsCardBody
      content={content}
      noDataDetails={noDataDetails}
      isReadOnly={true}
      showIcon={true}
      avatarSize={avatarSize}
    />
  );
};

const AnalyticsCardBody: FC<AnalyticsCardBodyType> = ({
  content,
  noDataDetails,
  showIcon,
  avatarSize,
  isReadOnly,
  analyticsIconOnHoverDetails,
}) => {
  const maxRows = 4;
  const data = content.length > maxRows ? content.slice(0, maxRows) : content;
  if (data?.length) {
    return (
      <AnalyticsRows
        content={content}
        maxRows={maxRows}
        isReadOnly={isReadOnly}
        analyticsIconOnHoverDetails={analyticsIconOnHoverDetails}
        showIcon={showIcon}
        avatarSize={avatarSize}
      />
    );
  } else {
    const { verb, noun } = noDataDetails!;
    return (
      <StyledNoDataMessage>
        <StyledFormattedMessage>
          <FormattedMessage {...i18n.noData} values={{ noun, verb }} />
        </StyledFormattedMessage>
      </StyledNoDataMessage>
    );
  }
};

const AnalyticsLink: FC<AnalyticsFooterLinkType> = ({ href, onClick }) => {
  return (
    <Button
      theme={fullWidthTheme}
      href={href}
      onClick={onClick}
      appearance="subtle"
    >
      <FormattedMessage {...i18n.viewAll} />
    </Button>
  );
};

export default AnalyticsCard;
