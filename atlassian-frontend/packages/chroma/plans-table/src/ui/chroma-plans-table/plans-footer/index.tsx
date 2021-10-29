import React from 'react';

import { FormattedMessage } from 'react-intl';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { SupportedProduct } from '../../../common/types';
import { StyledFeatureRow, StyledFooter } from '../../../common/ui/styled';

import messages from './messages';

const productToUrl = (product: SupportedProduct) => {
  switch (product) {
    case 'confluence':
      return 'https://www.atlassian.com/software/confluence/pricing';
    case 'jira-servicedesk':
      return 'https://www.atlassian.com/software/jira/service-management/pricing';
    case 'jira-software':
      return 'https://www.atlassian.com/software/jira/pricing';
    default:
      return '';
  }
};

interface FooterProps {
  product: SupportedProduct;
  analyticsAttributes: {
    sourceScreen: string;
    [key: string]: string | undefined;
  };
}

export const Footer: React.FC<FooterProps> = ({
  product,
  analyticsAttributes,
}) => {
  const url = productToUrl(product);
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onPlanPricingClick = (event: any, analyticsEvent: UIAnalyticsEvent) => {
    let ae = analyticsEvent;
    if (!ae) {
      ae = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        source: analyticsAttributes.sourceScreen,
      });
    }
    fireUIAnalytics(ae, 'PlanPricingLink', analyticsAttributes);
  };
  const onEnterprisePlanClick = (
    event: any,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    let ae = analyticsEvent;
    if (!ae) {
      ae = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        source: analyticsAttributes.sourceScreen,
      });
    }
    fireUIAnalytics(ae, 'EnterprisePlanLink', analyticsAttributes);
  };

  return (
    <StyledFeatureRow isHeader>
      <StyledFooter>
        <FormattedMessage
          {...messages.footerText}
          values={{
            planPricing: (
              <Button
                appearance="link"
                spacing="none"
                href={url}
                target="_blank"
                onClick={onPlanPricingClick}
              >
                <FormattedMessage {...messages.planPricing} />
              </Button>
            ),
            enterprisePlan: (
              <Button
                appearance="link"
                spacing="none"
                href={url}
                target="_blank"
                onClick={onEnterprisePlanClick}
              >
                <FormattedMessage {...messages.enterprisePlan} />
              </Button>
            ),
          }}
        />
      </StyledFooter>
    </StyledFeatureRow>
  );
};

export default Footer;
