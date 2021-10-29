import { createContext } from 'react';
import { ProductEnvironment } from '@atlassian/forge-ui-types';

export const EnvironmentContext = createContext<ProductEnvironment>(
  ProductEnvironment.PRODUCTION,
);
