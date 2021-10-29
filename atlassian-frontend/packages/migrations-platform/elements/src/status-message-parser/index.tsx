import React, { ReactNode } from 'react';

import { ExternalLink } from '../buttons';

const isValidHttpUrl = (url: string) => {
  let verifiedUrl;

  try {
    verifiedUrl = new URL(url);
  } catch (_) {
    return false;
  }

  return verifiedUrl.protocol === 'http:' || verifiedUrl.protocol === 'https:';
};

export const formatStatusMessageNode = (
  str: string,
  analyticsId?: string,
  analyticsAttributes?: Record<string, string | number | boolean>,
): ReactNode => {
  const result = /{{[A-Za-z]+:/g.exec(str);

  if (!result) {
    return null;
  }
  // Trim the command
  const command = result[0].replace(/\W/g, '');

  // Trim the content ending `}}`
  const content = str.slice(result[0].length, str.length - 2);

  // Check if the url is empty
  if (!isValidHttpUrl(content)) {
    return str;
  }

  switch (command) {
    case 'link':
      return (
        <ExternalLink
          href={content}
          analyticsAttributes={analyticsAttributes}
          analyticsId={analyticsId}
        >
          {content}
        </ExternalLink>
      );
    // case: others
    // could support other type
  }

  return result;
};

export const formatStatusMessageNodes = (
  str: string,
  analyticsId?: string,
  analyticsAttributes?: Record<string, string | number | boolean>,
): ReactNode[] => {
  // Regex
  const regex = /([^{]|^){{[A-Za-z]+:[^:].+?[^}]}}([^}]|$)/g;
  let result: RegExpExecArray | null;

  // Pick up nodes
  const nodes: ReactNode[] = [];
  let lastMatchedIndex = 0;

  while ((result = regex.exec(str))) {
    const index = result.index;
    const text = result[0];

    // Due to the extra check rules `[^{]` and `[^}]`
    // the match will possiblely include one additional character before and after
    const isBeginWithSymbol = text[0] === '{';
    const isEndWithSymbol = text[text.length - 1] === '}';
    let matchedIndex: number = index;
    let matchedText: string = text;

    if (!isBeginWithSymbol) {
      matchedIndex++;
      matchedText = matchedText.slice(1);
    }
    if (!isEndWithSymbol) {
      matchedText = matchedText.slice(0, -1);
    }

    // Push the string before matched text
    if (lastMatchedIndex !== matchedIndex) {
      nodes.push(str.slice(lastMatchedIndex, matchedIndex));
    }

    // Push the matched text
    const node = formatStatusMessageNode(
      matchedText,
      analyticsId,
      analyticsAttributes,
    );

    nodes.push(node);

    // Update the last matched index
    lastMatchedIndex = matchedIndex + matchedText.length;
  }

  // Pick up the trailing str
  if (lastMatchedIndex !== str.length) {
    nodes.push(str.slice(lastMatchedIndex, str.length));
    lastMatchedIndex = str.length;
  }
  return nodes;
};
