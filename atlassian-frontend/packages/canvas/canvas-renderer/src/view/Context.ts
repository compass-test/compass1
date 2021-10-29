export class ContextInitError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'no further information provided';
  }
}
export class ContextError extends Error {
  public constructor(message?: string) {
    super();
    this.message = message || 'No WebGL context found.';
  }
}

export const getContext = (selector: string) => {
  const root = document.querySelector<HTMLCanvasElement>(selector);
  if (root) {
    const context = root.getContext('webgl2', {
      antialias: true,
    });
    if (context) {
      return { root, gl: context };
    } else {
      throw new ContextInitError(`WebGL context failed to initialise.`);
    }
  } else {
    throw new ContextInitError(`Root not found with selector: ${selector}.`);
  }
};
