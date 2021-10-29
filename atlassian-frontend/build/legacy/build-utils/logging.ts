/**
 * Logging util functions
 */

// Grab a reference to the original console log at module resolution time where
// there is no chance it has been modified
const originalConsoleLog = console.log;

/** Monkey patches console log to output with a prefix.
 *
 * If `useCurrentConsoleLog` is set, will prefix the current console.log rather than the one
 * at module resolution time.
 *
 *  Returns a function that restores console.log back to the original impl
 */
export function prefixConsoleLog(
  prefix: string,
  useCurrentConsoleLog = false,
): () => void {
  const log = useCurrentConsoleLog ? console.log : originalConsoleLog;
  console.log = (...params: any[]) => log(prefix, ...params);

  return () => {
    console.log = log;
  };
}

/**
 * Creates an object spy that logs out the method and args of any method called on it
 */
export function createSpyObject<
  T = {
    [prop: string]: any;
  }
>(objName: string): T {
  return new Proxy(
    {},
    {
      get(target: any, prop: string) {
        return (...args: any[]) => {
          console.log(`Called ${objName}.${prop}(${args})`);
        };
      },
    },
  );
}
