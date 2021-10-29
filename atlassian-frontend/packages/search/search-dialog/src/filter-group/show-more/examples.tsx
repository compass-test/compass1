import React from 'react';
import { FilterShowMore } from './filter-show-more';
import { action } from '@storybook/addon-actions';
import { AsyncSelectFilterComponent } from './async-select/async-select-component';

export const Basic = () => (
  <FilterShowMore
    addFilter={action('addFilter')}
    defaultOptions={[
      {
        label: 'test',
        value: 'test',
      },
    ]}
    placeholderText={'Find a space'}
    loadOptions={(query) => {
      action(`Load called for query ${query}`)();
      return Promise.resolve([
        {
          label: <h1>I am async loaded and I am a JSX element</h1>,
          value: 'I am async loaded',
        },
      ]);
    }}
    buttonText="Show more"
    isDisabled={false}
    filterComponent={AsyncSelectFilterComponent}
  />
);

export default { title: 'Search Dialog/Filter Group/Show More' };
