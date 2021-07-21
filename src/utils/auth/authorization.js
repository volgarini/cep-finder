const config = require('../../../config/default')
const jwt = require('jsonwebtoken')
const boom = require('boom')

/**
 * Method: authentication function
 * @param {*} hapiServer - Hapi Server
 */
function authentication(hapiServer) {
    const scheme = () => {
        return {
            async authenticate(request, h) {
                const { authorization } = request.headers
                if (!authorization) {
                    throw boom.unauthorized('Invalid header parameter authorization')
                } else {
                    try {
                        const decoded = await jwt.verify(authorization, config.auth.secret);
                        return h.authenticated({ credentials: decoded })
                    } catch (err) {
                        throw boom.unauthorized()
                    }
                }
            },
        }
    }
    if (config.auth.enable) {
        hapiServer.auth.scheme('custom', scheme)
        hapiServer.auth.strategy('default', 'custom')
        hapiServer.auth.default('default', 'mode')
    }
}

module.exports = authentication