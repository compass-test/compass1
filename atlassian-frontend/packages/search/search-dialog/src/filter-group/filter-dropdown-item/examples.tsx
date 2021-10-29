import React, { useState } from 'react';
import FilterDropdownItem from './filter-dropdown-item';
import { action } from '@storybook/addon-actions';

const values = [
  {
    label: 'cat',
    value: { call: 'meow', type: 'feline' },
  },
  {
    label: 'dog',
    value: { call: 'woof', type: 'canine' },
  },
  {
    label: 'Parastratiosphecomyia stratiosphecomyioides',
    value: { call: 'buzz', type: 'insect' },
  },
];

export const Basic = () => {
  const sizes = [100, 200, 400];
  const [size, setSize] = useState(0);

  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <button onClick={() => setSize((size + 1) % sizes.length)}>
          Toggle Size
        </button>
      </div>
      <div style={{ width: `${sizes[size]}px` }}>
        <FilterDropdownItem
          placeholder="placeholder text"
          values={values}
          onChange={action('onChange')}
        />
      </div>
    </>
  );
};

export const Loading = () => {
  const sizes = [100, 200, 400];
  const [size, setSize] = useState(0);

  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <button onClick={() => setSize((size + 1) % sizes.length)}>
          Toggle Size
        </button>
      </div>
      <div style={{ width: `${sizes[size]}px` }}>
        <FilterDropdownItem
          isLoading
          placeholder="placeholder text"
          values={values}
          onChange={action('onChange')}
        />
      </div>
    </>
  );
};

export default { title: 'Search Dialog/Filter Group/Dropdown Item' };
