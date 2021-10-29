import React from 'react';

import { render } from '@testing-library/react';

import { ExperienceTracker } from '../../ExperienceTracker';
import { ExperienceStart } from '../ExperienceStart';
import { ExperienceTrackerContext } from '../ExperienceTrackerContext';

it('ExperienceStart should call `start` before mounting', () => {
  const tracker = new ExperienceTracker();
  const startSpy = jest.spyOn(tracker, 'start');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceStart name="example" id="42" />
    </ExperienceTrackerContext.Provider>,
  );

  expect(startSpy).toHaveBeenCalledTimes(1);
});
