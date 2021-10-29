"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function concatGqlSegments(segments) {
    return segments.reduce(({ mutation: accMutation, variables: accVariables, parameters: accParameters, }, { mutation: singleMutation, variables: singleVariables, parameters: singleParameters, }) => {
        return {
            mutation: `${accMutation}  ${singleMutation}`,
            variables: {
                ...accVariables,
                ...singleVariables,
            },
            parameters: [...accParameters, ...singleParameters],
        };
    }, {
        mutation: '',
        variables: {},
        parameters: [],
    });
}
exports.default = concatGqlSegments;
//# sourceMappingURL=concatGqlSegments.js.map