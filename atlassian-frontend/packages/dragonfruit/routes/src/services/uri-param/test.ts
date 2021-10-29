import { decodeURIParam, encodeURIParam } from './main';

describe('URI Parameter Encoding', () => {
  // ARIs should be base64 encoded
  test('Encodes ARIs successfully', () => {
    const ari =
      'ari:cloud:graph::service/b481a20a-43b6-11ea-b748-0ec70051ff9e/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = encodeURIParam(ari);

    expect(result).toBe(
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU%3D',
    );
  });

  // UUIDs can be passed through as they are
  test('Encodes UUIDs successfully', () => {
    const uuid = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = encodeURIParam(uuid);

    expect(result).toBe(uuid);
  });

  test('Decodes ARIs successfully', () => {
    const encoded =
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2I0ODFhMjBhLTQzYjYtMTFlYS1iNzQ4LTBlYzcwMDUxZmY5ZS83ZjlhZTM5NC01YzFiLTExZWEtOWE5NS0wZWM3MDA1MWZmOWU%3D';

    const result = decodeURIParam(encoded);

    expect(result).toBe(
      'ari:cloud:graph::service/b481a20a-43b6-11ea-b748-0ec70051ff9e/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
    );
  });

  test('Decodes UUIDs successfully', () => {
    const encoded = '7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

    const result = decodeURIParam(encoded);

    expect(result).toBe(encoded);
  });

  test('Decodes empty url param', () => {
    const encoded = '';

    const result = decodeURIParam(encoded);

    expect(result).toBe('');
  });

  test('Returns undefined when the url param is invalid', () => {
    const encoded =
      'b%3AYXJpOmNsb3VkOmdyYXBoOjpzZXJ2aWNlL2EwNDA4MGI2LTA4MzQtMTFlYi1iMzc0LTBhNzdmM2Y0NTwNC82ODA5YmViMi0yZDUzLTExZWItYjcxMi0xMjhiNDI4MTk0MjQ%3D';

    const result = decodeURIParam(encoded);

    expect(result).toBe(undefined);
  });
});
