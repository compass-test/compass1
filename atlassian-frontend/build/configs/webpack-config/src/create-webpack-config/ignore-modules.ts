import enhancedResolve, { ResolverFactory } from 'enhanced-resolve';

const EMPTY = require.resolve('../../assets/empty.js');

export interface IgnoreModulesOptions {
  ignored: boolean;
  names: string[];
  cwd: string;
  options: ResolverFactory.ResolverOption;
}

export const ignoreModules = async (opts: IgnoreModulesOptions) => {
  if (!opts.ignored) {
    return {};
  }

  const resolver = enhancedResolve.create(opts.options);

  const resolve = (context: string, p: string): Promise<string> =>
    new Promise((r, e) => {
      resolver(context, p, (err, result) => {
        if (err) {
          e(err);
          return;
        }
        r(result);
      });
    });

  return Object.fromEntries(
    await Promise.all(
      opts.names.map(async name => [await resolve(opts.cwd, name), EMPTY]),
    ),
  );
};
