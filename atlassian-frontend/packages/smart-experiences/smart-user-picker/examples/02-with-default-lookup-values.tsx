import React, { useState, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import Select from '@atlaskit/select';
import { DefaultValue } from '@atlaskit/user-picker';

import SmartUserPicker, { setSmartUserPickerEnv } from '../src';
import { JDOG_CLOUD_ID } from '../example-helpers/jdog-cloud-id';

type ProductOption = {
  label: string;
  value: string;
};

const products: ProductOption[] = [
  { label: 'Jira', value: 'jira' },
  { label: 'Confluence', value: 'confluence' },
  { label: 'People', value: 'people' },
  { label: 'Bitbucket', value: 'bitbucket' },
];

const defaultValues: DefaultValue = [
  {
    id: '655363:23cdc6cc-d81e-492d-8fe1-ec56fb8094a4',
    type: 'user',
  },
  {
    id: '5e15afb1e3b48c0daa0f5c7e',
    type: 'user',
  },
  {
    id: 'id-doesnt-exist',
    type: 'user',
  },
  {
    id: '58538da6-333b-4e28-8f15-8aadc3961b62',
    type: 'team',
  },
  {
    id: 'id-doesnt-exist',
    type: 'team',
  },
  {
    id: '9e46e05e-cc6b-4af7-ad7f-1a6a169482a3',
    type: 'team',
  },
  {
    id: '0c7d1de3-59ab-4430-b1f0-7637cd268a8f',
    type: 'group',
  },
];

const productsMap = products
  .map((p) => ({ [p.value]: p }))
  .reduce((acc, val) => ({ ...acc, ...val }), {});

const Example: React.FC = () => {
  setSmartUserPickerEnv('local');
  const [product, setProduct] = useState<string>('people');
  const getDefaultValues = () => {
    return defaultValues;
  };

  const memoziedDefaultValues = useMemo(() => getDefaultValues(), []);

  return (
    <div>
      <Select
        width="medium"
        onChange={(selectedValue) => {
          if (selectedValue) {
            setProduct(selectedValue.value);
          }
        }}
        value={productsMap[product]}
        options={products}
        placeholder="Choose a Product"
      />
      <IntlProvider locale="en">
        <SmartUserPicker
          key={product} // force rerender on product change
          fieldId="example"
          productKey={product}
          siteId={JDOG_CLOUD_ID}
          onChange={console.log}
          isMulti
          defaultValue={memoziedDefaultValues}
        />
      </IntlProvider>
    </div>
  );
};

export default Example;
