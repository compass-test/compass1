import { API, FileInfo, Options, CallExpression } from 'jscodeshift';

const calleeMatchesExpectGetForgeExtensionProvider = (
  callee: CallExpression['callee'],
): boolean => {
  return (
    callee.type === 'MemberExpression' &&
    callee.object.type === 'MemberExpression' &&
    callee.object.object.type === 'MemberExpression' &&
    callee.object.object.object.type === 'MemberExpression' &&
    callee.object.object.object.object.type === 'CallExpression' &&
    callee.object.object.object.object.callee.type === 'Identifier' &&
    callee.object.object.object.object.callee.name === 'expect' &&
    callee.object.object.object.object.arguments[0].type === 'Identifier' &&
    callee.object.object.object.object.arguments[0].name ===
      'getForgeExtensionProvider'
  );
};

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const { source } = fileInfo;
  const collection = j(source);

  let hasSourceChanged = false;

  // Add cloudId to getForgeExtensionProvider
  collection
    .find(j.CallExpression)
    .filter((path) =>
      calleeMatchesExpectGetForgeExtensionProvider(path.node.callee),
    )
    .find(j.Identifier)
    .filter((path) => {
      const isProviderFactoryIdentifier = path.node.name === 'providerFactory';
      if (isProviderFactoryIdentifier) {
        hasSourceChanged = true;
      }
      return isProviderFactoryIdentifier;
    })
    .insertBefore(j.identifier('testCloudId'));

  // Add extensionData
  collection
    .find(j.CallExpression)
    .filter((path) =>
      calleeMatchesExpectGetForgeExtensionProvider(path.node.callee),
    )
    .find(j.Identifier)
    .filter((path) => {
      const isXenContextIdentifier = path.node.name === 'xenContext';
      if (isXenContextIdentifier) {
        hasSourceChanged = true;
      }
      return isXenContextIdentifier;
    })
    .insertBefore(j.objectExpression([]));

  // Add accountId
  collection
    .find(j.CallExpression)
    .filter((path) =>
      calleeMatchesExpectGetForgeExtensionProvider(path.node.callee),
    )
    .find(j.Identifier)
    .filter((path) => {
      const isXenContextIdentifier = path.node.name === 'xenContext';
      if (isXenContextIdentifier) {
        hasSourceChanged = true;
      }
      return isXenContextIdentifier;
    })
    .insertAfter(
      j.memberExpression(
        j.identifier('defaultProps'),
        j.identifier('accountId'),
      ),
    );

  if (!hasSourceChanged) {
    return source;
  }

  return collection.toSource(options.printOptions || { quote: 'single' });
}
