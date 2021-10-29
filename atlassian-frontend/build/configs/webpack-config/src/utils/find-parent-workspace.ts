import path from 'path';
import * as bolt from 'bolt';

export async function findParentWorkspace(
  filePath: string,
  workspaces: bolt.Package[],
  rootPath?: string,
): Promise<bolt.Package | null> {
  const projectRoot = rootPath ?? (await bolt.getProject()).dir;
  const directoryPath = path.dirname(filePath);

  if (directoryPath === projectRoot) {
    return null;
  }

  return (
    workspaces.find(ws => ws.dir === directoryPath) ??
    findParentWorkspace(directoryPath, workspaces, projectRoot)
  );
}
