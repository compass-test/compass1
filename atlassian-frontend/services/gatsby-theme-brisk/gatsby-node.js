const createPackagePages = require('./src/utilities/create-package-pages');
const sourcePackageDocs = require('./src/utilities/source-package-docs');
const { registerChangelogMdx } = require('./src/utilities/register-changelogs');

exports.onCreateNode = async function (gatsbyOptions, themeOptions) {
  await registerChangelogMdx(gatsbyOptions, themeOptions);
};

exports.onPreBootstrap = async function (gatsbyOptions, themeOptions) {
  // set default theme options
  /* eslint-disable no-param-reassign */
  themeOptions.internalAnchorOffset = themeOptions.internalAnchorOffset || 0;
  themeOptions.packageDocs.folder =
    themeOptions.packageDocs.folder || 'constellation';
  /* eslint-enable no-param-reassign */

  await sourcePackageDocs(gatsbyOptions, themeOptions);
};

exports.createPages = async function (gatsbyOptions, themeOptions) {
  await createPackagePages(gatsbyOptions, themeOptions);
};
