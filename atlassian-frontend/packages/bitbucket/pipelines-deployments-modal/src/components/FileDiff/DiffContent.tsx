import React, { useCallback, useEffect, useState } from 'react';

import { ChunkEntry, Diff } from '../../types';
import getGutterWidth, { getConflictsChecker } from '../../utils/diffparser';
import { ChunksWrapper, SingleDiff } from '../styled';

import Chunk from './Chunk';

type Props = {
  diff: Diff;
  filePath: string;
};

const DiffContent: React.FC<Props> = ({ filePath, diff }) => {
  const [gutterWidth, setGutterWidth] = useState(getGutterWidth(diff));

  useEffect(() => {
    setGutterWidth(getGutterWidth(diff));
  }, [diff]);

  const renderChunks = useCallback(() => {
    const { chunks } = diff;

    /* CHECK AND FLAG CONFLICTS. REMOVE WHEN MERGE CONFLICTS API IS FUNCTIONAL */
    const conflictsChecker = getConflictsChecker();
    const checkedChunks = chunks.map(chunk => ({
      ...chunk,
      changes: chunk.changes && chunk.changes.map(conflictsChecker),
    }));

    return checkedChunks.map((chunk: ChunkEntry, chunkIndex: number) => {
      return (
        <Chunk
          key={chunk.content}
          chunk={chunk}
          filePath={filePath}
          gutterWidth={gutterWidth}
        />
      );
    });
  }, [diff, filePath, gutterWidth]);

  return (
    <SingleDiff>
      <ChunksWrapper>{renderChunks()}</ChunksWrapper>
    </SingleDiff>
  );
};

export default React.memo(DiffContent);
