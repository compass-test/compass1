/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const lambdaLocal = require('lambda-local');
const path = require('path');
const http = require('http');

// eslint-disable-next-line import/no-unresolved
const env = require('./nanos-env.json');
// eslint-disable-next-line import/no-unresolved
const vars = require('./secrets.json');

const execute = async (req, res) => {
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`,
  );

  const localEvent = {
    httpMethod: req.method,
    path: pathname,
    headers: req.headers,
    body: req.body,
    queryStringParameters: Object.fromEntries(searchParams),
  };

  console.log(localEvent);

  try {
    const lambda = await lambdaLocal.execute({
      event: localEvent,
      lambdaPath: path.join(__dirname, './src/handler'),
      timeoutMs: 60000,
      environment: {
        ...env,
        ...vars,
      },
    });
    console.log(`${req.url} ${lambda.statusCode}`);
    console.log(lambda.body);
    res.writeHead(lambda.statusCode, lambda.headers);
    res.end(lambda.body);
  } catch (error) {
    console.log(`${req.url} 500`);
    console.log(error);
    res.writeHead(500);
    res.end(error.message);
  }
};

const app = async (req, res) => {
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      req.body = body;
      execute(req, res);
    });
};

http.createServer(app).listen(8080);
