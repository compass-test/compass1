/**
 * Creates a redirection page for the AFP website that pass the page fragment locator.
 * As AFP website is internally hosted under the commit hash,
 * this redirection page is used to have permanent links to internal packages documentation.
 */

const fs = require('fs');

const fileName = 'index.html';
const filePath = 'dist/redirection';
const redirectionPageFilePath = `${filePath}/${fileName}`;

const createRedirectionPage = redirectUrl => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head><title>Redirecting</title></head>
  <body>Redirecting. Please wait...
    <script>
      window.location.href = "${redirectUrl}" + window.location.hash;
    </script>
  </body>
</html>
`;
  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(redirectionPageFilePath, html);
};

(async () => {
  const redirectionUrl = process.argv[2];
  if (!redirectionUrl) {
    throw new Error(
      'Please provide a url, of the page to redirect, as a first argument',
    );
  }
  createRedirectionPage(redirectionUrl);
  // eslint-disable-next-line no-console
  console.log(
    `Successfully created redirection page to url "${redirectionUrl}" in file "${redirectionPageFilePath}"`,
  );
})().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err.message);
  process.exit(1);
});
