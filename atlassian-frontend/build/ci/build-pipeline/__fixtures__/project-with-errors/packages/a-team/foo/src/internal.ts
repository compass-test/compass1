// Note: this type must be exported to trigger the TS deep import, otherwise TS will inline the type
export type Foo = {
  a: string;
  complex: {
    foo?: number;
  };
  type: number;
};

export const something: Foo = {
  a: 'test',
  complex: {},
  type: 5,
};
