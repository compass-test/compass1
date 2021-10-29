import React from 'react';
import { ReleaseSwimLane } from '../../components/ReleaseSwimLane';
import Spinner from '@atlaskit/spinner';
import styled from 'styled-components';
import { ReleaseRequestPayload } from '../../interfaces/release-request-payload';

const ReleaseWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;

  // Sizes below 950px will left align and show a horizontal scrollbar
  // to avoid shrinking each release column too small (when showing 3 releases)
  @media (max-width: 949px) {
    justify-content: flex-start;
  }

  > div {
    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export type ReleasesProps = {
  releases?: ReleaseRequestPayload[];
};

const ReleaseData = (props: ReleasesProps) => {
  const { releases } = props;
  if (!releases) {
    return <Spinner size={'large'} />;
  } else if (releases.length === 0) {
    return <p>No release data</p>;
  } else {
    return (
      <>
        {releases.map((release) => (
          <ReleaseSwimLane
            status={release.status}
            key={release.name}
            name={release.name}
            pullRequests={release.pullRequests}
          />
        ))}
      </>
    );
  }
};

export const Releases = (props: ReleasesProps) => {
  return (
    <ReleaseWrapper>
      <ReleaseData releases={props.releases} />
    </ReleaseWrapper>
  );
};
