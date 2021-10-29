let accepted = false;

if (!global.module) {
  global.module = {};
}

if (!global.module.hot) {
  global.module.hot = {
    accept() {
      accepted = true;
    },
  };
}

const url = new URL(window.location.href);
url.pathname = 'events';

// eslint-disable-next-line compat/compat
const source = new EventSource(url.toString());

source.addEventListener('message', e => {
  if (e?.data === 'invalidate' && !accepted) {
    window.location.reload();
  }
});

window.addEventListener('beforeunload', () => source?.close());
