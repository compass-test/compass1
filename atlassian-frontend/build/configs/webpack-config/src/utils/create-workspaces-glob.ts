import { Package } from 'bolt';
import path from 'path';
import { createGlob } from './create-glob';

export const createWorkspacesGlob = (
  workspaces: Package[],
  projectRoot: string,
  docs?: boolean,
): string[] =>
  workspaces
    .map(ws => path.relative(projectRoot, ws.dir))
    .flatMap(relPath => createGlob(relPath, docs));
