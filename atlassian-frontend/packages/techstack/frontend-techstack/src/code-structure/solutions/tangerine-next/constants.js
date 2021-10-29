const scriptFile = (name, options = { type: 'file', optional: true }) => ({
  [`${name}.js`]: { ...options },
  [`${name}.jsx`]: { ...options },
  [`${name}.ts`]: { ...options },
  [`${name}.tsx`]: { ...options },
});

const sharedFiles = {
  /* this directory is generated and not committed */
  __generated__: { type: 'dir', optional: true },
  __snapshots__: { type: 'snapshots', optional: true },
  assets: { type: 'dir', optional: true },
  'test-utils': { type: 'dir', optional: true },
  utils: { type: 'dir', optional: true },
  ...scriptFile('constants'),
  ...scriptFile('gql'),
  ...scriptFile('messages'),
  ...scriptFile('mocks'),
  ...scriptFile('node.test'),
  'README.md': { type: 'file', optional: true },
  ...scriptFile('test'),
  ...scriptFile('test-utils'),
  ...scriptFile('test-utils.test'),
  ...scriptFile('types'),
  ...scriptFile('utils'),
  ...scriptFile('utils.test'),
};

const sharedUIFiles = {
  ...scriptFile('examples'),
  ...scriptFile('messages'),
  ...scriptFile('styled'),
  ...scriptFile('styled.test'),
};

const uiComponent = {
  ...sharedFiles,
  ...sharedUIFiles,
  ...scriptFile('async'),
  ...scriptFile('index'),
  ...scriptFile('main'),
};

const sweetStateAdditionalFiles = {
  actions: { type: 'dir', optional: true },
  selectors: { type: 'dir', optional: true },
  ...scriptFile('actions'),
  ...scriptFile('selectors'),
};

const commonUIComponent = {
  ...sharedFiles,
  ...sharedUIFiles,
  ...scriptFile('index'),
  ...scriptFile('main'),
};

const serviceComponent = {
  ...sharedFiles,
  ...sweetStateAdditionalFiles,
  ...scriptFile('index'),
  ...scriptFile('main'),
  ...scriptFile('context'),
  ...scriptFile('pact.test-spec'),
};

const i18nComponent = [
  'cs',
  'da',
  'de',
  'es',
  'et',
  'fi',
  'fr',
  'hu',
  'index',
  'it',
  'ja',
  'ko',
  'languages',
  'nb',
  'nl',
  'pl',
  'pt_BR',
  'pt_PT',
  'ru',
  'sk',
  'sv',
  'th',
  'tr',
  'uk',
  'vi',
  'zh',
  'zh_TW',
  'en_ZZ',
]
  .map(langId => scriptFile(langId))
  .reduce((acc, scriptFileObj) => ({ ...acc, ...scriptFileObj }), {});

module.exports = {
  sharedFiles,
  sharedUIFiles,
  uiComponent,
  sweetStateAdditionalFiles,
  commonUIComponent,
  serviceComponent,
  i18nComponent,
  scriptFile,
};
