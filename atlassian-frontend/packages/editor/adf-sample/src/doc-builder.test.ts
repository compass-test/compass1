import { ADFGraph } from './adf-graph';
import * as fullSchema from '@atlaskit/adf-schema/json-schema/v1/full.json';
import * as stageZeroSchema from '@atlaskit/adf-schema/json-schema/v1/stage-0.json';
import { createRandomDocStructure, DocStructure } from './doc-builder';

function innerTraverseStructure(
  structure: DocStructure,
  path: DocStructure[],
  cb: (structure: DocStructure, path: DocStructure[]) => void,
) {
  cb(structure, path);
  structure.content?.forEach(child =>
    innerTraverseStructure(child, [...path, structure], cb),
  );
}

function traverseStructure(
  structure: DocStructure,
  cb: (structure: DocStructure, path: DocStructure[]) => void,
) {
  innerTraverseStructure(structure, [], cb);
}

describe('Doc Builder', () => {
  let graph: ADFGraph;

  beforeEach(() => {
    graph = ADFGraph.fromSchema(fullSchema);
  });

  it('should start with the root node', () => {
    expect(createRandomDocStructure(graph).$ref).toEqual(graph.root);
  });

  describe('content', () => {
    it('should be adjacent to the current node', () => {
      const root = createRandomDocStructure(graph);

      traverseStructure(root, node => {
        const childrens = node.content?.map(childNode => childNode.$ref) ?? [];

        expect(graph.adjacents(node.$ref)).toEqual(
          expect.arrayContaining(childrens),
        );
      });
    });

    it('should all leaf be valid leaf', () => {
      const root = createRandomDocStructure(graph);

      traverseStructure(root, node => {
        // Node does not have content but there is not a leaf in the graph
        const badLeaf = !node.content && !graph.isLeaf(node.$ref);
        if (badLeaf) {
          // eslint-disable-next-line no-console
          console.log(node); // We print the node as the expectation does not show good information
        }
        expect(badLeaf).toBe(false);
      });
    });

    describe('listItem_node', () => {
      it('should not start with a list ', () => {
        const root = createRandomDocStructure(graph);

        traverseStructure(root, node => {
          if (node.$ref === '#/definitions/listItem_node') {
            const [firstChild] = node.content!;
            expect(firstChild.$ref).not.toEqual(
              '#/definitions/bulletList_node',
            );
            expect(firstChild.$ref).not.toEqual(
              '#/definitions/orderedList_node',
            );
          }
        });
      });
    });

    describe('taskList_node', () => {
      it('should not start with a tasklist ', () => {
        const root = createRandomDocStructure(graph);

        traverseStructure(root, node => {
          if (node.$ref === '#/definitions/taskList_node') {
            const [firstChild] = node.content!;
            expect(firstChild.$ref).not.toEqual('#/definitions/taskList_node');
          }
        });
      });
    });

    describe('layoutSection_full_node', () => {
      it('should not be bigger than 3', () => {
        const root = createRandomDocStructure(graph);

        traverseStructure(root, node => {
          if (node.$ref === '#/definitions/layoutSection_full_node') {
            expect(node.content?.length).toBeLessThanOrEqual(3);
          }
        });
      });

      it('should not be smaller than 2', () => {
        const root = createRandomDocStructure(graph);

        traverseStructure(root, node => {
          if (node.$ref === '#/definitions/layoutSection_full_node') {
            expect(node.content?.length).toBeGreaterThanOrEqual(2);
          }
        });
      });
    });

    describe('stage0', () => {
      let graph: ADFGraph;

      beforeEach(() => {
        graph = ADFGraph.fromSchema(stageZeroSchema);
      });

      describe('mediaSingle_node', () => {
        it('should have content ', () => {
          const root = createRandomDocStructure(graph);

          traverseStructure(root, (node, path) => {
            if (node.$ref === '#/definitions/mediaSingle_full_node') {
              expect(node.content).toHaveLength(1);
            }
            // We do DFS for depth greather than 6
            if (
              node.$ref === '#/definitions/mediaSingle_caption_node' &&
              path.length < 6
            ) {
              expect(node.content).toHaveLength(2);
            }
          });
        });
      });

      describe('layoutSection_with_single_column_node', () => {
        it('should not be bigger than 3', () => {
          const root = createRandomDocStructure(graph);

          traverseStructure(root, node => {
            if (
              node.$ref ===
              '#/definitions/layoutSection_with_single_column_node'
            ) {
              expect(node.content?.length).toBeLessThanOrEqual(3);
            }
          });
        });

        it('should not be smaller than 1', () => {
          const root = createRandomDocStructure(graph);

          traverseStructure(root, node => {
            if (
              node.$ref ===
              '#/definitions/layoutSection_with_single_column_node'
            ) {
              expect(node.content?.length).toBeGreaterThanOrEqual(1);
            }
          });
        });
      });
    });
  });
});
