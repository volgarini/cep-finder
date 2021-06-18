const server = require('./config/server.config');

const plugins = [require('@hapi/inert'), require('@hapi/vision'), require('./config/hapi-swagger')];
require('./config/routes/register')(server);

(async () => {
    await server.register(plugins);
    await server.start();
    console.info( `Api is running ${server.info.protocol} at ${server.info.uri}`);
})();

module.exports = server;