import { Node } from 'prosemirror-model';
import { Delta, Step } from './types';

const insert = (delta: Delta, value?: any): any => {
  switch (delta.type) {
    case 'retain-map': {
      Object.entries(delta.map).forEach(([key, delta]) => {
        value[key] = insert(delta);
      });
      return value;
    }
    case 'retain-seq': {
      return delta.seq.map((delta) => insert(delta));
    }

    case 'insert': {
      if (Array.isArray(delta.val)) {
        return insert(delta.retain, [...delta.val]);
      }

      if (typeof delta.val === 'object') {
        return insert(delta.retain, { ...delta.val });
      }

      return delta.val;
    }
    case 'insert-vals': {
      return delta.vals;
    }
  }
};

type DeltaHistory = {
  type: string;
  positionOffset?: number;
  indexOffset?: number;
};

const stepFromDeltaInternal = (
  delta: Delta,
  path: Node[],
  history: DeltaHistory[],
  steps: Step[],
): DeltaHistory[] => {
  const node = path[path.length - 1];
  const previous = history[history.length - 1];

  switch (delta.type) {
    case 'retain-map': {
      const positionOffset = previous ? previous.positionOffset || 0 : 0;

      // Child node will start at the next position, so plus 1 here.
      const retainPositionOffset =
        node.type.name !== 'doc' &&
        node.isBlock &&
        !node.isTextblock &&
        node.childCount > 0
          ? 1
          : 0;

      Object.entries(delta.map).forEach(([key, deltaProperty]) => {
        stepFromDeltaInternal(
          deltaProperty,
          path,
          [
            ...history,
            {
              type: key,
              positionOffset: retainPositionOffset + positionOffset,
              indexOffset: 0,
            },
          ],
          steps,
        );
      });
      break;
    }

    case 'retain-range': {
      const last = history.pop()!;
      if (last === undefined) {
        return history;
      }

      const { positionOffset = 0, indexOffset = 0 } = last;

      if (previous.type === 'text' && node.type.name === 'text') {
        last.positionOffset = positionOffset + delta.length;
      } else {
        const parentNode = path.length >= 2 ? path[path.length - 2] : null;
        const currentNode = parentNode?.maybeChild(indexOffset);
        if (currentNode) {
          last.positionOffset = (positionOffset || 0) + currentNode.nodeSize;
          last.indexOffset = (indexOffset || 0) + 1;
          const newPath = [...path];
          newPath.pop();
          newPath.push(currentNode);

          if (delta.length > 1) {
            return stepFromDeltaInternal(
              { type: 'retain-range', length: delta.length - 1 },
              newPath,
              [...history, last],
              steps,
            );
          }
        }
      }

      return [...history, last];
    }

    case 'retain-seq': {
      let newHistory = history;

      delta.seq.forEach((deltaItem) => {
        const { positionOffset, indexOffset } = newHistory[
          newHistory.length - 1
        ];

        const child =
          previous.type === 'content'
            ? node.maybeChild(indexOffset || 0)
            : undefined;
        const newPath = child ? [...path, child] : path;

        newHistory = stepFromDeltaInternal(
          deltaItem,
          newPath,
          [...newHistory, { type: previous.type, positionOffset, indexOffset }],
          steps,
        );
      });

      break;
    }
    case 'insert': {
      const val = insert(delta);
      const content = Array.isArray(val) ? val : [val];

      // if insert happens at the top level, then use positionOffset or 1, otherwise add one.
      const pos =
        node.type.name === 'doc'
          ? previous.positionOffset || 1
          : (previous.positionOffset || 0) + 1;

      steps.push({
        stepType: 'replace',
        from: pos,
        to: pos,
        slice: { content },
      });
      break;
    }

    case 'insert-vals': {
      const pos = (previous.positionOffset || 0) + 1;

      steps.push({
        stepType: 'replace',
        from: pos,
        to: pos,
        slice: {
          content: [{ type: 'text', text: delta.vals as string }],
        },
      });
      break;
    }
    case 'delete-range': {
      const pos = (previous.positionOffset || 0) + 1;
      steps.push({
        stepType: 'replace',
        from: pos,
        to: pos + delta.length,
      });
      break;
    }

    default:
      throw new RangeError(
        // @ts-ignore : Type should be inferred from switch statement, however its possible not all types are captured in the type
        `Unknown type ${delta.type}: ${JSON.stringify(delta)}`,
      );
  }
  return history;
};

type Result<T> = { err: Error; result: null } | { err: null; result: T };

export const stepFromDelta = (delta: Delta, doc: Node): Result<Step[]> => {
  const steps: Step[] = [];
  try {
    stepFromDeltaInternal(delta, [doc], [], steps);
  } catch (err) {
    return { err, result: null };
  }
  return { err: null, result: steps };
};
