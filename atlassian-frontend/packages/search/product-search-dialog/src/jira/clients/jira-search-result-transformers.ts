import {
  ContentType,
  Scope,
  ServerResponse,
  Result,
  Results,
  AttributeType,
  AttributeIssue,
} from './response-types';
import { attributeTypeToContentType } from './jira-search-client';
import uniqBy from 'lodash/uniqBy';
import { generatePeopleProfileUrl } from '../../common/clients/multi-site-utils';

export function transformJiraIssueScope(
  response: ServerResponse<Scope.JiraIssue>,
  isCached: boolean,
  timings: number,
): Results<Scope.JiraIssue> {
  const { results, size } = response;
  return {
    items: results.map<Result<AttributeIssue>>((item) => {
      if (item.attributes['@type'] !== AttributeType.issue) {
        throw new Error('Encountered incorrect result data shape.');
      }

      return {
        resultId: item.id,
        name: item.name,
        href: item.url,
        contentType: ContentType.JiraIssue,
        attributes: {
          ...item.attributes,

          // TODO: untangle the isRecentResult and isCached properties
          // Issue ticket: https://product-fabric.atlassian.net/browse/QS-1666
          isRecentResult: isCached,
        },
        isCached,
      };
    }),
    timings,
    totalSize: size || results.length,
  };
}
export function transformJiraPlanScope(
  results: ServerResponse<Scope.JiraPlan>['results'],
  isCached: boolean,
  timings: number,
): Results<Scope.JiraPlan> {
  if (!results) {
    throw new Error(
      `Expected a response but did not get any for scope: ${Scope.JiraPlan}`,
    );
  }

  return {
    items: results.map((item) => {
      return {
        resultId: item.id,
        name: item.name,
        href: item.url,
        contentType: ContentType.JiraPlan,
        attributes: item.attributes,
        isCached,
      };
    }),
    timings,
    totalSize: results.length,
  };
}
export function transformJiraBoardProjectFilterScope(
  results: ServerResponse<Scope.JiraBoardProjectFilterPlan>['results'],
  isCached: boolean,
  timings: number,
): Results<Scope.JiraBoardProjectFilterPlan> {
  return {
    items: results.map((item) => {
      if (
        ![
          AttributeType.board,
          AttributeType.project,
          AttributeType.filter,
          AttributeType.plan,
        ].includes(item.attributes['@type'])
      ) {
        throw new Error('Encountered incorrect result data shape.');
      }

      const contentType = attributeTypeToContentType(
        item.attributes['@type'],
      ) as
        | ContentType.JiraProject
        | ContentType.JiraBoard
        | ContentType.JiraFilter
        | ContentType.JiraPlan;

      return {
        resultId: item.id,
        name: item.name,
        href: item.url,
        contentType: contentType,
        attributes: item.attributes,
        isCached,
      };
    }),
    timings,
    totalSize: results.length,
  };
}
export function transformJiraProjectScope(
  results: ServerResponse<Scope.JiraProject>['results'],
  isCached: boolean,
  timings: number,
): Results<Scope.JiraProject> {
  if (!results) {
    throw new Error(
      `Expected a response but did not get any for scope: ${Scope.JiraProject}`,
    );
  }

  return {
    items: results.map((item) => {
      return {
        resultId: item.id,
        name: item.name,
        href: item.url,
        contentType: ContentType.JiraProject,
        attributes: item.attributes,
        isCached,
      };
    }),
    timings,
    totalSize: results.length,
  };
}
export function transformUrsPeople(
  results: ServerResponse<Scope.People>['results'] | undefined,
  isCached: boolean,
  timings: number,
  isMultiSite: boolean,
): Results<Scope.People> {
  if (!results) {
    throw new Error(
      `Expected a response but did not get any for scope: ${Scope.People}`,
    );
  }

  return {
    items: uniqBy(results, (item) => item.id).map((item) => ({
      resultId: item.id,
      name: item.name,
      href: generatePeopleProfileUrl(
        isMultiSite,
        item.absoluteUrl,
        item.id,
        'jira',
      ),
      contentType: ContentType.JiraPeople,
      attributes: {
        '@type': AttributeType.people,
        avatarUrl: item.avatarUrl,
        userId: item.id,
      },
      isCached,
    })),
    timings,
    totalSize: results.length,
  };
}
