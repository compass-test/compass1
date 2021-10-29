// This function checks if a branch contains an array of prefixes.
// We do pass an array of prefixes in case of we have different variations of the same special case e.g. ['no-changeset', 'no_changeset'].
export function containsBranchPrefix(branch: string, prefixes: string[]) {
  return branch
    .split('/')
    .some(branchPrefix => prefixes.includes(`${branchPrefix}/`));
}
