export async function wait(delayMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayMs);
  });
}
