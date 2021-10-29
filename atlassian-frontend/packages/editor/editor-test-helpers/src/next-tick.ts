export async function nextTick() {
  return new Promise((tickFinished) => process.nextTick(() => tickFinished()));
}
