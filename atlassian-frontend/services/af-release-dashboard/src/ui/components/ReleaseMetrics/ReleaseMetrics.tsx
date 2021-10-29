import React from 'react';
import useAxios, { ResponseValues } from 'axios-hooks';
import round from 'lodash/round';
import { serviceUrl } from '../../../server/constants';
import styled from 'styled-components';
import Tooltip from '@atlaskit/tooltip';
import { WhiteBox } from '../Box/WhiteBox';

const showResponse = ({ error, data, loading }: ResponseValues<any, any>) => {
  const message = (text: string) => (
    <div style={{ marginTop: '16px' }}>{text}</div>
  );
  if (error) {
    return message('Error getting data');
  }
  if (loading) {
    return message('Loading ...');
  }
  if (Object.keys(data.payload).length === 0) {
    return message('No data');
  }
  return null;
};

const GridContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0px 0px;
  grid-template-areas:
    'header header header'
    'total-average total-average total-average'
    'development-average stabilisation-average adoption-average';
`;

const SmallBox = styled(WhiteBox)`
  text-align: center;
  strong {
    display: block;
    font-size: 2rem;
  }
  font-size: 0.7rem;
  strong {
    font-size: 1.2rem;
  }
`;

const BoxLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Header = styled.div`
  grid-area: header;
  margin: 0.5rem;
  text-align: center;
`;
const TotalAverage = styled(WhiteBox)`
  grid-area: total-average;
  text-align: center;
  strong {
    display: block;
    font-size: 2rem;
  }
`;
const StabilisationAverage = styled(SmallBox)`
  grid-area: stabilisation-average;
`;
const AdoptionAverage = styled(SmallBox)`
  grid-area: adoption-average;
`;
const DevelopmentAverage = styled(SmallBox)`
  grid-area: development-average;
`;

const getTooltipText = (phase: string, releases: Array<string>) => {
  const releaseLetters = releases
    .map((release) => release[0].toUpperCase())
    .join(', ');
  return `Average ${phase} phase, based on ${releases.length} releases: ${releaseLetters}`;
};

const averagesTableContent = (data: any) => {
  return (
    <>
      <TotalAverage>
        <Tooltip
          content={
            'Based on the average number of days for the development, stabilisation and adoption phases'
          }
          position="bottom"
        >
          <div>
            Average time for a commit to get adopted by one product
            <strong>
              {`${round(
                data.averageDevelopmentDurationInDays +
                  data.averageStabilisationDurationInDays +
                  data.averageAdoptionByOneProductDurationInDays,
                1,
              )} days`}
            </strong>
          </div>
        </Tooltip>
      </TotalAverage>
      <DevelopmentAverage>
        <Tooltip
          content={getTooltipText(
            'development',
            data.averageDevelopmentDurationInDaysReleases,
          )}
          position="bottom"
        >
          <div>
            <BoxLabel> Average development phase </BoxLabel>
            <strong>
              {`${round(data.averageDevelopmentDurationInDays, 1)} days`}
            </strong>
          </div>
        </Tooltip>
      </DevelopmentAverage>
      <StabilisationAverage>
        <Tooltip
          content={getTooltipText(
            'stabilisation',
            data.averageStabilisationDurationInDaysReleases,
          )}
          position="bottom"
        >
          <div>
            <BoxLabel>Average stabilisation phase</BoxLabel>
            <strong>{`${round(
              data.averageStabilisationDurationInDays,
              1,
            )} days`}</strong>
          </div>
        </Tooltip>
      </StabilisationAverage>
      <AdoptionAverage>
        <BoxLabel>Average adoption phase</BoxLabel>
        <Tooltip
          content={getTooltipText(
            'adoption',
            data.averageAdoptionByOneProductDurationInDaysReleases,
          )}
          position="bottom"
        >
          <div>
            <strong>{`${round(
              data.averageAdoptionByOneProductDurationInDays,
              1,
            )} days`}</strong>
          </div>
        </Tooltip>
      </AdoptionAverage>
    </>
  );
};

export const ReleaseMetrics = () => {
  const [result] = useAxios(`${serviceUrl()}/api/v1/releases/averages`);
  const noData = !result.data || Object.keys(result.data.payload).length === 0;
  return (
    <GridContainer>
      <Header>
        <h4>Metrics</h4>
      </Header>
      {noData
        ? showResponse(result)
        : averagesTableContent(result.data.payload)}
    </GridContainer>
  );
};
