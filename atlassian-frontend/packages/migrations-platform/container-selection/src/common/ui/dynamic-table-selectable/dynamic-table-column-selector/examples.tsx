import React from 'react';

import styled from '@emotion/styled';
import { IntlProvider } from 'react-intl';

import { DynamicTableColumnSelector } from './index';

const Container = styled.div`
  width: 900px;
  margin: auto;
`;

export const DynamicTableColumnSelectorMultipleProjects = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const currentPageItemKeys = ['a', 'b', 'c'];
  return (
    <Container>
      <IntlProvider locale="en">
        <DynamicTableColumnSelector
          containerUnit="project"
          currentPageItemKeys={currentPageItemKeys}
          selectedItemKeys={selectedItems}
          totalCount={100}
          key="key"
          onClearAllSelection={() => {
            setSelectedItems([]);
          }}
          onSelectAllItems={() => {
            setSelectedItems(currentPageItemKeys);
          }}
          onSelectionChangeOnCurrentPage={() => {
            setSelectedItems(currentPageItemKeys);
          }}
        />
      </IntlProvider>
    </Container>
  );
};

export const DynamicTableColumnSelectorSinglePlan = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const currentPageItemKeys = ['a', 'b', 'c'];
  return (
    <Container>
      <IntlProvider locale="en">
        <DynamicTableColumnSelector
          containerUnit="plan"
          currentPageItemKeys={currentPageItemKeys}
          selectedItemKeys={selectedItems}
          totalCount={1}
          key="key"
          onClearAllSelection={() => {
            setSelectedItems([]);
          }}
          onSelectAllItems={() => {
            setSelectedItems(currentPageItemKeys);
          }}
          onSelectionChangeOnCurrentPage={() => {
            setSelectedItems(currentPageItemKeys);
          }}
        />
      </IntlProvider>
    </Container>
  );
};
