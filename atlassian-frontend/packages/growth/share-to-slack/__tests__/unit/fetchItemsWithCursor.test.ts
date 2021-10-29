import fetchMock from 'fetch-mock/cjs/client';
import property from 'lodash/property';

import {
  fetchItemsWithCursor,
  FetchItemsWithCursorResult,
  httpRetryPolicy,
} from '../../src/common/slack-service/util';

function expectedPages(pageCount: number) {
  const pages = Array.from({ length: pageCount }, (_, i) => ({
    items: Array.from({ length: i + 2 }, (_, j) => i + j),
    cursor: `${i}`,
  }));

  delete pages[pageCount - 1].cursor;

  return pages;
}

type Response = {
  items: number[];
  cursor?: string;
};

const getItems = property<Response, number[]>('items');
const getCursor = property<Response, string>('cursor');

describe('fetchItemsWithCursor', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('one page only', () => {
    let result: FetchItemsWithCursorResult<number>;

    beforeEach(async () => {
      const pages = expectedPages(1);

      fetchMock.mock('/test', { body: pages[0], status: 200 });
      result = await fetchItemsWithCursor<Response, number>({
        url: '/test',
        getItems,
        getCursor,
      });
    });

    it('returns the expected results', () => {
      expect(result).toEqual({
        ok: true,
        items: [0, 1],
        pages: 1,
      });
    });
  });

  describe('three pages', () => {
    let result: FetchItemsWithCursorResult<number>;

    beforeEach(async () => {
      const pages = expectedPages(3);

      fetchMock.mock('/test', { body: pages[0], status: 200 });
      fetchMock.mock('/test?cursor=0', { body: pages[1], status: 200 });
      fetchMock.mock('/test?cursor=1', { body: pages[2], status: 200 });
      result = await fetchItemsWithCursor<Response, number>({
        url: '/test',
        getItems,
        getCursor,
      });
    });

    it('returns the expected results', () => {
      expect(result).toEqual({
        ok: true,
        items: [0, 1, 1, 2, 3, 2, 3, 4, 5],
        pages: 3,
      });
    });
  });

  describe('two pages, but the last page failed', () => {
    let result: FetchItemsWithCursorResult<number>;

    beforeEach(async () => {
      const pages = expectedPages(2);

      fetchMock.mock('/test', { body: pages[0], status: 200 });
      fetchMock.mock('/test?cursor=0', { body: {}, status: 400 });
      result = await fetchItemsWithCursor<Response, number>({
        url: '/test',
        getItems,
        getCursor,
      });
    });

    it('returns the expected results', () => {
      expect(result).toEqual({
        ok: false,
        aborted: false,
        page: 1,
        status: 400,
        code: '400',
        message: 'Bad Request',
      });
    });
  });

  describe('three pages with one retry', () => {
    let result: FetchItemsWithCursorResult<number>;

    beforeEach(async () => {
      const pages = expectedPages(3);
      let errors = 0;

      fetchMock.mock('/test', { body: pages[0], status: 200 });
      fetchMock.mock('/test?cursor=0', () => {
        // Fail the first time
        if (errors === 0) {
          ++errors;
          return { body: {}, status: 400 };
        }
        // Succeed the 2nd time
        return { body: pages[1], status: 200 };
      });
      fetchMock.mock('/test?cursor=1', { body: pages[2], status: 200 });
      result = await fetchItemsWithCursor<Response, number>({
        url: '/test',
        getItems,
        getCursor,
        canRetry: httpRetryPolicy(),
      });
    });

    it('returns the expected results', () => {
      expect(result).toEqual({
        ok: true,
        items: [0, 1, 1, 2, 3, 2, 3, 4, 5],
        pages: 3,
      });
    });
  });
});
