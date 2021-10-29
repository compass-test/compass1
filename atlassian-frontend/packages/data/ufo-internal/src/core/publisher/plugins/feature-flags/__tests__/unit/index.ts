import { pageLoadExperienceDataMock } from '../../../../../mocks/experience';
import { featureFlagClientMock } from '../../../../../mocks/feature-flags-client';
import { featureFlags } from '../../index';

describe('feature flags plugin', () => {
  test('returns null when none feature flags defined', () => {
    expect(
      featureFlags(featureFlagClientMock, [], pageLoadExperienceDataMock()),
    ).toEqual(null);
  });

  test('returns values of global flags', () => {
    expect(
      featureFlags(
        featureFlagClientMock,
        ['test.global'],
        pageLoadExperienceDataMock(),
      ),
    ).toEqual({
      featureFlags: {
        'test.global': true,
      },
    });
  });

  test('returns values of local flags', () => {
    expect(
      featureFlags(
        featureFlagClientMock,
        [],
        pageLoadExperienceDataMock({ featureFlags: ['test.local'] }),
      ),
    ).toEqual({
      featureFlags: {
        'test.local': true,
      },
    });
  });

  test('returns values of global and local flags combined', () => {
    expect(
      featureFlags(
        featureFlagClientMock,
        ['test.global'],
        pageLoadExperienceDataMock({
          featureFlags: ['test.local'],
        }),
      ),
    ).toEqual({
      featureFlags: {
        'test.global': true,
        'test.local': true,
      },
    });
  });
});
