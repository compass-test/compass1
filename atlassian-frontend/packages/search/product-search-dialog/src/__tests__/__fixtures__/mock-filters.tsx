import {
  PeopleFilterOption,
  SpaceFilterOption,
} from '../../confluence/filter-context';
import { ProjectFilterOption } from '../../jira/filter-context';
import {
  createPeopleResults,
  createSpaceResponse,
} from './mock-search-results';
import {
  createPeopleResults as createAssigneeResults,
  createProjectResults,
} from './mock-jira-results';
import { isSingleAvatar } from '../../jira/clients/response-types';
import {
  FilterOptionSource,
  SiteFilterOption,
} from '../../common/filters/types';
import faker from 'faker';
import { Products } from '../../common/product-context';
import { BinaryStatusCategoryFilterOption } from '../../jira/filter-context/filter-context';
import { messages } from '../../messages';

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

export const createBinaryStatusCategoryFilters: (
  checkedNumber?: number,
) => BinaryStatusCategoryFilterOption[] = (checkedNumber = 0) => {
  return [
    {
      title: messages.binary_status_category_filter_option_done,
      iconUrl: '',
      id: messages.binary_status_category_filter_option_done.id,
      isChecked: checkedNumber >= 1,
      isVisible: true,
      filterSource: FilterOptionSource.STATIC,
    },
    {
      title: messages.binary_status_category_filter_option_done,
      iconUrl: '',
      id: messages.binary_status_category_filter_option_open.id,
      isChecked: checkedNumber >= 2,
      isVisible: true,
      filterSource: FilterOptionSource.STATIC,
    },
  ];
};

export const createAssigneeFilters: (
  num?: number,
  options?: {
    checkedNumber?: number;
    visibleNumber?: number;
  },
) => PeopleFilterOption[] = (num = 1, options = {}) => {
  const { checkedNumber = 0, visibleNumber = Math.min(num, 3) } = options;

  return createAssigneeResults(num).items.map((people, idx) => ({
    id: people.resultId,
    displayName: people.name,
    avatarUrl: people.attributes.avatarUrl,
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

export const createProjectFilters: (
  num?: number,
  options?: {
    checkedNumber?: number;
    visibleNumber?: number;
  },
) => ProjectFilterOption[] = (num = 1, options = {}) => {
  const { checkedNumber = 0, visibleNumber = Math.min(num, 3) } = options;

  return createProjectResults(num).items.map((project, idx) => {
    const { avatar } = project.attributes;
    return {
      name: project.name,
      id: project.resultId,
      iconUrl: isSingleAvatar(avatar) ? avatar.url : avatar.urls['24x24'],
      filterSource: FilterOptionSource.COLLABORATION_GRAPH,
      isChecked: idx < checkedNumber,
      isVisible: idx < visibleNumber,
    };
  });
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
      product: Products.jira,
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
