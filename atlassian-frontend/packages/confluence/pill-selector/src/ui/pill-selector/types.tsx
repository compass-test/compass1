import { ReactNode } from 'react';

export type PillProps = {
  content: ReactNode;
  name: string;
};

export type PillFilterProps = {
  testId?: string;
  selectedPillName: string;
  pills: PillProps[];
};
