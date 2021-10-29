const decoratorsLegacyPreset = {
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};

module.exports = {
  extends: '../../babel.config.shared.es2019.js',
  presets: [decoratorsLegacyPreset],
};
