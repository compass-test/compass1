import { getBlendedMobileOptions } from '../../lib/clients/mobile/mobile-options';

const DEFAULT_OPTIONS = getBlendedMobileOptions();

describe('MobileTestCaseOptions.getBlendedMobileOptions', () => {
  it('should return default options when no overrides exist', () => {
    const empty = getBlendedMobileOptions({});
    expect(empty).toEqual(DEFAULT_OPTIONS);
    expect(DEFAULT_OPTIONS).toMatchSnapshot();
  });

  it(`should remove appropriate platform versions when skipPlatform is used`, () => {
    const androidOnly = getBlendedMobileOptions({ skipPlatform: ['ios'] });
    expect(androidOnly.versions).toMatchSnapshot('Android only');
  });

  it(`should replace wildcard with all platforms`, () => {
    const androidOnly = getBlendedMobileOptions({ skipPlatform: ['*'] });
    expect(androidOnly.versions).toMatchSnapshot('Wildcard');
  });

  it('should use defaults when provided an empty versions array', () => {
    const replacedVersions = getBlendedMobileOptions({
      versions: [],
    });
    expect(replacedVersions.versions).toMatchSnapshot();
  });

  it('should replace default versions when a populated versions array is provided', () => {
    const replacedVersions = getBlendedMobileOptions({
      versions: ['ios 12', 'android 9'],
    });
    expect(replacedVersions.versions).toMatchSnapshot();
  });

  it(`should augment default versions when a provided versions array includes 'DEFAULT'`, () => {
    const augmentedVersions = getBlendedMobileOptions({
      versions: ['DEFAULT', 'android 9', 'ios 12'],
    });
    expect(augmentedVersions.versions).toMatchSnapshot();
  });

  it(`should replace default form factors when a formFactors array is provided`, () => {
    const formFactors = getBlendedMobileOptions({
      formFactors: ['tablet'],
    });
    expect(formFactors.formFactors).toMatchSnapshot();
  });

  it(`should use defaults when provided an empty formFactors array`, () => {
    const formFactors = getBlendedMobileOptions({
      formFactors: [],
    });
    expect(formFactors.formFactors).toMatchSnapshot();
  });

  it(`should replace default keyboards when a keyboards array is provided`, () => {
    const keyboards = getBlendedMobileOptions({
      keyboards: ['samsung'],
    });
    expect(keyboards.keyboards).toMatchSnapshot();
  });

  it(`should use defaults when provided an empty keyboards array`, () => {
    const keyboards = getBlendedMobileOptions({
      keyboards: [],
    });
    expect(keyboards.keyboards).toMatchSnapshot();
  });
});
