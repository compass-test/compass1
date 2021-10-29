import React from 'react';

import {
  DataGridItem,
  DataGridLabel,
  DataGridTitle,
  DataGridValue,
  DataGridWrapper,
} from './styled';

export type DataGridCardItem = {
  label: string;
  value: React.ReactNode;
};

export type DataGridCardItemProps = {
  items: DataGridCardItem[];
  title?: string;
};

const DataGridCard = ({ items, title }: DataGridCardItemProps) => (
  <DataGridWrapper>
    {title && <DataGridTitle>{title}</DataGridTitle>}
    {items.map(({ label, value }) => (
      <DataGridItem key={label}>
        <DataGridValue>{<strong>{value}</strong>}</DataGridValue>
        <DataGridLabel>{label}</DataGridLabel>
      </DataGridItem>
    ))}
  </DataGridWrapper>
);
export default DataGridCard;
