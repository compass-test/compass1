import { SCREEN } from '../../constants';
import { SourceType } from '../../types';

import { extractContextualData } from './index';

describe('extractContextualData', () => {
  test('should filter out undefined values', () => {
    const obj = { containerType: 'x', objectType: undefined, children: null };
    expect(extractContextualData(obj)).toEqual({ containerType: 'x' });
  });

  test('should merge sourceName and sourceType', () => {
    const obj = {
      sourceName: 'foo',
      sourceType: SCREEN as SourceType,
      children: null,
    };
    expect(extractContextualData(obj)).toEqual({ source: 'fooScreen' });
  });

  test('should  not sent  children to through the  context', () => {
    const obj = {
      sourceName: 'foo',
      sourceType: SCREEN as SourceType,
      children: 'test',
    };
    expect(extractContextualData(obj)).not.toHaveProperty('children');
  });

  test('source should be undefined if there is a piece missing', () => {
    expect(
      extractContextualData({ sourceName: 'foo', children: null }),
    ).toEqual({
      source: undefined,
    });
    expect(
      extractContextualData({
        sourceType: SCREEN as SourceType,
        children: null,
      }),
    ).toEqual({
      source: undefined,
    });
  });
});
