#!/bin/sh

nodemon --watch /app/server --inspect /app/server/index.js | bunyan --time local --color --level debug
