import React from 'react';
import Tabs, { TabList, useTab } from '@atlaskit/tabs';
import { withProductContext, ProductContextProps } from '../product-router';
import {
  DialogExpansionContextProps,
  withDialogExpansionContext,
} from '../../dialog-expansion-context/dialog-expansion-context';
import { onTabSelected, useAnalytics } from '../../../common/analytics';
import { Products } from '../../../common/product-context';
import { TabItemWrapper } from '../../../cross-product/dialog-content/tab-item-wrapper';
import { withABTestContext, ABTestContext } from '../../ab-test-context';

/**
 * Empty interface required to get withProductContext HOC to type properly.
 */
interface Props {}

const CustomTab: React.FC<any> = ({ title, index }) => {
  const tabAttributes = useTab();

  return (
    <TabItemWrapper
      {...tabAttributes}
      key={index}
      isFirstItem={index === 0}
      onMouseDown={(e) => e.preventDefault()}
      data-testid={`search-dialog-product-tab-${index}`}
    >
      {title}
    </TabItemWrapper>
  );
};

export const ProductTabsInner: React.FC<
  ProductContextProps & Props & DialogExpansionContextProps & ABTestContext
> = (props) => {
  const { products, showProduct, getActiveProduct, isExpanded, abTest } = props;
  const { fireAnalyticsEvent } = useAnalytics();

  const onTabClicked = (index: number) => {
    const id = products[index].id;
    showProduct(products[index].id);
    fireAnalyticsEvent(onTabSelected({ tabName: id as Products }));
  };

  const activeProductId = getActiveProduct()?.id;
  const activeProductIndex = products.findIndex(
    (product) => product.id === activeProductId,
  );

  if (activeProductIndex === -1 && isExpanded && products[0] && abTest) {
    showProduct(products[0].id);
    return null;
  }

  if (!isExpanded || products.length === 1 || !abTest) {
    return null;
  }

  return (
    // Tabs has unwanted flex-basis: 100% set, div wrapper gets around this
    <div>
      <Tabs
        selected={activeProductIndex}
        onChange={onTabClicked}
        id="tab-controls"
        shouldUnmountTabPanelOnChange
      >
        <TabList>
          {products.map((product, index) => (
            <CustomTab title={product.title} key={product.id} index={index} />
          ))}
        </TabList>
      </Tabs>
    </div>
  );
};

export const ProductTabs: React.ComponentType<Props> = withABTestContext(
  withProductContext(withDialogExpansionContext(ProductTabsInner)),
);
