import React, { FC } from 'react';
import { ThemeProvider } from '@atlassian/search-dialog';
import { DialogExpansionContextProvider } from './../dialog-expansion-context';
import { QueryContextProvider } from './../query-context';
import { ProductRouter } from './../product-router';
import { MessagesIntlProvider } from '../../common/message-intl-provider';
import { BuildVersionAnalyticContext } from '../../common/build-version-analytic-context';
import { SearchCSS } from '@atlassian/search-dialog';
import { SearchSessionProvider } from '../../common/search-session-provider';
import { ABTestContextProvider } from '../ab-test-context';

interface Props {
  theme?: SearchCSS;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const MetaContextProvider: FC<Props> = ({
  children,
  theme,
  setIsExpanded,
  isExpanded,
}) => {
  return (
    <MessagesIntlProvider>
      <BuildVersionAnalyticContext>
        <ThemeProvider partialSearchCSS={theme}>
          <DialogExpansionContextProvider
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          >
            <ProductRouter>
              <ABTestContextProvider>
                <SearchSessionProvider
                  sessionKey={`ssid_provider_${isExpanded}`}
                >
                  <QueryContextProvider>{children}</QueryContextProvider>
                </SearchSessionProvider>
              </ABTestContextProvider>
            </ProductRouter>
          </DialogExpansionContextProvider>
        </ThemeProvider>
      </BuildVersionAnalyticContext>
    </MessagesIntlProvider>
  );
};
