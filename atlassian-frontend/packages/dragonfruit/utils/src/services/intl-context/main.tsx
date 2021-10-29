import React, { useContext } from 'react';

import {
  InjectedIntl,
  InjectedIntlProps,
  injectIntl,
  IntlProvider as OriginalIntlProvider,
} from 'react-intl';

/**
 * At the time this context/hook was created (2020-02-09), the atlassian-frontend repo was using v2 of react-intl.
 *
 * Since this old version of the library doesn't have a hook interface, a few challenges have arisen:
 *  - Components that required a functional component were throwing type errors when given an injectIntl ClassComponent
 *  - Mocked components were incompatible during dependency injection
 *  - The API is just generally harder to use and requires a lot more boilerplate
 *
 *  This context/hook allows us can use the new useIntl() hook without upgrading to v3 of react-intl,
 *  and when we do upgrade we can delete this entire file and find/replace the import.
 */

const IntlContext = React.createContext<InjectedIntl | undefined>(undefined);

type CompassIntlContextProviderProps = {
  children: React.ReactNode;
};

const CompassIntlContextProvider = injectIntl(
  (props: CompassIntlContextProviderProps & InjectedIntlProps) => {
    return (
      <IntlContext.Provider value={props.intl}>
        {props.children}
      </IntlContext.Provider>
    );
  },
);

interface CompassIntlProviderProps extends OriginalIntlProvider.Props {
  children: React.ReactNode;
}

export const CompassIntlProvider = (props: CompassIntlProviderProps) => {
  const { children, ...rest } = props;

  return (
    <OriginalIntlProvider {...rest}>
      <CompassIntlContextProvider>{props.children}</CompassIntlContextProvider>
    </OriginalIntlProvider>
  );
};

export function useIntl(): InjectedIntl {
  const intl = useContext(IntlContext);

  if (intl === undefined) {
    throw new Error('useIntl must be used within an CompassIntlProvider');
  }

  return intl;
}
