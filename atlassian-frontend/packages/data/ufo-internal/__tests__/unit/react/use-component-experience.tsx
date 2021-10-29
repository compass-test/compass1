import React from 'react';

import { render } from '@testing-library/react';

import {
  ExperiencePerformanceTypes,
  ExperienceTypes,
} from '@atlassian/ufo-experimental';

import { UFOExperience, useUFOComponentExperience } from '../../../src';

describe('useUFOComponentExperience', () => {
  test('use-component-experience should not abort on re-renders', () => {
    const experience = new UFOExperience('test-experience', {
      performanceType: ExperiencePerformanceTypes.Custom,
      type: ExperienceTypes.Operation,
    });
    const abortSpy = jest.spyOn(experience, 'abort');

    const ComponentWithUseUfoComponentHook = () => {
      useUFOComponentExperience(experience);

      return <></>;
    };
    const { rerender } = render(<ComponentWithUseUfoComponentHook />);
    rerender(<ComponentWithUseUfoComponentHook />);
    expect(abortSpy).not.toHaveBeenCalled();
  });

  test('use-component-experience should abort on unmount', () => {
    const experience = new UFOExperience('test-experience', {
      performanceType: ExperiencePerformanceTypes.Custom,
      type: ExperienceTypes.Operation,
    });
    const abortSpy = jest.spyOn(experience, 'abort');

    const ComponentWithUseUfoComponentHook = () => {
      useUFOComponentExperience(experience);

      return <></>;
    };
    const { unmount } = render(<ComponentWithUseUfoComponentHook />);
    unmount();
    expect(abortSpy).toHaveBeenCalled();
  });
});
