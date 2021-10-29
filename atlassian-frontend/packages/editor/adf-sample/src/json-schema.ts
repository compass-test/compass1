import faker from 'faker';

const $refRegex = new RegExp('#/definitions/\\w+');
const $refNodeRegex = new RegExp('#/definitions/\\w+_node');

type JsonSchemaV4String = { type: 'string'; pattern?: string };
type JsonSchemaV4Boolean = { type: 'boolean' };
type JsonSchemaV4Number = {
  type: 'number';
  minimum?: number;
  maximum?: number;
};
type JsonSchemaV4Enum = { enum: string[] };
type JsonSchemaV4AllOf = { allOf: JsonSchemaV4[] };
type JsonSchemaV4AnyOf = { anyOf: JsonSchemaV4[] };
type JsonSchemaV4Ref = { $ref: string };
type JsonSchemaV4Object = {
  type: 'object';
  properties: Record<string, JsonSchemaV4>;
};
type JsonSchemaV4Array = {
  type: 'array';
  items?: JsonSchemaV4 | JsonSchemaV4[];
  maxItems?: number;
  minItems?: number;
};

type JsonSchemaV4 =
  | JsonSchemaV4String
  | JsonSchemaV4Boolean
  | JsonSchemaV4Number
  | JsonSchemaV4Enum
  | JsonSchemaV4Object
  | JsonSchemaV4Array
  | JsonSchemaV4Ref;

export type JSONSchemaV4Root = {
  $schema: string;
  description: string;
  $ref: string;
  definitions?: Record<string, JsonSchemaV4>;
};

// START - helpers

function isEmptyObject(maybeEmptyObject: any): maybeEmptyObject is {} {
  return (
    typeof maybeEmptyObject === 'object' &&
    Object.keys(maybeEmptyObject).length === 0
  );
}

function isBoolean(maybeBoolean: any): maybeBoolean is JsonSchemaV4Boolean {
  return maybeBoolean?.type === 'boolean';
}

function isString(maybeString: any): maybeString is JsonSchemaV4String {
  return maybeString?.type === 'string';
}

function isNumber(maybeNumber: any): maybeNumber is JsonSchemaV4Number {
  return maybeNumber?.type === 'number';
}

function isEnum(maybeEnum: any): maybeEnum is JsonSchemaV4Enum {
  return !!maybeEnum?.enum;
}

function isRef(maybeRef: any): maybeRef is JsonSchemaV4Ref {
  return !!maybeRef?.$ref;
}

function isArray(maybeArray: any): maybeArray is JsonSchemaV4Array {
  return maybeArray?.type === 'array';
}

function isObject(maybeObject: any): maybeObject is JsonSchemaV4Object {
  return maybeObject?.type === 'object';
}

function isAllOf(maybeAllOf: any): maybeAllOf is JsonSchemaV4AllOf {
  return !!maybeAllOf?.allOf;
}

function isAnyOf(maybeAnyOf: any): maybeAnyOf is JsonSchemaV4AnyOf {
  return !!maybeAnyOf?.anyOf;
}

function getAllOf(jsonSchema: JSONSchemaV4Root, allOf: object[]): string[] {
  return allOf.reduce<string[]>((acc, item) => {
    if (isRef(item)) {
      return [...acc, ...getContentFromNode(jsonSchema, item.$ref)];
    }

    if (isObject(item)) {
      try {
        return [...acc, ...getContentFromObject(jsonSchema, item)];
      } catch (e) {}
    }

    return acc;
  }, []);
}

function getAllOfRef(allOf: JsonSchemaV4[]): string {
  const firstRef = allOf.filter(isRef).find(extend => !!extend.$ref);
  if (!firstRef) {
    throw new Error('There is not reference inside the allOf.');
  }
  return firstRef.$ref;
}

function getAnyOf(anyOf: JsonSchemaV4[]) {
  return anyOf.filter(isRef).map(item => item.$ref);
}

//// START - JSONSchema builders
function buildArray(
  jsonSchema: JSONSchemaV4Root,
  array: JsonSchemaV4Array,
): any[] | undefined {
  let length: number = array.minItems ?? 0;

  // Not sure if this is correct for json schema in general
  // but for our json schema we dont want to create an array when
  // we dont have items or we explicit have maxItems equal zero
  if (array.maxItems === 0 || !array.items) {
    return;
  }
  const items =
    array.items && Array.isArray(array.items) ? array.items : [array.items];
  // TODO: Force to add any type of item in the array
  length = items.length;

  return Array.from({ length }, () => {
    const id = faker.random.number({ max: items.length - 1 });
    const item = items[id];
    return buildJSONSchema(jsonSchema, item);
    // TODO: Implement this base on property.items
  });
}

