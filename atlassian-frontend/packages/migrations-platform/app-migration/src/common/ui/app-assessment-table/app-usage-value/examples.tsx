import React from 'react';

import { IntlProvider } from 'react-intl';

import AppUsageValue, { Props } from './main';

export const DefaultStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={true}
        isEnabled={true}
        unit="page"
        value={123}
        {...props}
      />
    </IntlProvider>
  );
};

export const RunningStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={true}
        isEnabled={true}
        unit="page"
        value={123}
        status="Running"
        {...props}
      />
    </IntlProvider>
  );
};

export const DisabledStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={true}
        isEnabled={false}
        unit="page"
        value={123}
        status="Success"
        {...props}
      />
    </IntlProvider>
  );
};

export const SuccessStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={true}
        isEnabled={true}
        unit="page"
        value={123}
        status="Success"
        {...props}
      />
    </IntlProvider>
  );
};

export const SuccessNoMacrosPageStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={false}
        isEnabled={true}
        unit="page"
        value={123}
        status="Success"
        {...props}
      />
    </IntlProvider>
  );
};

export const SuccessNoMacrosUserStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={false}
        isEnabled={true}
        unit="user"
        value={123}
        status="Success"
        {...props}
      />
    </IntlProvider>
  );
};

export const ErrorStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppUsageValue
        hasMacros={false}
        isEnabled={true}
        unit="user"
        value={123}
        status="Error"
        {...props}
      />
    </IntlProvider>
  );
};
