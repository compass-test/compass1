import { CollapsibleRow } from './types';

const shuffle = (word: string) =>
  word
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

export type President = {
  id: number;
  key: string;
  name: string;
  party: string;
  time: string;
  content?: string;
};

export const head = {
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

export const presidentListWithContent: President[] = [
  {
    id: 1,
    key: 'GW',
    name: 'George Washington',
    party: 'None, Federalist',
    time: '1789-1797',
    content: 'WITH CONTENT',
  },
];

export const presidentListWithoutContent: President[] = [
  {
    id: 1,
    key: 'GW',
    name: 'George Washington',
    party: 'None, Federalist',
    time: '1789-1797',
  },
];

export const presidents: President[] = [
  {
    id: 1,
    key: 'GW',
    name: 'George Washington',
    party: 'None, Federalist',
    time: '1789-1797',
    content: 'Labore deserunt labore pariatur ea aliquip et exercitation.',
  },
  {
    id: 2,
    key: 'JA',
    name: 'John Adams',
    party: 'Federalist',
    time: '1797-1801',
  },
  {
    id: 3,
    key: 'TJ',
    name: 'Thomas Jefferson',
    party: 'Democratic-Republican',
    time: '1801-1809',
  },
  {
    id: 4,
    key: 'JM',
    name: 'James Madison',
    party: 'Democratic-Republican',
    time: '1809-1817',
    content: 'Elit non esse quis Lorem.',
  },
  {
    id: 5,
    key: 'JMON',
    name: 'James Monroe',
    party: 'Democratic-Republican',
    time: '1817-1825',
    content: 'Id nisi est dolore velit in qui fugiat.',
  },
  {
    id: 6,
    key: 'JQA',
    name: 'John Quincy Adams',
    party: 'Democratic-Republican',
    time: '1825-1829',
  },
  {
    id: 7,
    key: 'AJ',
    name: 'Andrew Jackson',
    party: 'Democrat',
    time: '1829-1837',
  },
  {
    id: 8,
    key: 'MVB',
    name: 'Martin van Buren',
    party: 'Democrat',
    time: '1837-1841',
  },
  {
    id: 9,
    key: 'WHH',
    name: 'William H. Harrison',
    party: 'Whig',
    time: '1841',
  },
  {
    id: 10,
    key: 'JT',
    name: 'John Tyler',
    party: 'Whig',
    time: '1841-1845',
    content: 'Velit sit aliquip et voluptate labore irure velit exercitation.',
  },
];

export const getCollapsibleRows = (presidents: President[]) =>
  presidents.map(
    (president: President) =>
      ({
        key: president.key,
        collapsibleContent: president.content,
        cells: [
          {
            key: president.name,
            content: president.name,
          },
          {
            key: president.party,
            content: president.party,
          },
          {
            key: president.id,
            content: president.time,
          },
          {
            content: shuffle(president.name),
          },
          {
            content: shuffle(president.party),
          },
        ],
      } as CollapsibleRow),
  );
