import React from 'react';

import { List } from '../src';

export default function ListExample() {
  return (
    <div style={{ maxWidth: '500px' }}>
      <List>
        <List.Item>This is some information inside a list item</List.Item>
        <List.Item>List items intentionally have no padding</List.Item>
        <List.Item>So that you can put whatever you like in them</List.Item>
        <List.Item>
          Checkout the smart link list example to see it in action!
        </List.Item>
      </List>
    </div>
  );
}
