import React from 'react';
import { ProductRouter } from '../';
import { DialogExpansionContextProvider } from '../../dialog-expansion-context';
import { AsyncProduct } from '../product';
import { ProductTabs } from './tab-controls';

import { boolean } from '@storybook/addon-knobs';

export const Basic = () => {
  const isExpanded: boolean = boolean('Expand Dialog', true);
  return (
    <DialogExpansionContextProvider
      isExpanded={isExpanded}
      setIsExpanded={(ignore) => undefined}
    >
      <ProductRouter>
        <ProductTabs />
        <AsyncProduct
          id="confluence"
          title="conflugoo"
          sections={[
            {
              id: 'confluence.page,blogpost,attachment',
              title: 'Confluence page blogpost',
            },
          ]}
        >
          <div>Confluencie</div>
        </AsyncProduct>
        <AsyncProduct
          id="jira"
          title="jyra"
          sections={[
            {
              id: 'jira.issue',
              title: 'Jira Issue',
            },
          ]}
        >
          <div>gyra</div>
        </AsyncProduct>
        <AsyncProduct
          id="bitbucket"
          title="buttbucket"
          sections={[
            {
              id: 'bitbucket.repository',
              title: 'Bitbucket Repository',
            },
          ]}
        >
          <div>boitbuckle</div>
        </AsyncProduct>
        <div>I am a child which is always rendered</div>
      </ProductRouter>
    </DialogExpansionContextProvider>
  );
};

export default {
  title: 'Product Search Dialog/Tab Controls',
  decorators: [(story: () => React.ElementType) => story()],
};
