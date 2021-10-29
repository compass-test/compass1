type Mocked<T> = T &
  {
    [K in keyof T]: T[K] extends (...args: infer P) => infer R
      ? jest.Mock<R, P>
      : jest.Mock;
  };

type Overrides<T> = {
  [K in keyof T]?: T[K] extends (...args: infer P) => infer R ? never : T[K];
};

export function makeMock<T>(overrides: Overrides<T> = {}): Mocked<T> {
  const attributes: Partial<Record<keyof T, jest.Mock>> = {};

  return new Proxy<Mocked<T>>({} as any, {
    get(_, id: keyof T & string) {
      if (overrides[id]) {
        return overrides[id];
      }

      if (!attributes[id]) {
        let mock = jest.fn();
        mock.mockName(id);
        Object.defineProperty(mock, 'name', { value: id });
        // mock.toString = () => id;
        attributes[id] = mock;
      }

      return attributes[id];
    },
  });
}

export function makeGLMock(
  overrides: Overrides<WebGL2RenderingContext> = {},
): Mocked<WebGL2RenderingContext> {
  return makeMock(overrides);
}
