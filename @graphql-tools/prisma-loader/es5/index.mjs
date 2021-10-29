import { __awaiter, __generator, __values, __assign, __read, __extends, __spreadArray } from 'tslib';
import { UrlLoader } from '@graphql-tools/url-loader/es5';
import _ from 'lodash';
import { URL as URL$1 } from 'url';
import 'isomorphic-fetch';
import jwt from 'jsonwebtoken';
import { GraphQLClient } from 'graphql-request';
import chalk from 'chalk';
import HttpsProxyAgent from 'https-proxy-agent';
import HttpProxyAgent from 'http-proxy-agent';
import debugPkg from 'debug';
import { load, dump } from 'js-yaml';
import { accessSync, readFileSync, writeFileSync, mkdirSync, promises } from 'fs';
import replaceall from 'replaceall';
import { config } from 'dotenv';
import { join, dirname, resolve } from 'path';
import { safeLoad } from 'yaml-ast-parser';
import { homedir } from 'os';
import { cwd } from 'process';

var cloudApiEndpoint = process.env['CLOUD_API_ENDPOINT'] || 'https://api.cloud.prisma.sh';
var clusterEndpointMap = {
    'prisma-eu1': 'https://eu1.prisma.sh',
    'prisma-us1': 'https://us1.prisma.sh',
};
var clusterEndpointMapReverse = _.invert(clusterEndpointMap);

