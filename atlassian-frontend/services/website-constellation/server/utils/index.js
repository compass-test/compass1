const __set = require('lodash/set');
const __get = require('lodash/get');

exports.replaceEntryHyperlink = function replaceEntryHyperlink(node) {
  // if the nodeType is entry-hyperlink
  // select only some of the target field to pass through
  // here we only want the slug and the category.

  if (node.nodeType === 'entry-hyperlink') {
    // we need the parent slug for building subpage URLs
    const parentSlug = __get(node, 'data.target.fields.parent.fields.slug');

    const newNode = { ...node };
    __set(newNode, 'data.target.fields', {
      slug: node.data.target.fields.slug,
      category: node.data.target.fields.category,
      parent: parentSlug ? { fields: { slug: parentSlug } } : undefined,
    });
    return newNode;
  }
  // if there is a content array, and no entry-hyperlink in sight
  // then proceed to run this function in a map of the content array
  if (Array.isArray(node.content)) {
    return {
      ...node,
      content: node.content.map(exports.replaceEntryHyperlink),
    };
  }

  // if no content array exists, just return the node.
  return node;
};

exports.omitParent = function omitParent(node) {
  // clone the node
  const newNode = { ...node };
  // set the data.target.field with a clone of the field with the parent field omitted
  // this is so we don't mutate the original node
  // delete newNode.fields.parent;
  __set(newNode, 'fields', {
    ...node.fields,
    parent: undefined,
  });

  return newNode;
};
