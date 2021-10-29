import path from 'path';
import { Logger } from 'winston';
import nodeFs from 'fs';

import { FilePath } from '../../types';

export default function createTestHarnessPage(
  bundlePath: FilePath,
  logger: Logger,
) {
  const indexContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" href="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png" sizes="32x32" />
      <title>ComponentLab Test Runner</title>
    </head>
    <body>
      <div id="react-root"></div>
      <script defer type="text/javascript" charset="utf-8" src="./vendor.${path.basename(
        bundlePath,
      )}?q=${Math.random()}"></script>
      <script defer type="text/javascript" charset="utf-8" src="./runtime.${path.basename(
        bundlePath,
      )}?q=${Math.random()}"></script>
      <script defer type="text/javascript" charset="utf-8" src="./main.${path.basename(
        bundlePath,
      )}?q=${Math.random()}"></script>
    </body>
    </html>
  `;
  logger.debug('test harness page content: ' + indexContent);
  logger.debug('bundlePath: ' + path.dirname(bundlePath));
  nodeFs.writeFileSync(
    path.join(path.dirname(bundlePath), 'index.html'),
    indexContent,
  );
}
