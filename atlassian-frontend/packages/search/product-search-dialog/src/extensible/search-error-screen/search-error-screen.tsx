import React from 'react';
import { SearchError } from '../../common/search-error';
import { ScreenSpecificProps } from '../product-router/product/result-provider/result-renderer';

export const SearchErrorScreen = ({
  onRetry = () => null,
}: Pick<ScreenSpecificProps, 'onRetry'>) => {
  return <SearchError onRetry={onRetry} />;
};
