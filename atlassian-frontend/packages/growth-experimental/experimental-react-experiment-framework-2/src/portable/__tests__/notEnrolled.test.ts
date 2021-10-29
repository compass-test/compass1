import { useExperiment } from '../../core';
import { usePluginNotEnrolledCohort } from '../notEnrolled';
import { markNotEnrolled } from '../../helpers';

describe('usePluginNotEnrolledCohort', () => {
  test('should set notEnrolledCohort in the pipeline', () => {
    const existingPipeline = {
      foo: 'bar',
      answer: 42,
    };
    const pipeline = useExperiment(
      () => existingPipeline,
      usePluginNotEnrolledCohort('unenrolled'),
    );

    expect(pipeline).toMatchObject({
      ...existingPipeline,
      notEnrolledCohort: 'unenrolled',
    });
  });

  test('should use notEnrolledCohort to mark cohort', () => {
    const existingPipeline = {
      foo: 'bar',
      answer: 42,
    };
    const pipeline = useExperiment(
      () => existingPipeline,
      usePluginNotEnrolledCohort('unenrolled'),
      (pipe) => markNotEnrolled('someReason', pipe),
    );

    expect(pipeline).toMatchObject({
      ...existingPipeline,
      notEnrolledCohort: 'unenrolled',
      cohort: 'unenrolled',
      ineligibilityReasons: ['someReason'],
    });
  });
});
