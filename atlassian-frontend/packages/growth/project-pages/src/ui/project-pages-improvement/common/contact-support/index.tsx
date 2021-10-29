import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import messages from './messages';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  connectUIAnalytics,
  ComponentWithAnalytics,
} from '../../../../common/analytics/util';

interface Props {
  onClick: (analyticsEvent: UIAnalyticsEvent) => void;
}

// XXX there should be an easier way to do this...
const Link = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => <a {...props}>{children}</a>;

const LinkWithAnalytics = ComponentWithAnalytics('link', {
  onClick: 'clicked',
})(Link);

const ContactSupport = ({
  intl: { formatMessage },
  onClick,
}: InjectedIntlProps & Props) => {
  const handleClick = (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    onClick(analyticsEvent);
  };
  return (
    <LinkWithAnalytics
      href="https://support.atlassian.com/contact/"
      target="_blank"
      rel="noopener"
      onClick={handleClick}
    >
      {formatMessage(messages.linkText)}
    </LinkWithAnalytics>
  );
};

export default connectUIAnalytics({
  onClick: 'contactSupport',
})(injectIntl(ContactSupport));
