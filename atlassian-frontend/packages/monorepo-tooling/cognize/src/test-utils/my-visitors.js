// custom visitors get `this` passed in using bind so you cannot use arrow functions
module.exports = function customPlugin() {
  return {
    // Spread visitor to keep all default Cognize visitors
    // ...cognize.visitor,
    // or choose what visitors to keep
    ImportDeclaration: this.visitor?.ImportDeclaration,
    CallExpression: {
      enter: [
        function CallExpression(path) {
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
      ],
    },
  };
};
