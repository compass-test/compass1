import React from 'react';
import Tabs, { Tab, TabList } from '@atlaskit/tabs';
import { withProductContext, ProductContextProps } from '../product-router';
import {
  DialogExpansionContextProps,
  withDialogExpansionContext,
} from '../../dialog-expansion-context/dialog-expansion-context';

/**
 * Empty interface required to get withProductContext HOC to type properly.
 */
interface Props {}

export class ProductTabsInner extends React.Component<
  ProductContextProps & Props & DialogExpansionContextProps
> {
  render() {
    const { products, showProduct, getActiveProduct, isExpanded } = this.props;

    const activeProductId = getActiveProduct()?.id;
    const activeProductIndex = products.findIndex(
      (product) => product.id === activeProductId,
    );

    if (activeProductIndex === -1 && isExpanded && products[0]) {
      showProduct(products[0].id);

      return null;
    }

    if (!isExpanded || products.length === 1) {
      return null;
    }

    return (
      <Tabs
        selected={activeProductIndex}
        onChange={(index) => showProduct(products[index].id)}
        id="tab-controls"
        shouldUnmountTabPanelOnChange
      >
        <TabList>
          {products.map((product, index) => (
            <Tab key={index}>{product.title}</Tab>
          ))}
        </TabList>
      </Tabs>
    );
  }
}

export const ProductTabs: React.ComponentType<Props> = withProductContext(
  withDialogExpansionContext(ProductTabsInner),
);
