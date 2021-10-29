const classPropertiesPreset = {
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
};

const decoratorsLegacyPreset = {
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
};

module.exports = {
  presets: [classPropertiesPreset, decoratorsLegacyPreset],
};
