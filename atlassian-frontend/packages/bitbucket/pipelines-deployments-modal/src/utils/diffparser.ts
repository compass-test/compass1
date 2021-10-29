import { gridSize } from '@atlaskit/theme/constants';

import { Diff, GroupChangeAccumulator, Line } from '../types';

export function pickSegments(segments: string[]): string[] {
  const maxFullPathLength = 13;

  if (segments.length > maxFullPathLength) {
    const first = segments.slice(0, 6);
    const last = segments.slice(segments.length - 6);

    return [...first, '...', ...last];
  }

  return segments;
}

/**
 * Strings taken from Bitbucket core:
 * https://staging.bb-inf.net/bitbucket/bitbucket/src/staging/apps/repo2/diffparser.py#diffparser.py-9:11
 */
const CONFLICT_START_MARKER = '+<<<<<<<';
const CONFLICT_DIVIDER = '+=======';
const CONFLICT_END_MARKER = '+>>>>>>>';

/**
 * Utility class for checking a sequence of lines of code for conflict markers.
 */
export class ConflictsChecker {
  inConflict: boolean = false;

  check(line: Line) {
    const prefix = line.content.substr(0, 8);
    const checkedLine = { ...line };

    // Normal code
    if (!this.inConflict && prefix === CONFLICT_START_MARKER) {
      this.inConflict = true;
      checkedLine.conflictType = 'marker';
    } else if (this.inConflict) {
      // Conflicted code
      switch (prefix) {
        case CONFLICT_DIVIDER:
          checkedLine.conflictType = 'marker';
          break;

        case CONFLICT_END_MARKER:
          checkedLine.conflictType = 'marker';
          this.inConflict = false;
          break;

        default:
          checkedLine.conflictType = 'content';
          break;
      }
    }

    return checkedLine;
  }
}

export const getConflictsChecker = () => {
  const checker = new ConflictsChecker();
  return checker.check.bind(checker);
};

export type GutterWidthOptions = {
  maxLineNumber: number;
};

export function getMaxLineNumber(diff: Diff): number {
  let maxLineNumber = 0;
  const chunkLength = diff.chunks.length;
  if (!chunkLength) {
    return maxLineNumber;
  }

  const { newStart, newLines, oldStart, oldLines } = diff.chunks[
    chunkLength - 1
  ];

  if (newStart) {
    maxLineNumber = Math.max(maxLineNumber, newStart + newLines);
  }

  if (oldStart) {
    maxLineNumber = Math.max(maxLineNumber, oldStart + oldLines);
  }

  return maxLineNumber;
}

function getOrder(lineNumber: number): number {
  return lineNumber.toString().length;
}

export function computeGutterWidth({
  maxLineNumber,
}: GutterWidthOptions): number {
  const order = getOrder(maxLineNumber);

  let gutterWidth = order * gridSize();
  gutterWidth = gutterWidth * 2 + gridSize();

  // Add offset
  return gutterWidth + 2 * gridSize();
}

function changeReducer(
  acc: GroupChangeAccumulator,
  change: Line,
): GroupChangeAccumulator {
  if (change.type === 'loaded' && acc.rest.length === 0) {
    acc.loadedBefore.push(change);
  } else if (change.type === 'loaded') {
    acc.loadedAfter.push(change);
  } else {
    acc.rest.push(change);
  }

  return acc;
}

export function groupChanges(changes: Line[]): GroupChangeAccumulator {
  return changes.reduce(changeReducer, {
    loadedBefore: [],
    loadedAfter: [],
    rest: [],
  });
}

export default function getGutterWidth(diff: Diff): number {
  const maxLineNumber = getMaxLineNumber(diff);
  const gutterWidth = computeGutterWidth({ maxLineNumber });

  return gutterWidth;
}
