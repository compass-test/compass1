export async function api(path) {
  const res = await fetch(path);
  if (res.status >= 400 && res.status !== 404) {
    const error = new Error(
      `Unexpected error requesting ${res.url}: + ${await res.text()}`,
    );
    error.status = res.status;
    error.url = res.url;
    throw error;
  }

  return res;
}
