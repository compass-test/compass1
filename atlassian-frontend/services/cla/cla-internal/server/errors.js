class RequestRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestRangeError';
  }
}

module.exports = {
  RequestRangeError,
};
