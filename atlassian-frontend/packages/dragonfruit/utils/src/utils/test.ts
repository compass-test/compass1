import { ariToUrlParam, decodeUrlParamToAri, mapAriToPublicId } from './urls';

describe('encodeAris', () => {
  test('Encodes serviceAri successfully', () => {
    const serviceAri =
      'ari:cloud:graph::service/b481a20a-43b6-11ea-b748-0ec70051ff9e/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = ariToUrlParam(serviceAri);

    expect(result).toBe(
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU%3D',
    );
  });

  test('Encodes extensionId successfully', () => {
    const extensionId =
      'ari:cloud:ecosystem::extension/667eecab-9798-4385-8355-3739c16ba4c5/83c24213-3201-4ac0-af68-70cafc07a8cd/static/bitbucket-sync-ui';

    const result = ariToUrlParam(extensionId);

    expect(result).toBe(
      'b%3AYXJpOmNsb3VkOmVjb3N5c3RlbTo6ZXh0ZW5zaW9uLzY2N2VlY2FiLTk3OTgtNDM4NS04MzU1LTM3MzljMTZiYTRjNS84M2MyNDIxMy0zMjAxLTRhYzAtYWY2OC03MGNhZmMwN2E4Y2Qvc3RhdGljL2JpdGJ1Y2tldC1zeW5jLXVp',
    );
  });

  test('Encodes serviceAri successfully when already Base64 encoded', () => {
    const serviceAri =
      'b:YXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU=';

    const result = ariToUrlParam(serviceAri);

    expect(result).toBe(
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU%3D',
    );
  });

  test('Decodes serviceAri successfully', () => {
    const encoded =
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU%3D';

    const result = decodeUrlParamToAri(encoded);

    expect(result).toBe(
      'ari:cloud:graph::service/b481a20a-43b6-11ea-b748-0ec70051ff9e/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
    );
  });

  test('Decodes empty serviceUrl Param', () => {
    const encoded = '';

    const result = decodeUrlParamToAri(encoded);

    expect(result).toBe('');
  });

  test('Returns undefined when the serviceUrl Param is invalid', () => {
    const encoded =
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2EwNDA4MGI2LTA4MzQtMTFlYi1iMzc0LTBhNzdmM2Y0NTwNC82ODA5YmViMi0yZDUzLTExZWItYjcxMi0xMjhiNDI4MTk0MjQ%3D';
    const result = decodeUrlParamToAri(encoded);

    expect(result).toBe(undefined);
  });

  test('mapServiceAriToPublicId encodes properly', () => {
    const serviceAri =
      'ari:cloud:graph::service/b481a20a-43b6-11ea-b748-0ec70051ff9e/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = mapAriToPublicId(serviceAri);

    expect(result).toEqual(
      'b:YXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU=',
    );
  });
});
