import React from 'react';

import { ListItem } from './list-item';
import { List as ListStyle } from './styled';

type ListProps = {
  testId?: string;
  children: React.ReactNode;
};

function List(props: ListProps) {
  return <ListStyle data-testid={props.testId}>{props.children}</ListStyle>;
}

List.Item = ListItem;

export default List;
