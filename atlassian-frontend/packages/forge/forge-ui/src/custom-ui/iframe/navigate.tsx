export function navigate(
  url: string,
  type: 'same-tab' | 'new-tab',
  push?: (path: string) => void,
): void {
  switch (type) {
    case 'new-tab':
      window.open(url, '_blank', 'noopener noreferrer');
      break;
    case 'same-tab':
      if (push) {
        push(url);
      } else {
        window.location.href = url;
      }
      break;
  }
}
