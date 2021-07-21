const Controller = require('./cep-controller');
const config = require('../../../config/default');
const cepSchema = require('./cep-schema');

module.exports = server => {
    const controller = new Controller();

    server.bind(controller);

    server.route([
        {
            method: 'GET',
            path: `${config.routesPath}/find`,
            options: {
                description: 'Search by especific CEP',
                tags: ['api', 'Cep'],
                handler: controller.findCep,
                validate: cepSchema.cepSchema.validations.find,
                response: cepSchema.cepSchema.responses,
            },
        }
    ])
};