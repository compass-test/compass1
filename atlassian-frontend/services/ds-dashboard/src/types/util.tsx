export type Predicate<T> = (value: T) => boolean;

export type DocumentationSite = {
  type: 'constellation' | 'atlaskit';
  href: string;
};
