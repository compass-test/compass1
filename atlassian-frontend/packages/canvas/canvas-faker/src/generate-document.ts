import { random, helpers, lorem, company, commerce, name } from 'faker';

import {
  Document,
  Node,
  MockADFNode,
  ADFParagraphNode,
  ADFParagraphsNode,
} from './model';

function range(a: number, b: number): number[] {
  const [lower, upper] = [a, b].sort();
  return new Array(Math.max(upper - lower, 1))
    .fill(0)
    .map((_, index) => index + lower);
}

function paragraphNode(): ADFParagraphNode {
  const contents = range(1, random.number({ min: 1, max: 6 }))
    .map(() =>
      helpers.randomize([
        lorem.word(),
        lorem.word(),
        company.bsBuzz(),
        commerce.productMaterial(),
        company.companySuffix(),

        helpers.randomize(['🚀', '😀', '🎉', '👍', '👎']),
      ]),
    )
    .join(' ');

  return {
    type: 'paragraph',
    contents,
    attribute: helpers.randomize(['regular', 'bold', 'italic']),
  };
}

function paragraphsNode(): ADFParagraphsNode {
  return {
    type: 'paragraphs',
    contents: range(1, random.number({ min: 1, max: 3 })).map(() =>
      paragraphNode(),
    ),
  };
}

function mockAdfNode(): MockADFNode {
  return helpers.randomize<() => MockADFNode>([
    paragraphNode,
    paragraphsNode,
  ])();
}

function generateNode({ canvasSize, nodeSize }: Configuration): Node {
  return {
    id: random.uuid(),
    x: random.number(canvasSize - nodeSize),
    y: random.number(canvasSize - nodeSize),
    type: 'note',
    color: 'red',
    contents: mockAdfNode(),
    author: `${name.firstName()} ${name.lastName()}`,
  };
}

interface Configuration {
  canvasSize: number;
  nodeSize: number;
  nodeCount: number;
  seed: number;
  name: string;
}

export function generateDocument(options: Configuration): Document {
  const nodes = new Array(options.nodeCount)
    .fill(0)
    .map(() => generateNode(options));

  return {
    height: options.canvasSize,
    width: options.canvasSize,
    name: options.name,
    nodes,
  };
}
