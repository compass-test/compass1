import {
  PeopleFilterOption,
  SpaceFilterOption,
} from '../../confluence/filter-context';
import {
  createPeopleResults,
  createSpaceResponse,
} from './mock-search-results';
import {
  FilterOptionSource,
  SiteFilterOption,
} from '../../common/filters/types';
import faker from 'faker';
import { Products } from '../../common/product-context';

faker.seed(777);

export const createPeopleFilters: (
  num?: number,
  options?: {
    checkedNumber?: number;
    visibleNumber?: number;
  },
) => PeopleFilterOption[] = (num = 1, options = {}) => {
  const { checkedNumber = 0, visibleNumber = Math.min(num, 3) } = options;

  return createPeopleResults(num).items.map((people, idx) => ({
    id: people.resultId,
    displayName: people.name,
    avatarUrl: people.avatarUrl,
    filterSource: FilterOptionSource.COLLABORATION_GRAPH,
    isChecked: idx < checkedNumber,
    isVisible: idx < visibleNumber,
  }));
};

export const createSpaceFilters: (
  num?: number,
  options?: {
    checkedNumber?: number;
    visibleNumber?: number;
  },
) => SpaceFilterOption[] = (num = 1, options = {}) => {
  const { checkedNumber = 0, visibleNumber = Math.min(num, 3) } = options;

  return createSpaceResponse(num).items.map((space, idx) => ({
    id: space.resultId,
    spaceName: space.name,
    iconUrl: space.avatarUrl,
    filterSource: FilterOptionSource.COLLABORATION_GRAPH,
    isChecked: idx < checkedNumber,
    isVisible: idx < visibleNumber,
  }));
};

export const createSiteFilters: (
  num?: number,
  options?: {
    checkedNumber?: number;
    visibleNumber?: number;
  },
) => SiteFilterOption[] = (num = 1, options = {}) => {
  const { checkedNumber = 0, visibleNumber = Math.min(num, 3) } = options;

  return [...Array(num)].map((_, idx) => {
    const id = faker.random.uuid();
    return {
      id: id,
      product: Products.confluence,
      avatarUrl: faker.internet.url(),
      cloudId: id,
      siteName: faker.lorem.word(),
      siteUrl: faker.internet.url(),
      isChecked: idx < checkedNumber,
      isVisible: idx < visibleNumber,
      filterSource: FilterOptionSource.EXTERNAL,
    };
  });
};
