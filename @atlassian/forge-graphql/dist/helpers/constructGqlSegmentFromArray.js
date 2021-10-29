"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: turn this into a type
function constructGqlSegmentFromArray(items, constructSingleGqlSegment, constructVariablesInput, gqlAcc, componentId) {
    const { mutation, parameters, variables } = items.reduce(({ mutation: accMutation, parameters: accParams, variables: accVariables }, item) => {
        const { mutationGql: singleMutation, params: singleParams, inputId, } = constructSingleGqlSegment();
        accVariables[inputId] = constructVariablesInput(item, componentId);
        return {
            mutation: accMutation + singleMutation,
            parameters: [...accParams, ...singleParams],
            variables: accVariables,
        };
    }, {
        mutation: '',
        parameters: [],
        variables: {},
    });
    return {
        mutation: gqlAcc.mutation + mutation,
        parameters: gqlAcc.parameters.concat(parameters),
        variables: {
            ...gqlAcc.variables,
            ...variables,
        },
    };
}
exports.default = constructGqlSegmentFromArray;
//# sourceMappingURL=constructGqlSegmentFromArray.js.map