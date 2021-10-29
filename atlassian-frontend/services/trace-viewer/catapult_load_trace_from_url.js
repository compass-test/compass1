/* eslint-disable no-undef, strict */
(() => {
  'use strict';

  // Hide the warning in the ui about using WebComponents polyfill
  window.__hideTraceViewerPolyfillWarning = true;

  const query = new URL(window.location).searchParams;
  const traceUrlStr =
    query.get('trace') ||
    // For compatibility with Perfetto
    query.get('url');
  if (traceUrlStr != null) {
    const tracePromise = fetch(traceUrlStr)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(`Received bad HTTP status ${response.status}`);
        }
        return response;
      })
      .then((r) => r.json());
    document.addEventListener('WebComponentsReady', () => {
      // Derived from overlay usage at
      // https://github.com/catapult-project/catapult/blob/11513e359cd60e369bbbd1f4f2ef648c1bccabd0/tracing/tracing/importer/import.html
      const overlay = new tr.ui.b.Overlay();
      overlay.title = 'Downloading trace';
      overlay.userCanClose = false;

      const messageDiv = document.createElement('div');
      messageDiv.textContent = 'Downloading from ';
      messageDiv.style = 'font-size: .875em';
      const traceUrlStrLink = document.createElement('a');
      traceUrlStrLink.href = traceUrlStr;
      traceUrlStrLink.textContent = traceUrlStr;
      traceUrlStrLink.target = '_blank';
      messageDiv.appendChild(traceUrlStrLink);

      Polymer.dom(overlay).appendChild(messageDiv);

      const catapultApi = document.querySelector('x-profiling-view');
      overlay.visible = true;
      tracePromise
        .then((parsed) => {
          overlay.visible = false;
          catapultApi.setActiveTrace(traceUrlStr, parsed);
        })
        .catch((err) => {
          overlay.title = 'Failed to download trace';
          messageDiv.textContent = err.message;
          overlay.userCanClose = true;
        });
    });
  }
})();
