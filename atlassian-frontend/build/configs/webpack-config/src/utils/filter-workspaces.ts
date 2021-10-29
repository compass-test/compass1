import path from 'path';
import * as bolt from 'bolt';
import minimatch from 'minimatch';
import { fileAt } from './file-at';
import { findParentWorkspace } from './find-parent-workspace';
import { createWorkspacesGlob } from './create-workspaces-glob';
import { createDefaultGlob } from './create-default-glob';
import { rewriteMissingExamples } from './rewrite-missing-examples';

export interface FilterWorkspacesOptions {
  input: string[];
  docs: boolean;
  cwd: string;
}

export async function filterWorkspaces(opts: FilterWorkspacesOptions) {
  const [maybeFile] = opts.input;

  const projectRoot = (await bolt.getProject({ cwd: opts.cwd })).dir;
  const allWorkspaces = await bolt.getWorkspaces();

  const maybeFilePath = maybeFile
    ? path.resolve(projectRoot, maybeFile)
    : undefined;

  if (maybeFilePath && (await fileAt(maybeFilePath))) {
    const parentWorkspace = await findParentWorkspace(
      maybeFilePath,
      allWorkspaces,
    );

    if (!parentWorkspace) {
      throw new Error(`Could not find workspace for path ${maybeFilePath}`);
    }

    const manifestPath = path.relative(
      projectRoot,
      path.join(parentWorkspace.dir, 'package.json'),
    );

    return {
      globs: [maybeFile, manifestPath],
      isFile: true,
      filePath: maybeFile,
      allWorkspaces,
      filteredWorkspaces: [parentWorkspace],
      projectRoot,
    };
  }

  const filteredWorkspaces = opts.input.length
    ? allWorkspaces.filter(ws =>
        opts.input.some(
          glob =>
            minimatch(ws.name, glob, { matchBase: true }) ||
            minimatch(ws.dir, glob, { matchBase: true }),
        ),
      )
    : allWorkspaces; // if no globs were passed, we'll use all workspaces.

  const globs =
    opts.input.length > 0
      ? createWorkspacesGlob(filteredWorkspaces, projectRoot, opts.docs)
      : createDefaultGlob();

  return {
    globs: rewriteMissingExamples(globs),
    allWorkspaces,
    filteredWorkspaces,
    isFile: false,
    projectRoot,
  };
}
