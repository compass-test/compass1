import {
  RUNNER_LABEL_VALIDATION_MESSAGES,
  RUNNER_NAME_VALIDATION_MESSAGES,
} from '../../../const';
import {
  detectRunnerSystemFromLabels,
  normaliseLabel,
  reduceLabelsToSelectOptions,
  shouldNormaliseLabel,
  validateLabelValues,
  validateName,
} from '../../../utils';

describe('detectRunnerSystemFromLabels util', () => {
  it('should correctly detect system label in array when windows feature is disabled', () => {
    const labelArray = ['self.hosted', 'linux'];
    const expectedSystem = 'linux';
    const detectedSystem = detectRunnerSystemFromLabels(false, labelArray);
    expect(detectedSystem).toEqual(expectedSystem);
  });

  it('should correctly detect windows system label in array when windows feature is enabled', () => {
    const labelArray = ['self.hosted', 'windows'];
    const expectedSystem = 'windows';
    const detectedSystem = detectRunnerSystemFromLabels(true, labelArray);
    expect(detectedSystem).toEqual(expectedSystem);
  });
});

describe('reduceLabelsToSelectOptions util', () => {
  it('should correctly reduce array to selectOptions array', () => {
    const labelArray = ['self.hosted', 'linux'];
    const expectedReducedSelectOptions = [
      { label: 'self.hosted', value: 'self.hosted' },
      { label: 'linux', value: 'linux' },
    ];
    const selectOptionsArray = reduceLabelsToSelectOptions(labelArray);
    expect(selectOptionsArray).toEqual(expectedReducedSelectOptions);
  });
});

describe('Normalisation util', () => {
  it('correctly recognise labels to normalise', () => {
    expect(shouldNormaliseLabel('something')).toEqual(false);
    expect(shouldNormaliseLabel('some thing')).toEqual(true);
    expect(shouldNormaliseLabel('some Thing')).toEqual(false);
    expect(shouldNormaliseLabel('some Ch4rs')).toEqual(false);
    expect(shouldNormaliseLabel('!@#$% ^&*')).toEqual(false);
  });

  // Normalise runner labels
  it('should normalise spaces', () => {
    const label = 'te st';
    const normalisedLabel = normaliseLabel(label);
    expect(normalisedLabel).toEqual('test');
  });

  it('should not normalise valid label', () => {
    const label = 'test';
    const normalisedLabel = normaliseLabel(label);
    expect(normalisedLabel).toEqual(label);
  });
});

describe('Validation util', () => {
  // Validating runner name
  it('should validate empty runner name', () => {
    const validName = '';
    const validationMessage = validateName(validName);

    expect(validationMessage).toEqual(undefined);
  });

  it('should validate runner name', () => {
    let validName = 'runnerName';
    let validationMessage = validateName(validName);
    expect(validationMessage).toEqual(undefined);

    validName = 'A name with space$, numbers and ch4r4cters';
    validationMessage = validateName(validName);
    expect(validationMessage).toEqual(undefined);

    validName = 'AVeryLongRunnerNameYouWouldNotBelieveHowLongItIsWOW';
    validationMessage = validateName(validName);
    expect(validationMessage).toEqual(
      RUNNER_NAME_VALIDATION_MESSAGES.characterLimit,
    );
  });

  // Validating runner label
  it('should validate normalised label which is duplicate', () => {
    const values = ['test'];
    const isDuplicate = true;
    const wasNormalised = true;
    const validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.duplicateLabel,
    );
  });

  it('should validate normalised label which is not a duplicate', () => {
    const values = ['test'];
    const isDuplicate = false;
    const wasNormalised = true;
    const validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.normalisedLabel,
    );
  });

  it('should validate max number of labels with 2 unremovable labels', () => {
    const values = [
      'self.hosted',
      'linux',
      'test',
      'test2',
      'test3',
      'test4',
      'test5',
      'test6',
      'test7',
      'test8',
      'test9',
      'test10',
      'test11',
    ];
    const isDuplicate = false;
    const wasNormalised = false;
    const validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.maxLabel,
    );
  });

  it('should validate max number of labels with 1 unremovable label', () => {
    const values = [
      'self.hosted',
      'test',
      'test2',
      'test3',
      'test4',
      'test5',
      'test6',
      'test7',
      'test8',
      'test9',
      'test10',
      'test11',
    ];
    const isDuplicate = false;
    const wasNormalised = false;
    const validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      1,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.maxLabel,
    );
  });

  it('should validate atlassian and bitbucket namespaces', () => {
    let values = ['atlassian.blah'];
    const isDuplicate = false;
    const wasNormalised = false;
    let validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual('atlassian.* is a reserved namespace');

    values = ['bitbucket.blah'];
    validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual('bitbucket.* is a reserved namespace');

    values = ['linux.blah'];
    validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual('linux.* is a reserved namespace');

    values = ['windows.blah'];
    validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual('windows.* is a reserved namespace');

    values = ['macos.blah'];
    validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual('macos.* is a reserved namespace');
  });

  it('should validate invalid characters', () => {
    let values = ['f@@'];
    const isDuplicate = false;
    const wasNormalised = false;
    let validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.invalidCharacters,
    );
  });

  it('should validate long label name', () => {
    let values = ['averylongrunnerlabelyouwouldnotbelievehowlongitiswow'];
    const isDuplicate = false;
    const wasNormalised = false;
    const validationMessage = validateLabelValues(
      values,
      isDuplicate,
      wasNormalised,
      2,
    );
    expect(validationMessage).toEqual(
      RUNNER_LABEL_VALIDATION_MESSAGES.characterLimit,
    );
  });
});
