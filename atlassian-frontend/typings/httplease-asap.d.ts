declare module 'httplease-asap' {
  export function parseDataUri(uri: string): any;
  export function createAuthHeaderGenerator(config: any): () => string;
}
