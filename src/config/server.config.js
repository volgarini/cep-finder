const Hapi = require('@hapi/hapi');
const config = require('../config/env/default');

const server = new Hapi.Server({
    host: config.server.host,
    port: config.server.port,
    /*routes: {
        cors: true,
    },*/
});

module.exports = server;