function getClusterName(origin) {
    if (clusterEndpointMapReverse[origin]) {
        return clusterEndpointMapReverse[origin];
    }
    if (origin.endsWith('prisma.sh')) {
        return origin.split('_')[0].replace(/https?:\/\//, '');
    }
    if (isLocal(origin)) {
        return 'local';
    }
    return 'default';
}
var getWorkspaceFromPrivateOrigin = function (origin) {
    var split = origin.split('_');
    if (split.length > 1) {
        return split[1].split('.')[0];
    }
    return null;
};
var isLocal = function (origin) { return origin.includes('localhost') || origin.includes('127.0.0.1'); };
function parseEndpoint(endpoint) {
    /*
      Terminology:
        local - hosted locally using docker and accessed using localhost or prisma or local web proxy like domain.dev
        shared - demo server
        isPrivate - private hosted by Prisma or private and self-hosted, important that in our terminology a local server is not private
    */
    var url = new URL$1(endpoint);
    var splittedPath = url.pathname.split('/');
    // assuming, that the pathname always starts with a leading /, we always can ignore the first element of the split array
    var service = splittedPath.length > 3 ? splittedPath[2] : splittedPath[1] || 'default';
    var stage = splittedPath.length > 3 ? splittedPath[3] : splittedPath[2] || 'default';
    // This logic might break for self-hosted servers incorrectly yielding a "workspace" simply if the UX has
    // enough "/"es like if https://custom.dev/not-a-workspace/ is the base Prisma URL then for default/default service/stage
    // pair. This function would incorrectly return not-a-workspace as a workspace.
    var workspaceSlug = splittedPath.length > 3 ? splittedPath[1] : null;
    var shared = ['eu1.prisma.sh', 'us1.prisma.sh'].includes(url.host);
    // When using localAliases, do an exact match because of 'prisma' option which is added for local docker networking access
    var localAliases = ['localhost', '127.0.0.1', 'prisma'];
    var isPrivate = !shared && !localAliases.includes(url.hostname);
    var local = !shared && !isPrivate && !workspaceSlug;
    if (isPrivate && !workspaceSlug) {
        workspaceSlug = getWorkspaceFromPrivateOrigin(url.origin);
    }
    return {
        clusterBaseUrl: url.origin,
        service: service,
        stage: stage,
        local: local,
        isPrivate: isPrivate,
        shared: shared,
        workspaceSlug: workspaceSlug,
        clusterName: getClusterName(url.origin),
    };
}

// code from https://raw.githubusercontent.com/request/request/5ba8eb44da7cd639ca21070ea9be20d611b85f66/lib/getProxyFromURI.js
function formatHostname(hostname) {
    // canonicalize the hostname, so that 'oogle.com' won't match 'google.com'
    return hostname.replace(/^\.*/, '.').toLowerCase();
}
function parseNoProxyZone(zone) {
    zone = zone.trim().toLowerCase();
    var zoneParts = zone.split(':', 2);
    var zoneHost = formatHostname(zoneParts[0]);
    var zonePort = zoneParts[1];
    var hasPort = zone.indexOf(':') > -1;
    return { hostname: zoneHost, port: zonePort, hasPort: hasPort };
}
function uriInNoProxy(uri, noProxy) {
    var port = uri.port || (uri.protocol === 'https:' ? '443' : '80');
    var hostname = formatHostname(uri.hostname);
    var noProxyList = noProxy.split(',');
    // iterate through the noProxyList until it finds a match.
    return noProxyList.map(parseNoProxyZone).some(function (noProxyZone) {
        var isMatchedAt = hostname.indexOf(noProxyZone.hostname);
        var hostnameMatched = isMatchedAt > -1 && isMatchedAt === hostname.length - noProxyZone.hostname.length;
        if (noProxyZone.hasPort) {
            return port === noProxyZone.port && hostnameMatched;
        }
        return hostnameMatched;
    });
}
function getProxyFromURI(uri) {
    // Decide the proper request proxy to use based on the request URI object and the
    // environmental variables (NO_PROXY, HTTP_PROXY, etc.)
    // respect NO_PROXY environment variables (see: http://lynx.isc.org/current/breakout/lynx_help/keystrokes/environments.html)
    var noProxy = process.env['NO_PROXY'] || process.env['no_proxy'] || '';
    // if the noProxy is a wildcard then return null
    if (noProxy === '*') {
        return null;
    }
    // if the noProxy is not empty and the uri is found return null
    if (noProxy !== '' && uriInNoProxy(uri, noProxy)) {
        return null;
    }
    // Check for HTTP or HTTPS Proxy in environment Else default to null
    if (uri.protocol === 'http:') {
        return process.env['HTTP_PROXY'] || process.env['http_proxy'] || null;
    }
    if (uri.protocol === 'https:') {
        return (process.env['HTTPS_PROXY'] ||
            process.env['https_proxy'] ||
            process.env['HTTP_PROXY'] ||
            process.env['http_proxy'] ||
            null);
    }
    // if none of that works, return null
    // (What uri protocol are you using then?)
    return null;
}
function getProxyAgent(url) {
    var uri = new URL(url);
    var proxy = getProxyFromURI(uri);
    if (!proxy) {
        return undefined;
    }
    var proxyUri = new URL(proxy);
    if (proxyUri.protocol === 'http:') {
        // eslint-disable-next-line
        // @ts-ignore
        return new HttpProxyAgent(proxy);
    }
    if (proxyUri.protocol === 'https:') {
        // eslint-disable-next-line
        // @ts-ignore
        return new HttpsProxyAgent(proxy);
    }
    return undefined;
}

var debug = debugPkg('Environment');
var Cluster = /** @class */ (function () {
    function Cluster(out, name, baseUrl, clusterSecret, local, shared, isPrivate, workspaceSlug) {
        if (local === void 0) { local = true; }
        if (shared === void 0) { shared = false; }
        if (isPrivate === void 0) { isPrivate = false; }
        this.out = out;
        this.name = name;
        // All `baseUrl` extension points in this class
        // adds a trailing slash. Here we remove it from
        // the passed `baseUrl` in order to avoid double
        // slashes.
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.clusterSecret = clusterSecret;
        this.local = local;
        this.shared = shared;
        this.isPrivate = isPrivate;
        this.workspaceSlug = workspaceSlug;
        this.hasOldDeployEndpoint = false;
    }
    Cluster.prototype.getToken = function (serviceName, workspaceSlug, stageName) {
        return __awaiter(this, void 0, void 0, function () {
            var needsAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.needsAuth()];
                    case 1:
                        needsAuth = _a.sent();
                        debug({ needsAuth: needsAuth });
                        if (!needsAuth) {
                            return [2 /*return*/, null];
                        }
                        if (this.name === 'shared-public-demo') {
                            return [2 /*return*/, ''];
                        }
                        if (this.isPrivate && process.env['PRISMA_MANAGEMENT_API_SECRET']) {
                            return [2 /*return*/, this.getLocalToken()];
                        }
                        if (this.shared || (this.isPrivate && !process.env['PRISMA_MANAGEMENT_API_SECRET'])) {
                            return [2 /*return*/, this.generateClusterToken(serviceName, workspaceSlug, stageName)];
                        }
                        else {
                            return [2 /*return*/, this.getLocalToken()];
                        }
                }
            });
        });
    };
    Cluster.prototype.getLocalToken = function () {
        if (!this.clusterSecret && !process.env['PRISMA_MANAGEMENT_API_SECRET']) {
            return null;
        }
        if (!this.cachedToken) {
            var grants = [{ target: "*/*", action: '*' }];
            var secret = process.env['PRISMA_MANAGEMENT_API_SECRET'] || this.clusterSecret;
            if (!secret) {
                throw new Error("Could not generate token for cluster " + chalk.bold(this.getDeployEndpoint()) + ". Did you provide the env var PRISMA_MANAGEMENT_API_SECRET?");
            }
            try {
                var algorithm = process.env['PRISMA_MANAGEMENT_API_SECRET'] ? 'HS256' : 'RS256';
                this.cachedToken = jwt.sign({ grants: grants }, secret, {
                    expiresIn: '5y',
                    algorithm: algorithm,
                });
            }
            catch (e) {
                throw new Error("Could not generate token for cluster " + chalk.bold(this.getDeployEndpoint()) + ".\nOriginal error: " + e.message);
            }
        }
        return this.cachedToken;
    };
    Object.defineProperty(Cluster.prototype, "cloudClient", {
        get: function () {
            return new GraphQLClient(cloudApiEndpoint, {
                headers: {
                    Authorization: "Bearer " + this.clusterSecret,
                },
                agent: getProxyAgent(cloudApiEndpoint),
            });
        },
        enumerable: false,
        configurable: true
    });
    Cluster.prototype.generateClusterToken = function (serviceName, workspaceSlug, stageName) {
        if (workspaceSlug === void 0) { workspaceSlug = this.workspaceSlug || '*'; }
        return __awaiter(this, void 0, void 0, function () {
            var query, clusterToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      mutation ($input: GenerateClusterTokenRequest!) {\n        generateClusterToken(input: $input) {\n          clusterToken\n        }\n      }\n    ";
                        return [4 /*yield*/, this.cloudClient.request(query, {
                                input: {
                                    workspaceSlug: workspaceSlug,
                                    clusterName: this.name,
                                    serviceName: serviceName,
                                    stageName: stageName,
                                },
                            })];
                    case 1:
                        clusterToken = (_a.sent()).generateClusterToken.clusterToken;
                        return [2 /*return*/, clusterToken];
                }
            });
        });
    };
    Cluster.prototype.addServiceToCloudDBIfMissing = function (serviceName, workspaceSlug, stageName) {
        if (workspaceSlug === void 0) { workspaceSlug = this.workspaceSlug; }
        return __awaiter(this, void 0, void 0, function () {
            var query, serviceCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      mutation ($input: GenerateClusterTokenRequest!) {\n        addServiceToCloudDBIfMissing(input: $input)\n      }\n    ";
                        return [4 /*yield*/, this.cloudClient.request(query, {
                                input: {
                                    workspaceSlug: workspaceSlug,
                                    clusterName: this.name,
                                    serviceName: serviceName,
                                    stageName: stageName,
                                },
                            })];
                    case 1:
                        serviceCreated = _a.sent();
                        return [2 /*return*/, serviceCreated.addServiceToCloudDBIfMissing];
                }
            });
        });
    };
    Cluster.prototype.getApiEndpoint = function (service, stage, workspaceSlug) {
        if (!this.shared && service === 'default' && stage === 'default') {
            return this.baseUrl;
        }
        if (!this.shared && stage === 'default') {
            return this.baseUrl + "/" + service;
        }
        if (this.isPrivate || this.local) {
            return this.baseUrl + "/" + service + "/" + stage;
        }
        var workspaceString = workspaceSlug ? workspaceSlug + "/" : '';
        return this.baseUrl + "/" + workspaceString + service + "/" + stage;
    };
    Cluster.prototype.getWSEndpoint = function (service, stage, workspaceSlug) {
        return this.getApiEndpoint(service, stage, workspaceSlug).replace(/^http/, 'ws');
    };
    Cluster.prototype.getImportEndpoint = function (service, stage, workspaceSlug) {
        return this.getApiEndpoint(service, stage, workspaceSlug) + "/import";
    };
    Cluster.prototype.getExportEndpoint = function (service, stage, workspaceSlug) {
        return this.getApiEndpoint(service, stage, workspaceSlug) + "/export";
    };
    Cluster.prototype.getDeployEndpoint = function () {
        return this.baseUrl + "/" + (this.hasOldDeployEndpoint ? 'cluster' : 'management');
    };
    Cluster.prototype.isOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersion()];
                    case 1:
                        version = _a.sent();
                        return [2 /*return*/, typeof version === 'string'];
                }
            });
        });
    };
    Cluster.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, res, data, errors, e_1, result, res, data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.request("{\n        serverInfo {\n          version\n        }\n      }")];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        res = _a.sent();
                        data = res.data, errors = res.errors;
                        if (!(errors && errors[0].code === 3016 && errors[0].message.includes('management@default'))) return [3 /*break*/, 4];
                        this.hasOldDeployEndpoint = true;
                        return [4 /*yield*/, this.getVersion()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (data && data.serverInfo) {
                            return [2 /*return*/, data.serverInfo.version];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        debug(e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, this.request("{\n        serverInfo {\n          version\n        }\n      }")];
                    case 7:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 8:
                        res = _a.sent();
                        data = res.data;
                        return [2 /*return*/, data.serverInfo.version];
                    case 9:
                        e_2 = _a.sent();
                        debug(e_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, null];
                }
            });
        });
    };
    Cluster.prototype.request = function (query, variables) {
        return fetch(this.getDeployEndpoint(), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
            agent: getProxyAgent(this.getDeployEndpoint()),
        });
    };
    Cluster.prototype.needsAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.request("{\n        listProjects {\n          name\n        }\n      }")];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        if (data.errors && data.errors.length > 0) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        e_3 = _a.sent();
                        debug('Assuming that the server needs authentication');
                        debug(e_3.toString());
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Cluster.prototype.toJSON = function () {
        return {
            name: this.name,
            baseUrl: this.baseUrl,
            local: this.local,
            clusterSecret: this.clusterSecret,
            shared: this.shared,
            isPrivate: this.isPrivate,
            workspaceSlug: this.workspaceSlug,
        };
    };
    return Cluster;
}());

