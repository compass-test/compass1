import React from 'react';

import { IntlProvider } from 'react-intl';

import AppHasCloudValue, { Props } from './main';

export const NoCloudVersion = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppHasCloudValue
        appKey="fake-key"
        cloudLink="None"
        contactVendorUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const HasCloudVersionSameFeatures = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppHasCloudValue
        appKey="fake-key"
        cloudLink="Listing"
        cloudUrl="http://atlassian.net"
        contactVendorUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const HasCloudVersionDifferentFeaturesWithUrl = (
  props: Partial<Props>,
) => {
  return (
    <IntlProvider locale="en">
      <AppHasCloudValue
        appKey="fake-key"
        cloudLink="Differences"
        contactVendorUrl="http://atlassian.net"
        featureDifferencesUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const ContactVendor = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppHasCloudValue
        appKey="fake-key"
        cloudLink="ContactVendor"
        cloudUrl="http://atlassian.net"
        contactVendorUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};
