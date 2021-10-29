import React from 'react';

type AnyFunction = (...args: any) => any;

export const useExampleDocument = (uri: string = './adf/example.adf.json') => {
  const [doc, setDoc] = React.useState();

  const err = React.useCallback(
    (response: Response) => {
      if (!response.ok) {
        throw new Error(
          `Could not fetch ${uri}: ${response?.status} ${response?.statusText}`,
        );
      }
    },
    [uri],
  );

  React.useEffect(() => {
    let aborted = false;
    const guard = <T extends AnyFunction>(fn: T): ReturnType<T> =>
      !aborted ? fn() : undefined;

    (async () => {
      const response = await guard(() => fetch(uri));
      guard(() => err(response));
      const data = await guard(() => response.json());
      guard(() => setDoc(data));
    })();

    return () => {
      aborted = true;
    };
  }, [uri, err]);

  return doc;
};