var Output = /** @class */ (function () {
    function Output() {
    }
    Output.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    Output.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn(args);
    };
    Output.prototype.getErrorPrefix = function (fileName, type) {
        if (type === void 0) { type = 'error'; }
        return "[" + type.toUpperCase() + "] in " + fileName + ": ";
    };
    return Output;
}());

var Variables = /** @class */ (function () {
    function Variables(fileName, options, out, envVars) {
        if (options === void 0) { options = {}; }
        if (out === void 0) { out = new Output(); }
        this.overwriteSyntax = /,/g;
        this.envRefSyntax = /^env:/g;
        this.selfRefSyntax = /^self:/g;
        this.stringRefSyntax = /('.*')|(".*")/g;
        this.optRefSyntax = /^opt:/g;
        // eslint-disable-next-line
        this.variableSyntax = new RegExp(
        // eslint-disable-next-line
        '\\${([ ~:a-zA-Z0-9._\'",\\-\\/\\(\\)]+?)}', 'g');
        this.out = out;
        this.fileName = fileName;
        this.options = options;
        this.envVars = envVars || process.env;
    }
    Variables.prototype.populateJson = function (json) {
        var _this = this;
        this.json = json;
        return this.populateObject(this.json).then(function () {
            return Promise.resolve(_this.json);
        });
    };
    Variables.prototype.populateObject = function (objectToPopulate) {
        var _this = this;
        var populateAll = [];
        var deepMapValues = function (object, callback, propertyPath) {
            var deepMapValuesIteratee = function (value, key) {
                return deepMapValues(value, callback, propertyPath ? propertyPath.concat(key) : [key]);
            };
            if (_.isArray(object)) {
                return _.map(object, deepMapValuesIteratee);
            }
            else if (_.isObject(object) && !_.isDate(object) && !_.isFunction(object)) {
                return _.extend({}, object, _.mapValues(object, deepMapValuesIteratee));
            }
            return callback(object, propertyPath);
        };
        deepMapValues(objectToPopulate, function (property, propertyPath) {
            if (typeof property === 'string') {
                var populateSingleProperty = _this.populateProperty(property, true).then(function (newProperty) {
                    return _.set(objectToPopulate, propertyPath, newProperty);
                });
                populateAll.push(populateSingleProperty);
            }
        });
        return Promise.all(populateAll).then(function () { return objectToPopulate; });
    };
    Variables.prototype.populateProperty = function (propertyParam, populateInPlace) {
        var e_1, _a;
        var _this = this;
        var property = populateInPlace ? propertyParam : _.cloneDeep(propertyParam);
        var allValuesToPopulate = [];
        var warned = false;
        if (typeof property === 'string' && property.match(this.variableSyntax)) {
            var matchedStrings = property.match(this.variableSyntax);
            if (matchedStrings) {
                var _loop_1 = function (matchedString) {
                    var variableString = matchedString
                        .replace(this_1.variableSyntax, function (_, varName) { return varName.trim(); })
                        .replace(/\s/g, '');
                    var singleValueToPopulate = null;
                    if (variableString.match(this_1.overwriteSyntax)) {
                        singleValueToPopulate = this_1.overwrite(variableString);
                    }
                    else {
                        singleValueToPopulate = this_1.getValueFromSource(variableString).then(function (valueToPopulate) {
                            if (typeof valueToPopulate === 'object') {
                                return _this.populateObject(valueToPopulate);
                            }
                            return valueToPopulate;
                        });
                    }
                    singleValueToPopulate = singleValueToPopulate.then(function (valueToPopulate) {
                        if (_this.warnIfNotFound(variableString, valueToPopulate)) {
                            warned = true;
                        }
                        return _this.populateVariable(property, matchedString, valueToPopulate).then(function (newProperty) {
                            property = newProperty;
                            return Promise.resolve(property);
                        });
                    });
                    allValuesToPopulate.push(singleValueToPopulate);
                };
                var this_1 = this;
                try {
                    for (var matchedStrings_1 = __values(matchedStrings), matchedStrings_1_1 = matchedStrings_1.next(); !matchedStrings_1_1.done; matchedStrings_1_1 = matchedStrings_1.next()) {
                        var matchedString = matchedStrings_1_1.value;
                        _loop_1(matchedString);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (matchedStrings_1_1 && !matchedStrings_1_1.done && (_a = matchedStrings_1.return)) _a.call(matchedStrings_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return Promise.all(allValuesToPopulate).then(function () {
                if (property !== _this.json && !warned) {
                    return _this.populateProperty(property);
                }
                return Promise.resolve(property);
            });
        }
        return Promise.resolve(property);
    };
    Variables.prototype.populateVariable = function (propertyParam, matchedString, valueToPopulate) {
        var property = propertyParam;
        if (typeof valueToPopulate === 'string') {
            property = replaceall(matchedString, valueToPopulate, property);
        }
        else {
            if (property !== matchedString) {
                if (typeof valueToPopulate === 'number') {
                    property = replaceall(matchedString, String(valueToPopulate), property);
                }
                else {
                    var errorMessage = [
                        'Trying to populate non string value into',
                        " a string for variable " + matchedString + ".",
                        ' Please make sure the value of the property is a string.',
                    ].join('');
                    this.out.warn(this.out.getErrorPrefix(this.fileName, 'warning') + errorMessage);
                }
                return Promise.resolve(property);
            }
            property = valueToPopulate;
        }
        return Promise.resolve(property);
    };
    Variables.prototype.overwrite = function (variableStringsString) {
        var _this = this;
        var finalValue;
        var variableStringsArray = variableStringsString.split(',');
        var allValuesFromSource = variableStringsArray.map(function (variableString) {
            return _this.getValueFromSource(variableString);
        });
        return Promise.all(allValuesFromSource).then(function (valuesFromSources) {
            valuesFromSources.find(function (valueFromSource) {
                finalValue = valueFromSource;
                return (finalValue !== null &&
                    typeof finalValue !== 'undefined' &&
                    !(typeof finalValue === 'object' && _.isEmpty(finalValue)));
            });
            return Promise.resolve(finalValue);
        });
    };
    Variables.prototype.getValueFromSource = function (variableString) {
        if (variableString.match(this.envRefSyntax)) {
            return this.getValueFromEnv(variableString);
        }
        else if (variableString.match(this.optRefSyntax)) {
            return this.getValueFromOptions(variableString);
        }
        else if (variableString.match(this.selfRefSyntax)) {
            return this.getValueFromSelf(variableString);
        }
        else if (variableString.match(this.stringRefSyntax)) {
            return this.getValueFromString(variableString);
        }
        var errorMessage = [
            "Invalid variable reference syntax for variable " + variableString + ".",
            ' You can only reference env vars, options, & files.',
            ' You can check our docs for more info.',
        ].join('');
        this.out.warn(this.out.getErrorPrefix(this.fileName, 'warning') + errorMessage);
        return Promise.resolve();
    };
    Variables.prototype.getValueFromEnv = function (variableString) {
        var requestedEnvVar = variableString.split(':')[1];
        var valueToPopulate = requestedEnvVar !== '' || '' in this.envVars ? this.envVars[requestedEnvVar] : this.envVars;
        return Promise.resolve(valueToPopulate);
    };
    Variables.prototype.getValueFromString = function (variableString) {
        var valueToPopulate = variableString.replace(/^['"]|['"]$/g, '');
        return Promise.resolve(valueToPopulate);
    };
    Variables.prototype.getValueFromOptions = function (variableString) {
        var requestedOption = variableString.split(':')[1];
        var valueToPopulate = requestedOption !== '' || '' in this.options ? this.options[requestedOption] : this.options;
        return Promise.resolve(valueToPopulate);
    };
    Variables.prototype.getValueFromSelf = function (variableString) {
        var valueToPopulate = this.json;
        var deepProperties = variableString.split(':')[1].split('.');
        return this.getDeepValue(deepProperties, valueToPopulate);
    };
    Variables.prototype.getDeepValue = function (deepProperties, valueToPopulate) {
        var _this = this;
        return promiseReduce(deepProperties, function (computedValueToPopulateParam, subProperty) {
            var computedValueToPopulate = computedValueToPopulateParam;
            if (typeof computedValueToPopulate === 'undefined') {
                computedValueToPopulate = {};
            }
            else if (subProperty !== '' || '' in computedValueToPopulate) {
                computedValueToPopulate = computedValueToPopulate[subProperty];
            }
            if (typeof computedValueToPopulate === 'string' && computedValueToPopulate.match(_this.variableSyntax)) {
                return _this.populateProperty(computedValueToPopulate);
            }
            return Promise.resolve(computedValueToPopulate);
        }, valueToPopulate);
    };
    Variables.prototype.warnIfNotFound = function (variableString, valueToPopulate) {
        if (valueToPopulate === null ||
            typeof valueToPopulate === 'undefined' ||
            (typeof valueToPopulate === 'object' && _.isEmpty(valueToPopulate))) {
            var varType = void 0;
            if (variableString.match(this.envRefSyntax)) {
                varType = 'environment variable';
            }
            else if (variableString.match(this.optRefSyntax)) {
                varType = 'option';
            }
            else if (variableString.match(this.selfRefSyntax)) {
                varType = 'self reference';
            }
            this.out.warn(this.out.getErrorPrefix(this.fileName, 'warning') +
                ("A valid " + varType + " to satisfy the declaration '" + variableString + "' could not be found."));
            return true;
        }
        return false;
    };
    return Variables;
}());
function promiseReduce(values, callback, initialValue) {
    return values.reduce(function (previous, value) {
        return isPromise(previous) ? previous.then(function (resolved) { return callback(resolved, value); }) : callback(previous, value);
    }, initialValue);
}
function isPromise(value) {
    var _a;
    return typeof ((_a = value) === null || _a === void 0 ? void 0 : _a.then) === 'function';
}

function readDefinition(filePath, args, out, envVars, _graceful) {
    if (out === void 0) { out = new Output(); }
    return __awaiter(this, void 0, void 0, function () {
        var file, json, jsonCopy, vars, populatedJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        accessSync(filePath);
                    }
                    catch (_b) {
                        throw new Error(filePath + " could not be found.");
                    }
                    file = readFileSync(filePath, 'utf-8');
                    json = load(file);
                    jsonCopy = __assign({}, json);
                    vars = new Variables(filePath, args, out, envVars);
                    return [4 /*yield*/, vars.populateJson(json)];
                case 1:
                    populatedJson = _a.sent();
                    if (populatedJson.custom) {
                        delete populatedJson.custom;
                    }
                    return [2 /*return*/, {
                            definition: populatedJson,
                            rawJson: jsonCopy,
                        }];
            }
        });
    });
}

/**
 * Comments out the current entry of a specific key in a yaml document and creates a new value next to it
 * @param key key in yaml document to comment out
 * @param newValue new value to add in the document
 */
function replaceYamlValue(input, key, newValue) {
    var ast = safeLoad(input);
    var position = getPosition(ast, key);
    var newEntry = key + ": " + newValue + "\n";
    if (!position) {
        return input + '\n' + newEntry;
    }
    return (input.slice(0, position.start) +
        '#' +
        input.slice(position.start, position.end) +
        newEntry +
        input.slice(position.end));
}
function getPosition(ast, key) {
    var mapping = ast.mappings.find(function (m) { return m.key.value === key; });
    if (!mapping) {
        return undefined;
    }
    return {
        start: mapping.startPosition,
        end: mapping.endPosition + 1,
    };
}

var PrismaDefinitionClass = /** @class */ (function () {
    function PrismaDefinitionClass(env, definitionPath, envVars, out) {
        if (envVars === void 0) { envVars = process.env; }
        this.secrets = null;
        this.definitionPath = definitionPath;
        if (definitionPath) {
            this.definitionDir = dirname(definitionPath);
        }
        this.env = env;
        this.out = out;
        this.envVars = envVars;
    }
    PrismaDefinitionClass.prototype.load = function (args, envPath, graceful) {
        return __awaiter(this, void 0, void 0, function () {
            var flagPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args['project']) return [3 /*break*/, 2];
                        flagPath = resolve(String(args['project']));
                        try {
                            accessSync(flagPath);
                        }
                        catch (_b) {
                            throw new Error("Prisma definition path specified by --project '" + flagPath + "' does not exist");
                        }
                        this.definitionPath = flagPath;
                        this.definitionDir = dirname(flagPath);
                        return [4 /*yield*/, this.loadDefinition(args, graceful)];
                    case 1:
                        _a.sent();
                        this.validate();
                        return [2 /*return*/];
                    case 2:
                        if (envPath) {
                            try {
                                accessSync(envPath);
                            }
                            catch (_c) {
                                envPath = join(process.cwd(), envPath);
                            }
                            try {
                                accessSync(envPath);
                            }
                            catch (_d) {
                                throw new Error("--env-file path '" + envPath + "' does not exist");
                            }
                        }
                        config({ path: envPath });
                        if (!this.definitionPath) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadDefinition(args, graceful)];
                    case 3:
                        _a.sent();
                        this.validate();
                        return [3 /*break*/, 5];
                    case 4: throw new Error("Couldn\u2019t find `prisma.yml` file. Are you in the right directory?");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PrismaDefinitionClass.prototype.loadDefinition = function (args, graceful) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, definition, rawJson, secrets;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, readDefinition(this.definitionPath, args, this.out, this.envVars)];
                    case 1:
                        _a = _b.sent(), definition = _a.definition, rawJson = _a.rawJson;
                        this.rawEndpoint = rawJson.endpoint;
                        this.definition = definition;
                        this.rawJson = rawJson;
                        this.definitionString = readFileSync(this.definitionPath, 'utf-8');
                        this.typesString = this.getTypesString(this.definition);
                        secrets = this.definition.secret;
                        this.secrets = secrets ? secrets.replace(/\s/g, '').split(',') : null;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PrismaDefinitionClass.prototype, "endpoint", {
        get: function () {
            return (this.definition && this.definition.endpoint) || process.env['PRISMA_MANAGEMENT_API_ENDPOINT'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrismaDefinitionClass.prototype, "clusterBaseUrl", {
        get: function () {
            if (!this.definition || !this.endpoint) {
                return undefined;
            }
            var clusterBaseUrl = parseEndpoint(this.endpoint).clusterBaseUrl;
            return clusterBaseUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrismaDefinitionClass.prototype, "service", {
        get: function () {
            if (!this.definition) {
                return undefined;
            }
            if (!this.endpoint) {
                return undefined;
            }
            var service = parseEndpoint(this.endpoint).service;
            return service;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrismaDefinitionClass.prototype, "stage", {
        get: function () {
            if (!this.definition) {
                return undefined;
            }
            if (!this.endpoint) {
                return undefined;
            }
            var stage = parseEndpoint(this.endpoint).stage;
            return stage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrismaDefinitionClass.prototype, "cluster", {
        get: function () {
            if (!this.definition) {
                return undefined;
            }
            if (!this.endpoint) {
                return undefined;
            }
            var clusterName = parseEndpoint(this.endpoint).clusterName;
            return clusterName;
        },
        enumerable: false,
        configurable: true
    });
    PrismaDefinitionClass.prototype.validate = function () {
        // shared clusters need a workspace
        var clusterName = this.getClusterName();
        var cluster = this.env.clusterByName(clusterName);
        if (this.definition &&
            clusterName &&
            cluster &&
            cluster.shared &&
            !cluster.isPrivate &&
            !this.getWorkspace() &&
            clusterName !== 'shared-public-demo') {
            throw new Error("Your `cluster` property in the prisma.yml is missing the workspace slug.\nMake sure that your `cluster` property looks like this: " + chalk.bold('<workspace>/<cluster-name>') + ". You can also remove the cluster property from the prisma.yml\nand execute " + chalk.bold.green('prisma deploy') + " again, to get that value auto-filled.");
        }
        if (this.definition &&
            this.definition.endpoint &&
            clusterName &&
            cluster &&
            cluster.shared &&
            !cluster.isPrivate &&
            !this.getWorkspace() &&
            clusterName !== 'shared-public-demo') {
            throw new Error("The provided endpoint " + this.definition.endpoint + " points to a demo cluster, but is missing the workspace slug. A valid demo endpoint looks like this: https://eu1.prisma.sh/myworkspace/service-name/stage-name");
        }
        if (this.definition && this.definition.endpoint && !this.definition.endpoint.startsWith('http')) {
            throw new Error(chalk.bold(this.definition.endpoint) + " is not a valid endpoint. It must start with http:// or https://");
        }
    };
    PrismaDefinitionClass.prototype.getToken = function (serviceName, stageName) {
        if (this.secrets) {
            var data = {
                data: {
                    service: serviceName + "@" + stageName,
                    roles: ['admin'],
                },
            };
            return jwt.sign(data, this.secrets[0], {
                expiresIn: '7d',
            });
        }
        return undefined;
    };
    PrismaDefinitionClass.prototype.getCluster = function (_) {
        return __awaiter(this, void 0, void 0, function () {
            var clusterData, cluster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.definition && this.endpoint)) return [3 /*break*/, 2];
                        clusterData = parseEndpoint(this.endpoint);
                        return [4 /*yield*/, this.getClusterByEndpoint(clusterData)];
                    case 1:
                        cluster = _a.sent();
                        this.env.removeCluster(clusterData.clusterName);
                        this.env.addCluster(cluster);
                        return [2 /*return*/, cluster];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    PrismaDefinitionClass.prototype.findClusterByBaseUrl = function (baseUrl) {
        var _a;
        return (_a = this.env.clusters) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.baseUrl.toLowerCase() === baseUrl; });
    };
    PrismaDefinitionClass.prototype.getClusterByEndpoint = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var cluster, clusterName, clusterBaseUrl, isPrivate, local, shared, workspaceSlug, cluster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.clusterBaseUrl && !process.env['PRISMA_MANAGEMENT_API_SECRET']) {
                            cluster = this.findClusterByBaseUrl(data.clusterBaseUrl);
                            if (cluster) {
                                return [2 /*return*/, cluster];
                            }
                        }
                        clusterName = data.clusterName, clusterBaseUrl = data.clusterBaseUrl, isPrivate = data.isPrivate, local = data.local, shared = data.shared, workspaceSlug = data.workspaceSlug;
                        if (!!local) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.env.fetchClusters()];
                    case 1:
                        _a.sent();
                        cluster = this.findClusterByBaseUrl(data.clusterBaseUrl);
                        if (cluster) {
                            return [2 /*return*/, cluster];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Cluster(this.out, clusterName, clusterBaseUrl, shared || isPrivate ? this.env.cloudSessionKey : undefined, local, shared, isPrivate, workspaceSlug)];
                }
            });
        });
    };
    PrismaDefinitionClass.prototype.getTypesString = function (definition) {
        var e_1, _a;
        var typesPaths = definition.datamodel
            ? Array.isArray(definition.datamodel)
                ? definition.datamodel
                : [definition.datamodel]
            : [];
        var allTypes = '';
        try {
            for (var typesPaths_1 = __values(typesPaths), typesPaths_1_1 = typesPaths_1.next(); !typesPaths_1_1.done; typesPaths_1_1 = typesPaths_1.next()) {
                var unresolvedTypesPath = typesPaths_1_1.value;
                var typesPath = join(this.definitionDir, unresolvedTypesPath);
                try {
                    accessSync(typesPath);
                    var types = readFileSync(typesPath, 'utf-8');
                    allTypes += types + '\n';
                }
                catch (_b) {
                    throw new Error("The types definition file \"" + typesPath + "\" could not be found.");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (typesPaths_1_1 && !typesPaths_1_1.done && (_a = typesPaths_1.return)) _a.call(typesPaths_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return allTypes;
    };
    PrismaDefinitionClass.prototype.getClusterName = function () {
        return this.cluster || null;
    };
    PrismaDefinitionClass.prototype.getWorkspace = function () {
        if (this.definition && this.endpoint) {
            var workspaceSlug = parseEndpoint(this.endpoint).workspaceSlug;
            if (workspaceSlug) {
                return workspaceSlug;
            }
        }
        return null;
    };
    PrismaDefinitionClass.prototype.getDeployName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cluster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCluster()];
                    case 1:
                        cluster = _a.sent();
                        return [2 /*return*/, concatName(cluster, this.service, this.getWorkspace())];
                }
            });
        });
    };
    PrismaDefinitionClass.prototype.getSubscriptions = function () {
        var _this = this;
        if (this.definition && this.definition.subscriptions) {
            return Object.entries(this.definition.subscriptions).map(function (_a) {
                var _b = __read(_a, 2), name = _b[0], subscription = _b[1];
                var url = typeof subscription.webhook === 'string' ? subscription.webhook : subscription.webhook.url;
                var headers = typeof subscription.webhook === 'string' ? [] : transformHeaders(subscription.webhook.headers);
                var query = subscription.query;
                if (subscription.query.endsWith('.graphql')) {
                    var queryPath = join(_this.definitionDir, subscription.query);
                    try {
                        accessSync(queryPath);
                    }
                    catch (_c) {
                        throw new Error("Subscription query " + queryPath + " provided in subscription \"" + name + "\" in prisma.yml does not exist.");
                    }
                    query = readFileSync(queryPath, 'utf-8');
                }
                return {
                    name: name,
                    query: query,
                    headers: headers,
                    url: url,
                };
            });
        }
        return [];
    };
    PrismaDefinitionClass.prototype.replaceEndpoint = function (newEndpoint) {
        this.definitionString = replaceYamlValue(this.definitionString, 'endpoint', newEndpoint);
        writeFileSync(this.definitionPath, this.definitionString);
    };
    PrismaDefinitionClass.prototype.addDatamodel = function (datamodel) {
        this.definitionString += "\ndatamodel: " + datamodel;
        writeFileSync(this.definitionPath, this.definitionString);
        this.definition.datamodel = datamodel;
    };
    PrismaDefinitionClass.prototype.getEndpoint = function (serviceInput, stageInput) {
        return __awaiter(this, void 0, void 0, function () {
            var cluster, service, stage, workspace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCluster()];
                    case 1:
                        cluster = _a.sent();
                        service = serviceInput || this.service;
                        stage = stageInput || this.stage;
                        workspace = this.getWorkspace();
                        if (service && stage && cluster) {
                            return [2 /*return*/, cluster.getApiEndpoint(service, stage, workspace)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    PrismaDefinitionClass.prototype.getHooks = function (hookType) {
        if (this.definition && this.definition.hooks && this.definition.hooks[hookType]) {
            var hooks = this.definition.hooks[hookType];
            if (typeof hooks !== 'string' && !Array.isArray(hooks)) {
                throw new Error("Hook " + hookType + " provided in prisma.yml must be string or an array of strings.");
            }
            return typeof hooks === 'string' ? [hooks] : hooks;
        }
        return [];
    };
    return PrismaDefinitionClass;
}());
function concatName(cluster, name, workspace) {
    if (cluster.shared) {
        var workspaceString = workspace ? workspace + "~" : '';
        return "" + workspaceString + name;
    }
    return name;
}
function transformHeaders(headers) {
    if (!headers) {
        return [];
    }
    return Object.entries(headers).map(function (_a) {
        var _b = __read(_a, 2), name = _b[0], value = _b[1];
        return ({ name: name, value: value });
    });
}

var ClusterNotFound = /** @class */ (function (_super) {
    __extends(ClusterNotFound, _super);
    function ClusterNotFound(name) {
        return _super.call(this, "Cluster '" + name + "' is neither a known shared cluster nor defined in your global .prismarc.") || this;
    }
    return ClusterNotFound;
}(Error));

var ClusterNotSet = /** @class */ (function (_super) {
    __extends(ClusterNotSet, _super);
    function ClusterNotSet() {
        return _super.call(this, "No cluster set. In order to run this command, please set the \"cluster\" property in your prisma.yml") || this;
    }
    return ClusterNotSet;
}(Error));

var debug$1 = debugPkg('Environment');
var Environment = /** @class */ (function () {
    function Environment(home, out, version) {
        if (out === void 0) { out = new Output(); }
        this.sharedClusters = ['prisma-eu1', 'prisma-us1'];
        this.clusterEndpointMap = clusterEndpointMap;
        this.globalRC = {};
        this.clustersFetched = false;
        this.out = out;
        this.home = home;
        this.version = version;
        this.rcPath = join(this.home, '.prisma/config.yml');
        mkdirSync(dirname(this.rcPath), { recursive: true });
    }
    Environment.prototype._getClusters = function () {
        var clusters = this.clusters;
        if (clusters === undefined) {
            throw new Error("Cannot get clusters. Did you forget to call \"Environment.load()\"?");
        }
        return clusters;
    };
    Environment.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadGlobalRC()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Environment.prototype, "cloudSessionKey", {
        get: function () {
            return process.env['PRISMA_CLOUD_SESSION_KEY'] || this.globalRC.cloudSessionKey;
        },
        enumerable: false,
        configurable: true
    });
    Environment.prototype.renewToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, timeLeft, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cloudSessionKey) return [3 /*break*/, 4];
                        data = jwt.decode(this.cloudSessionKey);
                        if (!data.exp) {
                            return [2 /*return*/];
                        }
                        timeLeft = data.exp * 1000 - Date.now();
                        if (!(timeLeft < 1000 * 60 * 60 * 24 && timeLeft > 0)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.requestCloudApi("\n          mutation {\n            renewToken\n          }\n        ")];
                    case 2:
                        res = _a.sent();
                        if (res.renewToken) {
                            this.globalRC.cloudSessionKey = res.renewToken;
                            this.saveGlobalRC();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        debug$1(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Environment.prototype.fetchClusters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renewPromise, res, _a, _b, m, _c, _d, cluster, endpoint, e_2;
            var e_3, _e, e_4, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(!this.clustersFetched && this.cloudSessionKey)) return [3 /*break*/, 6];
                        renewPromise = this.renewToken();
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.race([
                                this.requestCloudApi("\n            query prismaCliGetClusters {\n              me {\n                memberships {\n                  workspace {\n                    id\n                    slug\n                    clusters {\n                      id\n                      name\n                      connectInfo {\n                        endpoint\n                      }\n                      customConnectionInfo {\n                        endpoint\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          "),
                                // eslint-disable-next-line
                                new Promise(function (_, r) { return setTimeout(function () { return r(); }, 6000); }),
                            ])];
                    case 2:
                        res = (_g.sent());
                        if (!res) {
                            return [2 /*return*/];
                        }
                        if (res.me && res.me.memberships && Array.isArray(res.me.memberships)) {
                            // clean up all prisma-eu1 and prisma-us1 clusters if they already exist
                            this.clusters = this._getClusters().filter(function (c) { return c.name !== 'prisma-eu1' && c.name !== 'prisma-us1'; });
                            try {
                                for (_a = __values(res.me.memberships), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    m = _b.value;
                                    try {
                                        for (_c = (e_4 = void 0, __values(m.workspace.clusters)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                            cluster = _d.value;
                                            endpoint = cluster.connectInfo
                                                ? cluster.connectInfo.endpoint
                                                : cluster.customConnectionInfo
                                                    ? cluster.customConnectionInfo.endpoint
                                                    : this.clusterEndpointMap[cluster.name];
                                            this.addCluster(new Cluster(this.out, cluster.name, endpoint, this.globalRC.cloudSessionKey, false, ['prisma-eu1', 'prisma-us1'].includes(cluster.name), !['prisma-eu1', 'prisma-us1'].includes(cluster.name), m.workspace.slug));
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _g.sent();
                        debug$1(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, renewPromise];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Environment.prototype.clusterByName = function (name, throws) {
        if (throws === void 0) { throws = false; }
        if (!this.clusters) {
            return;
        }
        var cluster = this.clusters.find(function (c) { return c.name === name; });
        if (!throws) {
            return cluster;
        }
        if (!cluster) {
            if (!name) {
                throw new ClusterNotSet();
            }
            throw new ClusterNotFound(name);
        }
        return cluster;
    };
    Environment.prototype.setToken = function (token) {
        this.globalRC.cloudSessionKey = token;
    };
    Environment.prototype.addCluster = function (cluster) {
        var clusters = this._getClusters();
        var existingClusterIndex = clusters.findIndex(function (c) {
            if (cluster.workspaceSlug) {
                return c.workspaceSlug === cluster.workspaceSlug && c.name === cluster.name;
            }
            else {
                return c.name === cluster.name;
            }
        });
        if (existingClusterIndex > -1) {
            clusters.splice(existingClusterIndex, 1);
        }
        clusters.push(cluster);
    };
    Environment.prototype.removeCluster = function (name) {
        this.clusters = this._getClusters().filter(function (c) { return c.name !== name; });
    };
    Environment.prototype.saveGlobalRC = function () {
        var rc = {
            cloudSessionKey: this.globalRC.cloudSessionKey ? this.globalRC.cloudSessionKey.trim() : undefined,
            clusters: this.getLocalClusterConfig(),
        };
        // parse & stringify to rm undefined for yaml parser
        var rcString = dump(JSON.parse(JSON.stringify(rc)));
        writeFileSync(this.rcPath, rcString);
    };
    Environment.prototype.setActiveCluster = function (cluster) {
        this.activeCluster = cluster;
    };
    Environment.prototype.loadGlobalRC = function () {
        return __awaiter(this, void 0, void 0, function () {
            var globalFile, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.rcPath) return [3 /*break*/, 6];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 5]);
                        accessSync(this.rcPath);
                        globalFile = readFileSync(this.rcPath, 'utf-8');
                        return [4 /*yield*/, this.parseGlobalRC(globalFile)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        return [4 /*yield*/, this.parseGlobalRC()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.parseGlobalRC()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Environment.prototype.parseGlobalRC = function (globalFile) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!globalFile) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.loadYaml(globalFile, this.rcPath)];
                    case 1:
                        _a.globalRC = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.clusters = this.initClusters(this.globalRC);
                        return [2 /*return*/];
                }
            });
        });
    };
    Environment.prototype.loadYaml = function (file, filePath) {
        if (filePath === void 0) { filePath = null; }
        return __awaiter(this, void 0, void 0, function () {
            var content, variables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!file) return [3 /*break*/, 2];
                        content = void 0;
                        try {
                            content = load(file);
                        }
                        catch (e) {
                            throw new Error("Yaml parsing error in " + filePath + ": " + e.message);
                        }
                        variables = new Variables(filePath || 'no filepath provided', this.args, this.out);
                        return [4 /*yield*/, variables.populateJson(content)];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, content];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    Environment.prototype.initClusters = function (rc) {
        var sharedClusters = this.getSharedClusters(rc);
        return __spreadArray([], __read(sharedClusters), false);
    };
    Environment.prototype.getSharedClusters = function (rc) {
        var _this = this;
        return this.sharedClusters.map(function (clusterName) {
            return new Cluster(_this.out, clusterName, _this.clusterEndpointMap[clusterName], rc && rc.cloudSessionKey, false, true);
        });
    };
    Environment.prototype.getLocalClusterConfig = function () {
        var _this = this;
        return this._getClusters()
            .filter(function (c) { return !c.shared && c.clusterSecret !== _this.cloudSessionKey && !c.isPrivate; })
            .reduce(function (acc, cluster) {
            var _a;
            return __assign(__assign({}, acc), (_a = {}, _a[cluster.name] = {
                host: cluster.baseUrl,
                clusterSecret: cluster.clusterSecret,
            }, _a));
        }, {});
    };
    Environment.prototype.requestCloudApi = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://api.cloud.prisma.sh', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer " + this.cloudSessionKey,
                                'X-Cli-Version': this.version,
                            },
                            body: JSON.stringify({
                                query: query,
                            }),
                            proxy: getProxyAgent('https://api.cloud.prisma.sh'),
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json.data];
                }
            });
        });
    };
    return Environment;
}());

