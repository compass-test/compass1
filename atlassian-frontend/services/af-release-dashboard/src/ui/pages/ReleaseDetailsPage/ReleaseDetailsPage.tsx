import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from '@atlaskit/spinner';
import styled from 'styled-components';
import { ReleaseInfo } from './ReleaseInfo';
import { ReleaseSwimLane } from '../../components/ReleaseSwimLane/ReleaseSwimLane';
import { useFetchReleases } from '../../hooks';

interface MatchParams {
  release: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const SpinnerWrapper = styled.div`
  margin-top: 2rem;
  > svg:first-child {
    max-width: 70vw;
    margin: 0 auto;
    display: block;
  }
`;

const ReleasePageSwimlaneContainer = styled.div`
  margin-top: 1rem;
  > div:first-child {
    max-width: 70vw;
    margin: 0 auto;
  }
`;

const Heading = styled.h2`
  text-transform: capitalize;
  text-align: center;
  margin-top: 1em !important;
`;

export const ReleaseDetailsPage: FunctionComponent<Props> = (props) => {
  let release = useFetchReleases({
    name: props.match.params.release,
    withPullRequests: true,
  });

  if (!release) {
    return (
      <SpinnerWrapper>
        <Spinner size="large" />
      </SpinnerWrapper>
    );
  }

  return (
    <>
      <Heading>{`${release.name} Release`}</Heading>
      <ReleasePageSwimlaneContainer>
        <ReleaseSwimLane
          name={release.name}
          status={release.status}
          pullRequests={release.pullRequests}
        >
          <ReleaseInfo release={release} />
        </ReleaseSwimLane>
      </ReleasePageSwimlaneContainer>
    </>
  );
};
