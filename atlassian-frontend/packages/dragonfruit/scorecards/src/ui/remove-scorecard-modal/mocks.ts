export const mockRemoveScorecardSuccessResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      removeScorecardFromComponent: () => {
        return {
          success: true,
          errors: [],
        };
      },
    }),
  },
});

export const mockRemoveScorecardFailureWithPermissionDeniedResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      removeScorecardFromComponent: () => {
        return {
          success: false,
          errors: [
            {
              message:
                "We couldn’t remove the scorecard because it's not applied to the component. Try removing a different scorecard.",
              extensions: {
                statusCode: 403,
                errorType: 'PERMISSION_DENIED',
              },
            },
          ],
          componentDetails: null,
        };
      },
    }),
  },
});

// This handles the following scenarios:
// 1. scorecard is no longer applied to component
// 2. scorecard doesn't exist
// 3. component doesn't exist
export const mockRemoveScorecardScoreCardNotAppliedToComponentFailureResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      removeScorecardFromComponent: () => {
        return {
          success: false,
          errors: [
            {
              message:
                "We couldn’t remove the scorecard because it's not applied to the component. Try removing a different scorecard.",
              extensions: {
                statusCode: 404,
                errorType: 'SCORECARD_NOT_APPLIED_TO_COMPONENT',
              },
            },
          ],
          componentDetails: null,
        };
      },
    }),
  },
});

export const mockRemoveScorecardFailureResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      removeScorecardFromComponent: () => {
        return {
          success: false,
          errors: [
            {
              message: 'some other error',
              extensions: {
                statusCode: 500,
                errorType: 'SERVER_ERROR',
              },
            },
          ],
          componentDetails: null,
        };
      },
    }),
  },
});
