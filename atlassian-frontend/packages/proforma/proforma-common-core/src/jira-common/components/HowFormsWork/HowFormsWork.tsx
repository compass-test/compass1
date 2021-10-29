import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { PfLink } from '../links';

import {
  HowFormsWorkMessage,
  IntlHowFormsWorkMessages,
} from './HowFormsWorkMessages.intl';
import { HowFormsWorkSampleImage } from './HowFormsWorkSampleImage';

interface HowFormsWorkProps {}

export const HowFormsWork: FC<HowFormsWorkProps> = props => {
  return (
    <HowFormsWorkWrapper>
      <TitleSection>
        <FormattedMessage
          {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Title]}
        />
      </TitleSection>
      <FlexGrid>
        <FlexColumn>
          <ColumnImage>
            <HowFormsWorkSampleImage />
          </ColumnImage>
          <ColumnHeading>
            <FormattedMessage
              {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column1Header]}
            />
          </ColumnHeading>
          <ColumnText>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column1Pg1]}
              />
            </p>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column1Pg2]}
              />
            </p>
          </ColumnText>
          <PfLink
            href="http://links.thinktilt.net/use-cases?utm_campaign=forms-page-intro&utm_medium=intro-graphics&utm_source=forms-page"
            message={IntlHowFormsWorkMessages[HowFormsWorkMessage.Column1Link]}
          />
        </FlexColumn>
        <FlexColumn>
          <ColumnImage>
            <HowFormsWorkSampleImage />
          </ColumnImage>
          <ColumnHeading>
            <FormattedMessage
              {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column2Header]}
            />
          </ColumnHeading>
          <ColumnText>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column2Pg1]}
              />
            </p>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column2Pg2]}
              />
            </p>
          </ColumnText>
          <PfLink
            href="http://links.thinktilt.net/form-builder?utm_campaign=forms-page-intro&utm_medium=intro-graphics&utm_source=forms-page"
            message={IntlHowFormsWorkMessages[HowFormsWorkMessage.Column2Link]}
          />
        </FlexColumn>
        <FlexColumn>
          <ColumnImage>
            <HowFormsWorkSampleImage />
          </ColumnImage>
          <ColumnHeading>
            <FormattedMessage
              {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column3Header]}
            />
          </ColumnHeading>
          <ColumnText>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column3Pg1]}
              />
            </p>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column3Pg2]}
              />
            </p>
          </ColumnText>
          <PfLink
            href="http://links.thinktilt.net/automation-overview?utm_campaign=forms-page-intro&utm_medium=intro-graphics&utm_source=forms-page"
            message={IntlHowFormsWorkMessages[HowFormsWorkMessage.Column3Link]}
          />
        </FlexColumn>
        <FlexColumn>
          <ColumnImage>
            <HowFormsWorkSampleImage />
          </ColumnImage>
          <ColumnHeading>
            <FormattedMessage
              {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column4Header]}
            />
          </ColumnHeading>
          <ColumnText>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[HowFormsWorkMessage.Column4Pg1]}
              />
            </p>
            <p>
              <FormattedMessage
                {...IntlHowFormsWorkMessages[
                  HowFormsWorkMessage.Column4Pg2Cloud
                ]}
              />
            </p>
          </ColumnText>
          <PfLink
            href="http://links.thinktilt.net/reporting?utm_campaign=forms-page-intro&utm_medium=intro-graphics&utm_source=forms-page"
            message={IntlHowFormsWorkMessages[HowFormsWorkMessage.Column4Link]}
          />
        </FlexColumn>
      </FlexGrid>
    </HowFormsWorkWrapper>
  );
};

const HowFormsWorkWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  @media (min-width: 1300px) {
    max-width: 1280px;
  }
`;

const TitleSection = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`;

const FlexGrid = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`;

const FlexColumn = styled.div`
  flex: 1;
  margin: 0 15px;
  @media (max-width: 768px) {
    margin: 0 0 20px 0;
  }
`;

const ColumnHeading = styled.h3``;

const ColumnText = styled.div``;

const ColumnImage = styled.span`
  width: 100%;
  display: block;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: block;
  }
`;
