import { buildJiraAdvancedSearchUrl } from '../advanced-search-url-factory';
import { FilterOptionSource } from '../../../common/filters/types';
import {
  AssigneeFilterOption,
  ProjectFilterOption,
  BinaryStatusCategory,
  BinaryStatusCategoryFilterOption,
} from '../../filter-context';
import { messages } from '../../../messages';

const buildMockProjectFilter = (
  projectOverrides: Partial<ProjectFilterOption>,
): ProjectFilterOption => ({
  isChecked: true,
  id: 'some-project-id',
  isVisible: true,
  filterSource: FilterOptionSource.EXTERNAL,
  name: 'some-project-name',
  iconUrl: 'http://localhost/icon/',
  ...projectOverrides,
});

const buildMockAssingneeFilter = (
  assigneeOverrides: Partial<AssigneeFilterOption>,
): AssigneeFilterOption => ({
  isChecked: true,
  id: 'some-assignee-id',
  isVisible: true,
  filterSource: FilterOptionSource.EXTERNAL,
  displayName: 'some-assignee-display-name',
  avatarUrl: 'http://localhost/avatar',
  ...assigneeOverrides,
});

const buildMockBinaryStatusCategoryFilter = ({
  id,
  isChecked = true,
}: {
  id: string;
  isChecked?: boolean;
}): BinaryStatusCategoryFilterOption => ({
  isChecked,
  id,
  isVisible: true,
  filterSource: FilterOptionSource.STATIC,
  title: messages.binary_status_category_filters_title,
});

describe('Advanced Search URL Generation', () => {
  it('should return jql for one project', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [buildMockProjectFilter({ id: 'pr-1' })],
      [],
      [],
    );
    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "query" AND project IN (pr-1)',
    );
  });

  it('should return jql for one assignee', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [],
      [buildMockAssingneeFilter({ id: 'as-1' })],
      [],
    );
    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "query" AND assignee IN (as-1)',
    );
  });

  it('should return jql for one binary status category', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [],
      [],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
      ],
    );
    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "query" AND statusCategory IN (%22Done%22)',
    );
  });

  it('should not return jql for both binary status categories', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [],
      [],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.OPEN.id,
        }),
      ],
    );
    expect(advancedSearchUrl).toEqual('/issues/?jql=text ~ "query"');
  });

  it('should return jql for one assignee, one project and one binary status category', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [buildMockProjectFilter({ id: 'pr-1' })],
      [buildMockAssingneeFilter({ id: 'as-1' })],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
      ],
    );
    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "query" AND project IN (pr-1) AND assignee IN (as-1) AND statusCategory IN (%22Done%22)',
    );
  });

  it('should return jql for one assignee and binary status category and multiple projects', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [
        buildMockProjectFilter({ id: 'pr-1' }),
        buildMockProjectFilter({ id: 'pr-2' }),
      ],
      [buildMockAssingneeFilter({ id: 'as-1' })],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
      ],
    );
    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "query" AND project IN (pr-1%2Cpr-2) AND assignee IN (as-1) AND statusCategory IN (%22Done%22)',
    );
  });

  it('should ignore unchecked filters', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [
        buildMockProjectFilter({ id: 'pr-1', isChecked: false }),
        buildMockProjectFilter({ id: 'pr-2', isChecked: false }),
      ],
      [buildMockAssingneeFilter({ id: 'as-1', isChecked: false })],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
          isChecked: false,
        }),
      ],
    );
    expect(advancedSearchUrl).toEqual(
      '/secure/QuickSearch.jspa?searchString=query',
    );
  });

  it('should ignore filters when the query is empty', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      '',
      [
        buildMockProjectFilter({ id: 'pr-1' }),
        buildMockProjectFilter({ id: 'pr-2' }),
      ],
      [buildMockAssingneeFilter({ id: 'as-1' })],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
      ],
    );

    expect(advancedSearchUrl).toEqual('/secure/QuickSearch.jspa?searchString=');
  });

  it('should return jql for one assignee and multiple projects and binary status categories, but `false` query', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'false',
      [
        buildMockProjectFilter({ id: 'pr-1' }),
        buildMockProjectFilter({ id: 'pr-2' }),
      ],
      [buildMockAssingneeFilter({ id: 'as-1' })],
      [
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.OPEN.id,
        }),
        buildMockBinaryStatusCategoryFilter({
          id: BinaryStatusCategory.DONE.id,
        }),
      ],
    );

    expect(advancedSearchUrl).toEqual(
      '/issues/?jql=text ~ "false" AND project IN (pr-1%2Cpr-2) AND assignee IN (as-1)',
    );
  });

  it('trims queries correctly', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      '    query',
      [],
      [],
      [],
    );

    expect(advancedSearchUrl).toEqual(
      '/secure/QuickSearch.jspa?searchString=query',
    );
  });

  it('attaches site urls correctly', () => {
    const advancedSearchUrl = buildJiraAdvancedSearchUrl(
      'query',
      [],
      [],
      [],
      'http://site-base-url',
    );

    expect(advancedSearchUrl).toEqual(
      'http://site-base-url/secure/QuickSearch.jspa?searchString=query',
    );
  });
});
