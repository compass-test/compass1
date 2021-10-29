import { renderHook } from '@testing-library/react-hooks';

import { useFetchMessagesByLocale } from './main';

const englishLocale = 'en_US';
const frenchLocale = 'fr';
const mockMessages = { default: { 'message.key': 'message-value' } };
const fetchLanguageFilePromise = jest.fn().mockResolvedValue(mockMessages);

describe('useFetchMessagesByLocale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default state correctly', () => {
    const { result } = renderHook(() =>
      useFetchMessagesByLocale(englishLocale, fetchLanguageFilePromise),
    );
    const { messages, isLoading } = result.current;
    expect(messages).toStrictEqual({});
    expect(isLoading).toBeFalsy();
  });

  it('should not call fetchLanguageFile method for english locale ', () => {
    renderHook(() =>
      useFetchMessagesByLocale(englishLocale, fetchLanguageFilePromise),
    );
    expect(fetchLanguageFilePromise).not.toHaveBeenCalled();
  });

  it('should call fetchLanguageFile method', () => {
    renderHook(() =>
      useFetchMessagesByLocale(frenchLocale, fetchLanguageFilePromise),
    );
    expect(fetchLanguageFilePromise).toHaveBeenNthCalledWith(1, frenchLocale);
  });

  it('should set messages correctly', async () => {
    const { result } = renderHook(() =>
      useFetchMessagesByLocale(frenchLocale, fetchLanguageFilePromise),
    );

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.messages).toStrictEqual({});

    await fetchLanguageFilePromise();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.messages).toStrictEqual(mockMessages.default);
  });
});
