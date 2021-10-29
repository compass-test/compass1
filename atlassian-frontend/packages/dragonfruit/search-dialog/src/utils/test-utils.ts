export function nextTickAfterDebouncedFunctionExecution() {
  return new Promise((resolve) => setTimeout(resolve, 300));
}
