import { generateADFDocument } from './index';
import { ADFEntity, validator } from '@atlaskit/adf-utils';
import * as fullSchema from '@atlaskit/adf-schema/json-schema/v1/full.json';
import * as stage0 from '@atlaskit/adf-schema/json-schema/v1/stage-0.json';

const validate = validator();
type Output = ReturnType<ReturnType<typeof validator>>;

function asyncValidate(doc: ADFEntity): Promise<Output> {
  return new Promise((resolve, reject) => {
    resolve(
      validate(doc, () => {
        // We dont want to throw when some error cases were found, we will use the valid at the end.
        return undefined;
      }),
    );
  });
}

/**
 * We run the test 10 times, because even if the document contains any valid path,
 * the internal nodes attributes, etc are generated in a random approach, that will not cover some scenarios.
 */
describe('Final', () => {
  it.each(Array.from({ length: 10 }))(
    'should generate valid document %#',
    async () => {
      const doc = generateADFDocument(fullSchema);
      const valid = await asyncValidate(doc);

      expect(valid).toEqual(expect.objectContaining({ valid: true }));
    },
  );
});

describe('Stage0', () => {
  it.each(Array.from({ length: 10 }))(
    'should generate valid document %#',
    async () => {
      const doc = generateADFDocument(stage0);
      const valid = await asyncValidate(doc);

      expect(valid).toEqual(expect.objectContaining({ valid: true }));
    },
  );
});
