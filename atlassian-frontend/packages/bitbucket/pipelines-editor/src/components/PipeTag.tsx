import React from 'react';

import Button from '@atlaskit/button';

type Props = {
  tag: string;
  onSearch: (search: string) => void;
};

const PipeTag: React.FC<Props> = ({ tag, onSearch }) => {
  return (
    <Button
      onClick={(evt) => {
        evt.stopPropagation();
        onSearch(tag);
      }}
      spacing="none"
    >
      <div style={{ padding: '0 2px 1px', fontSize: '11px' }}>{tag}</div>
    </Button>
  );
};

export default React.memo(PipeTag);
