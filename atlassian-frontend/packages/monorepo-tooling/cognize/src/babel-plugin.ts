import { exit } from 'process';

import { sync as pkgUp } from 'pkg-up';

import visitors from './visitors';

import { BabelPlugin, BabelPluginState } from './types';

const name = '@af/cognize';

const defaultVisitors = visitors();

function replaceBasePath(filepath: string, basePath: string): string {
  return filepath ? filepath.replace(basePath, '') : '';
}

function getFunctionOrLoadFromPath(option: string | Function | undefined) {
  if (!option) {
    return;
  }
  let func;
  if (typeof option === 'function') {
    func = option;
  } else if (typeof option === 'string') {
    try {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      func = require(option);
      if (typeof func !== 'function') {
        throw new Error(
          `Custom logging function was not typeof === "function"`,
        );
      }
    } catch (e) {
      console.log(e);
      exit(1);
    }
  }

  // eslint-disable-next-line consistent-return
  return func;
}

function cognize(): BabelPlugin {
  return {
    name,
    manipulateOptions(opts, parserOpts) {
      // If the Typescript plugin already ran, it will have decided whether
      // or not this is a TSX file.
      if (
        parserOpts.plugins.some(
          (p: any) => (Array.isArray(p) ? p[0] : p) === 'typescript',
        )
      ) {
        return;
      }

      parserOpts.plugins.push('jsx');

      const { ignoreDirs, customVisitors, customLogger, trackOnClient } =
        this.options || {};

      const { filename } = opts || {};

      // instantiate visitor object with default visitors
      this.visitor = defaultVisitors;

      // Don't return any visitors for ignored files and bail
      if (ignoreDirs && new RegExp(ignoreDirs).test(filename)) {
        this.visitor = {};
        return;
      }
      // If no logger is to run BUT the user wants tracking on the client
      // then only run necessary client tracking visitors
      if (customLogger === null && trackOnClient) {
        this.visitor = {};
        this.visitor.ImportDeclaration = defaultVisitors.ImportDeclaration;
        this.visitor.JSXOpeningElement = defaultVisitors.JSXOpeningElement;
      }
      // if customVisitors option is passed then it overrides all visitors
      if (customVisitors) {
        const customVisitorsFunction = getFunctionOrLoadFromPath(
          customVisitors,
        );
        if (customVisitorsFunction) {
          this.visitor = customVisitorsFunction.bind(this)();
        }
      }
    },
    pre(state: BabelPluginState) {
      const {
        opts: { filename, root },
      } = state;
      // get Cognize options
      const options = this.opts;

      // create caches
      this.dataCache = new Map();
      this.targetedImportsMap = new Map();
      this.visitorCache = new Map();

      // set default cache data
      this.visitorCache?.set('options', options || {});
      this.visitorCache?.set('fileName', filename || '');
      this.visitorCache?.set(
        'projectFileName',
        replaceBasePath(filename, root),
      );

      const pkgJsonPath = pkgUp({ cwd: filename });
      const pkgJson = require(pkgJsonPath as string);

      const { name: pkgJsonName, dependencies, devDependencies } = pkgJson;

      this.visitorCache?.set('projectName', pkgJsonName || '');

      this.visitorCache?.set('projectDependencies', {
        dependencies,
        devDependencies,
      });

      this.visitorCache?.set('fileDependencies', {});

      const baseProjectPath = pkgUp({
        cwd: root,
      });

      const basePkgJSON = require(baseProjectPath as string);
      this.visitorCache?.set('baseProjectName', basePkgJSON.name);
    },
    post(state: BabelPluginState) {
      const { customLogger } = this.visitorCache?.get('options');

      if (customLogger === null) {
        return;
      }

      if (this.dataCache?.size) {
        const customLoggerFunction = getFunctionOrLoadFromPath(customLogger);

        // eslint-disable-next-line no-unused-expressions
        customLoggerFunction
          ? /* Use function passed into plugin options */ customLoggerFunction(
              this.dataCache,
            )
          : /* Default to logging to stdout */ console.log(
              JSON.stringify(Array.from(this.dataCache?.entries())),
            );
      }
    },
  };
}

export default cognize;
