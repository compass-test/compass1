import React from 'react';
import { CheckboxGroup } from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

const productOptions = [
  { label: 'Jira', value: 'jira', defaultChecked: true },
  { label: 'Confluence', value: 'confluence' },
];

export const basic = () => {
  return (
    <CheckboxGroup label="Products" name="products" options={productOptions} />
  );
};

export const description = () => {
  return (
    <CheckboxGroup
      label="Products"
      name="products"
      options={productOptions}
      description="This is description"
    />
  );
};
