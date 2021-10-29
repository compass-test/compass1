import { useExperiment } from '../../core';
import { usePluginResolver } from '../resolver';

describe('usePluginResolver', () => {
  test('should set experiment resolution in the pipeline', () => {
    const existingPipeline = {
      foo: 'bar',
      answer: 42,
    };
    const resolution = {
      cohort: 'variation',
      ineligibilityReasons: [],
    };
    const pipeline = useExperiment(
      () => existingPipeline,
      usePluginResolver(() => resolution),
    );

    expect(pipeline).toMatchObject({
      ...existingPipeline,
      ...resolution,
    });
  });

  test('should extend ineligibilityReasons instead of replacing', () => {
    const pipeline = useExperiment(
      () => ({
        cohort: 'variation',
        ineligibilityReasons: ['someReason'],
      }),
      usePluginResolver(() => ({
        cohort: 'not-enrolled',
        ineligibilityReasons: ['anotherReason'],
      })),
    );

    expect(pipeline).toMatchObject({
      cohort: 'not-enrolled',
      ineligibilityReasons: ['someReason', 'anotherReason'],
    });
  });

  test('should set cohort to string result of resolver', () => {
    const resolution = {
      cohort: 'myCohort',
      ineligibilityReasons: [],
    };
    const pipeline = useExperiment(usePluginResolver(() => 'myCohort'));

    expect(pipeline).toMatchObject(resolution);
  });

  test('should set cohort to undefined if resolver returned null', () => {
    const resolution = {
      cohort: undefined,
      ineligibilityReasons: [],
    };
    // @ts-ignore
    const pipeline = useExperiment(usePluginResolver(() => null));

    expect(pipeline).toMatchObject(resolution);
  });

  test('should set cohort to not-enrolled if resolution is ineligible', () => {
    const resolution = {
      cohort: 'not-enrolled',
      ineligibilityReasons: ['anotherReason'],
    };
    const pipeline = useExperiment(
      usePluginResolver(() => ({
        ineligible: 'anotherReason',
      })),
    );

    expect(pipeline).toMatchObject(resolution);
  });
});
