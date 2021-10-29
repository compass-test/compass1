import { ReactNode } from 'react';

export type InfoCardProps = {
  name?: string;
  title: string;
  imageUrl: string;
  children: ReactNode;
};
