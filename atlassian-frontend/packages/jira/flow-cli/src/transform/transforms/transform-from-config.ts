import { SyntaxKind, Node } from 'ts-morph';
import reactConfig from '../../config/react';

export const transformFromConfig = (
  node: Node,
  type: SyntaxKind,
  config?: Object,
) => {
  const nodes = node.getDescendantsOfKind(type);

  nodes.forEach((node: Node) => {
    if (node.wasForgotten()) {
      return;
    }

    const nodeText = node.getText();

    if (
      nodeText === 'toString' ||
      nodeText === 'valueOf' ||
      nodeText === 'propertyIsEnumerable' ||
      nodeText === 'toLocaleString' ||
      nodeText === 'constructor' ||
      nodeText === 'isPrototypeOf' ||
      nodeText === 'hasOwnProperty'
    ) {
      return;
    }
    // @ts-ignore
    const reactReplacer = reactConfig[nodeText];
    // @ts-ignore
    const replacer = config && config[nodeText];
    if (replacer) {
      node.replaceWithText(replacer);
      return;
    }

    if (reactReplacer) {
      node.replaceWithText(reactReplacer);
    }
  });
};
