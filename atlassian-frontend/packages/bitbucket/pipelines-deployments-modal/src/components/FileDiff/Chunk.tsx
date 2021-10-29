import React, { useCallback } from 'react';

import { ChunkEntry, Line } from '../../types';
import { groupChanges } from '../../utils/diffparser';
import { DiffWrapper, LoadedLinesWrapper, SingleDiff } from '../styled';

import ChunkControls from './ChunkControls';
import CodeLine from './CodeLine';

type Props = {
  filePath?: string;
  gutterWidth: number;
  chunk: ChunkEntry;
};

const Chunk: React.FC<Props> = ({ filePath, gutterWidth, chunk }) => {
  const renderCodeLine = useCallback(
    (line: Line, index: number) => {
      return (
        <CodeLine
          key={`line-${index}`}
          filePath={filePath}
          index={index}
          line={line}
          gutterWidth={gutterWidth}
        />
      );
    },
    [filePath, gutterWidth],
  );

  const renderLoadedLines = useCallback(
    (lines: Line[]) => {
      if (lines.length) {
        return (
          <LoadedLinesWrapper>{lines.map(renderCodeLine)}</LoadedLinesWrapper>
        );
      }
      return null;
    },
    [renderCodeLine],
  );

  const renderLines = useCallback(() => {
    const { loadedBefore, loadedAfter, rest } = groupChanges(chunk.changes);
    if (chunk.changes.length) {
      return (
        <>
          {renderLoadedLines(loadedBefore)}
          {rest.map(renderCodeLine)}
          {renderLoadedLines(loadedAfter)}
        </>
      );
    }

    return null;
  }, [renderLoadedLines, renderCodeLine, chunk]);

  return (
    <DiffWrapper>
      <SingleDiff>
        <ChunkControls heading={chunk.content} gutterWidth={gutterWidth}>
          {renderLines()}
        </ChunkControls>
      </SingleDiff>
    </DiffWrapper>
  );
};

export default React.memo(Chunk);
