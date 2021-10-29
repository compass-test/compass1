import { AxiosResponse } from 'axios';

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
      // e.g. {"type": "error", "error": {"message": "Something went wrong"}}
      errorMessage = data.error.message;
    } else {
      errorMessage = data || 'Empty response';
    }
    return `${status} ${statusText}: ${errorMessage}`;
  }
}
