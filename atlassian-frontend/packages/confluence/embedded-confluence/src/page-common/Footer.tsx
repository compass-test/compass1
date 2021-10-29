import React, { FC, Fragment, ReactNode, useState } from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from '@emotion/styled';

import { B200, N300, N30A } from '@atlaskit/theme/colors';
import { ConfluenceLogo } from '@atlaskit/logo';
import Tooltip from '@atlaskit/tooltip';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ANALYTICS_CHANNEL } from '../analytics';

const messages = defineMessages({
  footerPrefix: {
    id: 'embedded.confluence.footer.prefix',
    description: 'Prefix label on Confluence Logo',
    defaultMessage: 'Powered by',
  },
  footerHoverText: {
    id: 'embedded.confluence.footer.hover.text',
    description: 'Hover text on Confluence Footer Content',
    defaultMessage: 'View in Confluence',
  },
});

const Container = styled.div({
  height: 52,
  color: N300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: `2px solid ${N30A}`,
});

const PrefixText = styled.p({
  fontSize: 12,
  marginRight: 8,
  lineHeight: '20px',
});

const LogoWrapper = styled.div({
  height: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Link = styled.a({
  '&, &:focus, &:active, &:hover': {
    display: 'flex',
    color: 'inherit',
    outline: 'none',
    boxShadow: 'none',
    textDecoration: 'none',
    alignItems: 'flex-end',
  },
});

export type FooterProps = {
  url: string | null;
};

type ContentProps = {
  isHovered?: boolean;
};

export const Footer = injectIntl(
  ({ url, intl }: FooterProps & InjectedIntlProps) => (
    <Container data-testid="footer-container">
      {url ? (
        <ContentAction
          tooltipText={intl.formatMessage(messages.footerHoverText)}
          href={url}
        >
          {({ isHovered }) => <Content isHovered={isHovered} />}
        </ContentAction>
      ) : (
        <Content />
      )}
    </Container>
  ),
);

const Content = injectIntl(
  ({ isHovered, intl }: ContentProps & InjectedIntlProps) => (
    <Fragment>
      <PrefixText>{intl.formatMessage(messages.footerPrefix)}</PrefixText>
      <LogoWrapper>
        <ConfluenceLogo
          size="xsmall"
          iconColor={isHovered ? B200 : N300}
          textColor={N300}
        />
      </LogoWrapper>
    </Fragment>
  ),
);

const ContentAction: FC<{
  tooltipText: string;
  href: string;
  children: ({ isHovered }: { isHovered: boolean }) => ReactNode;
}> = ({ children, tooltipText, href }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const handleClick = () => {
    createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'link',
      actionSubjectId: 'confluenceFooter',
      source: 'embeddedConfluenceViewPageScreen',
      eventType: 'ui',
    }).fire(ANALYTICS_CHANNEL);
  };

  return (
    <Tooltip content={tooltipText}>
      <Link
        href={href}
        target="_blank"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={handleClick}
        data-testid="link"
      >
        {children({ isHovered })}
      </Link>
    </Tooltip>
  );
};
