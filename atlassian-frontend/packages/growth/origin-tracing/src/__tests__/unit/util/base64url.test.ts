import { base64ToBase64Url, base64UrlToBase64 } from '../../../util/base64url';

describe('OriginTracer base64url', () => {
  describe('base64ToBase64Url', () => {
    test('replaces url-unsafe characters', () => {
      const base64url = base64ToBase64Url('aB+/cD+/');
      expect(base64url).toBe('aB-_cD-_');
    });

    test('removes the padding =', () => {
      const base64url = base64ToBase64Url('aB==');
      expect(base64url).toBe('aB');
    });

    test('returns empty string for null values', () => {
      expect(base64ToBase64Url(null as any)).toBe('');
      expect(base64ToBase64Url(undefined as any)).toBe('');
    });
  });

  describe('base64UrlToBase64', () => {
    test('restores the url-unsafe characters', () => {
      const base64url = base64UrlToBase64('ab-_cd-_');
      expect(base64url).toBe('ab+/cd+/');
    });

    function checkPadding(
      inputText: string,
      base64url: string,
      expectedBase64: string,
    ) {
      expect(base64UrlToBase64(base64url)).toEqual(expectedBase64);

      // Cross check our expected value with an actual call to btoa()
      expect(btoa(inputText)).toBe(expectedBase64);
    }

    test('pads with =', () => {
      // Examples from:
      // https://en.wikipedia.org/wiki/Base64#Output_padding
      checkPadding(
        'any carnal plea',
        'YW55IGNhcm5hbCBwbGVh',
        'YW55IGNhcm5hbCBwbGVh',
      );
      checkPadding(
        'any carnal pleas',
        'YW55IGNhcm5hbCBwbGVhcw',
        'YW55IGNhcm5hbCBwbGVhcw==',
      );
      checkPadding(
        'any carnal pleasu',
        'YW55IGNhcm5hbCBwbGVhc3U',
        'YW55IGNhcm5hbCBwbGVhc3U=',
      );
      checkPadding(
        'any carnal pleasur',
        'YW55IGNhcm5hbCBwbGVhc3Vy',
        'YW55IGNhcm5hbCBwbGVhc3Vy',
      );
      checkPadding(
        'any carnal pleasure',
        'YW55IGNhcm5hbCBwbGVhc3VyZQ',
        'YW55IGNhcm5hbCBwbGVhc3VyZQ==',
      );
      checkPadding(
        'any carnal pleasure.',
        'YW55IGNhcm5hbCBwbGVhc3VyZS4',
        'YW55IGNhcm5hbCBwbGVhc3VyZS4=',
      );

      // Note: despite padding to the nearest multiple of 4 characters,
      // it's actually impossible for base64 to have 3 padding characters.
      // Each base64 character encodes just 6 bits.
      // A single byte added to the input stream is 8 bits, which already
      // requires 2 characters in base64, leaving us with 2 padding characters.
      checkPadding('a', 'YQ', 'YQ==');
    });

    test('returns empty string for null values', () => {
      expect(base64UrlToBase64(null as any)).toBe('');
      expect(base64UrlToBase64(undefined as any)).toBe('');
    });
  });
});
