import React from 'react';

import { useInView } from 'react-intersection-observer';

import Spinner from '@atlaskit/spinner';

import { Diff } from '../../types';
import FileDiff from '../FileDiff/FileDiff';
import {
  FileDiffPlaceholder,
  FileDiffWrapper,
  SingleFileDiffWrapper,
} from '../styled';

type Props = {
  diffs: Diff[];
};

const DiffInView: React.FC<{ diff: Diff; key: number }> = ({ diff, key }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <div ref={ref} key={`diff-key-${key}`}>
      {inView ? (
        <SingleFileDiffWrapper>
          <FileDiff
            filePath={
              diff.to === '/dev/null' || diff.to === undefined
                ? diff.from
                : diff.to
            }
            diff={diff}
          />
        </SingleFileDiffWrapper>
      ) : (
        <FileDiffPlaceholder>
          <Spinner size="large" />
        </FileDiffPlaceholder>
      )}
    </div>
  );
};

const FileChanges: React.FC<Props> = ({ diffs }) => {
  return (
    <FileDiffWrapper>
      {diffs.map((diff, key) => (
        <DiffInView diff={diff} key={key} />
      ))}
    </FileDiffWrapper>
  );
};

export default React.memo(FileChanges);
