import { useState, useMemo, useEffect } from 'react';

const request = async <T>(...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Responded with status code ${res.status}`);
  }
  return data as T;
};

export default {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) =>
    request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};

type Result<T> = {
  values: T[];
  nextCursor?: string;
};

/**
 * Utility hook that manages 'infinite' pagination where each page gets added to the previous
 * instead of discrete pages.
 * Maintains the list of values, current cursor, and next cursor
 */
export const useInfiniteQuery = <T>(
  generatePath: (cursor?: string) => string,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [nextCursor, setNextCursor] = useState<string>();

  // Update the path when cursor is changed
  // This should trigger the path fetch effect
  const path = useMemo(() => generatePath(cursor), [generatePath, cursor]);

  // Reset if path generation function changes
  useEffect(() => {
    setData([]);
    setCursor(undefined);
    setNextCursor(undefined);
  }, [generatePath]);

  // Each time the path is changed we use it to fetch the next page
  // The path only changes when the path memo is triggered
  useEffect(() => {
    setLoading(true);
    request<Result<T>>(path)
      .then(data => {
        setLoading(false);
        setData(prevData => [...prevData, ...data.values]);
        setNextCursor(data.nextCursor);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, [path]);

  // Changing the current curser updates the path memo
  const fetchNextPage = useMemo(
    () => (nextCursor ? () => setCursor(nextCursor) : undefined),
    [nextCursor],
  );

  return {
    loading,
    error,
    data,
    fetchNextPage,
  };
};
