const httpStatus = require('http-status');
const packageJson = require('../../../package.json')

module.exports = class HealthController {
    health(request, h) {
        return h
            .response({
                status: 'health',
                version: packageJson.version,
            })
            .code(httpStatus.OK)
    }

    ping(request, h) {
        return h.response({ status: 'pong' }).code(httpStatus.OK)
    }
}