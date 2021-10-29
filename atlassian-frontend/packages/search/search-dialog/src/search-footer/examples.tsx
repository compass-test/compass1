import React from 'react';
import { SearchFooter } from '../search-footer';

export const EmptyFooter = () => (
  // the div is to provide a bit of a margin, so that the border is visible.
  <div style={{ marginTop: '20px', marginLeft: '20px', width: '780px' }}>
    <SearchFooter>
      <span style={{ lineHeight: '52px' }}>
        This is the container to place footer elements within, such as the
        advanced search buttons.
      </span>
    </SearchFooter>
  </div>
);

export default { title: 'Search Dialog/Search Footer' };
