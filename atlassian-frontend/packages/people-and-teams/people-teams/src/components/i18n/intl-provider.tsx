import React, { useContext } from 'react';

import {
  InjectedIntl,
  InjectedIntlProps,
  injectIntl,
  IntlProvider as OriginalIntlProvider,
} from 'react-intl';

import { useFetchMessagesByLocale } from './utils';

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

type CustomIntlContextType = {
  // `intl` is injected by `injectIntl` from 'react-intl`
  intl?: InjectedIntl;
  // `isLoading` is a status of loading messages of current locale.
  isLoading: boolean;
};

const CustomIntlContext = React.createContext<CustomIntlContextType>({
  intl: undefined,
  isLoading: false,
});

interface CustomIntlProviderProps extends OriginalIntlProvider.Props {
  children: React.ReactNode;
}

/**
 * This component is used to wrap our UI components.
 */
export const CustomIntlProvider = injectIntl<CustomIntlProviderProps>(
  (props: CustomIntlProviderProps & InjectedIntlProps) => {
    const { children, intl, ...rest } = props;
    const { messages, isLoading } = useFetchMessagesByLocale(intl.locale);
    const contextValue = { intl, isLoading };

    return (
      <OriginalIntlProvider
        {...rest}
        messages={messages}
        key={intl.locale}
        locale={intl.locale}
      >
        <CustomIntlContext.Provider value={contextValue}>
          {children}
        </CustomIntlContext.Provider>
      </OriginalIntlProvider>
    );
  },
);

export function useIntl(): Required<CustomIntlContextType> {
  const { intl, isLoading } = useContext(CustomIntlContext);

  if (intl === undefined) {
    throw new Error('useIntl must be used within an CustomIntlProvider');
  }

  return { intl, isLoading };
}
