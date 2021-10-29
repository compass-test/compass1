const NOOP = () => null;

module.exports = new Proxy(module.exports, {
  get: (_, property) => {
    if (property === '__esModule') {
      return true;
    }

    console.warn(
      `${property} is a noop, check "bolt start --help" for details on how to enable it`,
    );
    return NOOP;
  },
});
