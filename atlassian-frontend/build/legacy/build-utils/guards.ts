/** Typescript type guards */

/* A simple defined check with type guard that works well with Array.prototype.filter */
export function isDefined<T>(arg: T | undefined | null): arg is T {
  return arg != null;
}

class EnvVarError extends Error {
  required: string[];

  constructor(message: string, required: string[]) {
    super(message);
    this.required = required;
  }
}

/**
 * Validates the existence of required keys on an object (for use with process.env in CI)
 * Usage:
 *   `validateEnvVars<EnvType>(process.env, ['VAR_1', 'VAR-2']);`
 *    If any keys don't exist, it will throw with a list of these keys
 *    Otherwise, process.env will be typed `EnvType`
 */
export function validateEnvVars<T extends Record<string, string>>(
  env: Partial<T>,
  keys: string[],
): asserts env is T & { [key: string]: string | undefined } {
  const required = [];
  for (const key of keys) {
    if (!env[key]) {
      required.push(key);
    }
  }
  if (required.length > 0) {
    throw new EnvVarError(
      `Required environment variables don\'t exist: ${required.join(', ')}`,
      required,
    );
  }
}
