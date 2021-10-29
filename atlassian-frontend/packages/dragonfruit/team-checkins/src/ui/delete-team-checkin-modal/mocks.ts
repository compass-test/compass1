export const mockDeleteTeamCheckinSuccessResolver = () => ({
  MutationErrorExtension: {
    __resolveType: (obj: any, context: any, info: any) => {
      return 'GenericMutationErrorExtension';
    },
  },
  Mutation: {
    compass: () => ({
      deleteTeamCheckin: () => {
        return {
          success: true,
          errors: [],
        };
      },
    }),
  },
});
