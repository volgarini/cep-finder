const dotenv = require('dotenv');
const path = require('path')
const validator = require('validator');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envPath = process.env.NODE_ENV === 'test' ? path.join(__dirname, '../env/.env-test') : path.join(__dirname, `../env/.env-${process.env.NODE_ENV}`)
console.log(envPath);
dotenv.config({path: envPath});

module.exports = {
    server: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8080,
    },
    gcp: {
        type: process.env.GCLOUD_TYPE,
        projectId: process.env.GCLOUD_PROJECT,
        privateKeyId: process.env.GCLOUD_PRIVATE_KEY_ID,
        privateKey: process.env.GCLOUD_PRIVATE_KEY,
        clientEmail: process.env.GCLOUD_CLIENT_EMAIL,
        clientId: process.env.GCLOUD_CLIENT_ID,
        credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || './keyfile.json',
    },
    routesPath: '/v1/cep',
    cep: {
        serviceResponse: {
            ERROR: 'service_error',
            VALIDATION_ERR: 'validation_error',
        },
        maxTries: 4,
        maxLength: 7
    },
    auth: {
        enable: validator.toBoolean(process.env.AUTHORIZATION || 'true'),
        secret: '815734B5CFA8EC461674792EF5ED6',
    },
}