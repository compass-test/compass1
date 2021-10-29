import path from 'path';
import enhancedResolve from 'enhanced-resolve';

type Data = {
  modules: Array<{
    identifier: string;
    issuerPath: Array<{
      identifier: string;
    }>;
    chunks: Array<any>;
  }>;
};

type Opts = {
  resolve: enhancedResolve.ResolverFactory.ResolverOption;
};

type Config = {
  rootPath: string;
  options: Opts;
};

class ModuleSummary {
  private rootPath: string;
  private options: Opts;

  static create(data: Data, { rootPath, options }: Config) {
    return new ModuleSummary(data, { rootPath, options });
  }

  constructor(private data: Data, { rootPath, options }: Config) {
    this.rootPath = rootPath;
    this.options = options;
  }

  toRelative = (identifier: string | number) => {
    const fragments = String(identifier).split('!');
    return path.relative(this.rootPath, fragments[fragments.length - 1]);
  };

  async resolve(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const resolver = enhancedResolve.create(this.options.resolve);
      resolver(this.rootPath, name, (err, resolved) => {
        if (err) {
          reject(err);
        }
        resolve(resolved);
      });
    });
  }

  async get(moduleName: string) {
    const resolved = await this.resolve(moduleName);

    const projectId = this.toRelative(resolved);
    const entryFragments = resolved.split('/node_modules/');
    const entry = entryFragments[entryFragments.length - 1];

    const match = this.data.modules.find(({ identifier }) =>
      identifier.includes(`node_modules/${entry}`),
    );

    const isIgnored = (issuer: string) =>
      !issuer.startsWith('website') && !issuer.startsWith('multi');

    const bundlePath = !match
      ? []
      : match.issuerPath
          .map(issuer => this.toRelative(issuer.identifier))
          .filter(isIgnored);

    const chunks = !match
      ? []
      : match.chunks
          .flatMap((chunk: string | number) => String(chunk).split('~'))
          .map(this.toRelative)
          .map((chunk: string) => chunk.replace(/^website\//, ''));

    return {
      id: projectId,
      name: moduleName,
      bundled: !!match,
      chunks,
      path: bundlePath,
    };
  }
}

module.exports.ModuleSummary = ModuleSummary;
