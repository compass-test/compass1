import React, { ComponentProps } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import BoardIcon from '@atlaskit/icon/glyph/board';
import FilterIcon from '@atlaskit/icon/glyph/filter';
import { shallowWithIntl } from '../../../../__tests__/__fixtures__/intl-test-helpers';
import {
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
  createBoardProjectFilterPlanResponse,
  createSingleBoard,
} from '../../../../__tests__/__fixtures__/mock-jira-results';
import {
  IssueSearchResultsList,
  BoardsProjectFiltersSearchResultsList,
} from '../jira-search-results-lists';
import {
  Scope,
  Result,
  AttributeType,
  AttributeFromScope,
} from '../../../clients/response-types';
import { ProductSearchResult } from '../../../../common/product-search-result';

jest.mock('../../../../common/search-session-provider', () =>
  Object.assign(
    {},
    jest.requireActual('../../../../common/search-session-provider'),
    {
      useSearchSessionId: () => '',
    },
  ),
);

jest.mock('../../../../utils/url-utils', () =>
  Object.assign({}, jest.requireActual('../../../../utils/url-utils'), {
    addQuery: (href: string) => href,
  }),
);

jest.mock('../../../../common/analytics', () =>
  Object.assign({}, jest.requireActual('../../../../common/analytics'), {
    useAnalytics: () => ({ fireAnalyticsEvent: jest.fn() }),
  }),
);

jest.mock('../icon', () => 'Icon');

import Icon from '../icon';
import PlanIcon from '../plan-icon';
import { ScreenType, SectionID } from '../../../../common/analytics/events';

type SearchResultProps = ComponentProps<typeof ProductSearchResult>;

