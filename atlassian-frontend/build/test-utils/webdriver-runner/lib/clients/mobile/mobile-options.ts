import { MobileTestCaseOptions } from '../../../types';
import { DefaultOSVersion } from './bs-mobile-clients';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// Default options that can be augmented or overwritten.
function getDefaultMobileOptions(): Writeable<MobileTestCaseOptions> {
  return {
    skipPlatform: undefined,
    // These default versions are what's used when a test specifies
    // 'DEFAULT' in its options.versions array.
    // If you need to change the defaults, update the consts, not
    // this array.
    versions: [DefaultOSVersion.ANDROID, DefaultOSVersion.IOS],
    formFactors: ['phone'],
    keyboards: ['apple', 'gboard'],
  };
}

// Blend two arrays together with de-duplication.
function blendArrayProperties<T>(
  defaults: T[] | undefined,
  overrides: T[] | undefined,
): T[] | undefined {
  if (defaults) {
    if (overrides) {
      return [...new Set(defaults.concat(overrides))];
    }
    return defaults;
  }
  return overrides;
}

/**
 * Blend default mobile options with overrides provided by a test.
 *
 * Default options are replaced by the existance of an override, with
 * the exception of the versions array which can retain the default versions
 * if the provided array uses the 'DEFAULT' option.
 */
export function getBlendedMobileOptions(
  overrides?: MobileTestCaseOptions,
): MobileTestCaseOptions {
  const options = getDefaultMobileOptions();
  // Overrides for explicit opt in or out...
  if (overrides) {
    const { skipPlatform, versions, formFactors, keyboards } = overrides;
    if (versions && versions.length) {
      const latestIndex = versions.indexOf('DEFAULT');
      if (latestIndex !== -1) {
        // Augment
        versions.splice(latestIndex, 1);
        options.versions = blendArrayProperties(options.versions, versions);
      } else {
        // Replace
        options.versions = versions;
      }
      options.versions!.sort((a, b) =>
        // Sort alphabetically (with natural numeric sorting for version number on the end)
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
      );
    }
    if (skipPlatform && skipPlatform.length) {
      const hasWildcard = skipPlatform.includes('*');
      if (hasWildcard) {
        // Wilcard: skip all platforms, which skips the test(s) entirely.
        console.warn(
          `Test skipped due to use of '*' wildcard in \`skipPlatform\` array: [${skipPlatform}]`,
        );
      }
      // Specify (no default)
      options.skipPlatform = hasWildcard ? ['android', 'ios'] : skipPlatform;

      // If a platform is skipped we filter out its versions to simplify future filtering...
      options.versions = options.versions!.filter(version =>
        skipPlatform.some(platform => !version.includes(platform)),
      );
    }
    if (formFactors && formFactors.length) {
      // Replace
      options.formFactors = formFactors;
    }
    if (keyboards && keyboards.length) {
      // Replace
      options.keyboards = keyboards;
    }
  }
  return options;
}
