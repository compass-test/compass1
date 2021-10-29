import React, { useCallback } from 'react';

import {
  Chunk,
  ChunkHeading,
  ChunkHeadingWrapper,
  CodeScrollContainer,
} from '../styled';

type Props = {
  heading: string;
  gutterWidth: number;
  children: React.ReactNode | null;
};

const ChunkControls: React.FC<Props> = ({ heading, gutterWidth, children }) => {
  const renderHeader = useCallback(() => {
    return (
      <ChunkHeadingWrapper gutterWidth={gutterWidth}>
        <ChunkHeading>{heading}</ChunkHeading>
      </ChunkHeadingWrapper>
    );
  }, [gutterWidth, heading]);

  return (
    <Chunk>
      {children ? (
        <CodeScrollContainer>
          {renderHeader()}
          {children}
        </CodeScrollContainer>
      ) : (
        renderHeader()
      )}
    </Chunk>
  );
};

export default React.memo(ChunkControls);
