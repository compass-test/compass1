import {
  getContentFromNode,
  getContentData,
  JSONSchemaV4Root,
} from './json-schema';

export class ADFGraph<Data = any> {
  private nodes: Set<string> = new Set();
  private data: Map<string, any> = new Map();
  private edges: Map<string, Set<string>> = new Map();
  private _root: string | null = null;

  setRootNode(node: string) {
    this._root = node;
  }

  addNode(node: string) {
    this.nodes.add(node);
    if (!this.edges.has(node)) {
      this.edges.set(node, new Set());
    }
  }

  setData(node: string, data: Data) {
    this.data.set(node, data);
  }

  getData(node: string): Data {
    return this.data.get(node);
  }

  addEdge(aNode: string, bNode: string) {
    if (!this.hasNode(aNode)) {
      this.addNode(aNode);
    }
    if (!this.hasNode(bNode)) {
      this.addNode(bNode);
    }

    this.edges.get(aNode)!.add(bNode);
  }

  adjacents(node: string): string[] {
    if (!this.hasNode(node)) {
      return [];
    }

    return Array.from(this.edges.get(node)!);
  }

  hasNode(node: string): boolean {
    return this.nodes.has(node);
  }

  isLeaf(node: string): boolean {
    return this.adjacents(node).length === 0;
  }

  isAdjacent(aNode: string, bNode: string): boolean {
    if (!this.hasNode(aNode)) {
      return false;
    }
    return this.edges.get(aNode)!.has(bNode);
  }

  get root(): string {
    if (this._root === null) {
      throw new Error('This graph has not root node.');
    }

    return this._root;
  }

  static fromSchema(jsonSchema: JSONSchemaV4Root): ADFGraph {
    const root = jsonSchema.$ref;

    const graph = new ADFGraph();

    const visited = new Set<string>([root]);
    const nonVisited = getContentFromNode(jsonSchema, root);

    graph.addNode(root);
    graph.setRootNode(root);
    nonVisited.forEach(edgeNode => {
      graph.addEdge(root, edgeNode);
    });

    while (nonVisited.length > 0) {
      const current = nonVisited.pop() as string;
      if (visited.has(current)) {
        continue;
      }

      visited.add(current);
      graph.addNode(current);
      const contentData = getContentData(jsonSchema, current);
      if (contentData) {
        graph.setData(current, contentData);
      }
      getContentFromNode(jsonSchema, current).forEach(edgeNode => {
        graph.addEdge(current, edgeNode);
        nonVisited.push(edgeNode);
      });
    }

    return graph;
  }
}
