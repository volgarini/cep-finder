const server = require('./utils/server.config');
const plugins = [require('@hapi/inert'), require('@hapi/vision'), require('./utils/hapi-swagger')];
require('./utils/google').generateCredentialFile();
const log = require('./utils/google/log');

require('./utils/routes/register')(server);

require('./utils/auth/authorization')(server);

(async () => {
    await server.register(plugins);
    await server.start();

    log.info(`Api is running ${server.info.protocol} at ${server.info.uri}`);
})();

module.exports = server;