import React, { useCallback, useState } from 'react';

import moment from 'moment';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button/loading-button';
import Tooltip from '@atlaskit/tooltip';
import { Commit } from '@atlassian/pipelines-models';

import { COMMIT_DIFF_LIST_SIZE } from '../../const';
import cleanMarkup from '../../utils/cleanMarkup';
import CommitLink from '../DeploymentSummary/CommitLink';
import {
  CommitDiffAuthorCell,
  CommitDiffDateCell,
  CommitDiffMessageCell,
  CommitDiffRow,
  CommitDiffWrapper,
} from '../styled';

type Props = {
  commitList: Commit[];
  onShowMoreCommits: (page: number) => Promise<void>;
};

const CommitDiff: React.FC<Props> = ({ commitList, onShowMoreCommits }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreCommits, setHasMoreCommits] = useState(
    page * COMMIT_DIFF_LIST_SIZE <= commitList.length,
  );

  const onShowMoreClick = useCallback(() => {
    const nextPage = page + 1;
    setIsLoading(true);
    onShowMoreCommits(nextPage).then(() => {
      setHasMoreCommits(page * COMMIT_DIFF_LIST_SIZE <= commitList.length);
      setIsLoading(false);
      setPage(nextPage);
    });
  }, [onShowMoreCommits, page, commitList]);

  const renderRow = useCallback((commit: Commit, key) => {
    const author = commit['author.user'];
    return (
      <CommitDiffRow key={`commit-diff-${key}`}>
        <td>
          <CommitDiffAuthorCell>
            <Tooltip content={author.display_name}>
              <Avatar
                src={author.avatarUrl}
                href={author.accountUrl}
                size="small"
                target="_blank"
              />
            </Tooltip>
          </CommitDiffAuthorCell>
        </td>
        <td>
          <CommitLink
            commitUrl={commit.url}
            commitShortHash={commit.shortHash}
            isLink
          />
        </td>
        <td>
          <CommitDiffMessageCell
            dangerouslySetInnerHTML={{
              __html: cleanMarkup(commit['summary.html']),
            }}
          />
        </td>
        <td>
          <CommitDiffDateCell
            title={moment(commit.date).format('MMMM Do YYYY, h:mm:ss a')}
          >
            {moment(commit.date).fromNow()}
          </CommitDiffDateCell>
        </td>
      </CommitDiffRow>
    );
  }, []);

  return (
    <CommitDiffWrapper>
      <tbody>{commitList.map(renderRow)}</tbody>
      {hasMoreCommits ? (
        <tfoot>
          <tr>
            <td colSpan={4}>
              <Button
                appearance="link"
                onClick={onShowMoreClick}
                isLoading={isLoading}
              >
                Show more
              </Button>
            </td>
          </tr>
        </tfoot>
      ) : null}
    </CommitDiffWrapper>
  );
};

export default React.memo(CommitDiff);
