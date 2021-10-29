export type PopupContentType = {
  searchTermHref?: string;
  searchTermOnClick?: (e?: React.MouseEvent<Element>) => void;
  filterTermHref?: string;
  filterTermOnClick?: (e?: React.MouseEvent<Element>) => void;
};

export type MenuType = {
  testId?: string;
} & PopupContentType;

export type SearchAnalyticsSubtableType = {
  /**
   * Name of the title of the card.
   */
  title: string;
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};
