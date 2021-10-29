/**
 * This is a duplicate of the processRawValue function defined in @atlaskit/editor-core/src/utils/document.ts.
 *
 * We are duplicating the code temporarily since we can't import it via @atlaskit/editor-core/dist/esm/utils
 * (this is how ProForma used to do it) since it causes build errors in the atlassian-frontend build infrastructure.
 *
 * In the long term we want to push for the editor-core package to publicly export the desired function so we can remove
 * this duplicate code.
 */

import { Node, Schema } from 'prosemirror-model';

import { ADFEntity } from '@atlaskit/adf-utils';
import { validateADFEntity } from '@atlaskit/editor-common';
import { JSONDocNode } from '@atlaskit/editor-json-transformer';

export const processRawValue = (
  schema: Schema,
  value?: string | object,
): Node | undefined => {
  if (!value) {
    return;
  }

  interface NodeType {
    [key: string]: any;
  }

  let node: NodeType | ADFEntity;

  if (typeof value === 'string') {
    try {
      node = JSON.parse(value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Error processing value: ${value} isn't a valid JSON`);
      return;
    }
  } else {
    node = value;
  }

  if (Array.isArray(node)) {
    // eslint-disable-next-line no-console
    console.error(
      `Error processing value: ${node} is an array, but it must be an object.`,
    );
    return;
  }
  try {
    // ProseMirror always require a child under doc
    if (node.type === 'doc') {
      if (Array.isArray(node.content) && node.content.length === 0) {
        node.content.push({
          type: 'paragraph',
          content: [],
        });
      }
      // Just making sure doc is always valid
      if (!node.version) {
        node.version = 1;
      }
    }

    const entity: ADFEntity = validateADFEntity(schema, node as ADFEntity);

    let newEntity = entity as JSONDocNode;

    const parsedDoc = Node.fromJSON(schema, newEntity);

    // throws an error if the document is invalid
    parsedDoc.check();

    return parsedDoc;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `Error processing document:\n${e.message}\n\n`,
      JSON.stringify(node),
    );
    return;
  }
};
