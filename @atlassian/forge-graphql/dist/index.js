"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompassComponentType = exports.CompassEventType = exports.CompassRelationshipType = exports.CompassLinkType = void 0;
const api_1 = require("./api");
const api = new api_1.Api();
exports.default = api;
var graphql_types_1 = require("./graphql-types");
Object.defineProperty(exports, "CompassLinkType", { enumerable: true, get: function () { return graphql_types_1.CompassLinkType; } });
Object.defineProperty(exports, "CompassRelationshipType", { enumerable: true, get: function () { return graphql_types_1.CompassRelationshipType; } });
Object.defineProperty(exports, "CompassEventType", { enumerable: true, get: function () { return graphql_types_1.CompassEventType; } });
Object.defineProperty(exports, "CompassComponentType", { enumerable: true, get: function () { return graphql_types_1.CompassComponentType; } });
//# sourceMappingURL=index.js.map