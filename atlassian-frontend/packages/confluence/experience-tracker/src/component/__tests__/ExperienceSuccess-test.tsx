import React from 'react';

import { render } from '@testing-library/react';

import { ExperienceTracker } from '../../ExperienceTracker';
import { ExperienceSuccess } from '../ExperienceSuccess';
import { ExperienceTrackerContext } from '../ExperienceTrackerContext';

it('should render nothing', () => {
  const { container } = render(<ExperienceSuccess name="example" />);

  expect(container.innerHTML).toBe('');
});

it('should call succeed when executed', () => {
  const tracker = new ExperienceTracker();
  const succeedSpy = jest.spyOn(tracker, 'succeed');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceSuccess name="example" />
    </ExperienceTrackerContext.Provider>,
  );

  expect(succeedSpy).toHaveBeenCalledTimes(1);
});
