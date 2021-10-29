import { SourceFile, SyntaxKind } from 'ts-morph';
import fs from 'fs';

import transformReactComponents from './transforms/transform-react-components';
import transformPickReferences from './transforms/transform-pick-references';
import transformOmitReferences from './transforms/transform-omit-references';
import { transformGettersToReadOnly } from './transforms/transform-getters-to-read-only';
import { transformSettersToClassProperties } from './transforms/transform-setters-to-class-properties';
import { transformFromConfig } from './transforms/transform-from-config';
import { transformImportTypes } from './transforms/transform-import-types';

export const transform = (target: SourceFile, configPath?: string) => {
  const config = configPath && JSON.parse(fs.readFileSync(configPath, 'utf8'));

  transformReactComponents(target);
  transformPickReferences(target);
  transformOmitReferences(target);
  [
    SyntaxKind.TypeReference,
    SyntaxKind.QualifiedName,
    SyntaxKind.ExpressionWithTypeArguments,
    SyntaxKind.PropertyAccessExpression,
    SyntaxKind.Identifier,
  ].forEach((type) => {
    transformFromConfig(target, type, config);
  });

  transformSettersToClassProperties(target);
  transformGettersToReadOnly(target);
  transformImportTypes(target);

  return target;
};

export default transform;
