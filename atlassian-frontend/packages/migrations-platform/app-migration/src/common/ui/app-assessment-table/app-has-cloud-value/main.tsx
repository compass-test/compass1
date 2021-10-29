import React, { FC, memo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Status from '../../status-with-link-value';

import messages from './messages';
import type { CloudLinkValue } from './types';

export type Props = {
  appKey: string;
  cloudLink: CloudLinkValue;
  contactVendorUrl: string;
  cloudUrl?: string;
  featureDifferencesUrl?: string;
  cloudVersionDevelopmentRoadmap?: string;
};

const AppHasCloudValue: FC<InjectedIntlProps & Props> = ({
  intl,
  appKey,
  cloudLink,
  contactVendorUrl,
  cloudUrl,
  featureDifferencesUrl,
  cloudVersionDevelopmentRoadmap,
}) => {
  switch (cloudLink) {
    case 'ContactVendor':
      return (
        <Status
          appearance="success"
          linkText={intl.formatMessage(messages.contactVendor)}
          linkProps={{
            href: contactVendorUrl,
            analyticsId: 'marketplaceContactVendorLink',
            analyticsAttributes: { appKey },
          }}
        />
      );

    case 'Differences':
      return (
        <Status
          appearance="success"
          linkText={intl.formatMessage(messages.viewDifferences)}
          linkProps={
            featureDifferencesUrl
              ? {
                  href: featureDifferencesUrl,
                  analyticsId: 'marketplaceViewDifferencesLink',
                  analyticsAttributes: { appKey },
                }
              : undefined
          }
        />
      );

    case 'Listing':
      return (
        <Status
          appearance="success"
          linkText={intl.formatMessage(messages.viewListing)}
          linkProps={
            cloudUrl
              ? {
                  href: cloudUrl,
                  analyticsId: 'marketplaceViewDifferencesLink',
                  analyticsAttributes: { appKey },
                }
              : undefined
          }
        />
      );

    case 'Roadmap':
      return (
        <Status
          appearance="subtleError"
          linkText={intl.formatMessage(messages.viewRoadmap)}
          linkProps={
            cloudVersionDevelopmentRoadmap
              ? {
                  href: cloudVersionDevelopmentRoadmap,
                  analyticsId: 'marketplaceViewRoadmapLink',
                  analyticsAttributes: { appKey },
                }
              : undefined
          }
        />
      );

    default:
      return <Status appearance="error" />;
  }
};

export default memo(injectIntl(AppHasCloudValue));
