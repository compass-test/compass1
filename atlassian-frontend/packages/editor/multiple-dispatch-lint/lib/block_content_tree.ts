import { BlockContentTree } from '../types';

export function emptyBlockContentTree(): BlockContentTree {
  return {
    blocks: [],
    actions: [],
    hasReturn: false,
    elseBlock: null,
  };
}

/**
 * This function will group all blocks by hasReturn.
 * For example, given this block content:
 *
 * {
 *    hasReturn: true,
 *    actions: [DispatchCall],
 *    blocks: [
 *      {
 *        actions: [DispatchBorrowed],
 *        hasReturn: false,
 *      },
 *    ],
 * }
 *
 * It will convert to:
 *
 * {
 *    hasReturn: true,
 *    actions: [DispatchCall, DispatchBorrowed],
 *    blocks: [],
 * }
 *
 */
export function flattenBlockContent(
  parentBlockContent: BlockContentTree,
): BlockContentTree {
  const nextBlock = emptyBlockContentTree();

  nextBlock.hasReturn = parentBlockContent.hasReturn;
  nextBlock.actions.push(...parentBlockContent.actions);

  if (parentBlockContent.blocks.length > 0) {
    let i = 0;
    let childBlock: BlockContentTree | null = flattenBlockContent(
      parentBlockContent.blocks[i],
    );
    while (childBlock) {
      const tmpSibling = parentBlockContent.blocks[++i];

      if (!childBlock.hasReturn && !tmpSibling) {
        nextBlock.blocks.push(...childBlock.blocks);
        nextBlock.actions = [...childBlock.actions, ...nextBlock.actions];
        childBlock = null;
      } else if (childBlock.hasReturn) {
        nextBlock.blocks.push(childBlock);

        childBlock = tmpSibling ? flattenBlockContent(tmpSibling) : null;
      } else if (tmpSibling) {
        const siblingFlattened = flattenBlockContent(tmpSibling);
        siblingFlattened.blocks = [childBlock, ...siblingFlattened.blocks];
        childBlock = flattenBlockContent(siblingFlattened);
      } else {
        childBlock = null;
      }
    }
  }

  if (parentBlockContent.elseBlock) {
    const childBlock = flattenBlockContent(parentBlockContent.elseBlock);

    if (childBlock.hasReturn) {
      nextBlock.blocks.push(childBlock);
    } else {
      if (nextBlock.actions.length === 0) {
        nextBlock.actions = [...childBlock.actions, ...nextBlock.actions];
      }

      if (nextBlock.blocks.length === 0) {
        nextBlock.blocks.push(...childBlock.blocks);
      }
    }
  }

  return nextBlock;
}
