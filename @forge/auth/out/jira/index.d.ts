import { FetchHelper } from '../types';
declare type RequestJira = FetchHelper['requestJira'];
export declare type Id = number | string;
export interface ProjectPermission {
    permissions: string[];
    issues?: Id[];
    projects?: Id[];
}
export interface ProjectPermissionResponse {
    permission: string;
    issues?: number[];
    projects?: number[];
}
export declare const authorizeJiraWithFetch: (requestJira: RequestJira, accountId: string) => {
    readonly onJira: (projectPermissionsInput: ProjectPermission[]) => Promise<ProjectPermissionResponse[]>;
    readonly onJiraProject: (projects: Id | Id[]) => Record<string, import("../types").PermissionCheck>;
    readonly onJiraIssue: (issues: Id | Id[]) => Record<string, import("../types").PermissionCheck>;
};
export {};
//# sourceMappingURL=index.d.ts.map