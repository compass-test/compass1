import { types as t } from '@babel/core';
import template from '@babel/template';

import { Path, ObjectLiteral, BabelPluginState, BabelVisitor } from './types';

const TRACE_ID = 'data-cognize';
const FILE_NAME_VAR = '_jsxFileName';

const buildCognizeTrace = template(`
(function(){
  window.__COGNIZE__ = window.__COGNIZE__ || {};
  window.__COGNIZE__[%%id%%] = {
    imports: %%imports%%,
    fileName: %%fileName%%,
    projectName: %%projectName%%,
    start: %%start%%,
    column: %%column%%,
    el: () => document.querySelector('[data-cognize=' + %%id%%)
  };
  return;
})()
`);

function getParents(path: Path): object[] {
  let parents: object[] = [];
  if (path) {
    parents.push(
      path.findParent((parentPath: { isJSXElement: () => boolean }) =>
        parentPath.isJSXElement(),
      ),
    );
    parents = parents.concat(getParents(path.parentPath)).filter(Boolean);
  }
  return parents;
}

function getAttributeSourceCode(
  attributeObject: t.JSXAttribute,
  fileCode: string,
): string {
  const { start, end } = attributeObject;
  return start && end ? fileCode.substr(start, end - start) : '';
}

const visitors = (): BabelVisitor => {
  return {
    ImportDeclaration(path: Path, state: BabelPluginState) {
      const { targetImports } = state.opts;

      if (!path.node.source.value.match(new RegExp(targetImports))) {
        return;
      }

      this.targetedImportsMap?.set(
        `${path.node.source.value}`,
        path.node.specifiers.map(
          (item: { local: { name: string } }) => item.local.name,
        ),
      );

      const fileName = this.visitorCache?.get('fileName');
      const projectName = this.visitorCache?.get('projectName');
      const projectFileName = this.visitorCache?.get('projectFileName');
      const baseProjectName = this.visitorCache?.get('baseProjectName');
      const projectDependencies = this.visitorCache?.get('projectDependencies');

      if (!this.dataCache?.get(fileName)) {
        this.dataCache?.set(fileName, {
          ...this.dataCache?.get(fileName),
          Project: projectName,
          File: projectFileName,
          BaseProjectName: baseProjectName,
        });
      }

      const fileDependencies: ObjectLiteral = {};

      Object.keys(projectDependencies).forEach((dependencyKey) => {
        if (!projectDependencies[dependencyKey]) {
          return;
        }
        Object.entries(projectDependencies[dependencyKey]).forEach(
          (dependencyItem) => {
            const [dependencyName, dependencyVersion] = dependencyItem;
            if (dependencyName.startsWith(path.node.source.value)) {
              fileDependencies[dependencyName] = dependencyVersion;
            }
          },
        );
      });
      this.visitorCache?.set('fileDependencies', fileDependencies);

      this.dataCache?.set(fileName, {
        ...this.dataCache?.get(fileName),
        DependencyVersions: {
          ...this.dataCache?.get(fileName).DependencyVersions,
          ...fileDependencies,
        },
      });

      this.dataCache?.set(fileName, {
        ...this.dataCache?.get(fileName),
        ImportDeclarations: Array.from(
          this.targetedImportsMap?.keys() || [],
        ).reduce((acc, item) => {
          return {
            ...acc,
            [item]: this.targetedImportsMap?.get(item),
          };
        }, {}),
      });
    },
    CallExpression(path: Path, state: BabelPluginState) {
      if (
        !Array.from(this.targetedImportsMap?.values() || [])
          .flat()
          .includes(path.node.callee.name)
      ) {
        return;
      }

      const fileName = this.visitorCache?.get('fileName');

      this.dataCache?.set(fileName, {
        ...this.dataCache?.get(fileName),
        CallExpressions: [
          ...(this.dataCache?.get(fileName)?.CallExpressions || []),
        ].concat(path.node.callee),
      });
    },
    MemberExpression(path: Path, state: BabelPluginState) {
      if (
        !Array.from(this.targetedImportsMap?.values() || [])
          .flat()
          .includes(path.node.object.name)
      ) {
        return;
      }

      const fileName = this.visitorCache?.get('fileName');

      this.dataCache?.set(fileName, {
        ...this.dataCache?.get(fileName),
        MemberExpressions: [
          ...(this.dataCache?.get(fileName)?.MemberExpressions || []),
        ].concat({
          object: path.node.object,
          property: path.node.property,
        }),
      });
    },
    JSXElement(path: Path, state: BabelPluginState) {
      if (
        !Array.from(this.targetedImportsMap?.values() || [])
          .flat()
          .includes(path.node.openingElement.name.name)
      ) {
        return;
      }

      const fileName = this.visitorCache?.get('fileName');

      const parentList: Set<object> = new Set(getParents(path));
      this.dataCache?.set(fileName, {
        ...this.dataCache?.get(fileName),
        JSXElements: [
          ...(this.dataCache?.get(fileName)?.JSXElements || []),
        ].concat({
          reference: path.node.openingElement.name.name,
          locationStart: path.node.start,
          locationEnd: path.node.end,
          attributes: path.node.openingElement.attributes.map(
            (attributeObject: t.JSXAttribute) =>
              getAttributeSourceCode(attributeObject, this.file?.code || ''),
          ),
          nodePath: `${[path]
            .concat(Array.from(parentList) as ConcatArray<Path>)
            .map((item) => item.node.openingElement.name.name)
            .reverse()
            .join(' -> ')}`,
        }),
      });
    },
    JSXOpeningElement(path: Path, state: BabelPluginState) {
      const { trackOnClient } = state.opts;

      if (!trackOnClient || path.parent.type !== 'JSXElement') {
        return;
      }

      const fileName = this.visitorCache?.get('fileName');
      const projectFileName = this.visitorCache?.get('projectFileName');
      const projectName = this.visitorCache?.get('projectName');

      const cognizeDataAttributeName = t.jsxIdentifier(TRACE_ID);
      const cognizeTraceId = t.jsxIdentifier(TRACE_ID + '-tracer');

      const location = path.container.openingElement.loc;
      const jsxName = path.node.name.name;
      if (!location) {
        // the element was generated and doesn't have location information
        return;
      }

      const attributes = path.container.openingElement
        .attributes as t.JSXAttribute[];
      for (let i = 0; i < attributes.length; i++) {
        const name = attributes[i].name;
        if (name?.name === TRACE_ID) {
          // The data-cognize attribute already exists
          return;
        }
      }

      if (!state.fileNameIdentifier) {
        const fileNameIdentifier = path.scope.generateUidIdentifier(
          FILE_NAME_VAR,
        );
        const scope = path.hub.getScope();
        if (scope) {
          scope.push({
            id: fileNameIdentifier,
            init: t.stringLiteral(fileName),
          });
        }

        state.fileNameIdentifier = fileNameIdentifier;
      }

      const start = location.start.line;
      const column = location.start.column;
      const jsxElementId = path.scope.generateUidIdentifier(
        `${projectFileName}_${jsxName}_${start}_${column}`,
      );

      const imports = Array.from(this.targetedImportsMap?.entries() || []).join(
        '|',
      );

      const cognizeData = buildCognizeTrace({
        id: t.stringLiteral(jsxElementId.name),
        projectName: t.stringLiteral(projectName),
        imports: t.stringLiteral(imports),
        fileName: t.stringLiteral(fileName),
        start: t.numericLiteral(start),
        column: t.numericLiteral(column),
      }) as t.ExpressionStatement;

      attributes.push(
        t.jsxAttribute(
          cognizeTraceId,
          t.jSXExpressionContainer(cognizeData.expression),
        ),
      );
      attributes.push(
        t.jsxAttribute(
          cognizeDataAttributeName,
          t.jSXExpressionContainer(t.stringLiteral(jsxElementId.name)),
        ),
      );
    },
  };
};

export default visitors;
