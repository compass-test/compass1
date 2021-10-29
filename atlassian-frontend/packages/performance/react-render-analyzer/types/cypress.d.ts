declare const Cypress: Cypress;
declare const cy: Cy;
declare const assert: Assert;

interface Cypress {
  Commands: {
    add: (name: string, handle: (...args: any[]) => void) => void;
    overwrite: (name: string, handle: (...args: any[]) => void) => void;
  };
}

interface Cy {
  window: () => Promise<typeof window>;
}

interface Assert {
  fail: (message: string) => void;
}
