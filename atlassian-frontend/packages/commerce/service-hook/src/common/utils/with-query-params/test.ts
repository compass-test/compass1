import { withQueryParams } from './index';

test('withQueryParams should add multiple query params of string and number type to the url', async () => {
  const result = withQueryParams('/users', {
    name: 'r2d2',
    height: 134,
    white: true,
  });

  expect(result).toEqual('/users?name=r2d2&height=134&white=true');
});

test('withQueryParams should add single query param to the url', async () => {
  const result = withQueryParams('/users', { id: 123 });

  expect(result).toEqual('/users?id=123');
});

test('withQueryParams should add query params to the url ignoring undefined values', async () => {
  const result = withQueryParams('/users', {
    id: 123,
    name: undefined,
    height: undefined,
  });

  expect(result).toEqual('/users?id=123');
});

test('withQueryParams should return input url if there is no query params', async () => {
  const result = withQueryParams('/users', {});

  expect(result).toEqual('/users');
});

test('withQueryParams should return input url if all query params are not defined', async () => {
  const result = withQueryParams('/users', { name: undefined });

  expect(result).toEqual('/users');
});
