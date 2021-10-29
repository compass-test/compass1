/* eslint-disable no-param-reassign, no-restricted-syntax, default-case */
import { createHash } from 'crypto';
import { types, template as babelTemplate, PluginObj } from '@babel/core';

function generateHash(data: string): string {
  const hash = createHash('md5');
  hash.update(data);

  return hash.digest('hex');
}

module.exports = ({
  types: t,
  template,
}: {
  types: typeof types;
  template: typeof babelTemplate;
}): PluginObj<{
  filename: string;
  rraIdentifiers?: [types.Identifier, types.SourceLocation | null][];
  rraRegister?: types.Identifier;
}> => {
  const registerDeclaration = template(
    'function FN(ref, data) {\n' +
      '  Object.isExtensible(ref) && (Object.getOwnPropertyDescriptor(ref, "PROP") || Object.defineProperty(ref, "PROP", { value: data }));\n' +
      '}',
  );

  return {
    visitor: {
      Program: {
        enter({ scope }, state) {
          state.rraIdentifiers = [];
          state.rraRegister = scope.generateUidIdentifier('_rra');

          for (const binding of Object.values(scope.bindings)) {
            const { path } = binding;
            switch (path.type) {
              // @ts-ignore
              case 'VariableDeclarator': {
                const { init } = path.node as types.VariableDeclarator;
                if (
                  (t.isCallExpression(init) &&
                    (init.callee as types.Identifier).name === 'require') ||
                  // @ts-ignore
                  path.parent.declare
                ) {
                  break;
                }
              }
              // eslint-disable-next-line no-fallthrough
              case 'FunctionDeclaration':
              case 'ClassDeclaration':
              case 'VariableDeclaration':
                state.rraIdentifiers.push([
                  binding.identifier,
                  binding.identifier.loc,
                ]);
            }
          }
        },
        exit({ node }, state) {
          const identifiers = state.rraIdentifiers;
          const register = state.rraRegister;

          delete state.rraIdentifiers;
          delete state.rraRegister;

          if (!identifiers || !identifiers.length || !register) {
            return;
          }

          node.body.unshift(
            registerDeclaration({
              FN: register,
              PROP: '_rraDebug',
            }) as types.Statement,
          );

          identifiers.forEach(([identifier, loc]) => {
            node.body.push(
              t.expressionStatement(
                t.callExpression(register, [
                  identifier,
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier('uuid'),
                      t.stringLiteral(
                        generateHash(
                          `${state.filename}:${
                            loc ? loc.start.column : identifier.start
                          }`,
                        ),
                      ),
                    ),
                    t.objectProperty(
                      t.identifier('fileName'),
                      state.filename
                        ? t.stringLiteral(state.filename)
                        : t.nullLiteral(),
                    ),
                    t.objectProperty(
                      t.identifier('lineNumber'),
                      loc ? t.numericLiteral(loc.start.line) : t.nullLiteral(),
                    ),
                  ]),
                ]),
              ),
            );
          });
        },
      },
      ExportDefaultDeclaration(path, state) {
        const d = path.get('declaration');
        if ('id' in d.node && d.node.id) {
          return; // already declared in scope, will be picked up via Program.start
        }

        // from hot-loader
        const id = path.scope.generateUidIdentifier('default');
        const expression = t.isExpression(path.node.declaration)
          ? path.node.declaration
          : t.toExpression(path.node.declaration as types.FunctionDeclaration);
        path.scope.registerDeclaration(
          path.insertBefore(
            t.variableDeclaration('const', [
              t.variableDeclarator(id, expression),
            ]),
          )[0],
        );
        path.node.declaration = id;

        state.rraIdentifiers!.push([id, path.node.loc]);
      },
    },
  };
};
