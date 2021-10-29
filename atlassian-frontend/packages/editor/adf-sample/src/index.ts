import memoizeOne from 'memoize-one';
import { DocNode } from '@atlaskit/adf-schema';

import { ADFGraph } from './adf-graph';
import { createRandomDocStructure, DocStructure } from './doc-builder';
import { fakeJSONSchema } from './json-schema';

const getADFGraph = memoizeOne(adfSchema => {
  return ADFGraph.fromSchema(adfSchema);
});

/**
 * Iterate thourgh the generated doc structure and fake the data using fakeJSONSchema
 * @param jsonSchema
 * @param docStructure
 */
function innerGenerateADFDocument(jsonSchema: any, docStructure: DocStructure) {
  const current = fakeJSONSchema(jsonSchema, docStructure.$ref);

  if (docStructure.content) {
    current.content = docStructure.content.map(child =>
      innerGenerateADFDocument(jsonSchema, child),
    );
  }

  return current;
}

export function generateADFDocument(jsonSchema: any): DocNode {
  const adfGraph = getADFGraph(jsonSchema);
  const docStructure = createRandomDocStructure(adfGraph);

  return innerGenerateADFDocument(jsonSchema, docStructure);
}
