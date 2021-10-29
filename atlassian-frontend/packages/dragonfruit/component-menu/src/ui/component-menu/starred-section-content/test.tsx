import React from 'react';

import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { STARRED_SECTION_TEST_ID } from './constants';

import { StarredSectionContent } from './index';

describe('<StarredSectionContent />', () => {
  it('should render a list of the starred components', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <StarredSectionContent />
      </CompassTestProvider>,
    );

    const starredSection = getByTestId(STARRED_SECTION_TEST_ID);
    expect(starredSection).toBeInTheDocument();
  });
});
