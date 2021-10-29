import React from 'react';

import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { testProps } from '../src/common/constants';
import { userSegmentationDataMapping } from '../src/services/integrations/constants';
import { IntegrationsSurveyPresentational } from '../src/ui';

function _keys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const props = {
  ...testProps,
  onMount: action('Fired on mount'),
};

export default function () {
  return (
    <div>
      {_keys(userSegmentationDataMapping).map((teamType) => {
        const integrationList = userSegmentationDataMapping[teamType];
        return (
          <FlexContainer key={teamType}>
            <div>
              <h1>{teamType} - nth user</h1>
              <IntegrationsSurveyPresentational
                {...props}
                integrationList={integrationList}
              />
              <br />
            </div>
            <div>
              <h1>{teamType} - admin</h1>
              <IntegrationsSurveyPresentational
                integrationList={integrationList}
                {...testProps}
                isSiteAdmin
              />
              <br />
            </div>
          </FlexContainer>
        );
      })}
    </div>
  );
}
