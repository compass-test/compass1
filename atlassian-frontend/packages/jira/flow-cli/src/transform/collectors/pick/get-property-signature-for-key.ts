import { Node, PropertySignature } from 'ts-morph';

import { getHeritageNodesIfValid } from '../get-heritage-nodes-if-valid';
import { getDefinitionsFromHeritageClause } from '../get-definitions-from-heritage-clause';
import { notUndefined } from '../../../utils/type-helpers';
import { getLogger } from '../../../utils/get-logger';

const log = getLogger('get-property-signature-for-key');

export const getPropertySignatureForKey = (
  definition: Node,
  key: string,
): PropertySignature | undefined => {
  const heritageClauses = getHeritageNodesIfValid(definition);

  const heritageDefinitions = heritageClauses
    ? getDefinitionsFromHeritageClause(heritageClauses)
    : [];

  const definitions = [...heritageDefinitions, definition];

  const properties = definitions
    .flatMap((definition) => {
      if (Node.isTypeElementMemberedNode(definition)) {
        return definition
          .getProperties()
          .filter((property: PropertySignature) => property.getName() === key);
      }
    })
    .filter(notUndefined);

  if (properties.length > 1) {
    log(`found more than one signature for key ${key}`);
  }

  return properties[0];
};
