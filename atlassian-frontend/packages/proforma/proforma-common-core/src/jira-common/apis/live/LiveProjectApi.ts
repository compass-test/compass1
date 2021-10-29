import { PagedResults } from '../../models/PagedResults';
import { Project } from '../../models/Project';
import { urlParam } from '../../utils/live/urlHelpers';
import { ProjectApiAbstract } from '../ProjectApi';

import { ApiUtil } from './ApiUtil';

export class LiveProjectApi extends ProjectApiAbstract {
  private util: ApiUtil;

  public constructor(util: ApiUtil) {
    super();
    this.util = util;
  }

  public search(pageSize: number, search?: string): Promise<Project[]> {
    return this.util.get(
      `/api/1/projects?maxResults=${pageSize}${urlParam('search', search)}`,
    );
  }

  public getAllProjects(): Promise<Project[]> {
    return this.util.get('/api/1/projects');
  }

  public cursorSearch(
    pageSize: number,
    cursor?: string,
  ): Promise<PagedResults<Project>> {
    return this.util.get(
      `/api/1/admin/projects?pageSize=${pageSize}${urlParam('cursor', cursor)}`,
    );
  }

  public isProjectEnabled(projectId: number): Promise<boolean> {
    return this.util
      .get(`/api/1/admin/projects/${projectId}`)
      .then(project => project.enabled);
  }

  public setProjectEnabled(projectId: number, enabled: boolean): Promise<void> {
    return this.util.put(
      `/api/1/admin/projects/${projectId}`,
      {
        enabled: enabled,
      },
      'none',
    );
  }

  public setAllProjectsEnabled(enabled: boolean): Promise<void> {
    return this.util.put(
      `/api/1/admin/projects/*`,
      {
        enabled: enabled,
      },
      'none',
    );
  }
}
