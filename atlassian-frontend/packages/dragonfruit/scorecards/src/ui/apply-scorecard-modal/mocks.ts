import { ApplyScorecardToComponentHandledErrors } from '@atlassian/dragonfruit-graphql';

export const MOCK_COMPONENT_ID =
  'ari:cloud:compass:ce51da93-39ab-4c12-9ec8-fb2f124bc119:component/736a3034-98c1-49b5-b2e5-6e6d7310b022/e444e388-93ac-4756-a5b6-f0f88857cf0a';

export const mockApplyScorecardSuccessResolver = () => ({
  Mutation: {
    compass: () => ({
      applyScorecardToComponent: () => {
        return {
          errors: [],
          success: true,
        };
      },
    }),
  },
});

export const mockApplyScorecardNotApplicableResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      applyScorecardToComponent: () => {
        return {
          errors: [
            {
              message:
                ApplyScorecardToComponentHandledErrors.SCORECARD_REQUIRED_NOT_APPLICABLE,
              extensions: {
                statusCode: 422,
                errorType: 'SCORECARD_REQUIRED_NOT_APPLICABLE',
              },
            },
          ],
          success: false,
        };
      },
    }),
  },
});

export const mockApplyScorecardAlreadyAppliedResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      applyScorecardToComponent: () => {
        return {
          errors: [
            {
              message:
                ApplyScorecardToComponentHandledErrors.SCORECARD_ALREADY_APPLIED_TO_COMPONENT,
              extensions: {
                statusCode: 409,
                errorType: 'SCORECARD_ALREADY_APPLIED_TO_COMPONENT',
              },
            },
          ],
          success: false,
        };
      },
    }),
  },
});

export const mockApplyScorecardServerErrorResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      applyScorecardToComponent: () => {
        return {
          errors: [
            {
              message: 'SERVER_ERROR',
              extensions: {
                statusCode: 500,
                errorType: 'SERVER_ERROR',
              },
            },
          ],
          success: false,
        };
      },
    }),
  },
});
