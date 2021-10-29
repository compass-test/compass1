interface Window {
  __env__: string;
  __cassi__: string;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}
