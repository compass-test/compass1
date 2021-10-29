export function focusOnElement(
  elementId: string,
  retryInterval?: number,
  maxRetries?: number,
): Promise<HTMLElement> {
  const MAX_RETRIES = maxRetries || 30;
  const interval = retryInterval || 150;
  let currentRetries = 0;

  return new Promise<HTMLElement>((resolve, reject) => {
    const focusOnElementInterval = setInterval(() => {
      const element = document!.getElementById(elementId);
      if (element) {
        element.focus();
        clearInterval(focusOnElementInterval);
        resolve(element);
      } else {
        currentRetries += 1;
        if (currentRetries >= MAX_RETRIES) {
          clearInterval(focusOnElementInterval);
          reject('Unable to focus element within timeout');
        }
      }
    }, interval);
  });
}

export function selectFocusedInput(element: HTMLElement) {
  const e = element as HTMLInputElement;
  e.select();
}
