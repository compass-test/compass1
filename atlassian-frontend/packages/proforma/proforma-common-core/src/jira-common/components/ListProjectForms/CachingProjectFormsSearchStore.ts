import { PagedResults } from '../../models/PagedResults';
import { TemplateFormIndex } from '../../models/ProjectForm';
import { SearchStore } from '../../stores/domain/Search-store';

const toPagedResults = (
  templateFormIndexes: TemplateFormIndex[],
): PagedResults<TemplateFormIndex> => {
  return {
    start: 0,
    count: templateFormIndexes.length,
    total: templateFormIndexes.length,
    cursor: {
      first: 'pg0',
      last: 'pg0',
      next: '',
      prev: '',
    },
    results: templateFormIndexes,
  } as PagedResults<TemplateFormIndex>;
};

export class CachingProjectFormsSearchStore extends SearchStore<
  TemplateFormIndex
> {
  private loadForms: (projectId: number) => Promise<TemplateFormIndex[]>;

  private projectId: number;

  private pagedResults?: PagedResults<TemplateFormIndex>;

  public constructor(
    loadForms: (projectId: number) => Promise<TemplateFormIndex[]>,
    projectId: number,
  ) {
    super();
    this.loadForms = loadForms;
    this.projectId = projectId;
  }

  doSearch(
    pageSize: number,
    cursor?: string,
  ): Promise<PagedResults<TemplateFormIndex>> {
    return this.pagedResults
      ? Promise.resolve(this.pagedResults)
      : this.getForms();
  }

  getForms(): Promise<PagedResults<TemplateFormIndex>> {
    return this.loadForms(this.projectId)
      .then(toPagedResults)
      .then(results => {
        // cache results for future use.
        this.pagedResults = results;
        return results;
      });
  }

  refresh(): void {
    this.pagedResults = undefined;
    this.startSearch();
  }
}
