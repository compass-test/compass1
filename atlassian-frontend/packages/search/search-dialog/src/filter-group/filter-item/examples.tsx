import React from 'react';
import FilterItem from './filter-item';
// eslint-disable-next-line
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line
import faker from 'faker';
import { FilterColLabelText, FilterRowLabelText } from '.';

const Icon = () => (
  <div
    style={{
      width: '24px',
      height: '24px',
      border: '1px solid black',
      boxSizing: 'border-box',
      borderRadius: '3px',
    }}
  />
);

export const BasicColFilterItems = () => (
  <>
    <FilterItem
      value="simple"
      label="Simple Text"
      icon={<Icon />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
    <FilterItem
      value="long"
      label={`Long Text ${faker.lorem.paragraph(1)}`}
      icon={<Icon />}
      onChange={action('onChange')}
      LabelComponent={FilterColLabelText}
    />
  </>
);

export const BasicRowFilterItems = () => (
  <>
    <FilterItem
      value="simple"
      label="Simple Text"
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
    <FilterItem
      value="long"
      label={`Long Text ${faker.lorem.paragraph(1)}`}
      onChange={action('onChange')}
      LabelComponent={FilterRowLabelText}
    />
  </>
);

export default { title: 'Search Dialog/Filter Group/Item' };
