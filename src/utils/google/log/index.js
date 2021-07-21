const bunyan = require('bunyan');

const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
    name: 'cep-service',
    streams: [
        {stream: process.stdout, level: 'info'},
        loggingBunyan.stream('info'),
    ],
});

function info(log) {
    if (process.env.NODE_ENV === 'test') {
        return;
    }

    logger.info(log);
}

function error(log) {
    if (process.env.NODE_ENV === 'test') {
        return;
    }

    logger.error(log);
}

module.exports = {
    info,
    error
}