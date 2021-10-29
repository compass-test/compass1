import { ADFGraph } from './adf-graph';
import faker from 'faker';
import { ContentData } from './json-schema';

// Random seed number created by random.org
faker.seed(700106088);

export interface DocStructure {
  $ref: string;
  content?: DocStructure[];
}

const MAX_DEPTH = 6;

function dfsDocStructure(
  graph: ADFGraph<ContentData>,
  node: string,
  visited: Set<string>,
): DocStructure {
  const adjacents = graph.adjacents(node);
  // Leaf; Break point
  if (adjacents.length === 0) {
    return {
      $ref: node,
    };
  }

  visited.add(node);

  const { minItems, maxItems, startsWith } = graph.getData(node) || {};
  const min = minItems ?? 0;
  const max = maxItems ?? adjacents.length;

  // non visited adjacent nodes
  const adjacentsArray = startsWith ? startsWith : adjacents;
  let nonVisitedAdjacents = adjacentsArray.filter(
    adjacent => !visited.has(adjacent),
  );

  if (nonVisitedAdjacents.length === 0) {
    // Edge case where we dont have an option
    nonVisitedAdjacents = adjacents;
  }

  const child =
    nonVisitedAdjacents[
      faker.random.number({ min, max }) % nonVisitedAdjacents.length
    ];

  return {
    $ref: node,
    content: [dfsDocStructure(graph, child, visited)],
  };
}

function shuffleIndexes(indexes: number[]) {
  const shuffled = [...indexes];
  for (let i = 0; i < shuffled.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function innerCreateRandomDocStructure(
  graph: ADFGraph<ContentData>,
  node: string,
  path: string[] = [],
): DocStructure {
  if (graph.isLeaf(node)) {
    return {
      $ref: node,
    };
  }
  let adjacents = graph.adjacents(node);

  // Once we reach max depth we need to look for the shortest path to any leaf
  if (path.length > MAX_DEPTH) {
    return dfsDocStructure(graph, node, new Set<string>());
  }

  const { minItems, maxItems, startsWith, customContent } =
    graph.getData(node) || {};
  // Some cases the following content are not all the adjacents
  if (customContent) {
    adjacents = customContent;
  }

  const min = minItems ?? 0;
  const max = maxItems ?? adjacents.length;

  const numNodes = Math.min(max, Math.max(min, graph.adjacents(node).length));
  const randomIndexes = shuffleIndexes(
    Array.from({ length: numNodes }).map((_v, i) => i),
  );

  const content = randomIndexes.map((index, i) => {
    const child =
      startsWith && i === 0
        ? startsWith[index % startsWith.length]
        : adjacents[index % adjacents.length];
    return innerCreateRandomDocStructure(graph, child, [...path, node]);
  });

  return {
    $ref: node,
    content,
  };
}

export function createRandomDocStructure(adfGraph: ADFGraph): DocStructure {
  return innerCreateRandomDocStructure(adfGraph, adfGraph.root, []);
}
