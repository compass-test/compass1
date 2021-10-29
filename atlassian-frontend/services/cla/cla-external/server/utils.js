exports.errorToJson = error => ({
  type: error instanceof Error ? error.constructor.name : null,
  message: error instanceof Error ? error.message : null,
  stack: error instanceof Error ? error.stack : null,
});
