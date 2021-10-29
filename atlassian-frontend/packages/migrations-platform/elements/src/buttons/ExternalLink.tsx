import React from 'react';

import AnalyticsButton, { AnalyticsButtonProps } from './AnalyticsButton';

type ExternalLinkProps = {
  subtle?: boolean;
} & Omit<AnalyticsButtonProps, 'spacing' | 'target' | 'rel'>;

const ExternalLink = ({
  subtle = false,
  appearance,
  ...props
}: ExternalLinkProps) => {
  if (!appearance) {
    appearance = subtle ? 'subtle-link' : 'link'; // eslint-disable-line no-param-reassign
  }
  return (
    <AnalyticsButton
      {...props}
      appearance={appearance}
      spacing="none"
      target="_blank"
      rel="noopener noreferrer"
      analyticsLink
    />
  );
};

export default ExternalLink;
