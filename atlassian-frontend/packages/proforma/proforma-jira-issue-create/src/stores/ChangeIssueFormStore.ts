import { action, computed, observable } from 'mobx';

import { FormReference } from '@atlassian/proforma-common-core/jira-common-models';
import { debounce } from '@atlassian/proforma-common-core/jira-common-utils';

import {
  AvailableFormsResponse,
  FormDetails,
  ProjectReference,
} from '../apis/IssueCreateFormApiV3';
import { IssueCreateModuleContext } from '../components';

interface CachedFormDetails {
  totalForms: number;
  startIndex: number;
  size: number;
  cursor: {
    firstBatch?: string;
    lastBatch?: string;
    nextBatch?: string;
    prevBatch?: string;
  };
}

const CACHE_PAGE_SIZE = 10;
const CACHE_SIZE = 50;

export class ChangeIssueFormStore {
  @observable public loadingProjects = true;
  @observable public readonly projects: ProjectReference[] = [];
  @observable public currentProject?: ProjectReference;
  @observable public loadingForms = false;
  @observable public currentSearchString?: string;
  @observable public pageNumber = 1;
  @observable public readonly pageNumbers: number[] = [];

  private readonly moduleContext: IssueCreateModuleContext;
  private readonly setFormDetails: (formDetails: FormDetails) => Promise<void>;
  @observable private cachedFormDetails?: CachedFormDetails;
  @observable private readonly formsCache: FormDetails[] = [];

  public constructor(
    moduleContext: IssueCreateModuleContext,
    setFormDetails: (formDetails: FormDetails) => Promise<void>,
    projectId?: number,
  ) {
    this.moduleContext = moduleContext;
    this.setFormDetails = setFormDetails;

    this.loadProjects().then(_ => {
      if (projectId) {
        return this.setCurrentProject(projectId);
      }
    });
  }

  @action public loadProjects = (): Promise<void> => {
    this.loadingProjects = true;
    return this.moduleContext.apis.issueCreateFormApiV3
      .getAvailableProjects()
      .then(projects => {
        this.projects.splice(0, this.projects.length, ...projects);
      })
      .finally(() => {
        this.loadingProjects = false;
      });
  };

  @action public setCurrentProject = (projectId: number): Promise<void> => {
    this.currentProject = this.projects.find(
      project => project.id === projectId,
    );
    return this.loadForms();
  };

  @computed
  public get formsDisplayList(): FormReference[] {
    if (!this.cachedFormDetails) {
      return [];
    }

    const pageStartIndex = (this.pageNumber - 1) * CACHE_PAGE_SIZE;
    const pageEndIndex = Math.min(
      pageStartIndex + CACHE_PAGE_SIZE - 1,
      this.cachedFormDetails.totalForms - 1,
    );

    const cacheStartIndex =
      pageStartIndex - CACHE_SIZE * Math.floor(pageStartIndex / CACHE_SIZE);
    const cacheEndIndex =
      pageEndIndex - CACHE_SIZE * Math.floor(pageEndIndex / CACHE_SIZE);

    return this.formsCache
      .slice(cacheStartIndex, cacheEndIndex + 1)
      .map(formDetails => {
        return {
          projectFormId: formDetails.projectFormId,
          formName: formDetails.name,
          issueType:
            formDetails.requestType?.name || formDetails.issueType.name,
          issueTypeId: formDetails.issueType.id,
          requestTypeId: formDetails.requestType?.id,
          avatarUrl: formDetails.requestType
            ? formDetails.requestType.icon
            : formDetails.issueType.icon,
        };
      });
  }

  @computed
  public get maxPaginationDisplayPages(): number {
    // If the current batch is the first or the last then we can only access the next/prev. So we can only access 2 batches.
    const accessibleBatches = 2;
    return (CACHE_SIZE / CACHE_PAGE_SIZE) * accessibleBatches;
  }

  @action public loadForms = (): Promise<void> => {
    if (!this.currentProject) {
      this.moduleContext.utils.errorUtils.reportError(
        new Error(
          'Cannot load the forms, as the current project is not defined.',
        ),
      );
      return Promise.reject();
    }

    if (this.currentSearchString) {
      return this.runFormsSearch(this.currentSearchString);
    }

    this.loadingForms = true;
    return this.moduleContext.apis.issueCreateFormApiV3
      .getAvailableFormsForProject(this.currentProject.id)
      .then(this.updateForms.bind(this))
      .finally(() => {
        this.loadingForms = false;
      });
  };

  @action private runFormsSearch = (text: string): Promise<void> => {
    if (!this.currentProject) {
      return Promise.reject();
    }

    this.loadingForms = true;
    this.currentSearchString = text;
    return this.moduleContext.apis.issueCreateFormApiV3
      .searchAvailableForms(this.currentProject.id, text)
      .then(this.updateForms.bind(this))
      .then(_ => {
        this.pageNumber = 1;
      })
      .finally(() => {
        this.loadingForms = false;
      });
  };

