import { types as t, NodePath } from '@babel/core';

export type ArgsvParse = {
  [x: string]: unknown;
  c?: string | undefined;
  l?: string | undefined;
  d?: string | undefined;
  t?: string | undefined;
  i?: string | undefined;
  _?: string[];
  $0?: string;
};

type PluginOptions = {
  targetImports: string;
  customLogger?: Function | string | null;
  trackOnClient?: boolean;
  customVisitors?: CognizePlugin | string;
  ignoreDirs?: string;
};

export type BabelPluginsArray = BabelPlugin[];

type CognizePlugin = (args: BabelVisitor) => BabelVisitor;

export type BabelPluginState = {
  opts: PluginOptions & {
    filename: string;
    root: string;
    plugins: BabelPluginsArray;
    sourceFileName: string;
  };
  file: {
    code: string;
  };
  filename: string;
  fileNameIdentifier: t.Identifier;
  code: string;
};

export type PluginCache = Map<string, any>;

export type BabelVisitor = {
  file?: BabelPluginState;
  dataCache?: PluginCache;
  visitorCache?: PluginCache;
  targetedImportsMap?: PluginCache;
  Program?: {
    enter?: (arg0: any, arg1: BabelPluginState) => void;
    exit?: (arg0: any, arg1: BabelPluginState) => void;
    visitorCache?: PluginCache;
  };
  ImportDeclaration?: (arg0: Path, arg1: BabelPluginState) => void;
  CallExpression?: (arg0: Path, arg1: BabelPluginState) => void;
  MemberExpression?: (arg0: Path, arg1: BabelPluginState) => void;
  JSXElement?: (arg0: Path, arg1: BabelPluginState) => void;
  JSXOpeningElement?: (arg0: Path, arg1: BabelPluginState) => void;
  ExportDefaultDeclaration?: (arg0: Path, arg1: BabelPluginState) => void;
  ExportNamedDeclaration?: (arg0: Path, arg1: BabelPluginState) => void;
  ReturnStatement?: (arg0: Path, arg1: BabelPluginState) => void;
};

export type BabelPlugin = {
  key?: string;
  name: string;
  file?: BabelPluginState;
  dataCache?: PluginCache;
  visitorCache?: PluginCache;
  targetedImportsMap?: PluginCache;
  manipulateOptions?: (arg0: any, arg1: any) => void | undefined;
  inherits?: (arg0: string) => void;
  pre?: (arg0: BabelPluginState) => void;
  post?: (arg0: BabelPluginState) => void;
  visitor?: BabelVisitor;
  options?: PluginOptions;
  opts?: PluginOptions;
};

export type Path = NodePath & {
  parentPath: Path;
  hub: { file: BabelPluginState; getScope: () => Path['scope'] };
  scope: {
    generateUidIdentifier: (str: string) => void;
  };
  container: { openingElement: t.JSXOpeningElement };
  node: {
    type: string;
    argument: Path['node'];
    source: {
      value: string;
    };
    callee: {
      name: string;
    };
    openingElement: {
      name: {
        name: string;
      };
      attributes: t.JSXAttribute[];
    };
    loc: {
      start: {
        line: number;
      };
    };
    name: { name: string };
    object: { name: string };
    property: string;
    start: number;
    end: number;
    specifiers: [];
    value: string;
  };
  get: (arg0: string) => Path;
  stop: () => void;
  unshiftContainer: (str: string, declaration: any) => void;
  pushContainer: (str: string, declaration: any) => void;
  replaceWith: (ast: any) => void;
  traverse: (visitor: BabelVisitor) => void;
  findParent: (parentPath: object) => object;
};

export type ObjectLiteral = { [key: string]: any };