function buildTypeObject(
  jsonSchema: JSONSchemaV4Root,
  typeObject: JsonSchemaV4Object,
) {
  return Object.keys(typeObject.properties).reduce<any>((obj, key) => {
    if (key === 'content') {
      // We have a different algorithm to handle content
      obj['content'] = [];
      return obj;
    }

    obj[key] = buildJSONSchema(jsonSchema, typeObject.properties[key]);
    return obj;
  }, {});
}

function buildAllOf(jsonSchema: JSONSchemaV4Root, node: JsonSchemaV4AllOf) {
  return node.allOf.reduce<any>((acc, item) => {
    if (isRef(item)) {
      return { ...acc, ...fakeJSONSchema(jsonSchema, item.$ref) };
    }
    if (isObject(item)) {
      return { ...acc, ...buildTypeObject(jsonSchema, item) };
    }
    return acc;
  }, {});
}

function buildAnyOf(jsonSchema: JSONSchemaV4Root, node: JsonSchemaV4AnyOf) {
  const item =
    node.anyOf[faker.random.number({ min: 0, max: node.anyOf.length - 1 })];
  if (isRef(item)) {
    return fakeJSONSchema(jsonSchema, item.$ref);
  }
  if (isObject(item)) {
    return buildTypeObject(jsonSchema, item);
  }

  throw new Error(`Unhandled case inside buildAnyOf: ${{ node }}`);
}

/**
 *
 * @param jsonSchema The whole json schema that contains all of our definitions
 * @param node Reference to one of the elements in the JSON Schema
 * @constructor
 */
function buildJSONSchema(
  jsonSchema: JSONSchemaV4Root,
  node: JsonSchemaV4,
): any {
  if (isBoolean(node)) {
    return faker.random.boolean();
  }

  if (isString(node)) {
    if (node.pattern) {
      return '#000000';
    }
    return faker.random.word();
  }

  if (isNumber(node)) {
    return faker.random.number({
      min: node.minimum ?? 1,
      max: node.maximum ?? 100,
    });
  }

  if (isEnum(node)) {
    return node.enum[
      faker.random.number({ min: 0, max: node.enum.length - 1 })
    ];
  }

  if (isArray(node)) {
    return buildArray(jsonSchema, node);
  }

  if (isObject(node)) {
    return buildTypeObject(jsonSchema, node);
  }

  if (isAllOf(node)) {
    return buildAllOf(jsonSchema, node);
  }

  if (isAnyOf(node)) {
    return buildAnyOf(jsonSchema, node);
  }

  if (isRef(node)) {
    return buildJSONSchema(jsonSchema, getByDefinition(jsonSchema, node.$ref));
  }

  if (isEmptyObject(node)) {
    return {};
  }

  if (node === undefined) {
    return undefined;
  }

  throw new Error(
    `We haven't implement this user case for the schema: ${JSON.stringify(
      node,
      null,
      2,
    )}.`,
  );
}

export function getByDefinition(
  jsonSchema: JSONSchemaV4Root,
  $ref: string,
): JsonSchemaV4 {
  if (!$refRegex.test($ref)) {
    throw new Error(`Invalid reference ${$ref}`);
  }

  if (!jsonSchema.definitions) {
    throw new Error('JSONSchema does not have definitions.');
  }

  const [, id] = $ref.split('#/definitions/');

  return jsonSchema.definitions[id];
}

// END - helpers

export function getContentFromObject(
  jsonSchema: JSONSchemaV4Root,
  node: JsonSchemaV4Object,
): string[] {
  const content = node.properties.content;
  // Case where the node is a leaf and it does not have content
  if (!content) {
    return []; // is a leaf, it does not have content
  }

  // Single case where it only have one kind of content
  if (isRef(content)) {
    return getContentFromNode(jsonSchema, content.$ref);
  }

  if (isArray(content)) {
    if (isAllOf(content.items)) {
      return [getAllOfRef(content.items.allOf)];
    }

    if (isAnyOf(content.items)) {
      return getAnyOf(content.items.anyOf);
    }

    if (isRef(content.items)) {
      // Edge case for inline node that we need to split
      const contentNode = getByDefinition(jsonSchema, content.items.$ref);
      // if its a node we return it
      if ($refNodeRegex.test(content.items.$ref) && !isAnyOf(contentNode)) {
        return [content.items.$ref];
      }
      // otherwise, it will be a ref content, we expand it as we dont want content ref in our graph
      return getContentFromNode(jsonSchema, content.items.$ref);
    }

    // Kind of edge case
    if (Array.isArray(content.items)) {
      const refs = new Set<string>();
      content.items.forEach((item: JsonSchemaV4) => {
        if (isAnyOf(item)) {
          getAnyOf(item.anyOf).forEach(item => refs.add(item));
        }
        if (isRef(item)) {
          refs.add(item.$ref);
        }
      });
      return Array.from(refs);
    }
  }

  throw new Error(`Missing case found, the object is: ${JSON.stringify(node)}`);
}