  public readonly searchForms: (text: string) => void = debounce(
    this.runFormsSearch,
    500,
  );

  @action public setForm = (
    templateFormId: number,
    issueTypeId: string,
    requestTypeId?: string,
  ): Promise<void> => {
    if (!this.currentProject) {
      return Promise.reject();
    }
    const formDetails = this.formsCache.find(form => {
      if (requestTypeId) {
        return (
          form.projectFormId === templateFormId &&
          form.requestType?.id === requestTypeId
        );
      }
      return (
        form.projectFormId === templateFormId &&
        !form.requestType &&
        form.issueType.id === issueTypeId
      );
    });
    if (!formDetails) {
      return Promise.reject();
    }
    formDetails.projectName = this.currentProject.name;
    return this.setFormDetails(formDetails);
  };

  @action private updateForms = (
    formsResponse: AvailableFormsResponse,
  ): void => {
    this.cachedFormDetails = {
      totalForms: formsResponse.total,
      startIndex: formsResponse.start,
      size: formsResponse.count,
      cursor: {
        firstBatch: formsResponse.cursor.first,
        lastBatch: formsResponse.cursor.last,
        nextBatch: formsResponse.cursor.next,
        prevBatch: formsResponse.cursor.prev,
      },
    };

    const numberOfPages = Math.ceil(formsResponse.total / CACHE_PAGE_SIZE);
    this.pageNumbers.splice(
      0,
      this.pageNumbers.length,
      ...Array.from({ length: numberOfPages }, (_, i) => i + 1),
    );

    this.formsCache.splice(0, this.formsCache.length, ...formsResponse.forms);
  };

  @action public setPageNumber = (pageNumber: number): Promise<void> => {
    if (!this.cachedFormDetails) {
      this.moduleContext.utils.errorUtils.reportError(
        new Error(
          'Cannot set the page number, as the cached form details are not defined.',
        ),
      );
      return Promise.reject();
    }
    const lastPage = Math.ceil(
      this.cachedFormDetails.totalForms / CACHE_PAGE_SIZE,
    );
    if (pageNumber < 1 || lastPage < pageNumber) {
      this.moduleContext.utils.errorUtils.reportError(
        new Error(
          `Cannot set the page number, as the page number is not valid. [${pageNumber}]`,
        ),
      );
      return Promise.reject();
    }

    const pagesInCurrentCache = Math.ceil(
      this.cachedFormDetails.size / CACHE_PAGE_SIZE,
    );
    const cacheFirstPage =
      Math.ceil((this.cachedFormDetails.startIndex - 1) / CACHE_PAGE_SIZE) + 1;
    const cacheLastPage = cacheFirstPage + (pagesInCurrentCache - 1);
    let requiredCursor: string | undefined;
    if (cacheFirstPage <= pageNumber && pageNumber <= cacheLastPage) {
      // The page number is in the current cache.
      this.pageNumber = pageNumber;
      return Promise.resolve();
    } else if (pageNumber < cacheFirstPage) {
      const firstBatchSize = Math.min(
        CACHE_SIZE,
        this.cachedFormDetails.totalForms,
      );
      const firstBatchLastPage = Math.ceil(firstBatchSize / CACHE_PAGE_SIZE);
      if (pageNumber <= firstBatchLastPage) {
        requiredCursor = this.cachedFormDetails.cursor.firstBatch || undefined;
      } else {
        requiredCursor = this.cachedFormDetails.cursor.prevBatch || undefined;
      }
    } else {
      // cacheLastPage < pageNumber
      const numberOfBatches = Math.ceil(
        this.cachedFormDetails.totalForms / CACHE_SIZE,
      );
      const lastBatchFirstPage =
        ((numberOfBatches - 1) * CACHE_SIZE) / CACHE_PAGE_SIZE + 1;
      if (lastBatchFirstPage <= pageNumber) {
        requiredCursor = this.cachedFormDetails.cursor.lastBatch || undefined;
      } else {
        requiredCursor = this.cachedFormDetails.cursor.nextBatch || undefined;
      }
    }
    if (!requiredCursor) {
      this.moduleContext.utils.errorUtils.reportError(
        new Error(
          'Cannot set the page number, as the required cursor is not defined.',
        ),
      );
      return Promise.reject();
    }
    this.loadingForms = true;
    return this.moduleContext.apis.issueCreateFormApiV3
      .getAvailableFormsFromCursor(requiredCursor)
      .then(this.updateForms.bind(this))
      .then(_ => {
        this.pageNumber = pageNumber;
      })
      .finally(() => {
        this.loadingForms = false;
      });
  };
}
