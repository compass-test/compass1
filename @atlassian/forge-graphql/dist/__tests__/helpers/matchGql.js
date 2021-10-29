"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCall = void 0;
function findCall(spy, mutationName) {
    return spy.mock.calls.filter((call) => call[0].indexOf(mutationName) !== -1);
}
exports.findCall = findCall;
//# sourceMappingURL=matchGql.js.map