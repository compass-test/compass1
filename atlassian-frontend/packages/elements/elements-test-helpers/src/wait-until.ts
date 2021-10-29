export function waitUntil(fn: () => any, timeout = 2000, step = 1) {
  let iteration = 0;
  return new Promise((resolve, reject) => {
    try {
      (function testFn() {
        if (fn()) {
          resolve();
          return;
        }
        // making sure that this will not fall into the endless loop
        iteration++;
        if (iteration * step <= timeout) {
          setTimeout(testFn, step);
        } else {
          reject('timeout');
        }
      })();
    } catch (e) {
      reject(e);
    }
  });
}
