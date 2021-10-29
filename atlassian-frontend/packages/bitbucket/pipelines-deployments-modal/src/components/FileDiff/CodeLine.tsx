import React from 'react';

import { Line } from '../../types';
import { Code, LineNumber, LineNumbers, LineWrapper } from '../styled';

type Props = {
  line: Line;
  filePath?: string;
  gutterWidth: number;
  index: number;
};

const CodeLine: React.FC<Props> = ({ line, filePath, gutterWidth, index }) => {
  const { content, type, conflictType, oldLine, newLine, wordDiff } = line;
  return (
    <LineWrapper
      gutterWidth={gutterWidth}
      conflictType={conflictType}
      type={type}
      key={`chunk-line-${index}`}
    >
      <LineNumbers gutterWidth={gutterWidth}>
        <>
          <LineNumber>{oldLine}</LineNumber>
          <LineNumber>{newLine}</LineNumber>
        </>
      </LineNumbers>
      {wordDiff ? (
        <Code
          type={type}
          dangerouslySetInnerHTML={{ __html: wordDiff.slice(1) }}
        />
      ) : (
        <Code type={type}>{content.slice(1)}</Code>
      )}
    </LineWrapper>
  );
};

export default React.memo(CodeLine);
