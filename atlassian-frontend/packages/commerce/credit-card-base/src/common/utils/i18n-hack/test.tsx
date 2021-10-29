import React from 'react';

import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  isEnglishLanguage,
  isJapaneseLanguage,
  LanguagePreferencesProvider,
  usePreferredLanguage,
} from '../i18n-hack';

describe('Language identification helpers', () => {
  it(isJapaneseLanguage.name, () => {
    expect(isJapaneseLanguage('ja')).toBe(true);
    expect(isJapaneseLanguage('ja-')).toBe(true);
    expect(isJapaneseLanguage('ja-JP')).toBe(true);
    expect(isJapaneseLanguage('JA')).toBe(true);

    expect(isJapaneseLanguage('en')).toBe(false);
    expect(isJapaneseLanguage('je')).toBe(false);
  });
  it(isEnglishLanguage.name, () => {
    expect(isEnglishLanguage('en')).toBe(true);
    expect(isEnglishLanguage('en-')).toBe(true);
    expect(isEnglishLanguage('en-US')).toBe(true);
    expect(isEnglishLanguage('EN')).toBe(true);

    expect(isEnglishLanguage('ja')).toBe(false);
    expect(isEnglishLanguage('es')).toBe(false);
  });
});
describe(usePreferredLanguage.name, () => {
  const languagesMock = jest.fn<string[], any[]>();
  const languageMock = jest.fn<string, any[]>();
  Object.defineProperty(window.navigator, 'languages', {
    get: languagesMock,
  });
  Object.defineProperty(window.navigator, 'language', {
    get: languageMock,
  });
  it('returns Japanese if it is first in browser languages + converts to lower case', () => {
    languagesMock.mockReturnValue(['JA', 'EN']);

    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('ja');
  });
  it('returns English if it is first in browser languages', () => {
    languagesMock.mockReturnValue(['en', 'ja']);

    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('en');
  });
  it('Uses deprecated browser language if navigator languages API not available', () => {
    languagesMock.mockReturnValue(undefined as any);
    languageMock.mockReturnValue('en');

    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('en');
  });
  it('returns English if neither english nor japanese is in browser languages', () => {
    languagesMock.mockReturnValue(['en', 'ja']);

    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('en');
  });

  it(`${LanguagePreferencesProvider.name} overrides Browser language preferences`, () => {
    languagesMock.mockReturnValue(['JA']);

    let languageValue: string | null | undefined = null;
    const RunHook = () => {
      languageValue = usePreferredLanguage();
      return null;
    };
    const TestComponent = () => (
      <LanguagePreferencesProvider languages={['en-us']}>
        <RunHook />
      </LanguagePreferencesProvider>
    );
    render(<TestComponent />);

    expect(languageValue).toBe('en-us');
  });
});
