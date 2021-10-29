/* eslint-disable global-require */
const Sequelize = require('sequelize');
const { dbURL } = require('../config');

module.exports = new Sequelize(dbURL);
