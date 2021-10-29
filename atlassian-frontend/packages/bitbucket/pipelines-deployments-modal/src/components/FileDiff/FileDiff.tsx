import React, { useMemo } from 'react';

import { Diff } from '../../types';
import { pickSegments } from '../../utils/diffparser';
import { FileContent, FileHeader, FilePath } from '../styled';

import DiffContent from './DiffContent';

type Props = {
  diff: Diff;
  filePath: string;
};

const FileDiff: React.FC<Props> = ({ filePath, diff }) => {
  // Split the segments and let the consumer pick which to show
  const segments = useMemo(() => pickSegments(filePath.split(/(\/)/g)), [
    filePath,
  ]);

  // Wrap each part of the split in a PaddedSegment
  const wrappedSegments = useMemo(
    () =>
      segments.map((segment, key) => (
        <span key={`padded-segment-${key}`} style={{ marginLeft: '0.5em' }}>
          {segment}
        </span>
      )),
    [segments],
  );

  return (
    <>
      <FileHeader>
        <FilePath>{wrappedSegments}</FilePath>
      </FileHeader>
      <FileContent>
        <DiffContent diff={diff} filePath={filePath} />
      </FileContent>
    </>
  );
};

export default React.memo(FileDiff);
