/* We extend the root babel config variant that targets es2019 + node to compile successfully with webpack */
module.exports = {
  extends: '../../babel.config.shared.es2019.js',
  plugins: ['react-magnetic-di/babel-plugin'],
};
