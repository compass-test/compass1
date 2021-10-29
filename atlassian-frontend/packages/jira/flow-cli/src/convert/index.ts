import { SourceFile } from 'ts-morph';
import flowgen from 'flowgen';
import outdent from 'outdent';

export const template = (code: string) => outdent`
// @flow

/**
 * If you need help with flow types, feel free to reach out to #flow on slack or go to go/flow
 **/

${code}
`;
export const convert = (file: SourceFile) => {
  const code = file.getFullText();

  // compile
  const compiled = flowgen.compiler.compileDefinitionString(code, {
    interfaceRecords: true,
    inexact: false,
  });

  return flowgen.beautify(template(compiled));
};

export default convert;
