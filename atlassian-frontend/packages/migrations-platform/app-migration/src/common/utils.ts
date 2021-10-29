import { useMemo, useState } from 'react';

export const toTitleCase = (text: string): string => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};

type SaveNewValue<NV> = (newValue: NV) => Promise<void>;
type SetNewValue<NV> = (newValue: NV) => void;

export const useLoadingDebounce = <V>(
  saveNewValue: SaveNewValue<V>,
  defaultTimeout: number = 700,
): [boolean, SetNewValue<V>] => {
  const [isLoading, setIsLoading] = useState(false);
  const setNewValue = useMemo<SetNewValue<V>>(() => {
    let timeout: number | undefined;

    return (newValue) => {
      // Clear old timeout
      window.clearTimeout(timeout);

      // Add debounce timeout
      timeout = window.setTimeout(async () => {
        // Toggle loading to true
        setIsLoading(true);

        // Save the value asyncly
        await saveNewValue(newValue);

        // Toggle loading to false
        setIsLoading(false);

        // Reset the timeout
        timeout = undefined;
      }, defaultTimeout);
    };
  }, [saveNewValue, defaultTimeout]);

  return [isLoading, setNewValue];
};

export default useLoadingDebounce;
