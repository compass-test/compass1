import React from 'react';
import { ProductRouter } from '../';
import { DialogExpansionContextProvider } from '../../dialog-expansion-context';
import { SearchDialogProduct } from '../product';
import { ProductTabs } from './tab-controls';

import { SearchDialog } from '@atlassian/search-dialog';
import { boolean } from '@storybook/addon-knobs';
import { noResultSuppliers } from '../../result-supplier';

const defaultProps = {
  onRetry: () => null,
  urlGeneratorForNoResultsScreen: () => '',
  ...noResultSuppliers(),
};

export const Basic = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <SearchDialog>
          <ProductTabs />
          <SearchDialogProduct
            id="confluence"
            title="conflugoo"
            sections={[
              {
                id: 'confluence.page,blogpost,attachment',
                title: 'Confluence page blogpost',
              },
            ]}
            order={1}
            permissionSupplier={() =>
              Promise.resolve(['confluence.page,blogpost,attachment'])
            }
            {...defaultProps}
          >
            <div>Confluencie</div>
          </SearchDialogProduct>
          <SearchDialogProduct
            id="jira"
            title="jyra"
            sections={[
              {
                id: 'jira.issue',
                title: 'Jira Issue',
              },
            ]}
            order={2}
            permissionSupplier={() => Promise.resolve(['jira.issue'])}
            {...defaultProps}
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
            permissionSupplier={() => Promise.resolve(['bitbucket.repository'])}
            {...defaultProps}
          >
            <div>boitbuckle</div>
          </SearchDialogProduct>
          <div>I am a child which is always rendered</div>
        </SearchDialog>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export const DelayedProductRegistry = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <div>Bitbucket registers immediately</div>
      <div>Jira registers after 5 seconds</div>
      <div>Confluence registers after 10 seconds</div>
      <ProductRouter>
        <SearchDialog>
          <ProductTabs />
          <SearchDialogProduct
            id="confluence"
            title="conflugoo"
            sections={[
              {
                id: 'confluence.page,blogpost,attachment',
                title: 'Confluence page blogpost',
              },
            ]}
            order={1}
            {...defaultProps}
            permissionSupplier={() =>
              new Promise((resolve) =>
                setTimeout(
                  () => resolve(['confluence.page,blogpost,attachment']),
                  10000,
                ),
              )
            }
            {...noResultSuppliers()}
          >
            <div>Confluencie</div>
          </SearchDialogProduct>
          <SearchDialogProduct
            id="jira"
            title="jyra"
            sections={[
              {
                id: 'jira.issue',
                title: 'Jira Issue',
              },
            ]}
            order={2}
            {...defaultProps}
            permissionSupplier={() =>
              new Promise((resolve) =>
                setTimeout(() => resolve(['jira.issue']), 5000),
              )
            }
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
            {...defaultProps}
            permissionSupplier={() => Promise.resolve(['bitbucket.repository'])}
            {...noResultSuppliers()}
          >
            <div>boitbuckle</div>
          </SearchDialogProduct>
        </SearchDialog>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export const DuplicateOrder = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <SearchDialog>
          <ProductTabs />
          <SearchDialogProduct
            id="confluence"
            title="conflugoo"
            sections={[
              {
                id: 'confluence.page,blogpost,attachment',
                title: 'Confluence page blogpost',
              },
            ]}
            order={1}
            {...defaultProps}
            permissionSupplier={() =>
              Promise.resolve(['confluence.page,blogpost,attachment'])
            }
            {...noResultSuppliers()}
          >
            <div>Confluencie</div>
          </SearchDialogProduct>
          <SearchDialogProduct
            id="jira"
            title="jyra"
            sections={[
              {
                id: 'jira.issue',
                title: 'Jira Issue',
              },
            ]}
            order={1}
            {...defaultProps}
            permissionSupplier={() => Promise.resolve(['jira.issue'])}
            {...noResultSuppliers()}
          >
            <div>gyra</div>
          </SearchDialogProduct>
        </SearchDialog>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export default {
  title: 'Product Search Dialog/Tab Controls',
  decorators: [(story: () => React.ElementType) => story()],
};
