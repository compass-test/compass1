import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Date as DateComponent } from '@atlaskit/date';
import Lozenge from '@atlaskit/lozenge';
import distanceInWordsStrict from 'date-fns/formatDistance';
import { Client, Provider } from '@atlaskit/smart-card';
import { ReleaseStatus } from '../../../db/entities/Release';
import { SafeCard } from '../../components/SafeCard';
import { ReleaseRequestPayload } from '../../interfaces/release-request-payload';

const ReleaseInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0.5em 2em 1.5em 2em;
  width: calc(100% - 4em);
  overflow: hidden;
`;

interface GridItemValue {
  'column-span'?: number;
}

const ReleaseInfoItemValue = styled.div<GridItemValue>`
  padding: 5px;
  ${(props) =>
    props['column-span'] ? `grid-column: span ${props['column-span']};` : ''}
`;

const ReleaseInfoItemHeader = styled(ReleaseInfoItemValue)`
  ${(props) => (props['column-span'] ? `font-weight: bold;` : '')}
`;

const ReleaseProductStatus: FunctionComponent<{ status: boolean }> = ({
  status,
}) => {
  if (status) {
    return <Lozenge appearance="success">Done</Lozenge>;
  }

  return <Lozenge appearance="inprogress">In progress</Lozenge>;
};

const Duration: FunctionComponent<{ start: Date; end: Date }> = ({
  start,
  end,
}) => {
  const duration = distanceInWordsStrict(start, end, {
    // unit: 'd',
  });
  return <Lozenge>{duration}</Lozenge>;
};

const Durations: FunctionComponent<{ release: ReleaseRequestPayload }> = ({
  release,
}) => {
  if (!release.status) {
    return null;
  }
  if (
    [
      ReleaseStatus.stabilising,
      ReleaseStatus['released-to-npm'],
      ReleaseStatus['adopted-by-all-products'],
      ReleaseStatus['adopted-by-one-product'],
    ].indexOf(release.status) === -1
  ) {
    return null;
  }

  return (
    <>
      <ReleaseInfoItemHeader column-span={2}>
        Phase Durations
      </ReleaseInfoItemHeader>
      {release.stabilizingDate && release.developmentDate ? (
        <>
          <ReleaseInfoItemHeader>Development</ReleaseInfoItemHeader>
          <ReleaseInfoItemValue>
            <Duration
              start={new Date(release.developmentDate)}
              end={new Date(release.stabilizingDate)}
            />
          </ReleaseInfoItemValue>
        </>
      ) : null}

      {release.stabilizingDate && release.releaseToNPMDate ? (
        <>
          <ReleaseInfoItemHeader>Stabilisation</ReleaseInfoItemHeader>
          <ReleaseInfoItemValue>
            <Duration
              start={new Date(release.stabilizingDate)}
              end={new Date(release.releaseToNPMDate)}
            />
          </ReleaseInfoItemValue>
        </>
      ) : null}

      {release.adoptedByOneProductDate && release.releaseToNPMDate ? (
        <>
          <ReleaseInfoItemHeader>Adopted for one product</ReleaseInfoItemHeader>
          <ReleaseInfoItemValue>
            <Duration
              start={new Date(release.releaseToNPMDate)}
              end={new Date(release.adoptedByOneProductDate)}
            />
          </ReleaseInfoItemValue>
        </>
      ) : null}

      {release.adoptedByOneProductDate && release.adoptedByAllProductDate ? (
        <>
          <ReleaseInfoItemHeader>
            Adopted for all products
          </ReleaseInfoItemHeader>
          <ReleaseInfoItemValue>
            <Duration
              start={new Date(release.adoptedByOneProductDate)}
              end={new Date(release.adoptedByAllProductDate)}
            />
          </ReleaseInfoItemValue>
        </>
      ) : null}
    </>
  );
};

const Products: FunctionComponent<{ release: ReleaseRequestPayload }> = ({
  release,
}) => {
  if (!release.status) {
    return null;
  }
  if (
    [
      ReleaseStatus['released-to-npm'],
      ReleaseStatus['adopted-by-all-products'],
      ReleaseStatus['adopted-by-one-product'],
    ].indexOf(release.status) === -1
  ) {
    // A released cannot be adopted until is released to npm
    return null;
  }
  return (
    <>
      <ReleaseInfoItemHeader column-span={2}>
        Product Adoption
      </ReleaseInfoItemHeader>

      <ReleaseInfoItemHeader>Jira</ReleaseInfoItemHeader>
      <ReleaseInfoItemValue>
        <ReleaseProductStatus status={!!release.isInJira} />
      </ReleaseInfoItemValue>

      <ReleaseInfoItemHeader>Confluence</ReleaseInfoItemHeader>
      <ReleaseInfoItemValue>
        <ReleaseProductStatus status={!!release.isInConfluence} />
      </ReleaseInfoItemValue>

      <ReleaseInfoItemHeader>Bitbucket</ReleaseInfoItemHeader>
      <ReleaseInfoItemValue>
        <ReleaseProductStatus status={!!release.isInBitbucket} />
      </ReleaseInfoItemValue>
    </>
  );
};

interface ReleaseInfoProps {
  release: ReleaseRequestPayload;
}

export const ReleaseInfo: FunctionComponent<ReleaseInfoProps> = ({
  release,
}) => {
  return (
    <Provider client={new Client('prod')}>
      <ReleaseInfoContainer>
        <ReleaseInfoItemHeader column-span={2}>Details</ReleaseInfoItemHeader>
        {release.jiraTicket && (
          <>
            <ReleaseInfoItemHeader>Jira Ticket</ReleaseInfoItemHeader>
            <ReleaseInfoItemValue>
              <SafeCard
                url={`https://product-fabric.atlassian.net/browse/${release.jiraTicket}`}
              />
            </ReleaseInfoItemValue>
          </>
        )}

        {release.releasePage && (
          <>
            <ReleaseInfoItemHeader>Release Page</ReleaseInfoItemHeader>
            <ReleaseInfoItemValue>
              <SafeCard url={release.releasePage} />
            </ReleaseInfoItemValue>
          </>
        )}

        {release.cutDate && (
          <>
            <ReleaseInfoItemHeader>Cut Date</ReleaseInfoItemHeader>
            <ReleaseInfoItemValue>
              <DateComponent value={new Date(release.cutDate).getTime()} />
            </ReleaseInfoItemValue>
          </>
        )}
        {release.releaseDate && (
          <>
            <ReleaseInfoItemHeader>Release Date</ReleaseInfoItemHeader>
            <ReleaseInfoItemValue>
              <DateComponent value={new Date(release.releaseDate).getTime()} />
            </ReleaseInfoItemValue>
          </>
        )}

        <Durations release={release} />
        <Products release={release} />
      </ReleaseInfoContainer>
    </Provider>
  );
};
