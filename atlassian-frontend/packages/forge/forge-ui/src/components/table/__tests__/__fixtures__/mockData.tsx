import React from 'react';
import { Table } from '../..';

const head = {
  cells: [
    {
      content: <button>column 1 heading</button>,
    },
    {
      content: <button>column 2 heading</button>,
    },
  ],
};

const rows = [
  {
    cells: [
      {
        content: <button>Row 1 column 1</button>,
      },
    ],
  },
  {
    cells: [
      {
        content: <button>Row 2 column 1</button>,
      },
    ],
  },
];

export const basicTable = <Table head={head} rows={rows} />;
