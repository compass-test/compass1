export interface SearchResult {
  title: string;
  id: string;
  meta: string;
  url: string;
  iconUrl: string;
  containerId?: string;
}

export interface Section {
  id: string;
  title: string;
  viewAllLinkGenerator?: (query: string) => string;
}
export interface SearchResultSection extends Section {
  searchResults: SearchResult[];
  size?: number;
}

export interface SearchItems {
  sections: SearchResultSection[];
  // The count of items which can be shown
  size?: number;
}
