import React from 'react';
import moment from 'moment-timezone';
import Tooltip from '@atlaskit/tooltip';

type Props = {
  timestamp: string;
  commit: string;
  buildUrl?: string;
};

const RelativeTimestamp = ({
  buildUrl,
  relativeTime,
}: {
  buildUrl?: string;
  relativeTime: string;
}) => {
  if (buildUrl) {
    return <a href={buildUrl}>{relativeTime}</a>;
  }
  return <>{relativeTime}</>;
};

export const Commit: React.FunctionComponent<Props> = ({
  timestamp,
  commit,
  buildUrl,
}) => {
  const url = `https://bitbucket.org/atlassian/atlassian-frontend/commits/${commit}`;
  const momentTimestamp = moment(timestamp);
  const relativeTime = `(${momentTimestamp.fromNow()})`;
  return (
    <Tooltip
      content={`Committed at ${momentTimestamp.format('h:mma, Do MMMM')}`}
      position="bottom"
      tag="span"
    >
      <p>
        <a href={url} target="_blank">
          <code>{commit.substr(0, 7)}</code>
        </a>{' '}
        <RelativeTimestamp buildUrl={buildUrl} relativeTime={relativeTime} />
      </p>
    </Tooltip>
  );
};