describe('SearchResultLists', () => {
  const onSelect = jest.fn();
  const mockEvent: any = {
    preventDefault: () => {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('IssueSearchResultsList', () => {
    const checkResults = (
      wrapper: ShallowWrapper<SearchResultProps>,
      results: Result<AttributeFromScope<Scope.JiraIssue>>[],
      analyticContext: {
        sectionIndex: number;
        totalNumberOfItemsInPreviousSections: number;
      },
    ) => {
      expect(wrapper).toHaveLength(results.length);
      wrapper.forEach((searchResultWrapper, idx) => {
        const {
          name,
          attributes: { key, container, avatar, issueTypeName },
          href,
          resultId,
        } = results[idx];

        expect(searchResultWrapper.props()).toEqual(
          expect.objectContaining({
            label: key,
            title: name,
            icon: <Icon avatar={avatar} alt={issueTypeName} />,
            containerDetail: container?.title ?? '',
            screen: 'postQuerySearchResults',
            analyticContext: {
              sectionId: 'jira-issue',
              sectionIndex: analyticContext.sectionIndex,
              globalIndex:
                analyticContext.totalNumberOfItemsInPreviousSections + idx,
              indexWithinSection: idx,
              containerId: container?.id ?? null,
              isCached: false,
            },
          }),
        );

        const expectedHref = `${href}?searchSessionId=&searchObjectId=${resultId}&searchContainerId=${
          container!.id
        }&searchContentType=issue`;
        expect(searchResultWrapper.prop('href')).toEqual(expectedHref);

        searchResultWrapper.prop('onSelect')?.(mockEvent);
        expect(onSelect).toBeCalledTimes(1);
        expect(onSelect).toBeCalledWith(mockEvent, expectedHref);
        onSelect.mockClear();
      });
    };

    const commonPropsForIssue = {
      onSelect,
      screenType: 'postQuerySearchResults' as ScreenType,
      results: createJiraIssueResponse(3).items,
      analyticContext: {
        sectionIndex: 100,
        totalNumberOfItemsInPreviousSections: 100,
      },
    };

    it(`renders and behaves correctly`, () => {
      const results = createJiraIssueResponse(20).items;
      const wrapper = shallowWithIntl(
        <IssueSearchResultsList {...commonPropsForIssue} results={results} />,
      );
      checkResults(
        wrapper.find(ProductSearchResult),
        results,
        commonPropsForIssue.analyticContext,
      );
    });
  });

  describe('BoardsProjectFiltersSearchResultsList', () => {
    const checkResults = (
      wrapper: ShallowWrapper<SearchResultProps>,
      results: Result<AttributeFromScope<Scope.JiraBoardProjectFilterPlan>>[],
      analyticContext: {
        sectionIndex: number;
        totalNumberOfItemsInPreviousSections: number;
      },
    ) => {
      expect(wrapper).toHaveLength(results.length);
      wrapper.forEach((searchResultWrapper, idx) => {
        const { name, attributes, href, resultId } = results[idx];
        const baseExpectedObject = {
          title: name,
          screen: 'postQuerySearchResults' as ScreenType,
          analyticContext: {
            sectionId: 'jira-board-project-filter' as SectionID,
            sectionIndex: analyticContext.sectionIndex,
            globalIndex:
              analyticContext.totalNumberOfItemsInPreviousSections + idx,
            indexWithinSection: idx,
            containerId: null,
            isCached: false,
          },
        };

        searchResultWrapper.prop('onSelect')?.(mockEvent);
        expect(onSelect).toBeCalledTimes(1);

        switch (attributes['@type']) {
          case AttributeType.board: {
            const expectedHref = `${href}&searchSessionId=&searchObjectId=${resultId}&searchContainerId=${attributes.containerId}&searchContentType=board`;
            expect(searchResultWrapper.props()).toEqual(
              expect.objectContaining<SearchResultProps>({
                ...baseExpectedObject,
                icon: <BoardIcon size="small" label="" />,
                href: expectedHref,
                analyticContext: {
                  sectionId: 'jira-board-project-filter',
                  sectionIndex: analyticContext.sectionIndex,
                  globalIndex:
                    analyticContext.totalNumberOfItemsInPreviousSections + idx,
                  indexWithinSection: idx,
                  containerId: attributes.containerId,
                  isCached: false,
                },
              }),
            );
            expect(onSelect).toBeCalledWith(mockEvent, expectedHref);
            break;
          }
          case AttributeType.project: {
            const expectedHref = `${href}?searchSessionId=&searchObjectId=${resultId}&searchContentType=project`;
            expect(searchResultWrapper.props()).toEqual(
              expect.objectContaining<SearchResultProps>({
                ...baseExpectedObject,
                href: expectedHref,
                icon: (
                  <Icon avatar={attributes.avatar!} alt={expect.anything()} />
                ),
              }),
            );
            expect(onSelect).toBeCalledWith(mockEvent, expectedHref);
            break;
          }
          case AttributeType.filter: {
            const expectedHref = `${href}&searchSessionId=&searchObjectId=${resultId}&searchContentType=filter`;
            expect(searchResultWrapper.props()).toEqual(
              expect.objectContaining<SearchResultProps>({
                ...baseExpectedObject,
                href: expectedHref,
                icon: <FilterIcon size="small" label="" />,
              }),
            );
            expect(onSelect).toBeCalledWith(mockEvent, expectedHref);
            break;
          }
          case AttributeType.plan: {
            const expectedHref = `${href}&searchSessionId=&searchObjectId=${resultId}&searchContentType=plan`;
            expect(searchResultWrapper.props()).toEqual(
              expect.objectContaining<SearchResultProps>({
                ...baseExpectedObject,
                href: expectedHref,
                icon: <PlanIcon label="" />,
              }),
            );
            expect(onSelect).toBeCalledWith(mockEvent, expectedHref);
            break;
          }
          default:
            expect.fail('Found case that was unaccounted for');
        }
        onSelect.mockClear();
      });
    };

    const commonPropsForBoardProjectFilters = {
      onSelect,
      screenType: 'postQuerySearchResults' as ScreenType,
      results: createBoardProjectFilterResponse(3).items,
      analyticContext: {
        sectionIndex: 100,
        totalNumberOfItemsInPreviousSections: 100,
      },
    };

    it(`renders and behaves correctly`, () => {
      const results = createBoardProjectFilterResponse(20).items;
      const wrapper = shallow(
        <BoardsProjectFiltersSearchResultsList
          {...commonPropsForBoardProjectFilters}
          results={results}
        />,
      );
      checkResults(
        wrapper.find(ProductSearchResult),
        results,
        commonPropsForBoardProjectFilters.analyticContext,
      );
    });

    it(`renders and behaves correctly with plans`, () => {
      const results = createBoardProjectFilterPlanResponse(20).items;
      const wrapper = shallow(
        <BoardsProjectFiltersSearchResultsList
          {...commonPropsForBoardProjectFilters}
          results={results}
        />,
      );
      checkResults(
        wrapper.find(ProductSearchResult),
        results,
        commonPropsForBoardProjectFilters.analyticContext,
      );
    });

    it('renders a fallback icon for boards without avatars', () => {
      const results = {
        items: [createSingleBoard()],
      };
      delete results.items[0].attributes.avatar;
      const wrapper = shallow(
        <BoardsProjectFiltersSearchResultsList
          {...commonPropsForBoardProjectFilters}
          results={results.items}
        />,
      );
      expect(wrapper.find(ProductSearchResult).props().icon).toEqual(
        <BoardIcon size="small" label="" />,
      );
    });
  });
});
