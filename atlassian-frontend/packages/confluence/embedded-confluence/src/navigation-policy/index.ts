export type Modifiers = {
  target: '_self' | '_blank';
  routeName: 'EDIT_PAGE_EMBED' | 'VIEW_PAGE' | undefined;
  contentId: string | undefined;
  spaceKey: string | undefined;
};

export type NavigationPolicy = {
  navigate?: (
    url: string,
    modifiers: Modifiers,
    defaultNavigate: (url: string, modifiers: Modifiers) => void,
  ) => void;
  shimUrl?: string;
};
