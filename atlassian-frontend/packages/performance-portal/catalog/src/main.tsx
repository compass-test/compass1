import React from 'react';

import { Helmet } from 'react-helmet';

import { CatalogPage } from './ui';

export default () => {
  return (
    <>
      <Helmet title="Performance Portal - catalog" />

      <CatalogPage />
    </>
  );
};
