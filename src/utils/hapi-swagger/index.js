const packageInfo = require('../../../package.json');
const config = require('../../../config/default');

module.exports = {
    plugin: require('hapi-swagger'),
    options: {
        basePath: config.routesPath,
        info: {
            title: `Documentation of ${packageInfo.name}`,
            description: 'Cep finder api backend',
            version: packageInfo.version,
        },
        grouping: 'tags',
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        security: [{jwt: []}],
        swaggerUI: true,
        documentationPage: true,
        documentationPath: '/documentation',
    },
    name: 'swaggerDocs',
    info: () => {
        return {name: 'Swagger Documentation', version: '1.0.0'}
    },
}