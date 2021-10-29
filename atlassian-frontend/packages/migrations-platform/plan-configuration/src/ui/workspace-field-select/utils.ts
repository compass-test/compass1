import type { BBWorkspace } from './types';

export const workspaceToOption = (workspace: BBWorkspace) => {
  return { data: workspace, label: workspace.name, value: workspace.uuid };
};
