import React from 'react';

import { Linked, Unlinked } from '../styled';

type Props = {
  commitUrl: string;
  commitShortHash: string;
  isLink?: boolean;
};

const CommitLink: React.FC<Props> = ({
  commitUrl,
  commitShortHash,
  isLink,
}) => {
  return isLink ? (
    <Linked href={commitUrl} target="_top">
      {commitShortHash}
    </Linked>
  ) : (
    <Unlinked>{commitShortHash}</Unlinked>
  );
};

export default React.memo(CommitLink);
