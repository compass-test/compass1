import { PagedResults } from '../models/PagedResults';
import { Project } from '../models/Project';

export interface ProjectApi {
  type: string;

  search(pageSize: number, search?: string): Promise<Project[]>;

  getAllProjects(): Promise<Project[]>;

  cursorSearch(
    pageSize: number,
    cursor?: string,
  ): Promise<PagedResults<Project>>;

  isProjectEnabled(projectId: number): Promise<boolean>;

  setProjectEnabled(projectId: number, enabled: boolean): Promise<void>;

  setAllProjectsEnabled(enabled: boolean): Promise<void>;
}

export abstract class ProjectApiAbstract implements ProjectApi {
  type = 'project';

  abstract search(pageSize: number, search?: string): Promise<Project[]>;

  abstract getAllProjects(): Promise<Project[]>;

  abstract cursorSearch(
    pageSize: number,
    cursor?: string,
  ): Promise<PagedResults<Project>>;

  abstract isProjectEnabled(projectId: number): Promise<boolean>;

  abstract setProjectEnabled(
    projectId: number,
    enabled: boolean,
  ): Promise<void>;

  abstract setAllProjectsEnabled(enabled: boolean): Promise<void>;
}
