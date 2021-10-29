import React from 'react';
import AdvancedSearchFooter, {
  AdvancedSearchFooterProps,
} from '../../../../advanced-search-footer';
import { ProductStates } from '../../../../product-state-machine';
import FaultScreenFillerFooter from './FaultScreenFillerFooter.styled';
import { SearchFooter } from '@atlassian/search-dialog';

export const GetDefaultFooter = ({
  productState,
  ...rest
}: {
  productState: ProductStates;
} & AdvancedSearchFooterProps) => {
  switch (productState) {
    case ProductStates.PreQueryNoResult:
    case ProductStates.PreQueryError:
    case ProductStates.PostQueryNoResult:
    case ProductStates.PostQueryError:
      return <FaultScreenFillerFooter data-testid={'fault-screen-footer'} />;
    default:
      return (
        <SearchFooter>
          <AdvancedSearchFooter {...rest} />
        </SearchFooter>
      );
  }
};
