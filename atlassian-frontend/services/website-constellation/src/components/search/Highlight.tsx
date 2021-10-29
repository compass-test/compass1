/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connectHighlight } from 'react-instantsearch-dom';

export default connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  return (
    <span
      css={{
        whiteSpace: 'normal',
      }}
    >
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark
            css={{
              fontWeight: 'bold',
              backgroundColor: 'inherit',
              color: 'inherit',
            }}
            key={index}
          >
            {part.value}
          </mark>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </span>
  );
});