export function getContentDeclarationFromNode(
  jsonSchema: JSONSchemaV4Root,
  node: JsonSchemaV4,
): JsonSchemaV4 | undefined {
  if (isObject(node)) {
    const content = node.properties.content;
    // Case where the node is a leaf and it does not have content
    if (!content) {
      return; // is a leaf, it does not have content
    }
    return content;
  }

  if (isAllOf(node)) {
    const contentDeclarations = node.allOf
      .map(child => getContentDeclarationFromNode(jsonSchema, child))
      .filter(declaration => !!declaration) as JsonSchemaV4[];

    if (contentDeclarations.length === 0) {
      return;
    }
    // we only use the last content declaration
    return contentDeclarations.reduce((last, current) =>
      !!current ? current : last,
    );
  }

  if (isRef(node)) {
    return getContentDeclarationFromNode(
      jsonSchema,
      getByDefinition(jsonSchema, node.$ref),
    );
  }
}

/**
 * Extract the content of a given reference in the json schema
 * It cover some edge case very particular of our ADF schema
 * @param jsonSchema
 * @param $ref
 */
export function getContentFromNode(
  jsonSchema: JSONSchemaV4Root,
  $ref: string,
): string[] {
  const node = getByDefinition(jsonSchema, $ref);

  // Somethings we group together similar content into his own reference
  // Some contents use anyOf directly
  if (isAnyOf(node)) {
    return getAnyOf(node.anyOf);
  }

  // Others use an anyOf inside an Array
  if (isArray(node) && isAnyOf(node.items)) {
    return getAnyOf(node.items?.anyOf);
  }

  // It could be a compose node e.g. paragraph_with_no_mark_node is compose of paragraph_node
  if (isAllOf(node)) {
    return getAllOf(jsonSchema, node.allOf);
  }

  // This is a proper node definition, this has a 1:1 relationship with the prosemirror schema
  if (isObject(node)) {
    return getContentFromObject(jsonSchema, node);
  }

  throw new Error(`Missing case found, the content is: ${$ref}`);
}

export type ContentData = {
  maxItems?: number;
  minItems?: number;
  startsWith?: string[];
  customContent?: string[];
};

/**
 * Extract content specific data given a reference
 * @param jsonSchema
 * @param $ref
 */
export function getContentData(
  jsonSchema: JSONSchemaV4Root,
  $ref: string,
): ContentData | undefined {
  const _getContentRefs = (
    content: JsonSchemaV4AnyOf | JsonSchemaV4Ref,
  ): string[] => {
    const contentRefs = [];
    if (isAnyOf(content)) {
      contentRefs.push(...getAnyOf(content.anyOf));
    }
    if (isRef(content)) {
      contentRefs.push(content.$ref);
    }
    return contentRefs;
  };

  const node = getByDefinition(jsonSchema, $ref);
  const content = getContentDeclarationFromNode(jsonSchema, node);
  if (!content) {
    return;
  }

  if (isArray(content)) {
    const contentData: ContentData = {
      maxItems: content.maxItems,
      minItems: content.minItems,
    };

    if (Array.isArray(content.items)) {
      if (content.items.length > 2) {
        // We haven't implemented yet the case where we have 3 different
        // type of content like [startsWith, followsWith, ...customContent]
        throw new Error('Unexpected content with more then 3 items.');
      }

      // Start withs and customContent scenarios
      if (content.items.length === 2) {
        // special case where first item is content for first child
        const [startsWithContent, customContent] = content.items as Array<
          JsonSchemaV4AnyOf | JsonSchemaV4Ref
        >;
        contentData.startsWith = _getContentRefs(startsWithContent);
        const customContentRefs = _getContentRefs(customContent);
        // If the startWiths content is not included in the next of the document content, then
        if (
          !contentData.startsWith.every(
            ref => customContentRefs.indexOf(ref) !== -1,
          )
        ) {
          contentData.customContent = customContentRefs;
        }
      }
    }
    if (Object.keys(contentData).length > 0) {
      return contentData;
    }
  }

  return undefined;
}

/**
 *
 * Document structure is handled by ADFGraph, for that reason,
 * we stop faking on any `content property`.
 * @param jsonSchema
 * @param $ref
 */
export function fakeJSONSchema(
  jsonSchema: JSONSchemaV4Root,
  $ref: string,
): any {
  const node = getByDefinition(jsonSchema, $ref);

  if (isObject(node) || isAllOf(node) || isAnyOf(node)) {
    return buildJSONSchema(jsonSchema, node);
  }

  throw new Error(
    `There is a node reference that we haven't implement yet: ${$ref}`,
  );
}
