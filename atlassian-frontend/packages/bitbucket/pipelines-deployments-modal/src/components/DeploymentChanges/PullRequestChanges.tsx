import React from 'react';

import moment from 'moment';

import Avatar from '@atlaskit/avatar';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import Lozenge from '@atlaskit/lozenge';
import Tooltip from '@atlaskit/tooltip';
import { PullRequest } from '@atlassian/pipelines-models';

import {
  PullRequestAuthor,
  PullRequestDescription,
  PullRequestRow,
  PullRequestState,
  PullRequestTargets,
  PullRequestTitle,
  PullRequestWrapper,
} from '../styled';

type Props = {
  pullRequests: PullRequest[];
};

const PullRequestChanges: React.FC<Props> = ({ pullRequests }) => {
  return (
    <PullRequestWrapper>
      {pullRequests.map((pullRequest, key) => (
        <PullRequestRow key={`pull-request-changes-${key}`}>
          <PullRequestAuthor>
            <Tooltip content={pullRequest.author.display_name}>
              <Avatar
                src={pullRequest.author.avatarUrl}
                href={pullRequest.author.accountUrl}
                size="medium"
                target="_blank"
              />
            </Tooltip>
          </PullRequestAuthor>
          <PullRequestDescription>
            <PullRequestTitle>
              <a target="_top" href={pullRequest.url}>
                {pullRequest.title}
              </a>
              {pullRequest.sourceBranch && pullRequest.destinationBranch ? (
                <PullRequestTargets>
                  <Lozenge appearance="default">
                    {pullRequest.sourceBranch}
                  </Lozenge>
                  <ArrowRightIcon size="small" label="Destination branch" />
                  <Lozenge appearance="default">
                    {pullRequest.destinationBranch}
                  </Lozenge>
                </PullRequestTargets>
              ) : null}
            </PullRequestTitle>
            <div>
              <small>
                {pullRequest.author.displayName} - #{pullRequest.id}, created{' '}
                {moment(pullRequest.created_on).fromNow()}, updated{' '}
                {moment(pullRequest.updated_on).fromNow()}
              </small>
            </div>
          </PullRequestDescription>
          <PullRequestState>
            <Lozenge appearance={pullRequest.stateApperance} isBold>
              {pullRequest.state}
            </Lozenge>
          </PullRequestState>
        </PullRequestRow>
      ))}
    </PullRequestWrapper>
  );
};

export default React.memo(PullRequestChanges);
