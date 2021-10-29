export interface Project {
  id: number;
  name: string;
  projectTypeKey: string;
  projectTypeName: string;
  smallAvatarUrl?: string;
}

export interface ProjectWithEnabledState extends Project {
  enabled: boolean;
}
