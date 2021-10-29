/**
 * Fetch the specified URL, which is expected to set one or more cookies on its
 * origin.
 *
 * In order for this to work, a same-origin request is made by temporarily
 * creating an iframe.
 *
 * @param url       - the URL to fetch
 * @param timeoutMs - milliseconds to wait before timing out
 */
export default function loadCookies(url: string, timeoutMs: number) {
  const iframe = document.createElement('iframe');

  iframe.src = url;
  iframe.width = '0';
  iframe.height = '0';
  iframe.style.position = 'absolute';
  iframe.style.visibility = 'hidden';
  iframe.style.borderWidth = '0';

  document.body.appendChild(iframe);

  return new Promise((resolve, reject) => {
    let completed = false;

    const timeout = setTimeout(() => {
      completed = true;
      document.body.removeChild(iframe);
      reject();
    }, timeoutMs);

    iframe.onload = () => {
      if (!completed) {
        clearTimeout(timeout);
        completed = true;
        document.body.removeChild(iframe);
        resolve();
      }
    };
  });
}
