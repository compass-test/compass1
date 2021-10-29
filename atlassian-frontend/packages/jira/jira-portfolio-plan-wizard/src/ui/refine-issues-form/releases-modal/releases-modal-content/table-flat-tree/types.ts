export type ContextType = {
  isExpanded: (id: any) => boolean;
  toggle: (id: any, on?: boolean) => void;
};

export type Parent<I, U> = {
  id: I;
  hasChildren: boolean;
  children: U[];
};

export type FlatRowsProps<T extends Parent<I, U>, I, U> = {
  items: T[];
  children: (items: (T | U)[]) => React.ReactNode;
};

export type FlatRowProps<I> = {
  itemId: I;
  hasChildren?: boolean;
  children: React.ReactNode;
};
