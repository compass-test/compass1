import React from 'react';

import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

const DropdownLoading = () => {
  return (
    <div style={{ margin: '20px' }}>
      <DropdownMenu
        placement="bottom-start"
        testId="lite-mode-ddm"
        trigger="Click to open"
        isLoading
        statusLabel="the menu is loading"
      >
        <DropdownItemGroup>
          <DropdownItem>Move</DropdownItem>
          <DropdownItem>Clone</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </div>
  );
};

export default DropdownLoading;
