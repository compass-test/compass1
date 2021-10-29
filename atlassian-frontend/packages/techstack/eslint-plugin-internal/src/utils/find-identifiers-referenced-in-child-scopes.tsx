import { Scope } from 'eslint';

export function pullIdentifiers(scope: Scope.Scope, identifierName: string) {
  const result: Scope.Variable['identifiers'] = [];
  const { references } = scope;

  references.forEach(reference => {
    const { identifier } = reference;

    if (identifier.name === identifierName) {
      result.push(identifier);
    }
  });

  return result;
}

/**
 * This will search referenced identifiers in same and nested child scopes.
 * Returns all matched referenced identifiers.
 */
export function findIdentifiersReferencedInChildScopes({
  scope,
  identifierName,
  scopeType,
}: {
  scope: Scope.Scope;
  identifierName: string;
  scopeType: Scope.Scope['type'];
}) {
  const result = [];

  if (scopeType) {
    if (scope.type === scopeType) {
      result.push(...pullIdentifiers(scope, identifierName));
    }
  } else {
    result.push(...pullIdentifiers(scope, identifierName));
  }

  scope.childScopes.forEach(childScope => {
    result.push(
      ...findIdentifiersReferencedInChildScopes({
        scope: childScope,
        identifierName,
        scopeType,
      }),
    );
  });

  return result;
}
