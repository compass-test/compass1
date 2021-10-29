import React from 'react';

import { render } from '@testing-library/react';

import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ScorecardStandardIcon } from './index';

describe('StandardIcon', () => {
  let requiredIcon: HTMLElement;
  let recommendedIcon: HTMLElement;
  let userDefinedIcon: HTMLElement;

  it('Should display required icon if standard is required', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.REQUIRED}
        />
      </CompassTestProvider>,
    );

    requiredIcon = getByTestId(
      'page-scorecard-templates.ui.scorecard-summary.required-standard-icon',
    );
    expect(requiredIcon).toBeInTheDocument();
  });

  it('Should display recommended icon if standard is recommended', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.RECOMMENDED}
        />
      </CompassTestProvider>,
    );

    recommendedIcon = getByTestId(
      'page-scorecard-templates.ui.scorecard-summary.recommended-standard-icon',
    );
    expect(recommendedIcon).toBeInTheDocument();
  });

  it('Should display user-defined icon if standard is user defined', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ScorecardStandardIcon
          importance={CompassScorecardImportance.USER_DEFINED}
        />
      </CompassTestProvider>,
    );

    userDefinedIcon = getByTestId(
      'page-scorecard-templates.ui.scorecard-summary.user-standard-icon',
    );
    expect(userDefinedIcon).toBeInTheDocument();
  });
});
