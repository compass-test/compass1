import React, { createContext, useCallback, useContext, useState } from 'react';

import { Row } from '@atlaskit/table-tree';

import { ContextType, FlatRowProps, FlatRowsProps, Parent } from './types';

const context = createContext<ContextType>({
  isExpanded: () => false,
  toggle: () => {},
});

/**
 * **FlatRows** component renders table-tree items (which is a tree) as a flat list of rows,
 * all parents and children are in the same nest-level of DOM.
 * It still provides the tree atmosphere to the UI by providing mechanism for collapsing/expanding Row.
 *
 * **FlatRow** component is supposed to render the row items provided in this component.
 */
export const FlatRows = <T extends Parent<I, U>, I, U>({
  items,
  children: renderRows,
}: FlatRowsProps<T, I, U>) => {
  const [collapsed, setCollapsed] = useState<I[]>([]);
  const isExpanded = useCallback((id: I) => !collapsed.includes(id), [
    collapsed,
  ]);
  const toggle = useCallback(
    (id: I, on?: boolean) => {
      on = on ?? !isExpanded(id);
      setCollapsed((collapsed) =>
        collapsed.filter((elem) => elem !== id).concat(on ? [] : [id]),
      );
    },
    [isExpanded, setCollapsed],
  );

  // Flatten the tree
  const rows = items.reduce<(T | U)[]>(
    (acc, item) => [
      ...acc,
      item,
      ...(isExpanded(item.id) ? item.children : []),
    ],
    [],
  );

  return (
    <context.Provider value={{ isExpanded, toggle }}>
      {renderRows(rows)}
    </context.Provider>
  );
};

/**
 * **FlatRow** component renders the row - which could be either parent or child item - provided from the **FlatRows** element.
 *
 */
export const FlatRow = <I,>({
  itemId,
  hasChildren = false,
  children,
}: FlatRowProps<I>) => {
  const { isExpanded, toggle } = useContext(context);

  return (
    <Row
      itemId={itemId}
      data={itemId}
      hasChildren={hasChildren}
      isExpanded={hasChildren && isExpanded(itemId)}
      onExpand={() => toggle(itemId, true)}
      onCollapse={() => toggle(itemId, false)}
    >
      {children}
    </Row>
  );
};
