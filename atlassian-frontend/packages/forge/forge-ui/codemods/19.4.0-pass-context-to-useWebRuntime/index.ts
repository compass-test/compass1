import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const { source } = fileInfo;
  const collection = j(source);

  let hasSourceChanged = false;

  collection
    .find(j.CallExpression)
    .filter((path) => {
      const {
        node: { callee },
      } = path;
      return callee.type === 'Identifier' && callee.name === 'useWebRuntime';
    })
    .find(j.ObjectExpression)
    .find(j.ObjectProperty)
    .filter((path) => {
      const isEntryPointProperty =
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'entryPoint';
      if (isEntryPointProperty) {
        hasSourceChanged = true;
      }
      return isEntryPointProperty;
    })
    .insertAfter(
      j.objectProperty(
        j.identifier('temporaryContext'),
        j.identifier('extensionData'),
      ),
    );

  if (!hasSourceChanged) {
    return source;
  }

  return collection.toSource(options.printOptions || { quote: 'single' });
}
