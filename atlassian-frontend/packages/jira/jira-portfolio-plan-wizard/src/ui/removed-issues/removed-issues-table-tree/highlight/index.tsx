// Ported from JFE src/packages/portfolio-3/portfolio/src/app-simple-plans/view/main/tabs/roadmap/scope/issues/issue/highlight/view.js
import React, { createRef, useEffect, useRef, useState } from 'react';

import isUndefined from 'lodash/fp/isUndefined';
import times from 'lodash/fp/times';

import IssueLink from '../../../../common/ui/issue-link';
import { MIN_FILTER_QUERY_LENGTH } from '../../../../common/utils/constants';
import genHash from '../../../../common/utils/gen-hash';
import splitString from '../../../../common/utils/split-string';
import usePrevious from '../../../../common/utils/use-previous';

import { Ellipsis, TextMatch } from './styled';
import { HighlightIssueLinkProps, HighlightSummaryProps } from './types';
import { equalsIgnoreCase } from './utils';
export type { SearchMatch } from './types';

export function HighlightSummary({
  numberOfIssueLinkChunks,
  summary,
  searchQuery,
  id,
  activeSearchResult,
  searchMatches,
}: HighlightSummaryProps) {
  const activeElRef = createRef<HTMLSpanElement>();
  const [ellipsisInfo, setEllipsisInfo] = useState({
    chunks: splitString(searchQuery, summary),
    offsetLeft: 0,
  });
  const hashes = useRef(times(genHash, ellipsisInfo.chunks.length));
  const [prevQuery, setPrevQuery] = useState('');
  const activeMatch = searchMatches[activeSearchResult.index] || {};
  const isIssueWithActiveElement = activeMatch.id === id;
  const prevActiveSearchResultIndex = usePrevious(activeSearchResult.index);
  const prevIsIssueWithActiveElement = usePrevious(isIssueWithActiveElement);
  const prevActiveMatchId = usePrevious(activeMatch.id);
  // the previous summary is used to track changes made to the issue summary using the inline edit field
  const prevSummary = usePrevious(summary);

  useEffect(() => {
    // resets string to initial chunks
    const isNavigationBackAtTheSameEl =
      !isUndefined(prevActiveSearchResultIndex) &&
      prevActiveSearchResultIndex > activeSearchResult.index &&
      prevActiveMatchId === activeMatch.id;
    if (
      (searchQuery && searchQuery !== prevQuery) ||
      (!isIssueWithActiveElement && !!prevIsIssueWithActiveElement) ||
      isNavigationBackAtTheSameEl ||
      prevSummary !== summary
    ) {
      setPrevQuery(searchQuery);

      setEllipsisInfo({
        chunks: splitString(searchQuery, summary),
        offsetLeft: 0,
      });
    }
  }, [
    activeElRef,
    activeMatch.id,
    activeSearchResult,
    isIssueWithActiveElement,
    prevActiveMatchId,
    prevActiveSearchResultIndex,
    prevIsIssueWithActiveElement,
    prevQuery,
    prevSummary,
    searchQuery,
    summary,
  ]);

  if (!searchQuery.trim() || !searchMatches.length) {
    return <Ellipsis>{summary}</Ellipsis>;
  }

  const highlightedParts = ellipsisInfo.chunks.map((chunk: string, i) => {
    if (equalsIgnoreCase(chunk, searchQuery)) {
      if (hashes.current[i] === activeSearchResult.hash) {
        return (
          <TextMatch
            innerRef={activeElRef as any}
            isActive={true}
            key="active"
            data-attr-highlighted={hashes.current[i]}
          >
            {chunk}
          </TextMatch>
        );
      }
      return (
        <TextMatch
          key={`${chunk}-${i}`}
          data-attr-highlighted={hashes.current[i]}
        >
          {chunk}
        </TextMatch>
      );
    }
    return chunk;
  });

  return <Ellipsis>{highlightedParts}</Ellipsis>;
}

export function HighlightIssueLink({
  issueKey,
  projectKey,
  activeSearchResult: { hash: activeHash },
  searchQuery,
  issueLinkChunks,
  issueId,
}: HighlightIssueLinkProps) {
  const hash = useRef(genHash());
  const getLinkText = () => {
    if (
      issueLinkChunks.length &&
      searchQuery.length >= MIN_FILTER_QUERY_LENGTH
    ) {
      return (
        <>
          {issueLinkChunks.map((chunk, i) => {
            if (equalsIgnoreCase(chunk, searchQuery)) {
              return hash.current === activeHash ? (
                <TextMatch
                  isActive={true}
                  key="active"
                  data-attr-highlighted={hash.current}
                >
                  {chunk}
                </TextMatch>
              ) : (
                <TextMatch
                  key={`${chunk}-${i}`}
                  data-attr-highlighted={hash.current}
                >
                  {chunk}
                </TextMatch>
              );
            }
            return chunk;
          })}
        </>
      );
    }
    return '';
  };

  return (
    <IssueLink issueKey={issueKey} projectKey={projectKey}>
      {getLinkText()}
    </IssueLink>
  );
}
