export async function sleep(time: number) {
  return new Promise((resolve) => window.setTimeout(resolve, time));
}

export default sleep;
