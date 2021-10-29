import { useExperiment } from '../../core';
import { usePluginUnmetRequirements } from '../enrollmentRequirements';

describe('usePluginUnmetRequirements', () => {
  test('should mark as not-enrolled if resolves to false', () => {
    const pipeline = useExperiment(
      () => ({
        cohort: 'variation',
        ineligibilityReasons: [],
      }),
      usePluginUnmetRequirements(() => false, 'someReason'),
    );

    expect(pipeline).toMatchObject({
      cohort: 'not-enrolled',
      ineligibilityReasons: ['someReason'],
      unmetEnrollmentRequirements: true,
    });
  });

  test('should not change the pipleline if resolves to true', () => {
    const pipeline = useExperiment(
      () => ({
        cohort: 'variation',
        ineligibilityReasons: [],
      }),
      usePluginUnmetRequirements(() => true, 'someReason'),
    );

    expect(pipeline).toMatchObject({
      cohort: 'variation',
      ineligibilityReasons: [],
    });
  });
});
