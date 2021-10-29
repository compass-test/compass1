import React from 'react';
import { Select } from './';

export const basic = () => {
  const favouriteDonutOptions = [
    { name: 'fav-donut', label: 'Chocolate', value: 'chocolate' },
    { name: 'fav-donut', label: 'Strawberry', value: 'strawberry' },
    { name: 'fav-donut', label: 'Cinnamon', value: 'cinnamon' },
  ];
  const multiSelectOptions = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ];
  return (
    <>
      <Select
        label="Other favourite donut"
        name="other-fav-donut"
        options={favouriteDonutOptions}
      />
      <Select
        label="With helper text"
        name="other-fav-donut"
        options={favouriteDonutOptions}
        description="Donuts are my favourite"
      />
      <Select
        label="Multi select"
        name="multi-select"
        isMulti={true}
        options={multiSelectOptions}
      />
    </>
  );
};
