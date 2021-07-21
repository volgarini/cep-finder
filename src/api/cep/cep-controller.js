const httpStatus = require('http-status');
const cepBusiness = require('./cep-business');
const config = require('../../../config/default');
const log = require('../../utils/google/log');

module.exports = class CepController {

    async findCep(req, h) {
        try {
            const response = await cepBusiness.findCep(req.query['cep'], config.cep.maxLength);
            log.info(response);
            return h
                .response(response)
                .code(httpStatus.OK);
        } catch (error) {
            log.error(error);
            if (config.cep.serviceResponse.ERROR === error.type) {
                return h
                    .response({statusCode: httpStatus.NOT_FOUND, error: httpStatus["404_MESSAGE"], message: error.errors})
                    .code(httpStatus.NOT_FOUND);
            } else if (config.cep.serviceResponse.VALIDATION_ERR === error.type) {
                return h
                    .response({statusCode: httpStatus.NOT_ACCEPTABLE, error: httpStatus["406_MESSAGE"], message: error.errors})
                    .code(httpStatus.NOT_ACCEPTABLE);
            } else {
                return h
                    .response({statusCode: httpStatus.INTERNAL_SERVER_ERROR, error: httpStatus["500_MESSAGE"]})
                    .code(httpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}