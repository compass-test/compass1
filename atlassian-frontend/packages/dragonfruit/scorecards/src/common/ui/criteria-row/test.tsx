import React from 'react';

import { render } from '@testing-library/react';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { CriteriaFragment } from '../../../common/ui/types';

import { CriteriaRow } from './index';

describe('CriteriaRow', () => {
  const testId = 'criteria-row';

  it('should successfully render', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasDescriptionScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 1,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(testId)).toBeTruthy();
  });

  it('should render a complete progress check when the criteria score is equal to its max score', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasDescriptionScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 1,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.check.complete`)).toBeTruthy();
  });

  it('should render a complete progress check when the criteria score is greater than its max score', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasDescriptionScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 2,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.check.complete`)).toBeTruthy();
  });

  it('should render an incomplete progress check when the criteria score is less than its max score', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasDescriptionScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 0,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.check.incomplete`)).toBeTruthy();
  });

  it('should render text for HasDescription criteria', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasDescriptionScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 1,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.text`)).toBeTruthy();
  });

  it('should render text for HasOwner criteria', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasOwnerScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      scorecardCriteriaScore: {
        score: 0,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.text`)).toBeTruthy();
  });

  it('should render text for HasLink criteria', () => {
    const criteria: CriteriaFragment = {
      __typename: 'CompassHasLinkScorecardCriteria',
      id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
      weight: 15,
      linkType: CompassLinkType.DASHBOARD,
      scorecardCriteriaScore: {
        score: 0,
        maxScore: 1,
      },
    };

    const { getByTestId } = render(
      <CompassTestProvider>
        <CriteriaRow criteria={criteria} testId={testId} />
      </CompassTestProvider>,
    );

    expect(getByTestId(`${testId}.text`)).toBeTruthy();
  });
});
