import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const { source } = fileInfo;
  const collection = j(source);

  let hasSourceChanged = false;

  // Add temporaryContext to getForgeExtensionProviderNext
  collection
    .find(j.CallExpression)
    .filter((path) => {
      const {
        node: { callee },
      } = path;
      return (
        callee.type === 'Identifier' &&
        callee.name === 'getForgeExtensionProviderNext'
      );
    })
    .find(j.ObjectExpression)
    .find(j.ObjectProperty)
    .filter((path) => {
      const isExtensionDataProperty =
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'extensionData';
      if (isExtensionDataProperty) {
        hasSourceChanged = true;
      }
      return isExtensionDataProperty;
    })
    .insertAfter(
      j.objectProperty(
        j.identifier('temporaryContext'),
        j.callExpression(j.identifier('createXenContext'), [
          j.identifier('accountId'),
          j.identifier('cloudId'),
          j.identifier('contentId'),
          j.identifier('spaceKey'),
        ]),
      ),
    );

  // Add cloudId to getForgeExtensionProvider
  collection
    .find(j.CallExpression)
    .filter((path) => {
      const {
        node: { callee },
      } = path;
      return (
        callee.type === 'Identifier' &&
        callee.name === 'getForgeExtensionProvider'
      );
    })
    .find(j.Identifier)
    .filter((path) => {
      const isContextIdsIdentifier = path.node.name === 'contextIds';
      if (isContextIdsIdentifier) {
        hasSourceChanged = true;
      }
      return isContextIdsIdentifier;
    })
    .insertAfter(j.identifier('cloudId'));

  // Add extensionData to getForgeExtensionProvider
  collection
    .find(j.CallExpression)
    .filter((path) => {
      const {
        node: { callee },
      } = path;
      return (
        callee.type === 'Identifier' &&
        callee.name === 'getForgeExtensionProvider'
      );
    })
    .find(j.Literal)
    .filter((path) => {
      const isPageLiteral =
        path.node.value === 'confluence:macroEditor' ||
        path.node.value === 'confluence:macroRenderer';
      if (isPageLiteral) {
        hasSourceChanged = true;
      }
      return isPageLiteral;
    })
    .insertAfter(j.objectExpression([]));

  // Add accountId to getForgeExtensionProvider
  collection
    .find(j.CallExpression)
    .filter((path) => {
      const {
        node: { callee },
      } = path;
      return (
        callee.type === 'Identifier' &&
        callee.name === 'getForgeExtensionProvider'
      );
    })
    .find(j.CallExpression)
    .filter((path) => {
      const isCreateXenContextCallExpression =
        path.node.callee.type === 'Identifier' &&
        path.node.callee.name === 'createXenContext';
      if (isCreateXenContextCallExpression) {
        hasSourceChanged = true;
      }
      return isCreateXenContextCallExpression;
    })
    .insertAfter(
      j.logicalExpression(
        '??',
        j.identifier('accountId'),
        j.identifier('undefined'),
      ),
    );

  if (!hasSourceChanged) {
    return source;
  }

  return collection.toSource(options.printOptions || { quote: 'single' });
}
