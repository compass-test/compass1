import React from 'react';

import styled from '@emotion/styled';
import { IntlProvider } from 'react-intl';

import DynamicTableSelectable from './index';

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
    },
    {
      key: 'party',
      content: 'Party',
      isSortable: true,
    },
    {
      key: 'term',
      content: 'Term',
      isSortable: true,
    },
    {
      key: 'content',
      content: 'Comment',
    },
    {
      key: 'content2',
      content: 'Comment2',
    },
  ],
};

type President = {
  id: number;
  key: string;
  nm: string;
  pp: string;
  tm: string;
};

const presidents: President[] = [
  {
    id: 1,
    key: 'GW',
    nm: 'George Washington',
    pp: 'None, Federalist',
    tm: '1789-1797',
  },
  {
    id: 2,
    key: 'JA',
    nm: 'John Adams',
    pp: 'Federalist',
    tm: '1797-1801',
  },
  {
    id: 3,
    key: 'TJ',
    nm: 'Thomas Jefferson',
    pp: 'Democratic-Republican',
    tm: '1801-1809',
  },
  {
    id: 4,
    key: 'JM',
    nm: 'James Madison',
    pp: 'Democratic-Republican',
    tm: '1809-1817',
  },
  {
    id: 5,
    key: 'JMON',
    nm: 'James Monroe',
    pp: 'Democratic-Republican',
    tm: '1817-1825',
  },
  {
    id: 6,
    key: 'JQA',
    nm: 'John Quincy Adams',
    pp: 'Democratic-Republican',
    tm: '1825-1829',
  },
  {
    id: 7,
    key: 'AJ',
    nm: 'Andrew Jackson',
    pp: 'Democrat',
    tm: '1829-1837',
  },
  {
    id: 8,
    key: 'MVB',
    nm: 'Martin van Buren',
    pp: 'Democrat',
    tm: '1837-1841',
  },
  {
    id: 9,
    key: 'WHH',
    nm: 'William H. Harrison',
    pp: 'Whig',
    tm: '1841',
  },
  {
    id: 10,
    key: 'JT',
    nm: 'John Tyler',
    pp: 'Whig',
    tm: '1841-1845',
  },
];

const shuffle = (word: string) =>
  word
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

const rows = presidents.map((president: President) => ({
  key: president.key,
  cells: [
    {
      key: president.nm,
      content: president.nm,
    },
    {
      key: president.pp,
      content: president.pp,
    },
    {
      key: president.id,
      content: president.tm,
    },
    {
      content: shuffle(president.nm),
    },
    {
      content: shuffle(president.pp),
    },
  ],
}));

const getUniqueArray = (list: string[]) =>
  list.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

const Container = styled.div`
  width: 900px;
  margin: auto;
`;

export const DynamicTableSelectableExample = () => {
  const currentPageItemKeys = presidents.map((item) => item.key);
  const [selectedItemKeys, setSelectedItemKeys] = React.useState<string[]>([]);
  const rowsWithClick = rows.map((item: any) => ({
    ...item,
    onClick: (event: any) => {
      const selectedItemIndex = selectedItemKeys.indexOf(item.key);
      if (selectedItemIndex > -1) {
        const selectedItems = [...selectedItemKeys];
        selectedItems.splice(selectedItemIndex, 1);
        setSelectedItemKeys(selectedItems);
      } else {
        setSelectedItemKeys([...selectedItemKeys, item.key]);
      }
    },
  }));
  return (
    <Container>
      <IntlProvider locale="en">
        <DynamicTableSelectable
          containerUnit="space"
          selectedItemKeys={selectedItemKeys}
          currentPageItemKeys={currentPageItemKeys}
          totalCount={100}
          head={head}
          rows={rowsWithClick}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          onSelectionChangeOnCurrentPage={(toBeSelected: boolean) => {
            if (toBeSelected) {
              setSelectedItemKeys(getUniqueArray(currentPageItemKeys));
            } else {
              setSelectedItemKeys([]);
            }
          }}
          onClearAllSelection={() => {
            setSelectedItemKeys([]);
          }}
          onSelectAllItems={() => {
            setSelectedItemKeys(getUniqueArray(currentPageItemKeys));
          }}
        />
      </IntlProvider>
    </Container>
  );
};
