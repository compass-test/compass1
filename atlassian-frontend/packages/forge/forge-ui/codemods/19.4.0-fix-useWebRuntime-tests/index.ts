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
      return (
        callee.type === 'MemberExpression' &&
        callee.object.type === 'CallExpression' &&
        callee.object.callee.type === 'Identifier' &&
        callee.object.callee.name === 'expect' &&
        callee.object.arguments[0]?.type === 'Identifier' &&
        callee.object.arguments[0].name === 'mockUseWebRuntime'
      );
    })
    .find(j.ObjectExpression)
    .find(j.ObjectProperty)
    .filter((path) => {
      const isCoreDataProperty =
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'coreData';
      if (isCoreDataProperty) {
        hasSourceChanged = true;
      }
      return isCoreDataProperty;
    })
    .insertAfter(
      j.objectProperty(
        j.identifier('temporaryContext'),
        j.objectExpression([]),
      ),
    );

  if (!hasSourceChanged) {
    return source;
  }

  return collection.toSource(options.printOptions || { quote: 'single' });
}
