import { ExperimentLanguage } from '../../abstract/language';
import { useExperiment } from '../../core';
import { isEnglish, usePluginEnglishOnly } from '../englishOnly';

test('checks for correct language code', () => {
  const englishUS = isEnglish('en-US');
  const englishAU = isEnglish('en-AU');
  const tagalogPH = isEnglish('tl-PH');
  const englishNoLocale = isEnglish('en');
  const englishUpperCase = isEnglish('EN');
  const polishPL = isEnglish('pl-PL');
  const notEnglish = isEnglish('&$*%!');

  expect(englishUS).toBe(true);
  expect(englishAU).toBe(true);
  expect(polishPL).toBe(false);
  expect(tagalogPH).toBe(false);
  expect(englishNoLocale).toBe(true);
  expect(englishUpperCase).toBe(true);
  expect(notEnglish).toBe(false);
});

const mockPipelineEnglish = {
  language: 'en-AU',
} as ExperimentLanguage;

const mockPipelineNotEnglish = {
  language: 'tl-PH',
} as ExperimentLanguage;

describe('usePluginUnenrollNonEnglish', () => {
  test('should mark cohort as not enrolled if language is not english', () => {
    const pipeline = useExperiment(
      () => mockPipelineNotEnglish,
      usePluginEnglishOnly(),
    );

    expect(pipeline).toMatchObject({
      cohort: 'not-enrolled',
      ineligibilityReasons: ['notEnglish'],
    });
  });

  test('should return unchanged pipeline if language is english', () => {
    const pipeline = useExperiment(
      () => mockPipelineEnglish,
      usePluginEnglishOnly(),
    );

    expect(pipeline).toMatchObject(mockPipelineEnglish);
  });

  test('should use custom ineligibility reason if set', () => {
    const pipeline = useExperiment(
      () => mockPipelineNotEnglish,
      usePluginEnglishOnly('notEnglishUser'),
    );

    expect(pipeline).toMatchObject({
      cohort: 'not-enrolled',
      ineligibilityReasons: ['notEnglishUser'],
    });
  });
});
