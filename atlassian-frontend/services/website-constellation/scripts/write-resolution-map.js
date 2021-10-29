const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');
const fs = require('fs-extra');

function run() {
  // addDefaultEntries is set to resolve devDependenvies that may not exist in the package
  return moduleResolveMapBuilder({ addDefaultEntries: true }).then((aliases) =>
    fs.writeFile('./aliases-written-map.json', JSON.stringify(aliases)),
  );
}

module.exports = run;
