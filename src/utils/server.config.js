const Hapi = require('@hapi/hapi');
const config = require('../../config/default');

const server = new Hapi.Server({
    host: config.server.host,
    port: config.server.port,
});

module.exports = server;