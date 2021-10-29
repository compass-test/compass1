import React from 'react';
import { FasterSearchFirstSection } from '../faster-search-first-section';

jest.mock('../../../../query-context', () => ({
  useQuery: jest.fn(),
}));

import { useQuery } from '../../../../query-context';
import { POST_QUERY_ITEMS, PRE_QUERY_ITEMS } from '../../../__mocks__/results';
import { mount } from 'enzyme';
import { EMPTY_SEARCH_ITEMS } from '../result-provider-types';

describe('FasterSearchFirstSection', () => {
  let childCallBack: jest.Mock;

  beforeEach(() => {
    childCallBack = jest.fn(() => <></>);
    (useQuery as jest.Mock).mockImplementation(() => ({ query: 'Confluence' }));
  });

  it('should return filtered pre query items', () => {
    mount(
      <FasterSearchFirstSection
        preQueryItems={PRE_QUERY_ITEMS}
        postQueryItems={EMPTY_SEARCH_ITEMS}
      >
        {childCallBack}
      </FasterSearchFirstSection>,
    );

    expect(childCallBack).toBeCalledWith({
      searchItems: {
        size: 1,
        sections: [
          {
            ...PRE_QUERY_ITEMS.sections[0],
            searchResults: [PRE_QUERY_ITEMS.sections[0].searchResults[0]],
          },
        ],
      },
    });
  });

  it('should return filtered pre query items when post query is empty', () => {
    mount(
      <FasterSearchFirstSection preQueryItems={PRE_QUERY_ITEMS}>
        {childCallBack}
      </FasterSearchFirstSection>,
    );

    expect(childCallBack).toBeCalledWith({
      searchItems: {
        size: 1,
        sections: [
          {
            ...PRE_QUERY_ITEMS.sections[0],
            searchResults: [PRE_QUERY_ITEMS.sections[0].searchResults[0]],
          },
        ],
      },
    });
  });

  it('should return filtered pre query items and append deduped post query to it', () => {
    mount(
      <FasterSearchFirstSection
        preQueryItems={PRE_QUERY_ITEMS}
        postQueryItems={POST_QUERY_ITEMS}
      >
        {childCallBack}
      </FasterSearchFirstSection>,
    );

    expect(childCallBack).toBeCalledWith({
      searchItems: {
        size: 10,
        sections: [
          {
            ...PRE_QUERY_ITEMS.sections[0],
            searchResults: [
              PRE_QUERY_ITEMS.sections[0].searchResults[0],
              ...POST_QUERY_ITEMS.sections[0].searchResults.slice(1, 10),
            ],
          },
        ],
      },
    });
  });

  it('should return post query for no pre query results', () => {
    mount(
      <FasterSearchFirstSection
        preQueryItems={EMPTY_SEARCH_ITEMS}
        postQueryItems={POST_QUERY_ITEMS}
      >
        {childCallBack}
      </FasterSearchFirstSection>,
    );

    expect(childCallBack).toBeCalledWith({
      searchItems: POST_QUERY_ITEMS,
    });
  });

  it('should return nothing when both are empty', () => {
    mount(
      <FasterSearchFirstSection
        preQueryItems={EMPTY_SEARCH_ITEMS}
        postQueryItems={EMPTY_SEARCH_ITEMS}
      >
        {childCallBack}
      </FasterSearchFirstSection>,
    );

    expect(childCallBack).toBeCalledWith({ searchItems: EMPTY_SEARCH_ITEMS });
  });
});
