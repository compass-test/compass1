module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', {}, 'atlaskit'],
    ['@babel/plugin-proposal-object-rest-spread', {}, 'atlaskit'],
    ['@babel/syntax-dynamic-import', {}, 'atlaskit'],
    '@compiled/babel-plugin',
  ],
  presets: ['@babel/react'],
};
