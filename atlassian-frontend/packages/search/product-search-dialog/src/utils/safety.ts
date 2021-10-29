export class UnreachableError extends Error {
  constructor(v: never) {
    super(`Unreachable code was reachable, value: ${v}`);
  }
}
