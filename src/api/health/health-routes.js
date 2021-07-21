const Controller = require('./health-controller');
const config = require('../../../config/default');

module.exports = server => {
    const controller = new Controller();

    server.bind(controller);

    server.route([
        {
            method: 'GET',
            path: `${config.routesPath}/health`,
            options: {
                auth: false,
                description: 'Heath check',
                tags: ['api', 'Health'],
                handler: controller.health,
            },
        },
        {
            method: 'GET',
            path: `${config.routesPath}/health/ping`,
            options: {
                auth: false,
                description: 'Ping',
                tags: ['api', 'Health'],
                handler: controller.ping,
            },
        },
    ])
};