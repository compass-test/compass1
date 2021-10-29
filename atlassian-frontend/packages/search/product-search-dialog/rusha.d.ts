type DigestFunction = (format: 'hex') => string;

type UpdateHashFunction = (
  str: string,
) => {
  digest: DigestFunction;
};

type CreateHashFunction = () => {
  update: UpdateHashFunction;
};

declare module 'rusha' {
  export const createHash: CreateHashFunction;
}
