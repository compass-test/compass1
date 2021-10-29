#!/usr/bin/env node

const fs = require('fs');

const pem = fs.readFileSync(process.argv[2], 'utf8');
process.stdout.write(pem.trim().split('\n').join('\\n'));
