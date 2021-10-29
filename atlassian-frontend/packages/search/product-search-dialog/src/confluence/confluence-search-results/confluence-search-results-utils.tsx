import {
  ConfItemResult,
  ConfSpaceResult,
  ConfPeopleResult,
  ContentType,
  ConfluencePage,
  ConfluenceBlogpost,
} from '../clients/response-types';

import { getTrigger, isNewTab } from '../../common/analytics';
import {
  ResultSectionAnalyticData,
  AdvancedSearchAnalyticsProps,
  AdvancedSearchLinkSubjectId,
} from '../../common/analytics/events';
import React from 'react';
import { B200 } from '@atlaskit/theme/colors';
import BlogIcon16 from '@atlaskit/icon-object/glyph/blog/16';
import PageIcon16 from '@atlaskit/icon-object/glyph/page/16';
import BlogIcon24 from '@atlaskit/icon-object/glyph/blog/24';
import PageIcon24 from '@atlaskit/icon-object/glyph/page/24';

export const getResultsDetailsAnalyticData = (
  itemResults: ConfItemResult[],
  spaceResults: ConfSpaceResult[],
  peopleResults: ConfPeopleResult[],
  isPreQuery: boolean,
) => {
  const resultAnalyticData: ResultSectionAnalyticData[] = [];
  itemResults.length > 0 &&
    resultAnalyticData.push({
      results: itemResults.map((item) => ({
        containerId: item.containerId,
        isRecentResult: item.isRecentResult,
        resultContentId: item.resultId,
        resultType: item.contentType,
      })),
      sectionId: 'confluence-item',
    });

  spaceResults.length > 0 &&
    resultAnalyticData.push({
      results: spaceResults.map((item) => ({
        containerId: 'UNAVAILABLE',
        isRecentResult: isPreQuery,
        resultContentId: item.resultId,
        resultType: item.contentType,
      })),
      sectionId: 'confluence-space',
    });

  peopleResults.length > 0 &&
    resultAnalyticData.push({
      results: peopleResults.map((item) => ({
        containerId: 'UNAVAILABLE',
        isRecentResult: isPreQuery,
        resultContentId: item.resultId,
        resultType: item.contentType,
      })),
      sectionId: 'confluence-people',
    });

  return resultAnalyticData;
};

export const firePeopleSearchSelected = (
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any,
) => {
  advancedSearchSelected({
    trigger: getTrigger(e),
    actionSubjectId: AdvancedSearchLinkSubjectId.CONFLUENCE_PEOPLE,
    isLoading: false,
    newTab: isNewTab(e),
  });
};

export const getAvatarForConfluenceObjectResult = (
  contentType: ContentType,
  name: string,
  largerIcons?: boolean,
) => {
  const props = {
    primaryColor: B200,
    label: name,
  };

  if (contentType === ConfluencePage) {
    return largerIcons ? <PageIcon24 {...props} /> : <PageIcon16 {...props} />;
  } else if (contentType === ConfluenceBlogpost) {
    return largerIcons ? <BlogIcon24 {...props} /> : <BlogIcon16 {...props} />;
  }

  return <></>;
};
