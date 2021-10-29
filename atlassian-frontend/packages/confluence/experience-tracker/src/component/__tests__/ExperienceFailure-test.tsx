import React from 'react';

import { render } from '@testing-library/react';

import { ExperienceTracker } from '../../ExperienceTracker';
import { ExperienceContext } from '../ExperienceContext';
import { ExperienceFailure } from '../ExperienceFailure';
import { ExperienceTrackerContext } from '../ExperienceTrackerContext';

it('ExperienceFailure should render nothing', () => {
  const { container } = render(
    <ExperienceTrackerContext.Provider value={new ExperienceTracker()}>
      <ExperienceFailure name="example" error={new Error('')} />
    </ExperienceTrackerContext.Provider>,
  );

  expect(container.innerHTML).toEqual('');
});

it('ExperienceFailure should call fail when executed', () => {
  const tracker = new ExperienceTracker();
  const failSpy = jest.spyOn(tracker, 'fail');
  const error = new Error('');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceFailure name="example" error={error} />
    </ExperienceTrackerContext.Provider>,
  );

  expect(failSpy).toHaveBeenCalledTimes(1);
  expect(failSpy).toHaveBeenCalledWith({
    name: 'example',
    error,
  });
});

it('should call fail with derived name if name is not provided as prop', () => {
  const tracker = new ExperienceTracker();
  const failSpy = jest.spyOn(tracker, 'fail');
  const error = new Error('');

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceContext.Provider value="example">
        <ExperienceFailure error={error} />
      </ExperienceContext.Provider>
    </ExperienceTrackerContext.Provider>,
  );

  expect(failSpy).toHaveBeenCalledTimes(1);
  expect(failSpy).toHaveBeenCalledWith({
    name: 'example',
    error,
  });
});

it('should call fail with attributes', () => {
  const tracker = new ExperienceTracker();
  const failSpy = jest.spyOn(tracker, 'fail');
  const error = new Error('');
  const attributes = { att: 'attribute1' };

  render(
    <ExperienceTrackerContext.Provider value={tracker}>
      <ExperienceContext.Provider value="example">
        <ExperienceFailure error={error} attributes={attributes} />
      </ExperienceContext.Provider>
    </ExperienceTrackerContext.Provider>,
  );

  expect(failSpy).toHaveBeenCalledTimes(1);
  expect(failSpy).toHaveBeenCalledWith({
    name: 'example',
    error,
    attributes,
  });
});
