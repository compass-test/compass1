import { useIntl as useIntlDI } from '../../../common/utils/intl';

export enum Direction {
  UP,
  DOWN,
}

export interface SearchProps {
  useIntl?: typeof useIntlDI;
  searchQuery: string;
  activeSearchResultIndex: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  navigateResults: (direction: Direction) => void;
  totalResults: number;
  onClear?: () => void;
  minQueryLength?: number;
  isDisabled: boolean;
  searchContextRef?: React.RefObject<HTMLDivElement>;
}

export interface SearchSummaryProps {
  searchQuery: SearchProps['searchQuery'];
  totalResults: SearchProps['totalResults'];
  activeSearchResultIndex: SearchProps['activeSearchResultIndex'];
  navigateResults: SearchProps['navigateResults'];
  onClear: SearchProps['onClear'];
  minQueryLength: SearchProps['minQueryLength'];
}
