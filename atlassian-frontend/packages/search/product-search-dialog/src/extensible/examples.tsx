import React, { FunctionComponent, useState } from 'react';
import { SearchDialog } from '@atlassian/search-dialog';
import { IntlProvider } from 'react-intl';
import { SearchDialogProduct, ProductTabs } from './product-router';
import { SearchSessionProvider } from '../common/search-session-provider';
import { KeyboardWrapper } from './focus-and-keyboard-wrapper/focus-and-keyboard-wrapper';
import { MetaContextProvider } from './meta-context-provider';
import { presetConfig } from '../../examples/storybook-utils/instance-config';
import { action } from '@storybook/addon-actions';
import { noResultSuppliers } from './result-supplier';
import { ActiveProductSearchInput } from './active-product-search-input';

const Example: FunctionComponent<{
  forwardRef: React.Ref<HTMLInputElement>;
}> = ({ forwardRef }) => {
  return (
    <SearchSessionProvider sessionKey="abc123">
      <KeyboardWrapper forwardRef={forwardRef}>
        {({ ref }) => {
          return (
            <>
              <ActiveProductSearchInput
                forwardRef={ref}
                onNavigateGeneric={(
                  id: string,
                  url: string,
                  event: KeyboardEvent | React.MouseEvent,
                ) => {
                  action(`onNavigate ${id}`)(url);
                }}
              />
              <SearchDialog>
                <ProductTabs />
                <SearchDialogProduct
                  id="confluence"
                  title="conflugoo"
                  sections={[
                    {
                      id: 'confluence.page,blogpost,attachment',
                      title: 'Confluence pages',
                    },
                  ]}
                  order={1}
                  onRetry={() => null}
                  urlGeneratorForNoResultsScreen={() => ''}
                  {...noResultSuppliers()}
                >
                  <div>Confluencie</div>
                </SearchDialogProduct>
                <SearchDialogProduct
                  id="jira"
                  title="jyra"
                  sections={[{ id: 'jira.issue', title: 'Jira Issue' }]}
                  order={2}
                  onRetry={() => null}
                  urlGeneratorForNoResultsScreen={() => ''}
                  {...noResultSuppliers()}
                >
                  <div>gyra</div>
                </SearchDialogProduct>
                <SearchDialogProduct
                  id="bitbucket"
                  title="buttbucket"
                  sections={[
                    {
                      id: 'bitbucket.repository',
                      title: 'Bitbucket Repository',
                    },
                  ]}
                  order={3}
                  onRetry={() => null}
                  urlGeneratorForNoResultsScreen={() => ''}
                  {...noResultSuppliers()}
                >
                  <div>boitbuckle</div>
                </SearchDialogProduct>
                <SearchDialogProduct
                  id="avocado"
                  title="avocado"
                  sections={[
                    {
                      id: 'avocado.question',
                      title: 'Avocado',
                    },
                  ]}
                  order={3}
                  onRetry={() => null}
                  urlGeneratorForNoResultsScreen={() => ''}
                  {...noResultSuppliers()}
                >
                  <div>avocado</div>
                </SearchDialogProduct>
              </SearchDialog>
            </>
          );
        }}
      </KeyboardWrapper>
    </SearchSessionProvider>
  );
};

export const Basic = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div style={{ paddingLeft: '800px' }}>
      <MetaContextProvider
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        abTestCloudId={presetConfig.pug.cloudId}
        aggregatorUrl={presetConfig.pug.searchAggregatorServiceUrl}
      >
        <Example forwardRef={null} />
      </MetaContextProvider>
    </div>
  );
};

export default {
  title: 'Extensible/Full example',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
