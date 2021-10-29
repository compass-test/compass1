import { ALBEvent, Package } from '../../types';

interface QueryStringParameters {
  prId: string;
  commit: string;
}

export enum ReviewerMethod {
  RANDOM = 'random',
  ENTIRE_TEAM = 'entire-team',
}

// Trim 40 characters commit SHAs to a smaller value for brevity within logs
const COMMIT_SHA_LENGTH = 12;
// Less than this and some endpoints fail to resolve requests in large repositories such as monorepos.
const MINIMUM_COMMIT_SHA_LENGTH = 8;

export const extractQueryParams = (
  queryParams: ALBEvent['queryStringParameters'],
): QueryStringParameters | undefined => {
  if (
    !queryParams ||
    !queryParams.prId ||
    !queryParams.commit ||
    queryParams.commit.length < MINIMUM_COMMIT_SHA_LENGTH
  ) {
    return undefined;
  }

  return {
    prId: queryParams.prId,
    commit: queryParams.commit.slice(0, COMMIT_SHA_LENGTH),
  };
};

export interface MetadataBody {
  changedPackages: Package[];
  addReviewers: boolean;
  addComment: boolean;
  reviewerMethod: ReviewerMethod;
}

export const extractMetadataBody = (
  body: ALBEvent['body'],
): MetadataBody | undefined => {
  if (!body) {
    return undefined;
  }
  const parsedBody = JSON.parse(body);
  if (!parsedBody.changedPackages) {
    return undefined;
  }
  const reviewerMethod = Object.values(ReviewerMethod).includes(
    parsedBody.reviewerMethod,
  )
    ? (parsedBody.reviewerMethod as ReviewerMethod)
    : ReviewerMethod.RANDOM;
  return {
    changedPackages: parsedBody.changedPackages,
    addReviewers: !!parsedBody.addReviewers,
    addComment: !!parsedBody.addComment,
    reviewerMethod,
  };
};
