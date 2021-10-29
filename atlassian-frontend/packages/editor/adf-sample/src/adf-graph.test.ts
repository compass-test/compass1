import { ADFGraph } from './adf-graph';
import * as fullSchema from '@atlaskit/adf-schema/json-schema/v1/full.json';
import * as stageZeroSchema from '@atlaskit/adf-schema/json-schema/v1/stage-0.json';

describe('ADFGraph', () => {
  let graph: ADFGraph;

  beforeEach(() => {
    graph = new ADFGraph();
  });

  it('should add a node', () => {
    graph.addNode('b-node');

    expect(graph.hasNode('b-node')).toEqual(true);
  });

  it('should create nodes when does not exist', () => {
    graph.addEdge('a-node', 'b-node');

    expect(graph.hasNode('a-node')).toEqual(true);
    expect(graph.hasNode('b-node')).toEqual(true);
  });

  it('should node be adjacent when a edge is created', () => {
    graph.addEdge('a-node', 'b-node');

    expect(graph.isAdjacent('a-node', 'b-node')).toEqual(true);
  });

  it('should get all the adjacents of a node', () => {
    graph.addEdge('a-node', 'b-node');
    graph.addEdge('a-node', 'c-node');

    expect(graph.adjacents('a-node')).toEqual(
      expect.arrayContaining(['b-node', 'c-node']),
    );
  });

  it('should node not be adjacent when there is no edge', () => {
    graph.addNode('a-node');
    graph.addNode('b-node');

    expect(graph.isAdjacent('a-node', 'b-node')).toEqual(false);
  });

  it('should create a graph from full schema', () => {
    const graph = ADFGraph.fromSchema(fullSchema);
    // We defined that the graph is succesfull create if contains the 3 basic nodes
    // 1. Root node also known as doc node
    // 2. Text node
    // 3. Paragraph with not marks, aka, plain paragraph
    expect(graph.hasNode('#/definitions/doc_node')).toBe(true);
    expect(graph.hasNode('#/definitions/text_node')).toBe(true);
    expect(graph.hasNode('#/definitions/paragraph_with_no_marks_node')).toBe(
      true,
    );
  });

  it('should set root node', () => {
    graph.setRootNode('#/definitions/doc_node');

    expect(graph.root).toBe('#/definitions/doc_node');
  });

  describe('doc_node', () => {
    it('should support paragraph as child', () => {
      const graph = ADFGraph.fromSchema(fullSchema);

      expect(
        graph.isAdjacent(
          '#/definitions/doc_node',
          '#/definitions/paragraph_with_no_marks_node',
        ),
      ).toBe(true);
    });

    it('should support blockquote as child', () => {
      const graph = ADFGraph.fromSchema(fullSchema);

      expect(
        graph.isAdjacent(
          '#/definitions/doc_node',
          '#/definitions/blockquote_node',
        ),
      ).toBe(true);
    });
  });

  describe('bulletList_node', () => {
    it('should only support listItem as child', () => {
      const graph = ADFGraph.fromSchema(fullSchema);

      expect(
        graph.isAdjacent(
          '#/definitions/bulletList_node',
          '#/definitions/listItem_node',
        ),
      ).toBe(true);
      expect(graph.adjacents('#/definitions/bulletList_node')).toHaveLength(1);
    });
  });

  describe('stage0', () => {
    let graph: ADFGraph;

    beforeEach(async () => {
      graph = ADFGraph.fromSchema(stageZeroSchema);
    });

    it('should has media single nodes', () => {
      expect(graph.hasNode('#/definitions/mediaSingle_full_node')).toBe(true);
      expect(graph.hasNode('#/definitions/mediaSingle_caption_node')).toBe(
        true,
      );
    });
  });
});
