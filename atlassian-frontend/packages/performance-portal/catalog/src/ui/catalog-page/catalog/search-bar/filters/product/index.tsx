import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { PRODUCTS, ProductType } from '@atlassian/performance-portal-common';

import { useFilters } from '../../../../../../services/filters';
import { SelectedProducts } from '../../../../../../types';

const getVisibleProducts = (selectedProducts: SelectedProducts) => {
  const selectedEntries = Object.entries(selectedProducts) as Array<
    [ProductType, boolean]
  >;

  const visible = selectedEntries.filter(([, visible]) => visible);

  if (visible.length === selectedEntries.length) {
    return 'All products';
  }

  if (visible.length === 0) {
    return 'None';
  }

  return visible
    .reduce<Array<string>>((acc, [id]) => {
      const product = PRODUCTS.find(({ id: productId }) => productId === id);
      if (product) {
        acc.push(product.name);
      }
      return acc;
    }, [])
    .join(', ');
};

export const ProductFilter = () => {
  const [state, actions] = useFilters();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const toggleProduct = useCallback(
    (e) => {
      const { id } = e.currentTarget;
      actions.toggleProduct(id);

      const analyticsEvent = createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'productFilter',
        source: 'catalog',
        attributes: {
          product: id,
        },
      });
      sendUIEvent(analyticsEvent);
    },
    [actions, createAnalyticsEvent],
  );

  const clickDropdown = useCallback(
    (e) => {
      if (e.isOpen) {
        const analyticsEvent = createAnalyticsEvent({
          action: 'opened',
          actionSubject: 'productFilterDropdown',
          source: 'catalog',
        });
        sendUIEvent(analyticsEvent);
      }
    },
    [createAnalyticsEvent],
  );

  return (
    <DropdownMenu
      trigger={getVisibleProducts(state.products)}
      triggerType="button"
      position={'bottom right'}
      onOpenChange={clickDropdown}
    >
      <DropdownItemGroupCheckbox id={'products'}>
        {PRODUCTS.map((product) => (
          <DropdownItemCheckbox
            key={product.id}
            id={product.id}
            isSelected={state.products[product.id] || false}
            onClick={toggleProduct}
          >
            {product.name}
          </DropdownItemCheckbox>
        ))}
      </DropdownItemGroupCheckbox>
    </DropdownMenu>
  );
};
