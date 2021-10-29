import React from 'react';

import { FiltersContainer } from '../../services/filters';

import { Catalog } from './catalog';

export const CatalogPage = () => {
  return (
    <FiltersContainer>
      <Catalog />
    </FiltersContainer>
  );
};
