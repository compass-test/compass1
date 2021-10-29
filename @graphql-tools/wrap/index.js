'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const graphql = require('graphql');
const utils = require('@graphql-tools/utils');
const delegate = require('@graphql-tools/delegate');
const valueOrPromise = require('value-or-promise');

function generateProxyingResolvers(subschemaConfig) {
    var _a;
    const targetSchema = subschemaConfig.schema;
    const createProxyingResolver = (_a = subschemaConfig.createProxyingResolver) !== null && _a !== void 0 ? _a : defaultCreateProxyingResolver;
    const transformedSchema = delegate.applySchemaTransforms(targetSchema, subschemaConfig);
    const rootTypeMap = utils.getRootTypeMap(targetSchema);
    const resolvers = {};
    for (const [operation, rootType] of rootTypeMap.entries()) {
        const typeName = rootType.name;
        const fields = rootType.getFields();
        resolvers[typeName] = {};
        for (const fieldName in fields) {
            const proxyingResolver = createProxyingResolver({
                subschemaConfig,
                transformedSchema,
                operation,
                fieldName,
            });
            const finalResolver = createPossiblyNestedProxyingResolver(subschemaConfig, proxyingResolver);
            if (operation === 'subscription') {
                resolvers[typeName][fieldName] = {
                    subscribe: finalResolver,
                    resolve: identical,
                };
            }
            else {
                resolvers[typeName][fieldName] = {
                    resolve: finalResolver,
                };
            }
        }
    }
    return resolvers;
}
function identical(value) {
    return value;
}
function createPossiblyNestedProxyingResolver(subschemaConfig, proxyingResolver) {
    return function possiblyNestedProxyingResolver(parent, args, context, info) {
        if (parent != null) {
            const responseKey = utils.getResponseKeyFromInfo(info);
            // Check to see if the parent contains a proxied result
            if (delegate.isExternalObject(parent)) {
                const unpathedErrors = delegate.getUnpathedErrors(parent);
                const subschema = delegate.getSubschema(parent, responseKey);
                // If there is a proxied result from this subschema, return it
                // This can happen even for a root field when the root type ia
                // also nested as a field within a different type.
                if (subschemaConfig === subschema && parent[responseKey] !== undefined) {
                    return delegate.resolveExternalValue(parent[responseKey], unpathedErrors, subschema, context, info);
                }
            }
        }
        return proxyingResolver(parent, args, context, info);
    };
}
function defaultCreateProxyingResolver({ subschemaConfig, operation, transformedSchema, }) {
    return function proxyingResolver(_parent, _args, context, info) {
        return delegate.delegateToSchema({
            schema: subschemaConfig,
            operation,
            context,
            info,
            transformedSchema,
        });
    };
}

function wrapSchema(subschemaConfig) {
    const targetSchema = subschemaConfig.schema;
    const proxyingResolvers = generateProxyingResolvers(subschemaConfig);
    const schema = createWrappingSchema(targetSchema, proxyingResolvers);
    const transformedSchema = delegate.applySchemaTransforms(schema, subschemaConfig);
    return delegate.applySchemaTransforms(schema, subschemaConfig, transformedSchema);
}
function createWrappingSchema(schema, proxyingResolvers) {
    return utils.mapSchema(schema, {
        [utils.MapperKind.ROOT_OBJECT]: type => {
            var _a;
            const config = type.toConfig();
            const fieldConfigMap = config.fields;
            for (const fieldName in fieldConfigMap) {
                const field = fieldConfigMap[fieldName];
                if (field == null) {
                    continue;
                }
                fieldConfigMap[fieldName] = {
                    ...field,
                    ...(_a = proxyingResolvers[type.name]) === null || _a === void 0 ? void 0 : _a[fieldName],
                };
            }
            return new graphql.GraphQLObjectType(config);
        },
        [utils.MapperKind.OBJECT_TYPE]: type => {
            const config = type.toConfig();
            config.isTypeOf = undefined;
            for (const fieldName in config.fields) {
                const field = config.fields[fieldName];
                if (field == null) {
                    continue;
                }
                field.resolve = delegate.defaultMergedResolver;
                field.subscribe = undefined;
            }
            return new graphql.GraphQLObjectType(config);
        },
        [utils.MapperKind.INTERFACE_TYPE]: type => {
            const config = type.toConfig();
            delete config.resolveType;
            return new graphql.GraphQLInterfaceType(config);
        },
        [utils.MapperKind.UNION_TYPE]: type => {
            const config = type.toConfig();
            delete config.resolveType;
            return new graphql.GraphQLUnionType(config);
        },
    });
}

class RenameTypes {
    constructor(renamer, options) {
        this.renamer = renamer;
        this.map = Object.create(null);
        this.reverseMap = Object.create(null);
        const { renameBuiltins = false, renameScalars = true } = options != null ? options : {};
        this.renameBuiltins = renameBuiltins;
        this.renameScalars = renameScalars;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        return utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.TYPE]: (type) => {
                if (graphql.isSpecifiedScalarType(type) && !this.renameBuiltins) {
                    return undefined;
                }
                if (graphql.isScalarType(type) && !this.renameScalars) {
                    return undefined;
                }
                const oldName = type.name;
                const newName = this.renamer(oldName);
                if (newName !== undefined && newName !== oldName) {
                    this.map[oldName] = newName;
                    this.reverseMap[newName] = oldName;
                    return utils.renameType(type, newName);
                }
            },
            [utils.MapperKind.ROOT_OBJECT]() {
                return undefined;
            },
        });
    }
    transformRequest(originalRequest, _delegationContext, _transformationContext) {
        const document = graphql.visit(originalRequest.document, {
            [graphql.Kind.NAMED_TYPE]: (node) => {
                const name = node.name.value;
                if (name in this.reverseMap) {
                    return {
                        ...node,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: this.reverseMap[name],
                        },
                    };
                }
            },
        });
        return {
            ...originalRequest,
            document,
        };
    }
    transformResult(originalResult, _delegationContext, _transformationContext) {
        return {
            ...originalResult,
            data: utils.visitData(originalResult.data, object => {
                const typeName = object === null || object === void 0 ? void 0 : object.__typename;
                if (typeName != null && typeName in this.map) {
                    object.__typename = this.map[typeName];
                }
                return object;
            }),
        };
    }
}

class FilterTypes {
    constructor(filter) {
        this.filter = filter;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        return utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.TYPE]: (type) => {
                if (this.filter(type)) {
                    return undefined;
                }
                return null;
            },
        });
    }
}

class RenameRootTypes {
    constructor(renamer) {
        this.renamer = renamer;
        this.map = Object.create(null);
        this.reverseMap = Object.create(null);
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        return utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.ROOT_OBJECT]: type => {
                const oldName = type.name;
                const newName = this.renamer(oldName);
                if (newName !== undefined && newName !== oldName) {
                    this.map[oldName] = newName;
                    this.reverseMap[newName] = oldName;
                    return utils.renameType(type, newName);
                }
            },
        });
    }
    transformRequest(originalRequest, _delegationContext, _transformationContext) {
        const document = graphql.visit(originalRequest.document, {
            [graphql.Kind.NAMED_TYPE]: (node) => {
                const name = node.name.value;
                if (name in this.reverseMap) {
                    return {
                        ...node,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: this.reverseMap[name],
                        },
                    };
                }
            },
        });
        return {
            ...originalRequest,
            document,
        };
    }
    transformResult(originalResult, _delegationContext, _transformationContext) {
        return {
            ...originalResult,
            data: utils.visitData(originalResult.data, object => {
                const typeName = object === null || object === void 0 ? void 0 : object.__typename;
                if (typeName != null && typeName in this.map) {
                    object.__typename = this.map[typeName];
                }
                return object;
            }),
        };
    }
}

