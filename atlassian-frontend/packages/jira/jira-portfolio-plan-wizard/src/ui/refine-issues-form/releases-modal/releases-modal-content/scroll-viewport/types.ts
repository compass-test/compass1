import { ReactNode } from 'react';

export type HTMLElementRef = React.RefObject<HTMLElement>;

export type ScrollViewportProps<T> = {
  /**The scroll container element ref */
  containerRef: HTMLElementRef;
  itemHeight: number;
  items: T[];
  renderRow: (item: T, offsetY: number) => ReactNode;
};

export type ScrollViewportRowProps = {
  offsetY: number;
};
