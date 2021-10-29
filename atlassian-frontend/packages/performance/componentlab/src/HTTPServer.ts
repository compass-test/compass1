import { FilePath, IAwaitableDisposable } from '../types';
import http from 'http';
import serve from 'serve-handler';

export default function startServer({
  port,
  serverRoot,
}: {
  port: number;
  serverRoot: FilePath;
}): IAwaitableDisposable {
  let server: http.Server | null = http.createServer((req, res) => {
    serve(req, res, {
      cleanUrls: false,
      public: serverRoot,
    });
  });

  server.listen(port);

  return {
    dispose() {
      return new Promise((resolve) => {
        if (server != null) {
          server.close(() => {
            resolve();
          });
          server = null;
        }
      });
    },
  };
}
