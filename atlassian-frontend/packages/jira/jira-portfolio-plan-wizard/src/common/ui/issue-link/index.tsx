import React from 'react';

import isUndefined from 'lodash/fp/isUndefined';

import { Link } from './styled';

const apiUrl = (url: string) => url;

type Props = {
  projectKey?: string;
  issueKey?: number;
};

export const getIssueLinkText = (projectKey?: string, issueKey?: number) =>
  [projectKey, issueKey].filter((x) => !isUndefined(x)).join('-');

const IssueLink: React.FunctionComponent<Props> = ({
  projectKey,
  issueKey,
  children,
}) => {
  const fullIssueKey = getIssueLinkText(projectKey, issueKey);
  return (
    <Link
      href={apiUrl(`/browse/${fullIssueKey}`)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || fullIssueKey}
    </Link>
  );
};

export default IssueLink;
