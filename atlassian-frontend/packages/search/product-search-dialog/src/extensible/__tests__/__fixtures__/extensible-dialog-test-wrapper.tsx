import React, { FunctionComponent, useState } from 'react';
import { ConfluenceClientsProvider } from '../../../confluence/clients/confluence-search-provider';
import {
  JiraSearchClientProvider,
  SearchClientConfig,
} from '../../../jira/clients/jira-search-provider';
import { IntlProvider } from 'react-intl';
import { MultiProductDialog } from '../../products/pre-configured/multi-product-dialog';
import {
  ConfluenceFilterContextProvider,
  JiraFilterContextProvider,
} from '../../..';

interface Props {
  children: ({
    onRetry,
    isExpanded,
  }: {
    onRetry: () => void;
    isExpanded: boolean;
  }) => React.ReactElement | null;
  clientConfigOverride?: SearchClientConfig;
}

const DUMMY_CLIENT_CONFIG: SearchClientConfig = {
  aggregatorUrl: '',
  baseUrl: '',
  cloudId: '',
  isUserAnonymous: false,
};

export const ExtensibleDialogTestWrapper: FunctionComponent<Props> = ({
  children,
  clientConfigOverride,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const clientConfig = clientConfigOverride || DUMMY_CLIENT_CONFIG;

  return (
    <IntlProvider locale="en">
      <ConfluenceClientsProvider config={clientConfig}>
        <JiraSearchClientProvider {...clientConfig}>
          <ConfluenceFilterContextProvider>
            <JiraFilterContextProvider>
              <MultiProductDialog
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                abTestCloudId=""
                aggregatorUrl=""
                forwardRef={null}
                onNavigateGeneric={jest.fn()}
              >
                {({ onRetry }) => children({ onRetry, isExpanded })}
              </MultiProductDialog>
            </JiraFilterContextProvider>
          </ConfluenceFilterContextProvider>
        </JiraSearchClientProvider>
      </ConfluenceClientsProvider>
    </IntlProvider>
  );
};
