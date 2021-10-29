import core, { ASTPath, CallExpression } from 'jscodeshift';

/**
 * Duplicate of equivalent methods from within:
 * `packages/monorepo-tooling/codemod-utils/src/utils/support.ts`
 *
 * We should likely backport any useful changes from here into
 * the `codemod-utils` package so others can benefit from them.
 */

// not replacing newlines (which \s does)
const spacesAndTabs: RegExp = /[ \t]{2,}/g;
const lineStartWithSpaces: RegExp = /^[ \t]*/gm;

function clean(value: string): string {
  return value
    .replace(spacesAndTabs, ' ')
    .replace(lineStartWithSpaces, '')
    .trim();
}

const addCommentBefore = (
  j: core.JSCodeshift,
  target: ASTPath<CallExpression>,
  message: string,
  commentType: 'block' | 'line' = 'block',
) => {
  let comments = null;
  if (target.value) {
    comments = target.value.comments || [];
  } else {
    //@ts-ignore
    comments = target.comments || [];
  }
  const msg = clean(message);
  const content = commentType === 'block' ? ` ${msg} ` : ` ${msg}`;

  const exists = comments.find((comment: any) => comment.value === content);

  // avoiding duplicates of the same comment
  if (exists) {
    return;
  }

  if (commentType === 'block') {
    comments.push(j.commentBlock(content));
  } else {
    comments.push(j.commentLine(content));
  }
  if (target.value) {
    target.value.comments = comments;
  } else {
    //@ts-ignore
    target.comments = comments;
  }
};

export default addCommentBefore;