var StageNotFound = /** @class */ (function (_super) {
    __extends(StageNotFound, _super);
    function StageNotFound(name) {
        var _this = this;
        if (name) {
            _this = _super.call(this, "Stage '" + name + "' could not be found in the local prisma.yml") || this;
        }
        else {
            _this = _super.call(this, "No stage provided and no default stage set") || this;
        }
        return _this;
    }
    return StageNotFound;
}(Error));

var access = promises.access;
/**
 * This loader loads a schema from a `prisma.yml` file
 */
var PrismaLoader = /** @class */ (function (_super) {
    __extends(PrismaLoader, _super);
    function PrismaLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrismaLoader.prototype.canLoadSync = function () {
        return false;
    };
    PrismaLoader.prototype.canLoad = function (prismaConfigFilePath, options) {
        return __awaiter(this, void 0, void 0, function () {
            var joinedYmlPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof prismaConfigFilePath === 'string' && prismaConfigFilePath.endsWith('prisma.yml'))) return [3 /*break*/, 4];
                        joinedYmlPath = join(options.cwd || cwd(), prismaConfigFilePath);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, access(joinedYmlPath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    PrismaLoader.prototype.load = function (prismaConfigFilePath, options) {
        return __awaiter(this, void 0, void 0, function () {
            var graceful, envVars, home, env, joinedYmlPath, definition, serviceName, stage, clusterName, cluster, token, url, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.canLoad(prismaConfigFilePath, options)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, []];
                        }
                        graceful = options.graceful, envVars = options.envVars;
                        home = homedir();
                        env = new Environment(home);
                        return [4 /*yield*/, env.load()];
                    case 2:
                        _a.sent();
                        joinedYmlPath = join(options.cwd || cwd(), prismaConfigFilePath);
                        definition = new PrismaDefinitionClass(env, joinedYmlPath, envVars);
                        return [4 /*yield*/, definition.load({}, undefined, graceful)];
                    case 3:
                        _a.sent();
                        serviceName = definition.service;
                        stage = definition.stage;
                        clusterName = definition.cluster;
                        if (!clusterName) {
                            throw new Error("No cluster set. Please set the \"cluster\" property in your prisma.yml");
                        }
                        return [4 /*yield*/, definition.getCluster()];
                    case 4:
                        cluster = _a.sent();
                        if (!cluster) {
                            throw new Error("Cluster " + clusterName + " provided in prisma.yml could not be found in global ~/.prisma/config.yml.\n      Please check in ~/.prisma/config.yml, if the cluster exists.\n      You can use `docker-compose up -d` to start a new cluster.");
                        }
                        token = definition.getToken(serviceName, stage);
                        url = cluster.getApiEndpoint(serviceName, stage, definition.getWorkspace() || undefined);
                        headers = token
                            ? {
                                Authorization: "Bearer " + token,
                            }
                            : undefined;
                        return [2 /*return*/, _super.prototype.load.call(this, url, { headers: headers })];
                }
            });
        });
    };
    return PrismaLoader;
}(UrlLoader));

export { PrismaLoader };
