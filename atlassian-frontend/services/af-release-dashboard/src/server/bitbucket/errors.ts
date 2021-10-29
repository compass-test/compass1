import type { AxiosResponse } from 'axios';

export function getAxiosErrorMessage(
  response?: AxiosResponse,
): string | undefined {
  if (!response) {
    return;
  }
  const { status, statusText, data } = response;
  if (status !== 200) {
    let errorMessage = 'Unknown';
    if (data.error) {
      // e.g. {"type": "error", "error": {"message": "Access token expired."}}
      errorMessage = data.error.message;
    } else {
      // e.g. "Too many invalid password attempts. Log in at https://id.atlassian.com/ to restore access."
      errorMessage = data || 'Empty response';
    }
    return `${status} ${statusText}: ${errorMessage}`;
  }
}
