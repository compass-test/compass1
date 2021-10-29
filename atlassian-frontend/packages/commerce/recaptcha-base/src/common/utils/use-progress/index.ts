// TODO: Could probably be it's only little package
import { useCallback, useState } from 'react';
export type Loading = Readonly<{
  loading: true;
  value: undefined;
}>;

export type Complete<T> = Readonly<{
  loading: false;
  value: T;
}>;

export type Progress<T> = Loading | Complete<T>;

export type SetFn<T> = (value: T) => void;
export type Restart<T> = () => void;
export type UseProgressOutput<T> = [Progress<T>, SetFn<T>, Restart<T>];

export const useProgress = <T>(): UseProgressOutput<T> => {
  const [progress, setProgress] = useState<Progress<T>>({
    loading: true,
    value: undefined,
  });

  const setLoaded = useCallback(
    (value: T) =>
      setProgress({
        loading: false,
        value,
      }),
    [setProgress],
  );

  const setLoading = useCallback(
    () =>
      setProgress({
        loading: true,
        value: undefined,
      }),
    [setProgress],
  );

  return [progress, setLoaded, setLoading];
};
