import React, { useEffect, useMemo, useState } from 'react';

import { Highlight, HIGHLIGHT_FONT_WEIGHT } from './styled';

type HighlightedString = {
  value: string;
  highlighted: boolean;
};

const highlightFromSearchTerm = (
  contentLowercase: string,
  searchTermLowercase: string,
  highlightedInput: HighlightedString[],
) => {
  let indexStart = contentLowercase.indexOf(searchTermLowercase);
  while (indexStart !== -1) {
    for (let i = 0; i < searchTermLowercase.length; i++) {
      highlightedInput[indexStart + i].highlighted = true;
    }
    indexStart = contentLowercase.indexOf(
      searchTermLowercase,
      indexStart + searchTermLowercase.length,
    );
  }
};

const generateHighlightedStrings = (content: string, searchTerms: string[]) => {
  if (content.length === 0 || searchTerms.length === 0) {
    [{ value: content, highlighted: false }];
  }

  const highlightedInputCharacters = [...content].map((character) => ({
    value: character,
    highlighted: false,
  }));
  searchTerms.forEach((searchTerm) =>
    highlightFromSearchTerm(
      content.toLowerCase(),
      searchTerm,
      highlightedInputCharacters,
    ),
  );

  return highlightedInputCharacters.reduce<HighlightedString[]>(
    (highlightedWords, currentCharacter) => {
      if (
        highlightedWords.length === 0 ||
        highlightedWords[highlightedWords.length - 1].highlighted !==
          currentCharacter.highlighted
      ) {
        highlightedWords.push({
          value: currentCharacter.value,
          highlighted: currentCharacter.highlighted,
        });
        return highlightedWords;
      }
      highlightedWords[highlightedWords.length - 1].value +=
        currentCharacter.value;
      return highlightedWords;
    },
    [],
  );
};

const renderHighlightedStrings = (
  highlightedStrings: HighlightedString[],
  fontWeight: number,
) => {
  return (
    <>
      {highlightedStrings.map((highlightedElement, index) => {
        if (highlightedElement.highlighted) {
          return (
            <Highlight key={index} fontWeight={fontWeight}>
              {highlightedElement.value}
            </Highlight>
          );
        }
        return <span key={index}>{highlightedElement.value}</span>;
      })}
    </>
  );
};

export type HighlightedContentProps = {
  searchTerms: string[];
  content: string;
  fontWeight?: number;
};

const compareStringArrays = (a1: string[], a2: string[]) =>
  a1.sort().toString() === a2.sort().toString();

const HighlightedContent = (props: HighlightedContentProps) => {
  const { content, searchTerms, fontWeight = HIGHLIGHT_FONT_WEIGHT } = props;
  const [highlightedStrings, setHighlightedStrings] = useState<
    HighlightedString[]
  >(generateHighlightedStrings(content, searchTerms));

  useEffect(() => {
    setHighlightedStrings((prevHighlight) => {
      const newHighlight = generateHighlightedStrings(content, searchTerms);
      if (
        !compareStringArrays(
          prevHighlight.map(
            (highlightStr) => highlightStr.value + highlightStr.highlighted,
          ),
          newHighlight.map(
            (highlightStr) => highlightStr.value + highlightStr.highlighted,
          ),
        )
      ) {
        return newHighlight;
      }
      return prevHighlight;
    });
  }, [content, searchTerms]);

  return useMemo(
    () => renderHighlightedStrings(highlightedStrings, fontWeight),
    [highlightedStrings, fontWeight],
  );
};

export default HighlightedContent;
