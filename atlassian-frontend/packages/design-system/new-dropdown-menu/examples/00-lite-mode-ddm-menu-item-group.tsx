import React from 'react';

import DropdownMenu, { DropdownItem, DropdownItemGroup } from '../src';

const DropdownMenuItemGroup = () => (
  <DropdownMenu trigger="File">
    <DropdownItemGroup title="Edit page">
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Move</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Export">
      <DropdownItem>PDF</DropdownItem>
      <DropdownItem>Excel</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
);

export default DropdownMenuItemGroup;