class TransformCompositeFields {
    constructor(fieldTransformer, fieldNodeTransformer, dataTransformer, errorsTransformer) {
        this.fieldTransformer = fieldTransformer;
        this.fieldNodeTransformer = fieldNodeTransformer;
        this.dataTransformer = dataTransformer;
        this.errorsTransformer = errorsTransformer;
        this.mapping = {};
    }
    _getTypeInfo() {
        const typeInfo = this.typeInfo;
        if (typeInfo === undefined) {
            throw new Error(`The TransformCompositeFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return typeInfo;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        var _a;
        this.transformedSchema = utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName) => {
                const transformedField = this.fieldTransformer(typeName, fieldName, fieldConfig);
                if (Array.isArray(transformedField)) {
                    const newFieldName = transformedField[0];
                    if (newFieldName !== fieldName) {
                        if (!(typeName in this.mapping)) {
                            this.mapping[typeName] = {};
                        }
                        this.mapping[typeName][newFieldName] = fieldName;
                    }
                }
                return transformedField;
            },
        });
        this.typeInfo = new graphql.TypeInfo(this.transformedSchema);
        this.subscriptionTypeName = (_a = originalWrappingSchema.getSubscriptionType()) === null || _a === void 0 ? void 0 : _a.name;
        return this.transformedSchema;
    }
    transformRequest(originalRequest, _delegationContext, transformationContext) {
        const document = originalRequest.document;
        return {
            ...originalRequest,
            document: this.transformDocument(document, transformationContext),
        };
    }
    transformResult(result, _delegationContext, transformationContext) {
        const dataTransformer = this.dataTransformer;
        if (dataTransformer != null) {
            result.data = utils.visitData(result.data, value => dataTransformer(value, transformationContext));
        }
        if (this.errorsTransformer != null && Array.isArray(result.errors)) {
            result.errors = this.errorsTransformer(result.errors, transformationContext);
        }
        return result;
    }
    transformDocument(document, transformationContext) {
        const fragments = Object.create(null);
        for (const def of document.definitions) {
            if (def.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                fragments[def.name.value] = def;
            }
        }
        return graphql.visit(document, graphql.visitWithTypeInfo(this._getTypeInfo(), {
            [graphql.Kind.SELECTION_SET]: {
                leave: node => this.transformSelectionSet(node, this._getTypeInfo(), fragments, transformationContext),
            },
        }));
    }
    transformSelectionSet(node, typeInfo, fragments, transformationContext) {
        var _a, _b;
        const parentType = typeInfo.getParentType();
        if (parentType == null) {
            return undefined;
        }
        const parentTypeName = parentType.name;
        let newSelections = [];
        for (const selection of node.selections) {
            if (selection.kind !== graphql.Kind.FIELD) {
                newSelections.push(selection);
                continue;
            }
            const newName = selection.name.value;
            // See https://github.com/ardatan/graphql-tools/issues/2282
            if ((this.dataTransformer != null || this.errorsTransformer != null) &&
                (this.subscriptionTypeName == null || parentTypeName !== this.subscriptionTypeName)) {
                newSelections.push({
                    kind: graphql.Kind.FIELD,
                    name: {
                        kind: graphql.Kind.NAME,
                        value: '__typename',
                    },
                });
            }
            let transformedSelection;
            if (this.fieldNodeTransformer == null) {
                transformedSelection = selection;
            }
            else {
                transformedSelection = this.fieldNodeTransformer(parentTypeName, newName, selection, fragments, transformationContext);
                transformedSelection = transformedSelection === undefined ? selection : transformedSelection;
            }
            if (transformedSelection == null) {
                continue;
            }
            else if (Array.isArray(transformedSelection)) {
                newSelections = newSelections.concat(transformedSelection);
                continue;
            }
            else if (transformedSelection.kind !== graphql.Kind.FIELD) {
                newSelections.push(transformedSelection);
                continue;
            }
            const typeMapping = this.mapping[parentTypeName];
            if (typeMapping == null) {
                newSelections.push(transformedSelection);
                continue;
            }
            const oldName = this.mapping[parentTypeName][newName];
            if (oldName == null) {
                newSelections.push(transformedSelection);
                continue;
            }
            newSelections.push({
                ...transformedSelection,
                name: {
                    kind: graphql.Kind.NAME,
                    value: oldName,
                },
                alias: {
                    kind: graphql.Kind.NAME,
                    value: (_b = (_a = transformedSelection.alias) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : newName,
                },
            });
        }
        return {
            ...node,
            selections: newSelections,
        };
    }
}

class TransformObjectFields {
    constructor(objectFieldTransformer, fieldNodeTransformer) {
        this.objectFieldTransformer = objectFieldTransformer;
        this.fieldNodeTransformer = fieldNodeTransformer;
    }
    _getTransformer() {
        const transformer = this.transformer;
        if (transformer === undefined) {
            throw new Error(`The TransformObjectFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return transformer;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const compositeToObjectFieldTransformer = (typeName, fieldName, fieldConfig) => {
            if (graphql.isObjectType(originalWrappingSchema.getType(typeName))) {
                return this.objectFieldTransformer(typeName, fieldName, fieldConfig);
            }
            return undefined;
        };
        this.transformer = new TransformCompositeFields(compositeToObjectFieldTransformer, this.fieldNodeTransformer);
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this._getTransformer().transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this._getTransformer().transformResult(originalResult, delegationContext, transformationContext);
    }
}

class TransformRootFields {
    constructor(rootFieldTransformer, fieldNodeTransformer) {
        this.rootFieldTransformer = rootFieldTransformer;
        this.fieldNodeTransformer = fieldNodeTransformer;
    }
    _getTransformer() {
        const transformer = this.transformer;
        if (transformer === undefined) {
            throw new Error(`The TransformRootFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return transformer;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const rootToObjectFieldTransformer = (typeName, fieldName, fieldConfig) => {
            var _a, _b, _c;
            if (typeName === ((_a = originalWrappingSchema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name)) {
                return this.rootFieldTransformer('Query', fieldName, fieldConfig);
            }
            if (typeName === ((_b = originalWrappingSchema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name)) {
                return this.rootFieldTransformer('Mutation', fieldName, fieldConfig);
            }
            if (typeName === ((_c = originalWrappingSchema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name)) {
                return this.rootFieldTransformer('Subscription', fieldName, fieldConfig);
            }
            return undefined;
        };
        this.transformer = new TransformObjectFields(rootToObjectFieldTransformer, this.fieldNodeTransformer);
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this._getTransformer().transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this._getTransformer().transformResult(originalResult, delegationContext, transformationContext);
    }
}

class RenameRootFields {
    constructor(renamer) {
        this.transformer = new TransformRootFields((operation, fieldName, fieldConfig) => [renamer(operation, fieldName, fieldConfig), fieldConfig]);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}

class FilterRootFields {
    constructor(filter) {
        this.transformer = new TransformRootFields((operation, fieldName, fieldConfig) => {
            if (filter(operation, fieldName, fieldConfig)) {
                return undefined;
            }
            return null;
        });
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class RenameObjectFields {
    constructor(renamer) {
        this.transformer = new TransformObjectFields((typeName, fieldName, fieldConfig) => [
            renamer(typeName, fieldName, fieldConfig),
            fieldConfig,
        ]);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}

class FilterObjectFields {
    constructor(filter) {
        this.transformer = new TransformObjectFields((typeName, fieldName, fieldConfig) => filter(typeName, fieldName, fieldConfig) ? undefined : null);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class TransformInterfaceFields {
    constructor(interfaceFieldTransformer, fieldNodeTransformer) {
        this.interfaceFieldTransformer = interfaceFieldTransformer;
        this.fieldNodeTransformer = fieldNodeTransformer;
    }
    _getTransformer() {
        const transformer = this.transformer;
        if (transformer === undefined) {
            throw new Error(`The TransformInterfaceFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return transformer;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const compositeToObjectFieldTransformer = (typeName, fieldName, fieldConfig) => {
            if (graphql.isInterfaceType(originalWrappingSchema.getType(typeName))) {
                return this.interfaceFieldTransformer(typeName, fieldName, fieldConfig);
            }
            return undefined;
        };
        this.transformer = new TransformCompositeFields(compositeToObjectFieldTransformer, this.fieldNodeTransformer);
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this._getTransformer().transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this._getTransformer().transformResult(originalResult, delegationContext, transformationContext);
    }
}

class RenameInterfaceFields {
    constructor(renamer) {
        this.transformer = new TransformInterfaceFields((typeName, fieldName, fieldConfig) => [
            renamer(typeName, fieldName, fieldConfig),
            fieldConfig,
        ]);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}

class FilterInterfaceFields {
    constructor(filter) {
        this.transformer = new TransformInterfaceFields((typeName, fieldName, fieldConfig) => filter(typeName, fieldName, fieldConfig) ? undefined : null);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class TransformInputObjectFields {
    constructor(inputFieldTransformer, inputFieldNodeTransformer, inputObjectNodeTransformer) {
        this.inputFieldTransformer = inputFieldTransformer;
        this.inputFieldNodeTransformer = inputFieldNodeTransformer;
        this.inputObjectNodeTransformer = inputObjectNodeTransformer;
        this.mapping = {};
    }
    _getTransformedSchema() {
        const transformedSchema = this.transformedSchema;
        if (transformedSchema === undefined) {
            throw new Error(`The TransformInputObjectFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return transformedSchema;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        this.transformedSchema = utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig, fieldName, typeName) => {
                const transformedInputField = this.inputFieldTransformer(typeName, fieldName, inputFieldConfig);
                if (Array.isArray(transformedInputField)) {
                    const newFieldName = transformedInputField[0];
                    if (newFieldName !== fieldName) {
                        if (!(typeName in this.mapping)) {
                            this.mapping[typeName] = {};
                        }
                        this.mapping[typeName][newFieldName] = fieldName;
                    }
                }
                return transformedInputField;
            },
        });
        return this.transformedSchema;
    }
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        var _a;
        const variableValues = (_a = originalRequest.variables) !== null && _a !== void 0 ? _a : {};
        const fragments = Object.create(null);
        const operations = [];
        for (const def of originalRequest.document.definitions) {
            if (def.kind === graphql.Kind.OPERATION_DEFINITION) {
                operations.push(def);
            }
            else if (def.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                fragments[def.name.value] = def;
            }
        }
        for (const def of operations) {
            const variableDefs = def.variableDefinitions;
            if (variableDefs != null) {
                for (const variableDef of variableDefs) {
                    const varName = variableDef.variable.name.value;
                    // Cast to NamedTypeNode required until upcomming graphql releases will have TypeNode paramter
                    const varType = graphql.typeFromAST(delegationContext.transformedSchema, variableDef.type);
                    if (!graphql.isInputType(varType)) {
                        throw new Error(`Expected ${varType} to be an input type`);
                    }
                    variableValues[varName] = utils.transformInputValue(varType, variableValues[varName], undefined, (type, originalValue) => {
                        var _a;
                        const newValue = Object.create(null);
                        const fields = type.getFields();
                        for (const key in originalValue) {
                            const field = fields[key];
                            if (field != null) {
                                const newFieldName = (_a = this.mapping[type.name]) === null || _a === void 0 ? void 0 : _a[field.name];
                                if (newFieldName != null) {
                                    newValue[newFieldName] = originalValue[field.name];
                                }
                                else {
                                    newValue[field.name] = originalValue[field.name];
                                }
                            }
                        }
                        return newValue;
                    });
                }
            }
        }
        for (const def of originalRequest.document.definitions.filter(def => def.kind === graphql.Kind.FRAGMENT_DEFINITION)) {
            fragments[def.name.value] = def;
        }
        const document = this.transformDocument(originalRequest.document, this.mapping, this.inputFieldNodeTransformer, this.inputObjectNodeTransformer, originalRequest, delegationContext);
        return {
            ...originalRequest,
            document,
            variables: variableValues,
        };
    }
    transformDocument(document, mapping, inputFieldNodeTransformer, inputObjectNodeTransformer, request, delegationContext) {
        const typeInfo = new graphql.TypeInfo(this._getTransformedSchema());
        const newDocument = graphql.visit(document, graphql.visitWithTypeInfo(typeInfo, {
            [graphql.Kind.OBJECT]: {
                leave: (node) => {
                    // The casting is kind of legit here as we are in a visitor
                    const parentType = typeInfo.getInputType();
                    if (parentType != null) {
                        const parentTypeName = parentType.name;
                        const newInputFields = [];
                        for (const inputField of node.fields) {
                            const newName = inputField.name.value;
                            const transformedInputField = inputFieldNodeTransformer != null
                                ? inputFieldNodeTransformer(parentTypeName, newName, inputField, request, delegationContext)
                                : inputField;
                            if (Array.isArray(transformedInputField)) {
                                for (const individualTransformedInputField of transformedInputField) {
                                    const typeMapping = mapping[parentTypeName];
                                    if (typeMapping == null) {
                                        newInputFields.push(individualTransformedInputField);
                                        continue;
                                    }
                                    const oldName = typeMapping[newName];
                                    if (oldName == null) {
                                        newInputFields.push(individualTransformedInputField);
                                        continue;
                                    }
                                    newInputFields.push({
                                        ...individualTransformedInputField,
                                        name: {
                                            ...individualTransformedInputField.name,
                                            value: oldName,
                                        },
                                    });
                                }
                                continue;
                            }
                            const typeMapping = mapping[parentTypeName];
                            if (typeMapping == null) {
                                newInputFields.push(transformedInputField);
                                continue;
                            }
                            const oldName = typeMapping[newName];
                            if (oldName == null) {
                                newInputFields.push(transformedInputField);
                                continue;
                            }
                            newInputFields.push({
                                ...transformedInputField,
                                name: {
                                    ...transformedInputField.name,
                                    value: oldName,
                                },
                            });
                        }
                        const newNode = {
                            ...node,
                            fields: newInputFields,
                        };
                        return inputObjectNodeTransformer != null
                            ? inputObjectNodeTransformer(parentTypeName, newNode, request, delegationContext)
                            : newNode;
                    }
                },
            },
        }));
        return newDocument;
    }
}

class RenameInputObjectFields {
    constructor(renamer) {
        this.renamer = renamer;
        this.transformer = new TransformInputObjectFields((typeName, inputFieldName, inputFieldConfig) => {
            const newName = renamer(typeName, inputFieldName, inputFieldConfig);
            if (newName !== undefined && newName !== inputFieldName) {
                const value = renamer(typeName, inputFieldName, inputFieldConfig);
                if (value != null) {
                    return [value, inputFieldConfig];
                }
            }
        }, (typeName, inputFieldName, inputFieldNode) => {
            if (!(typeName in this.reverseMap)) {
                return inputFieldNode;
            }
            const inputFieldNameMap = this.reverseMap[typeName];
            if (!(inputFieldName in inputFieldNameMap)) {
                return inputFieldNode;
            }
            return {
                ...inputFieldNode,
                name: {
                    ...inputFieldNode.name,
                    value: inputFieldNameMap[inputFieldName],
                },
            };
        });
        this.reverseMap = Object.create(null);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        utils.mapSchema(originalWrappingSchema, {
            [utils.MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig, fieldName, typeName) => {
                const newName = this.renamer(typeName, fieldName, inputFieldConfig);
                if (newName !== undefined && newName !== fieldName) {
                    if (this.reverseMap[typeName] == null) {
                        this.reverseMap[typeName] = Object.create(null);
                    }
                    this.reverseMap[typeName][newName] = fieldName;
                }
                return undefined;
            },
            [utils.MapperKind.ROOT_OBJECT]() {
                return undefined;
            },
        });
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}

class FilterInputObjectFields {
    constructor(filter, inputObjectNodeTransformer) {
        this.transformer = new TransformInputObjectFields((typeName, fieldName, inputFieldConfig) => filter(typeName, fieldName, inputFieldConfig) ? undefined : null, undefined, inputObjectNodeTransformer);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}

class MapLeafValues {
    constructor(inputValueTransformer, outputValueTransformer) {
        this.inputValueTransformer = inputValueTransformer;
        this.outputValueTransformer = outputValueTransformer;
        this.resultVisitorMap = Object.create(null);
    }
    _getTypeInfo() {
        const typeInfo = this.typeInfo;
        if (typeInfo === undefined) {
            throw new Error(`The MapLeafValues transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return typeInfo;
    }
    _getOriginalWrappingSchema() {
        const originalWrappingSchema = this.originalWrappingSchema;
        if (originalWrappingSchema === undefined) {
            throw new Error(`The MapLeafValues transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return originalWrappingSchema;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        this.originalWrappingSchema = originalWrappingSchema;
        const typeMap = originalWrappingSchema.getTypeMap();
        for (const typeName in typeMap) {
            const type = typeMap[typeName];
            if (!typeName.startsWith('__')) {
                if (graphql.isLeafType(type)) {
                    this.resultVisitorMap[typeName] = (value) => this.outputValueTransformer(typeName, value);
                }
            }
        }
        this.typeInfo = new graphql.TypeInfo(originalWrappingSchema);
        return originalWrappingSchema;
    }
    transformRequest(originalRequest, _delegationContext, transformationContext) {
        var _a;
        const document = originalRequest.document;
        const variableValues = (_a = originalRequest.variables) !== null && _a !== void 0 ? _a : {};
        const operations = document.definitions.filter(def => def.kind === graphql.Kind.OPERATION_DEFINITION);
        const fragments = document.definitions.filter(def => def.kind === graphql.Kind.FRAGMENT_DEFINITION);
        const newOperations = this.transformOperations(operations, variableValues);
        const transformedRequest = {
            ...originalRequest,
            document: {
                ...document,
                definitions: [...newOperations, ...fragments],
            },
            variables: variableValues,
        };
        transformationContext.transformedRequest = transformedRequest;
        return transformedRequest;
    }
    transformResult(originalResult, _delegationContext, transformationContext) {
        return utils.visitResult(originalResult, transformationContext.transformedRequest, this._getOriginalWrappingSchema(), this.resultVisitorMap);
    }
    transformOperations(operations, variableValues) {
        return operations.map((operation) => {
            var _a;
            const variableDefinitionMap = ((_a = operation.variableDefinitions) !== null && _a !== void 0 ? _a : []).reduce((prev, def) => ({
                ...prev,
                [def.variable.name.value]: def,
            }), {});
            const newOperation = graphql.visit(operation, graphql.visitWithTypeInfo(this._getTypeInfo(), {
                [graphql.Kind.FIELD]: node => this.transformFieldNode(node, variableDefinitionMap, variableValues),
            }));
            return {
                ...newOperation,
                variableDefinitions: Object.values(variableDefinitionMap),
            };
        });
    }
    transformFieldNode(field, variableDefinitionMap, variableValues) {
        const targetField = this._getTypeInfo().getFieldDef();
        utils.assertSome(targetField);
        const generateVariableName = utils.createVariableNameGenerator(variableDefinitionMap);
        if (!targetField.name.startsWith('__')) {
            const argumentNodes = field.arguments;
            if (argumentNodes != null) {
                const argumentNodeMap = argumentNodes.reduce((prev, argument) => ({
                    ...prev,
                    [argument.name.value]: argument,
                }), Object.create(null));
                for (const argument of targetField.args) {
                    const argName = argument.name;
                    const argType = argument.type;
                    const argumentNode = argumentNodeMap[argName];
                    const argValue = argumentNode === null || argumentNode === void 0 ? void 0 : argumentNode.value;
                    let value;
                    if (argValue != null) {
                        value = graphql.valueFromAST(argValue, argType, variableValues);
                    }
                    utils.updateArgument(argumentNodeMap, variableDefinitionMap, variableValues, argName, generateVariableName(argName), argType, utils.transformInputValue(argType, value, (t, v) => {
                        const newValue = this.inputValueTransformer(t.name, v);
                        return newValue === undefined ? v : newValue;
                    }));
                }
                return {
                    ...field,
                    arguments: Object.values(argumentNodeMap),
                };
            }
        }
    }
}

class TransformEnumValues {
    constructor(enumValueTransformer, inputValueTransformer, outputValueTransformer) {
        this.enumValueTransformer = enumValueTransformer;
        this.mapping = Object.create(null);
        this.reverseMapping = Object.create(null);
        this.transformer = new MapLeafValues(generateValueTransformer(inputValueTransformer, this.reverseMapping), generateValueTransformer(outputValueTransformer, this.mapping));
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const mappingSchema = this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
        this.transformedSchema = utils.mapSchema(mappingSchema, {
            [utils.MapperKind.ENUM_VALUE]: (valueConfig, typeName, _schema, externalValue) => this.transformEnumValue(typeName, externalValue, valueConfig),
        });
        return this.transformedSchema;
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this.transformer.transformResult(originalResult, delegationContext, transformationContext);
    }
    transformEnumValue(typeName, externalValue, enumValueConfig) {
        const transformedEnumValue = this.enumValueTransformer(typeName, externalValue, enumValueConfig);
        if (Array.isArray(transformedEnumValue)) {
            const newExternalValue = transformedEnumValue[0];
            if (newExternalValue !== externalValue) {
                if (!(typeName in this.mapping)) {
                    this.mapping[typeName] = Object.create(null);
                    this.reverseMapping[typeName] = Object.create(null);
                }
                this.mapping[typeName][externalValue] = newExternalValue;
                this.reverseMapping[typeName][newExternalValue] = externalValue;
            }
        }
        return transformedEnumValue;
    }
}
function mapEnumValues(typeName, value, mapping) {
    var _a;
    const newExternalValue = (_a = mapping[typeName]) === null || _a === void 0 ? void 0 : _a[value];
    return newExternalValue != null ? newExternalValue : value;
}
function generateValueTransformer(valueTransformer, mapping) {
    if (valueTransformer == null) {
        return (typeName, value) => mapEnumValues(typeName, value, mapping);
    }
    else {
        return (typeName, value) => mapEnumValues(typeName, valueTransformer(typeName, value), mapping);
    }
}

class TransformQuery {
    constructor({ path, queryTransformer, resultTransformer = result => result, errorPathTransformer = errorPath => [...errorPath], fragments = {}, }) {
        this.path = path;
        this.queryTransformer = queryTransformer;
        this.resultTransformer = resultTransformer;
        this.errorPathTransformer = errorPathTransformer;
        this.fragments = fragments;
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        const pathLength = this.path.length;
        let index = 0;
        const document = graphql.visit(originalRequest.document, {
            [graphql.Kind.FIELD]: {
                enter: node => {
                    if (index === pathLength || node.name.value !== this.path[index] || node.selectionSet == null) {
                        return false;
                    }
                    index++;
                    if (index === pathLength) {
                        const selectionSet = this.queryTransformer(node.selectionSet, this.fragments, delegationContext, transformationContext);
                        return {
                            ...node,
                            selectionSet,
                        };
                    }
                },
                leave: () => {
                    index--;
                },
            },
        });
        return {
            ...originalRequest,
            document,
        };
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        const data = this.transformData(originalResult.data, delegationContext, transformationContext);
        const errors = originalResult.errors;
        return {
            data,
            errors: errors != null ? this.transformErrors(errors) : undefined,
        };
    }
    transformData(data, delegationContext, transformationContext) {
        const leafIndex = this.path.length - 1;
        let index = 0;
        let newData = data;
        if (newData) {
            let next = this.path[index];
            while (index < leafIndex) {
                if (data[next]) {
                    newData = newData[next];
                }
                else {
                    break;
                }
                index++;
                next = this.path[index];
            }
            newData[next] = this.resultTransformer(newData[next], delegationContext, transformationContext);
        }
        return data;
    }
    transformErrors(errors) {
        return errors.map(error => {
            const path = error.path;
            if (path == null) {
                return error;
            }
            let match = true;
            let index = 0;
            while (index < this.path.length) {
                if (path[index] !== this.path[index]) {
                    match = false;
                    break;
                }
                index++;
            }
            const newPath = match ? path.slice(0, index).concat(this.errorPathTransformer(path.slice(index))) : path;
            return utils.relocatedError(error, newPath);
        });
    }
}

class FilterObjectFieldDirectives {
    constructor(filter) {
        this.filter = filter;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const transformer = new TransformObjectFields((_typeName, _fieldName, fieldConfig) => {
            var _a, _b, _c, _d;
            const keepDirectives = (_c = (_b = (_a = fieldConfig.astNode) === null || _a === void 0 ? void 0 : _a.directives) === null || _b === void 0 ? void 0 : _b.filter(dir => {
                const directiveDef = originalWrappingSchema.getDirective(dir.name.value);
                const directiveValue = directiveDef ? utils.getArgumentValues(directiveDef, dir) : undefined;
                return this.filter(dir.name.value, directiveValue);
            })) !== null && _c !== void 0 ? _c : [];
            if (((_d = fieldConfig.astNode) === null || _d === void 0 ? void 0 : _d.directives) != null &&
                keepDirectives.length !== fieldConfig.astNode.directives.length) {
                fieldConfig = {
                    ...fieldConfig,
                    astNode: {
                        ...fieldConfig.astNode,
                        directives: keepDirectives,
                    },
                };
                return fieldConfig;
            }
        });
        return transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class RemoveObjectFieldDirectives {
    constructor(directiveName, args = {}) {
        this.transformer = new FilterObjectFieldDirectives((dirName, dirValue) => {
            return !(utils.valueMatchesCriteria(dirName, directiveName) && utils.valueMatchesCriteria(dirValue, args));
        });
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class RemoveObjectFieldsWithDirective {
    constructor(directiveName, args = {}) {
        this.directiveName = directiveName;
        this.args = args;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        const transformer = new FilterObjectFields((_typeName, _fieldName, fieldConfig) => {
            const directives = utils.getDirectives(originalWrappingSchema, fieldConfig);
            return !directives.some(directive => utils.valueMatchesCriteria(directive.name, this.directiveName) && utils.valueMatchesCriteria(directive.args, this.args));
        });
        return transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class RemoveObjectFieldDeprecations {
    constructor(reason) {
        const args = { reason };
        this.removeDirectives = new FilterObjectFieldDirectives((dirName, dirValue) => {
            return !(dirName === 'deprecated' && utils.valueMatchesCriteria(dirValue, args));
        });
        this.removeDeprecations = new TransformObjectFields((_typeName, _fieldName, fieldConfig) => {
            if (fieldConfig.deprecationReason && utils.valueMatchesCriteria(fieldConfig.deprecationReason, reason)) {
                fieldConfig = { ...fieldConfig };
                delete fieldConfig.deprecationReason;
            }
            return fieldConfig;
        });
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.removeDeprecations.transformSchema(this.removeDirectives.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema), subschemaConfig, transformedSchema);
    }
}

class RemoveObjectFieldsWithDeprecation {
    constructor(reason) {
        this.transformer = new FilterObjectFields((_typeName, _fieldName, fieldConfig) => {
            if (fieldConfig.deprecationReason) {
                return !utils.valueMatchesCriteria(fieldConfig.deprecationReason, reason);
            }
            return true;
        });
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
}

class PruneTypes {
    constructor(options = {}) {
        this.options = options;
    }
    transformSchema(originalWrappingSchema, _subschemaConfig, _transformedSchema) {
        return utils.pruneSchema(originalWrappingSchema, this.options);
    }
}

class MapFields {
    constructor(fieldNodeTransformerMap, objectValueTransformerMap, errorsTransformer) {
        this.fieldNodeTransformerMap = fieldNodeTransformerMap;
        this.objectValueTransformerMap = objectValueTransformerMap;
        this.errorsTransformer = errorsTransformer;
    }
    _getTransformer() {
        const transformer = this.transformer;
        if (transformer === undefined) {
            throw new Error(`The MapFields transform's  "transformRequest" and "transformResult" methods cannot be used without first calling "transformSchema".`);
        }
        return transformer;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        var _a;
        const subscriptionTypeName = (_a = originalWrappingSchema.getSubscriptionType()) === null || _a === void 0 ? void 0 : _a.name;
        const objectValueTransformerMap = this.objectValueTransformerMap;
        this.transformer = new TransformCompositeFields(() => undefined, (typeName, fieldName, fieldNode, fragments, transformationContext) => {
            const typeTransformers = this.fieldNodeTransformerMap[typeName];
            if (typeTransformers == null) {
                return undefined;
            }
            const fieldNodeTransformer = typeTransformers[fieldName];
            if (fieldNodeTransformer == null) {
                return undefined;
            }
            return fieldNodeTransformer(fieldNode, fragments, transformationContext);
        }, objectValueTransformerMap != null
            ? (data, transformationContext) => {
                if (data == null) {
                    return data;
                }
                let typeName = data.__typename;
                if (typeName == null) {
                    // see https://github.com/ardatan/graphql-tools/issues/2282
                    typeName = subscriptionTypeName;
                    if (typeName == null) {
                        return data;
                    }
                }
                const transformer = objectValueTransformerMap[typeName];
                if (transformer == null) {
                    return data;
                }
                return transformer(data, transformationContext);
            }
            : undefined, this.errorsTransformer != null ? this.errorsTransformer : undefined);
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this._getTransformer().transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this._getTransformer().transformResult(originalResult, delegationContext, transformationContext);
    }
}

class WrapFields {
    constructor(outerTypeName, wrappingFieldNames, wrappingTypeNames, fieldNames, prefix = 'gqtld') {
        this.outerTypeName = outerTypeName;
        this.wrappingFieldNames = wrappingFieldNames;
        this.wrappingTypeNames = wrappingTypeNames;
        this.numWraps = wrappingFieldNames.length;
        this.fieldNames = fieldNames;
        const remainingWrappingFieldNames = this.wrappingFieldNames.slice();
        const outerMostWrappingFieldName = remainingWrappingFieldNames.shift();
        if (outerMostWrappingFieldName == null) {
            throw new Error(`Cannot wrap fields, no wrapping field name provided.`);
        }
        this.transformer = new MapFields({
            [outerTypeName]: {
                [outerMostWrappingFieldName]: (fieldNode, fragments, transformationContext) => hoistFieldNodes({
                    fieldNode,
                    path: remainingWrappingFieldNames,
                    fieldNames,
                    fragments,
                    transformationContext: transformationContext,
                    prefix,
                }),
            },
        }, {
            [outerTypeName]: (value, context) => dehoistValue(value, context),
        }, (errors, context) => dehoistErrors(errors, context));
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        var _a, _b, _c, _d;
        const fieldNames = this.fieldNames;
        const targetFieldConfigMap = utils.selectObjectFields(originalWrappingSchema, this.outerTypeName, !fieldNames ? () => true : fieldName => fieldNames.includes(fieldName));
        const newTargetFieldConfigMap = Object.create(null);
        for (const fieldName in targetFieldConfigMap) {
            const field = targetFieldConfigMap[fieldName];
            const newField = {
                ...field,
                resolve: delegate.defaultMergedResolver,
            };
            newTargetFieldConfigMap[fieldName] = newField;
        }
        let wrapIndex = this.numWraps - 1;
        let wrappingTypeName = this.wrappingTypeNames[wrapIndex];
        let wrappingFieldName = this.wrappingFieldNames[wrapIndex];
        let newSchema = utils.appendObjectFields(originalWrappingSchema, wrappingTypeName, newTargetFieldConfigMap);
        for (wrapIndex--; wrapIndex > -1; wrapIndex--) {
            const nextWrappingTypeName = this.wrappingTypeNames[wrapIndex];
            newSchema = utils.appendObjectFields(newSchema, nextWrappingTypeName, {
                [wrappingFieldName]: {
                    type: newSchema.getType(wrappingTypeName),
                    resolve: delegate.defaultMergedResolver,
                },
            });
            wrappingTypeName = nextWrappingTypeName;
            wrappingFieldName = this.wrappingFieldNames[wrapIndex];
        }
        const wrappingRootField = this.outerTypeName === ((_a = originalWrappingSchema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name) ||
            this.outerTypeName === ((_b = originalWrappingSchema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name);
        let resolve;
        if (transformedSchema) {
            if (wrappingRootField) {
                const targetSchema = subschemaConfig.schema;
                const operation = this.outerTypeName === ((_c = targetSchema.getQueryType()) === null || _c === void 0 ? void 0 : _c.name) ? 'query' : 'mutation';
                const createProxyingResolver = (_d = subschemaConfig.createProxyingResolver) !== null && _d !== void 0 ? _d : defaultCreateProxyingResolver;
                resolve = createProxyingResolver({
                    subschemaConfig,
                    transformedSchema,
                    operation,
                    fieldName: wrappingFieldName,
                });
            }
            else {
                resolve = delegate.defaultMergedResolver;
            }
        }
        [newSchema] = utils.modifyObjectFields(newSchema, this.outerTypeName, fieldName => !!newTargetFieldConfigMap[fieldName], {
            [wrappingFieldName]: {
                type: newSchema.getType(wrappingTypeName),
                resolve,
            },
        });
        return this.transformer.transformSchema(newSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        transformationContext.nextIndex = 0;
        transformationContext.paths = Object.create(null);
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this.transformer.transformResult(originalResult, delegationContext, transformationContext);
    }
}
function collectFields(selectionSet, fragments, fields = [], visitedFragmentNames = {}) {
    if (selectionSet != null) {
        for (const selection of selectionSet.selections) {
            switch (selection.kind) {
                case graphql.Kind.FIELD:
                    fields.push(selection);
                    break;
                case graphql.Kind.INLINE_FRAGMENT:
                    collectFields(selection.selectionSet, fragments, fields, visitedFragmentNames);
                    break;
                case graphql.Kind.FRAGMENT_SPREAD: {
                    const fragmentName = selection.name.value;
                    if (!visitedFragmentNames[fragmentName]) {
                        visitedFragmentNames[fragmentName] = true;
                        collectFields(fragments[fragmentName].selectionSet, fragments, fields, visitedFragmentNames);
                    }
                    break;
                }
            }
        }
    }
    return fields;
}
function aliasFieldNode(fieldNode, str) {
    return {
        ...fieldNode,
        alias: {
            kind: graphql.Kind.NAME,
            value: str,
        },
    };
}
function hoistFieldNodes({ fieldNode, fieldNames, path, fragments, transformationContext, prefix, index = 0, wrappingPath = [], }) {
    const alias = fieldNode.alias != null ? fieldNode.alias.value : fieldNode.name.value;
    let newFieldNodes = [];
    if (index < path.length) {
        const pathSegment = path[index];
        for (const possibleFieldNode of collectFields(fieldNode.selectionSet, fragments)) {
            if (possibleFieldNode.name.value === pathSegment) {
                const newWrappingPath = wrappingPath.concat([alias]);
                newFieldNodes = newFieldNodes.concat(hoistFieldNodes({
                    fieldNode: possibleFieldNode,
                    fieldNames,
                    path,
                    fragments,
                    transformationContext,
                    prefix,
                    index: index + 1,
                    wrappingPath: newWrappingPath,
                }));
            }
        }
    }
    else {
        for (const possibleFieldNode of collectFields(fieldNode.selectionSet, fragments)) {
            if (!fieldNames || fieldNames.includes(possibleFieldNode.name.value)) {
                const nextIndex = transformationContext.nextIndex;
                transformationContext.nextIndex++;
                const indexingAlias = `__${prefix}${nextIndex}__`;
                transformationContext.paths[indexingAlias] = {
                    pathToField: wrappingPath.concat([alias]),
                    alias: possibleFieldNode.alias != null ? possibleFieldNode.alias.value : possibleFieldNode.name.value,
                };
                newFieldNodes.push(aliasFieldNode(possibleFieldNode, indexingAlias));
            }
        }
    }
    return newFieldNodes;
}
function dehoistValue(originalValue, context) {
    if (originalValue == null) {
        return originalValue;
    }
    const newValue = Object.create(null);
    for (const alias in originalValue) {
        let obj = newValue;
        const path = context.paths[alias];
        if (path == null) {
            newValue[alias] = originalValue[alias];
            continue;
        }
        const pathToField = path.pathToField;
        const fieldAlias = path.alias;
        for (const key of pathToField) {
            obj = obj[key] = obj[key] || Object.create(null);
        }
        obj[fieldAlias] = originalValue[alias];
    }
    return newValue;
}
function dehoistErrors(errors, context) {
    if (errors === undefined) {
        return undefined;
    }
    return errors.map(error => {
        const originalPath = error.path;
        if (originalPath == null) {
            return error;
        }
        let newPath = [];
        for (const pathSegment of originalPath) {
            if (typeof pathSegment !== 'string') {
                newPath.push(pathSegment);
                continue;
            }
            const path = context.paths[pathSegment];
            if (path == null) {
                newPath.push(pathSegment);
                continue;
            }
            newPath = newPath.concat(path.pathToField, [path.alias]);
        }
        return utils.relocatedError(error, newPath);
    });
}

class WrapType {
    constructor(outerTypeName, innerTypeName, fieldName) {
        this.transformer = new WrapFields(outerTypeName, [fieldName], [innerTypeName]);
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        return this.transformer.transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this.transformer.transformResult(originalResult, delegationContext, transformationContext);
    }
}

class HoistField {
    constructor(typeName, pathConfig, newFieldName, alias = '__gqtlw__') {
        this.typeName = typeName;
        this.newFieldName = newFieldName;
        const path = pathConfig.map(segment => (typeof segment === 'string' ? segment : segment.fieldName));
        this.argFilters = pathConfig.map((segment, index) => {
            if (typeof segment === 'string' || segment.argFilter == null) {
                return index === pathConfig.length - 1 ? () => true : () => false;
            }
            return segment.argFilter;
        });
        const pathToField = path.slice();
        const oldFieldName = pathToField.pop();
        if (oldFieldName == null) {
            throw new Error(`Cannot hoist field to ${newFieldName} on type ${typeName}, no path provided.`);
        }
        this.oldFieldName = oldFieldName;
        this.pathToField = pathToField;
        const argLevels = Object.create(null);
        this.transformer = new MapFields({
            [typeName]: {
                [newFieldName]: fieldNode => wrapFieldNode(renameFieldNode(fieldNode, oldFieldName), pathToField, alias, argLevels),
            },
        }, {
            [typeName]: value => unwrapValue(value, alias),
        }, errors => (errors != null ? unwrapErrors(errors, alias) : undefined));
        this.argLevels = argLevels;
    }
    transformSchema(originalWrappingSchema, subschemaConfig, transformedSchema) {
        var _a, _b, _c, _d;
        const argsMap = Object.create(null);
        const innerType = this.pathToField.reduce((acc, pathSegment, index) => {
            const field = acc.getFields()[pathSegment];
            for (const arg of field.args) {
                if (this.argFilters[index](arg)) {
                    argsMap[arg.name] = arg;
                    this.argLevels[arg.name] = index;
                }
            }
            return graphql.getNullableType(field.type);
        }, originalWrappingSchema.getType(this.typeName));
        let [newSchema, targetFieldConfigMap] = utils.removeObjectFields(originalWrappingSchema, innerType.name, fieldName => fieldName === this.oldFieldName);
        const targetField = targetFieldConfigMap[this.oldFieldName];
        let resolve;
        if (transformedSchema) {
            const hoistingToRootField = this.typeName === ((_a = originalWrappingSchema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name) ||
                this.typeName === ((_b = originalWrappingSchema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name);
            if (hoistingToRootField) {
                const targetSchema = subschemaConfig.schema;
                const operation = this.typeName === ((_c = targetSchema.getQueryType()) === null || _c === void 0 ? void 0 : _c.name) ? 'query' : 'mutation';
                const createProxyingResolver = (_d = subschemaConfig.createProxyingResolver) !== null && _d !== void 0 ? _d : defaultCreateProxyingResolver;
                resolve = createProxyingResolver({
                    subschemaConfig,
                    transformedSchema,
                    operation,
                    fieldName: this.newFieldName,
                });
            }
            else {
                resolve = delegate.defaultMergedResolver;
            }
        }
        const newTargetField = {
            ...targetField,
            resolve: resolve,
        };
        const level = this.pathToField.length;
        const args = targetField.args;
        if (args != null) {
            for (const argName in args) {
                const argConfig = args[argName];
                if (argConfig == null) {
                    continue;
                }
                const arg = {
                    ...argConfig,
                    name: argName,
                    description: argConfig.description,
                    defaultValue: argConfig.defaultValue,
                    extensions: argConfig.extensions,
                    astNode: argConfig.astNode,
                };
                if (this.argFilters[level](arg)) {
                    argsMap[argName] = arg;
                    this.argLevels[arg.name] = level;
                }
            }
        }
        newTargetField.args = argsMap;
        newSchema = utils.appendObjectFields(newSchema, this.typeName, {
            [this.newFieldName]: newTargetField,
        });
        return this.transformer.transformSchema(newSchema, subschemaConfig, transformedSchema);
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
    transformResult(originalResult, delegationContext, transformationContext) {
        return this.transformer.transformResult(originalResult, delegationContext, transformationContext);
    }
}
function wrapFieldNode(fieldNode, path, alias, argLevels) {
    return path.reduceRight((acc, fieldName, index) => ({
        kind: graphql.Kind.FIELD,
        alias: {
            kind: graphql.Kind.NAME,
            value: alias,
        },
        name: {
            kind: graphql.Kind.NAME,
            value: fieldName,
        },
        selectionSet: {
            kind: graphql.Kind.SELECTION_SET,
            selections: [acc],
        },
        arguments: fieldNode.arguments != null
            ? fieldNode.arguments.filter(arg => argLevels[arg.name.value] === index)
            : undefined,
    }), {
        ...fieldNode,
        arguments: fieldNode.arguments != null
            ? fieldNode.arguments.filter(arg => argLevels[arg.name.value] === path.length)
            : undefined,
    });
}
function renameFieldNode(fieldNode, name) {
    return {
        ...fieldNode,
        alias: {
            kind: graphql.Kind.NAME,
            value: fieldNode.alias != null ? fieldNode.alias.value : fieldNode.name.value,
        },
        name: {
            kind: graphql.Kind.NAME,
            value: name,
        },
    };
}
function unwrapValue(originalValue, alias) {
    let newValue = originalValue;
    let object = newValue[alias];
    while (object != null) {
        newValue = object;
        object = newValue[alias];
    }
    delete originalValue[alias];
    Object.assign(originalValue, newValue);
    return originalValue;
}
function unwrapErrors(errors, alias) {
    if (errors === undefined) {
        return undefined;
    }
    return errors.map(error => {
        const originalPath = error.path;
        if (originalPath == null) {
            return error;
        }
        const newPath = originalPath.filter(pathSegment => pathSegment !== alias);
        return utils.relocatedError(error, newPath);
    });
}

class WrapQuery {
    constructor(path, wrapper, extractor) {
        this.path = path;
        this.wrapper = wrapper;
        this.extractor = extractor;
    }
    transformRequest(originalRequest, _delegationContext, _transformationContext) {
        const fieldPath = [];
        const ourPath = JSON.stringify(this.path);
        const document = graphql.visit(originalRequest.document, {
            [graphql.Kind.FIELD]: {
                enter: (node) => {
                    fieldPath.push(node.name.value);
                    if (node.selectionSet != null && ourPath === JSON.stringify(fieldPath)) {
                        const wrapResult = this.wrapper(node.selectionSet);
                        // Selection can be either a single selection or a selection set. If it's just one selection,
                        // let's wrap it in a selection set. Otherwise, keep it as is.
                        const selectionSet = wrapResult != null && wrapResult.kind === graphql.Kind.SELECTION_SET
                            ? wrapResult
                            : {
                                kind: graphql.Kind.SELECTION_SET,
                                selections: [wrapResult],
                            };
                        return {
                            ...node,
                            selectionSet,
                        };
                    }
                },
                leave: () => {
                    fieldPath.pop();
                },
            },
        });
        return {
            ...originalRequest,
            document,
        };
    }
    transformResult(originalResult, _delegationContext, _transformationContext) {
        const rootData = originalResult.data;
        if (rootData != null) {
            let data = rootData;
            const path = [...this.path];
            while (path.length > 1) {
                const next = path.shift();
                if (data[next]) {
                    data = data[next];
                }
            }
            data[path[0]] = this.extractor(data[path[0]]);
        }
        return {
            data: rootData,
            errors: originalResult.errors,
        };
    }
}

class ExtractField {
    constructor({ from, to }) {
        this.from = from;
        this.to = to;
    }
    transformRequest(originalRequest, _delegationContext, _transformationContext) {
        let fromSelection;
        const ourPathFrom = JSON.stringify(this.from);
        const ourPathTo = JSON.stringify(this.to);
        let fieldPath = [];
        graphql.visit(originalRequest.document, {
            [graphql.Kind.FIELD]: {
                enter: (node) => {
                    fieldPath.push(node.name.value);
                    if (ourPathFrom === JSON.stringify(fieldPath)) {
                        fromSelection = node.selectionSet;
                        return graphql.BREAK;
                    }
                },
                leave: () => {
                    fieldPath.pop();
                },
            },
        });
        fieldPath = [];
        const document = graphql.visit(originalRequest.document, {
            [graphql.Kind.FIELD]: {
                enter: (node) => {
                    fieldPath.push(node.name.value);
                    if (ourPathTo === JSON.stringify(fieldPath) && fromSelection != null) {
                        return {
                            ...node,
                            selectionSet: fromSelection,
                        };
                    }
                },
                leave: () => {
                    fieldPath.pop();
                },
            },
        });
        return {
            ...originalRequest,
            document,
        };
    }
}

function getSchemaFromIntrospection(introspectionResult, options) {
    var _a, _b;
    if ((_a = introspectionResult === null || introspectionResult === void 0 ? void 0 : introspectionResult.data) === null || _a === void 0 ? void 0 : _a.__schema) {
        return graphql.buildClientSchema(introspectionResult.data, options);
    }
    else if ((_b = introspectionResult === null || introspectionResult === void 0 ? void 0 : introspectionResult.errors) === null || _b === void 0 ? void 0 : _b.length) {
        if (introspectionResult.errors.length > 1) {
            const combinedError = new utils.AggregateError(introspectionResult.errors, 'Could not obtain introspection result');
            throw combinedError;
        }
        const error = introspectionResult.errors[0];
        throw error.originalError || error;
    }
    else {
        throw new Error('Could not obtain introspection result, received: ' + JSON.stringify(introspectionResult));
    }
}
function introspectSchema(executor, context, options) {
    const parsedIntrospectionQuery = graphql.parse(graphql.getIntrospectionQuery(options), options);
    return new valueOrPromise.ValueOrPromise(() => executor({
        document: parsedIntrospectionQuery,
        operationType: 'query',
        context,
    }))
        .then(introspection => {
        if (utils.isAsyncIterable(introspection)) {
            return introspection.next().then(({ value }) => value);
        }
        return introspection;
    })
        .then(introspection => getSchemaFromIntrospection(introspection, options))
        .resolve();
}

exports.ExtractField = ExtractField;
exports.FilterInputObjectFields = FilterInputObjectFields;
exports.FilterInterfaceFields = FilterInterfaceFields;
exports.FilterObjectFieldDirectives = FilterObjectFieldDirectives;
exports.FilterObjectFields = FilterObjectFields;
exports.FilterRootFields = FilterRootFields;
exports.FilterTypes = FilterTypes;
exports.HoistField = HoistField;
exports.MapFields = MapFields;
exports.MapLeafValues = MapLeafValues;
exports.PruneSchema = PruneTypes;
exports.RemoveObjectFieldDeprecations = RemoveObjectFieldDeprecations;
exports.RemoveObjectFieldDirectives = RemoveObjectFieldDirectives;
exports.RemoveObjectFieldsWithDeprecation = RemoveObjectFieldsWithDeprecation;
exports.RemoveObjectFieldsWithDirective = RemoveObjectFieldsWithDirective;
exports.RenameInputObjectFields = RenameInputObjectFields;
exports.RenameInterfaceFields = RenameInterfaceFields;
exports.RenameObjectFields = RenameObjectFields;
exports.RenameRootFields = RenameRootFields;
exports.RenameRootTypes = RenameRootTypes;
exports.RenameTypes = RenameTypes;
exports.TransformCompositeFields = TransformCompositeFields;
exports.TransformEnumValues = TransformEnumValues;
exports.TransformInputObjectFields = TransformInputObjectFields;
exports.TransformInterfaceFields = TransformInterfaceFields;
exports.TransformObjectFields = TransformObjectFields;
exports.TransformQuery = TransformQuery;
exports.TransformRootFields = TransformRootFields;
exports.WrapFields = WrapFields;
exports.WrapQuery = WrapQuery;
exports.WrapType = WrapType;
exports.defaultCreateProxyingResolver = defaultCreateProxyingResolver;
exports.generateProxyingResolvers = generateProxyingResolvers;
exports.introspectSchema = introspectSchema;
exports.wrapSchema = wrapSchema;
