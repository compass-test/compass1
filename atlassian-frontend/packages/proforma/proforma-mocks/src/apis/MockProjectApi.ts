import { ProjectApiAbstract } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  PagedResults,
  Project,
} from '@atlassian/proforma-common-core/jira-common-models';

import { MockData } from './data/MockData';
import { MockSearchHelper } from './MockSearchHelper';

export class MockProjectApi extends ProjectApiAbstract {
  private mockSearch: MockSearchHelper<Project>;

  constructor(private mockData: MockData) {
    super();
    this.mockSearch = new MockSearchHelper();
  }

  search(pageSize: number, search?: string): Promise<Project[]> {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        const projects = this.mockData.searchProjects(search);
        resolve(projects.slice(0, pageSize));
      });
    });
  }

  getAllProjects(): Promise<Project[]> {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        const projects = this.mockData.projects;
        resolve(projects);
      });
    });
  }

  cursorSearch(
    pageSize: number,
    cursor?: string,
  ): Promise<PagedResults<Project>> {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        resolve(
          this.mockSearch.search(
            () => this.mockData.projects,
            pageSize,
            cursor,
          ),
        );
      }, 1000);
    });
  }

  isProjectEnabled(key: any): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(this.mockData.getProject(key).enabled);
      }, 1000);
    });
  }

  setProjectEnabled(key: any, enabled: boolean): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.mockData.getProject(key).enabled = enabled;
        resolve();
      }, 1000);
    });
  }

  setAllProjectsEnabled(enabled: boolean): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.mockData.projects.forEach(p => (p.enabled = enabled));
        resolve();
      }, 1000);
    });
  }
}
