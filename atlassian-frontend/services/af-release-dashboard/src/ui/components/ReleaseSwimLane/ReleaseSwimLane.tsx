import React, { Component } from 'react';
import { G300 } from '@atlaskit/theme/colors';
import BitbucketPullrequestsIcon from '@atlaskit/icon/glyph/bitbucket/pullrequests';
import {
  ColumnHeading,
  ColumnHeadingContainer,
  LaneHeader,
  ScrollableContainer,
  SwimLaneComponentContainer,
} from './ReleaseSwimLane.styles';
import { Card } from '../PullRequestCard';
import { Release } from '../../interfaces';
import { pretifyReleaseName } from '../../utils/pretify-release-name';
import { ReleaseStatusLozenge } from '../ReleaseStatusLozenge';

export class ReleaseSwimLane extends Component<
  Pick<Release, 'name' | 'pullRequests' | 'status'>
> {
  render() {
    const { name, status, children } = this.props;

    const parsedName = pretifyReleaseName(name);
    const pullRequests = this.props.pullRequests || [];
    const releasePath = `/releases/${name}`;

    return (
      <SwimLaneComponentContainer>
        <LaneHeader href={releasePath}>
          <div>{parsedName}</div>
          <BitbucketPullrequestsIcon label="" primaryColor={G300} />
          {status ? <ReleaseStatusLozenge status={status} /> : null}
        </LaneHeader>
        {children}
        <ColumnHeadingContainer>
          <ColumnHeading>{`Pull Requests: ${pullRequests.length}`}</ColumnHeading>
          <ColumnHeading>Merge Date</ColumnHeading>
        </ColumnHeadingContainer>
        <ScrollableContainer>
          {pullRequests.map((pullRequest) => (
            <Card key={pullRequest.bitbucketId} {...pullRequest} />
          ))}
        </ScrollableContainer>
      </SwimLaneComponentContainer>
    );
  }
}
