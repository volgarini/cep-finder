const Joi = require('joi');

const cepSchema = {
    validations: {
        find: {
            query: Joi.object().keys({
                cep: Joi.string().required().min(8).max(8)
            }),
        }
    },
    responses: {
        status: {
            200: Joi.object({
                cep: Joi.string(),
                state: Joi.string(),
                city: Joi.string(),
                neighborhood: Joi.string(),
                street: Joi.string(),
                service: Joi.string(),
            }).label('Success'),
            400: Joi.object({
                statusCode: Joi.number().example(400),
                error: Joi.string(),
                message: Joi.string()
            }).label('Bad Request'),
            404: Joi.object({
                statusCode: Joi.number().example(404),
                error: Joi.string(),
                message: Joi.array().items(
                    Joi.object({
                        name: Joi.string(),
                        message: Joi.string(),
                        service: Joi.string()
                    })
                )
            }).label('Not Found'),
            406: Joi.object({
                statusCode: Joi.number().example(406),
                error: Joi.string(),
                message: Joi.array().items(
                    Joi.object({
                        name: Joi.string(),
                        message: Joi.string(),
                        service: Joi.string()
                    })
                )
            }).label('Not Acceptable'),
            500: Joi.object({
                statusCode: Joi.number().example(500),
                error: Joi.string()
            }).label('Internal Server Error'),
        }
    }
};

module.exports = {
    cepSchema
}